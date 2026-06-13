// ─────────────────────────────────────────────────────────────────────────
// DATA / CONFIG layer — the single source of truth for the global shell.
// Components read structure (keys + hrefs) from here; visible text comes from
// messages/<locale>.json (translatable). Change content here, touch nothing else.
// ─────────────────────────────────────────────────────────────────────────

export type NavItem = {key: string; href: string};
export type FooterGroup = {titleKey: string; links: NavItem[]};

export const siteConfig = {
  // Top navigation — labels resolved via t('Links.<key>'). Logo links Home.
  nav: [
    {key: 'about', href: '/about'},
    {key: 'capabilities', href: '/capabilities'},
    {key: 'products', href: '/products'},
    {key: 'certifications', href: '/certifications'},
    {key: 'contact', href: '/contact'}
  ] as NavItem[],

  // Primary CTA in the header.
  cta: {key: 'getQuote', href: '/contact'} as NavItem,

  // Footer link groups — group titles via t('Footer.<titleKey>').
  footerGroups: [
    {
      titleKey: 'company',
      links: [
        {key: 'about', href: '/about'},
        {key: 'capabilities', href: '/capabilities'},
        {key: 'certifications', href: '/certifications'},
        {key: 'contact', href: '/contact'}
      ]
    },
    {
      titleKey: 'explore',
      links: [
        {key: 'products', href: '/products'},
        {key: 'catalogue', href: '#'} // wired to Sanity siteSettings.catalogueFile later
      ]
    },
    {
      titleKey: 'legal',
      links: [
        // Pages not built yet — keep as anchors so they never 404. Point to
        // /privacy and /terms once those pages exist.
        {key: 'privacy', href: '#'},
        {key: 'terms', href: '#'}
      ]
    }
  ] as FooterGroup[],

  // Contact details — env/Sanity-driven. Empty by default (honesty rule: never
  // ship a fabricated address). The footer renders each item only when set.
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '',
    address: ''
  },

  // WhatsApp — number from env (NEXT_PUBLIC_WHATSAPP_NUMBER), digits only.
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
    message: "Hi Traya, I'd like to enquire about your products."
  },

  // Socials — hrefs are placeholders until provided by the client.
  socials: [
    {key: 'linkedin', href: '#', label: 'LinkedIn'},
    {key: 'instagram', href: '#', label: 'Instagram'}
  ]
} as const;
