import {Resend} from 'resend';

// Lazy singleton — NEVER instantiate at module load. A missing RESEND_API_KEY
// must not crash the build (Vercel) or route data-collection. Returns null when
// unconfigured; callers degrade gracefully.
let client: Resend | null = null;

export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!client) client = new Resend(key);
  return client;
}

// Lead notifications can fan out to multiple inboxes (Q8 in the agreement).
export function getLeadRecipients(): string[] {
  return (process.env.LEAD_RECIPIENT_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);
}

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? 'Traya Website <onboarding@resend.dev>';
