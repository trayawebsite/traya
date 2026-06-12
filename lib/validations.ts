import {z} from 'zod';

// Shared field building blocks
const name = z.string().min(2, 'Please enter your name').max(100);
const email = z.string().email('Please enter a valid email');
const company = z.string().max(150).optional().or(z.literal(''));
const country = z.string().max(100).optional().or(z.literal(''));
const phone = z.string().max(30).optional().or(z.literal(''));
const message = z.string().min(10, 'Please add a few more details').max(2000);

// Contact Us
export const contactSchema = z.object({
  name,
  email,
  company,
  message
});

// Product Inquiry (tied to a specific product)
export const inquirySchema = z.object({
  name,
  email,
  company,
  country,
  phone,
  productName: z.string().max(200).optional().or(z.literal('')),
  productSlug: z.string().max(200).optional().or(z.literal('')),
  message
});

// Request a Quote
export const quoteSchema = z.object({
  name,
  email,
  company,
  country,
  phone,
  productName: z.string().max(200).optional().or(z.literal('')),
  productSlug: z.string().max(200).optional().or(z.literal('')),
  quantity: z.string().max(100).optional().or(z.literal('')),
  message
});

export type ContactInput = z.infer<typeof contactSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
