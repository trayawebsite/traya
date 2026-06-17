// ─────────────────────────────────────────────────────────────────────────
// CMS SEAM — site-wide settings (contact, socials, export IDs, catalogue).
// TODAY: read from env, with verified real defaults where we have them.
// LATER: swap the body of getSiteSettings() to a Sanity GROQ fetch of
// `siteSettings` — the return shape stays identical, so NO caller changes.
//
// Honesty rule: a field renders in the footer ONLY when non-empty. Values we
// don't yet have (GSTIN, IEC, social URLs, catalogue) default to '' until the
// client provides them.
// ─────────────────────────────────────────────────────────────────────────

export type SiteSettings = {
  contact: {email: string; phone: string; address: string};
  legal: {gstin: string; iec: string};
  socials: {linkedin: string; instagram: string};
  catalogueUrl: string;
  founderPhoto: string;
  certifications: {name: string; file?: string; boost?: boolean; issuedBy?: string}[];
  testimonials: {quote: string; name: string; role: string; location?: string}[];
};

// Verified real contact details (from the client's live site + the brief).
// Env vars override these for staging/preview without code changes.
const DEFAULT_CONTACT = {
  email: 'info@trayaexim.com',
  phone: '+91 99989 16679',
  address: 'Shantakaaram, Shivranjani Society, Satellite, Ahmedabad, Gujarat 380015, India'
};

export async function getSiteSettings(): Promise<SiteSettings> {
  // TODO(Sanity): replace with `client.fetch(SITE_SETTINGS_QUERY)` once the
  // project is connected. Map siteSettings.{email,phone,address,gstin,iec,
  // social*, catalogueFile} onto the shape below.
  return {
    // `||` (not `??`) so an empty env value in production also falls back to the
    // verified default — contact must never vanish from a misconfigured var.
    contact: {
      email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || DEFAULT_CONTACT.email,
      phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || DEFAULT_CONTACT.phone,
      address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || DEFAULT_CONTACT.address
    },
    // Export-legitimacy IDs — client to provide (empty = hidden).
    legal: {
      gstin: process.env.NEXT_PUBLIC_GSTIN ?? '',
      iec: process.env.NEXT_PUBLIC_IEC ?? ''
    },
    // Real profile URLs — client to provide (empty = hidden).
    socials: {
      linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ?? '',
      instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? ''
    },
    // Catalogue PDF — from Sanity siteSettings.catalogueFile later (empty = hidden).
    catalogueUrl: process.env.NEXT_PUBLIC_CATALOGUE_URL ?? '',
    // Founder portrait — env override now; will become siteSettings.founderPhoto
    // (Sanity image) later. Self-host or move to Sanity before launch.
    founderPhoto: process.env.NEXT_PUBLIC_FOUNDER_PHOTO ?? '/team/neha-pardeshi.jpg',
    // Certifications / registrations — self-hosted logos in public/certifications.
    // ⚠️ CLIENT TO CONFIRM each one is actually held. DGFT was dropped: it is the
    // authority that issues the IEC (already shown in the legal bar), not a
    // credential. Will move to Sanity `certification` docs later.
    certifications: [
      {name: 'FSSAI', file: '/certifications/fssai.png', issuedBy: 'Food Safety & Standards Authority of India'},
      {name: 'APEDA', file: '/certifications/apeda.png', issuedBy: 'Agri & Processed Food Export Authority'},
      {name: 'FIEO', file: '/certifications/fieo.jpg', issuedBy: 'Federation of Indian Export Organisations'},
      {name: 'Spice Board', file: '/certifications/spice-board.jpg', issuedBy: 'Spices Board of India'},
      {name: 'MSME India', file: '/certifications/msme.png', boost: true, issuedBy: 'Micro, Small & Medium Enterprises'}
    ],
    // ⚠️ SAMPLE testimonials — for LAYOUT PREVIEW ONLY. Replace every entry with
    // a real, client-verified quote before launch (honesty rule), or set to []
    // to hide the section. Attributions are anonymized role + region on purpose
    // (no fabricated names). Will move to Sanity `testimonial` docs later.
    testimonials: [
      {
        quote:
          'Consistent quality and clean documentation, shipment after shipment. The COAs and spec sheets arrive before we even ask — customs clearance has never been smoother.',
        name: 'Head of Procurement',
        role: 'Spice Importer',
        location: 'Hamburg, Germany'
      },
      {
        quote:
          'We needed a single partner across dehydrates, powders, and spices. Traya delivered the exact grades we specified, at volume, on time.',
        name: 'Sourcing Manager',
        role: 'Food Manufacturer',
        location: 'Dubai, UAE'
      },
      {
        quote:
          'What sets them apart is the personal accountability. You speak to people who know your order and follow it through to delivery.',
        name: 'Founder',
        role: 'Health-Food Brand',
        location: 'Toronto, Canada'
      }
    ]
  };
}
