import {Resend} from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

// Lead notifications can fan out to multiple inboxes (Q8 in the agreement).
export function getLeadRecipients(): string[] {
  return (process.env.LEAD_RECIPIENT_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);
}

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? 'Traya Website <onboarding@resend.dev>';
