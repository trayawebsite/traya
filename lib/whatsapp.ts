import {siteConfig} from '@/lib/site-config';

// Single source for the WhatsApp deep link. Pass the (translated) prefilled
// message; returns null when no number is configured, so callers can hide the
// button. Used by the top bar, footer contact, floating button, final CTA, and
// the chat panel — one place to change the wa.me behaviour.
export function whatsAppHref(message: string): string | null {
  const {number} = siteConfig.whatsapp;
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : null;
}
