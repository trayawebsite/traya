// Primary CTA   the single canonical button, shared site-wide. `primaryBtnDark`
// is the same fill with a deep-band focus-ring offset (hero / dark sections).
export {primaryButton as primaryBtn, primaryButtonDark as primaryBtnDark} from '@/lib/button-styles';

// Gradient-ring secondary button   vermilion hairline that fills + glows on
// hover (see `.btn-ring` in globals.css). Pill shape to match the primary.
// Used for "Browse the range / all products", "See our capabilities", etc.
export const secondaryBtn =
  'btn-ring inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-3 text-sm font-medium text-foreground focus-visible:outline-none';

// Same gradient-ring secondary, retoned for the deep hero / dark bands
// (`.btn-ring.on-dark` fill + cream label).
export const secondaryBtnDark =
  'btn-ring on-dark inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-3 text-sm font-medium text-traya-cream focus-visible:outline-none';
