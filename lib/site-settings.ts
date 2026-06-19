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
  certifications: {key: string; name: string; file?: string; boost?: boolean}[];
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
    // Logos + names are data; the issuing-authority + "what it means" copy lives
    // in i18n (Certifications.marks.<key>) — the reviewable/translatable surface.
    // ⚠️ CLIENT TO CONFIRM each registration is actually held.
    certifications: [
      {key: 'fssai', name: 'FSSAI', file: '/certifications/fssai.png'},
      {key: 'apeda', name: 'APEDA', file: '/certifications/apeda.png'},
      {key: 'fieo', name: 'FIEO', file: '/certifications/fieo.jpg'},
      {key: 'spiceBoard', name: 'Spice Board', file: '/certifications/spice-board.jpg'},
      {key: 'msme', name: 'MSME India', file: '/certifications/msme.png', boost: true}
    ],
    // Testimonials — EMPTY by default (honesty rule: no invented quotes). The
    // home Testimonials section hides until this is populated. Add real,
    // client-verified quotes here — shape: {quote, name, role, location?}.
    // Will move to Sanity `testimonial` docs later.
    testimonials: []
  };
}
