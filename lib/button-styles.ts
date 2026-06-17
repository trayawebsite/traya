// Canonical primary button — ONE consistent effect for every primary CTA
// (Get a Quote, Request a sample, Start an enquiry, Send enquiry). Vermilion
// fill that deepens to red on hover, a subtle press, and a vermilion focus ring.
// Only the focus ring-offset colour changes by background (light vs deep band).
const base =
  'inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-traya-red-deep active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:active:scale-100';

export const primaryButton = `${base} focus-visible:ring-offset-background`;
export const primaryButtonDark = `${base} focus-visible:ring-offset-traya-deep`;
