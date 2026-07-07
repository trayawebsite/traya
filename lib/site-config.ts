// ─────────────────────────────────────────────────────────────────────────
// DATA / CONFIG layer — single source of truth for the shell STRUCTURE.
// Components read keys + hrefs from here; visible TEXT comes from
// messages/<locale>.json (translatable); dynamic VALUES (contact, social URLs,
// GSTIN/IEC, catalogue) come from lib/site-settings.ts (env now, Sanity later).
// Change content here, touch nothing else.
// ─────────────────────────────────────────────────────────────────────────

export type NavItem = {key: string; href: string};

export const siteConfig = {
  name: 'Traya International Exim LLP',
  shortName: 'Traya',

  // Top navigation — labels via t('Links.<key>'). Logo links Home.
  nav: [
    {key: 'home', href: '/'},
    {key: 'about', href: '/about'},
    {key: 'products', href: '/products'},
    {key: 'howWeWork', href: '/how-we-work'},
    {key: 'capabilities', href: '/capabilities'},
    {key: 'contact', href: '/contact'}
  ] as NavItem[],

  // Primary CTA in the header.
  cta: {key: 'getQuote', href: '/contact'} as NavItem,

  // Footer columns. Explore + legal labels via t('Links.<key>'); action labels
  // via t('Footer.<key>').
  footer: {
    explore: [
      {key: 'about', href: '/about'},
      {key: 'capabilities', href: '/capabilities'},
      {key: 'products', href: '/products'},
      {key: 'certifications', href: '/certifications'},
      {key: 'contact', href: '/contact'}
    ] as NavItem[],
    // Conversion column. Sample/quote route to the cart-style Enquiry List (RFQ).
    // downloadCatalogue is only rendered when a catalogue file is configured
    // (site-settings.catalogueUrl) — the footer filters it out otherwise, so the
    // '#' here is never shipped as a live link.
    actions: [
      {key: 'requestSample', href: '/enquiry'},
      {key: 'requestQuote', href: '/enquiry'},
      {key: 'downloadCatalogue', href: '#'}
    ] as NavItem[],
    // Bottom-bar legal.
    legal: [
      {key: 'privacy', href: '/privacy'},
      {key: 'terms', href: '/terms'}
    ] as NavItem[]
  },

  // Socials — order + display label here; real URLs come from site-settings.
  socials: [
    {key: 'linkedin', label: 'LinkedIn'},
    {key: 'instagram', label: 'Instagram'}
  ],

  // WhatsApp — number from env (NEXT_PUBLIC_WHATSAPP_NUMBER), digits only,
  // with the business line as the default. The prefilled message is localized
  // per-locale via i18n (`Header.whatsappMessage`), not stored here.
  whatsapp: {
    // `||` (not `??`) so an empty env value in production also falls back to the
    // real number — the button must never disappear from a misconfigured var.
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919998916679'
  }
} as const;
