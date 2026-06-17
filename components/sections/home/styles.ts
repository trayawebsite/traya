// Primary CTA — the single canonical button, shared site-wide.
export {primaryButton as primaryBtn} from '@/lib/button-styles';

// Gradient-ring secondary button — vermilion hairline that fills + glows on
// hover (see `.btn-ring` in globals.css). Used for "Browse the range / all
// products", "See our capabilities", etc.
export const secondaryBtn =
  'btn-ring inline-flex items-center justify-center gap-1.5 rounded-lg px-6 py-3 text-sm font-medium text-foreground focus-visible:outline-none';
