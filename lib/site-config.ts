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
    {key: 'about', href: '/about'},
    {key: 'capabilities', href: '/capabilities'},
    {key: 'products', href: '/products'},
    {key: 'certifications', href: '/certifications'},
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
    // Conversion column. Repoint sample/quote → /enquiry once the RFQ page exists.
    actions: [
      {key: 'requestSample', href: '/contact'},
      {key: 'requestQuote', href: '/contact'},
      {key: 'downloadCatalogue', href: '#catalogue'}
    ] as NavItem[],
    // Bottom-bar legal. Anchors until /privacy + /terms are built (no 404s).
    legal: [
      {key: 'privacy', href: '#'},
      {key: 'terms', href: '#'}
    ] as NavItem[]
  },

  // Socials — order + display label here; real URLs come from site-settings.
  socials: [
    {key: 'linkedin', label: 'LinkedIn'},
    {key: 'instagram', label: 'Instagram'}
  ],

  // WhatsApp — number from env (NEXT_PUBLIC_WHATSAPP_NUMBER), digits only,
  // with the business line as the default. The prefilled message primes the
  // buyer to include what we need to respond fast (product, quantity, market).
  whatsapp: {
    // `||` (not `??`) so an empty env value in production also falls back to the
    // real number — the button must never disappear from a misconfigured var.
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919972422424',
    message:
      'Hello Traya International Exim, I would like to enquire about your food-ingredient exports.\n\nProduct(s): \nQuantity / grade: \nDestination country: \nCompany: '
  }
} as const;
