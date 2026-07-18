import {z} from 'zod';

// A translator: maps a `Validation.*` message key to a localized string.
type T = (key: string) => string;

// Default (English) messages   used by the STATIC schemas below, which back the
// server-side API re-validation and type inference. Server validation messages
// are never shown to a user (the API returns a generic "Validation failed"), so
// English here is fine. Client forms pass next-intl's t('Validation') instead,
// so the inline errors a buyer sees are localized.
const en: T = (key) =>
  ((
    {
      name: 'Please enter your name',
      email: 'Please enter a valid email',
      message: 'Please add a few more details'
    } as Record<string, string>
  )[key] ?? key);

// Field building blocks, parameterized by a translator.
// `.trim()` runs BEFORE the length checks so a whitespace-only value (e.g. "  ")
// can't satisfy min-length, and the stored/emailed value is clean.
function baseFields(t: T) {
  return {
    name: z.string().trim().min(2, t('name')).max(100),
    email: z.string().trim().email(t('email')),
    company: z.string().trim().max(150).optional().or(z.literal('')),
    country: z.string().trim().max(100).optional().or(z.literal('')),
    phone: z.string().trim().max(30).optional().or(z.literal('')),
    // 5000 chars: comfortably fits a batched Enquiry-List RFQ (every cart item +
    // the buyer's notes are folded into this one field).
    message: z.string().trim().min(10, t('message')).max(5000)
  };
}

// Contact Us
export function makeContactSchema(t: T = en) {
  const f = baseFields(t);
  return z.object({name: f.name, email: f.email, company: f.company, message: f.message});
}

// Product Inquiry (tied to a specific product)
export function makeInquirySchema(t: T = en) {
  const f = baseFields(t);
  return z.object({
    name: f.name,
    email: f.email,
    company: f.company,
    country: f.country,
    phone: f.phone,
    productName: z.string().trim().max(2000).optional().or(z.literal('')),
    productSlug: z.string().max(200).optional().or(z.literal('')),
    message: f.message
  });
}

// Request a Quote
export function makeQuoteSchema(t: T = en) {
  const f = baseFields(t);
  return z.object({
    name: f.name,
    email: f.email,
    company: f.company,
    country: f.country,
    phone: f.phone,
    productName: z.string().trim().max(2000).optional().or(z.literal('')),
    productSlug: z.string().max(200).optional().or(z.literal('')),
    quantity: z.string().max(100).optional().or(z.literal('')),
    message: f.message
  });
}

// Static (English) schemas   used by the API routes (server re-validation) and
// for type inference. Client forms build localized schemas via the make* fns.
export const contactSchema = makeContactSchema();
export const inquirySchema = makeInquirySchema();
export const quoteSchema = makeQuoteSchema();

export type ContactInput = z.infer<typeof contactSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
