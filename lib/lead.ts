import {NextResponse} from 'next/server';
import type {z} from 'zod';
import {getResend, getLeadRecipients, FROM_EMAIL} from '@/lib/resend';
import {logLeadToSheet} from '@/lib/sheets';
import {rateLimit, getClientIp} from '@/lib/rate-limit';

// Shared lead-handling pipeline used by the three form routes
// (/api/contact, /api/inquiry, /api/quote). Each route is a thin wrapper that
// supplies its own type + zod schema; everything else lives here so the email
// fan-out and Sheets logging are defined exactly once.
export type LeadType = 'contact' | 'inquiry' | 'quote';
type LeadData = Record<string, string | undefined>;

export async function handleLead(
  type: LeadType,
  schema: z.ZodTypeAny,
  req: Request
): Promise<Response> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ok: false, error: 'Invalid JSON body'}, {status: 400});
  }

  // Honeypot: `website` is a hidden field real users never fill. If it's set, a
  // bot filled it → look successful (so it doesn't retry) but silently drop the
  // lead: no email, no sheet row, no rate-limit consumed.
  const website = (raw as {website?: unknown} | null)?.website;
  if (typeof website === 'string' && website.trim() !== '') {
    return NextResponse.json({ok: true, type});
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {ok: false, error: 'Validation failed', issues: parsed.error.flatten().fieldErrors},
      {status: 422}
    );
  }

  // Rate limit AFTER validation, so the budget only counts real, well-formed
  // enquiries (a user fixing a typo isn't penalised; bad payloads are rejected
  // cheaply above and never consume the limit). Keyed by IP, shared across all
  // three lead types   one device gets a few genuine enquiries per 24h.
  const ip = getClientIp(req);
  const limit = rateLimit(`lead:${ip}`);
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'You have reached the enquiry limit for today. Please email us or message on WhatsApp, and we will get back to you.'
      },
      {status: 429, headers: {'Retry-After': String(limit.retryAfterSec)}}
    );
  }

  const data = parsed.data as LeadData;

  // ── 1) Email fan-out to every configured recipient ──────────────────
  const recipients = getLeadRecipients();
  let email: {sent: boolean; to: string[]; id?: string; error?: string} = {
    sent: false,
    to: recipients
  };

  const resend = getResend();
  if (!resend) {
    email.error = 'RESEND_API_KEY not set';
  } else if (recipients.length === 0) {
    email.error = 'LEAD_RECIPIENT_EMAILS not set';
  } else {
    try {
      const {data: sent, error} = await resend.emails.send({
        from: FROM_EMAIL,
        to: recipients,
        replyTo: data.email,
        subject: subjectFor(type, data),
        text: textFor(type, data)
      });
      email = error
        ? {sent: false, to: recipients, error: error.message}
        : {sent: true, to: recipients, id: sent?.id};
    } catch (err) {
      email = {sent: false, to: recipients, error: String(err)};
    }
  }

  // ── 2) Sheets log (best-effort   never blocks the response) ──────────
  const sheet = await logLeadToSheet(type, data);

  // ── 3) Honest success ───────────────────────────────────────────────
  // A lead is only "delivered" if it reached at least one channel (email OR
  // the sheet). If BOTH failed, NEVER report success   surface an error so the
  // user reaches out directly, and log the lost lead so it's recoverable.
  const delivered = email.sent || sheet.ok;
  if (!delivered) {
    console.error(
      `[lead] NOT DELIVERED (${type})   email: ${email.error ?? 'failed'}; ` +
        `sheet: ${sheet.error ?? (sheet.configured ? 'failed' : 'not configured')}. Payload:`,
      data
    );
    // Body stays opaque   the failure detail (recipient emails, provider error
    // strings) lives in the server log above, not in the client response.
    return NextResponse.json({ok: false, error: 'delivery_failed'}, {status: 502});
  }

  // Delivered, but if a channel dropped (e.g. email down, sheet up), leave a
  // server trace instead of failing silently.
  if (!email.sent) {
    console.warn(`[lead] email not sent (${type}): ${email.error ?? 'unknown'}   captured via sheet.`);
  }

  // Don't echo `to` (internal recipient addresses) or provider ids to the
  // client   the form only needs `ok`.
  return NextResponse.json({ok: true, type});
}

function subjectFor(type: LeadType, data: LeadData): string {
  const who = data.company ? `${data.name} (${data.company})` : data.name;
  if (type === 'quote') return `Quote request   ${data.productName || 'general'}   ${who}`;
  if (type === 'inquiry') return `Product inquiry   ${data.productName || 'general'}   ${who}`;
  return `Contact form   ${who}`;
}

function textFor(type: LeadType, data: LeadData): string {
  const rows: Array<string | null> = [
    `New ${type} lead from the Traya website`,
    '',
    `Name:     ${data.name}`,
    `Email:    ${data.email}`,
    data.company ? `Company:  ${data.company}` : null,
    data.country ? `Country:  ${data.country}` : null,
    data.phone ? `Phone:    ${data.phone}` : null,
    data.productName ? `Product:  ${data.productName}` : null,
    data.quantity ? `Quantity: ${data.quantity}` : null,
    '',
    'Message:',
    data.message ?? ''
  ];
  return rows.filter((r) => r !== null).join('\n');
}
