// ─────────────────────────────────────────────────────────────────────────
// CMS SEAM   site-wide settings (contact, socials, export IDs, catalogue).
// When NEXT_PUBLIC_SANITY_PROJECT_ID is set → fetches from Sanity CMS.
// Otherwise → falls back to env vars with verified defaults.
// Return shape stays identical, so NO caller changes needed.
// ─────────────────────────────────────────────────────────────────────────

import {projectId} from '@/sanity/env';
import {fileUrlForRef} from '@/sanity/lib/image';

export type SiteSettings = {
  contact: {email: string; phone: string; address: string};
  legal: {gstin: string; iec: string};
  socials: {linkedin: string; instagram: string};
  catalogueUrl: string;
  founderPhoto: string;
  certifications: {key: string; name: string; file?: string; boost?: boolean; issuedBy?: string; meaning?: string}[];
  testimonials: {quote: string; name: string; role: string; location?: string}[];
};

const DEFAULT_CONTACT = {
  email: 'info@trayaexim.com',
  phone: '+91 99989 16679',
  address: 'Shantakaaram, Shivranjani Society, Satellite, Ahmedabad, Gujarat 380015, India'
};

const DEFAULT_CERTS = [
  {key: 'fssai', name: 'FSSAI', file: '/certifications/fssai.png'},
  {key: 'apeda', name: 'APEDA', file: '/certifications/apeda.png'},
  {key: 'fieo', name: 'FIEO', file: '/certifications/fieo.jpg'},
  {key: 'spiceBoard', name: 'Spice Board', file: '/certifications/spice-board.jpg'},
  {key: 'msme', name: 'MSME India', file: '/certifications/msme.png', boost: true}
];

const useSanity = !!projectId;

async function fetchFromSanity(): Promise<SiteSettings | null> {
  try {
    const {getSiteSettings: getSanitySettings, getCertifications, getTestimonials} = await import('@/sanity/lib/fetch');
    const {urlForImage} = await import('@/sanity/lib/image');

    const [settings, certs, testimonials] = await Promise.all([
      getSanitySettings(),
      getCertifications(),
      getTestimonials()
    ]);

    if (!settings) return null;

    const founderPhoto = settings.founderPhoto
      ? urlForImage(settings.founderPhoto).width(400).url()
      : process.env.NEXT_PUBLIC_FOUNDER_PHOTO ?? '/team/neha-pardeshi.jpg';

    const catalogueUrl = settings.catalogueFile?.asset?._ref
      ? (fileUrlForRef(settings.catalogueFile.asset._ref) ?? process.env.NEXT_PUBLIC_CATALOGUE_URL ?? '')
      : process.env.NEXT_PUBLIC_CATALOGUE_URL ?? '';

    // Map Sanity certification titles to i18n keys
    const certKeyMap: Record<string, string> = {
      'fssai': 'fssai',
      'apeda': 'apeda',
      'fieo': 'fieo',
      'spice board': 'spiceBoard',
      'msme india': 'msme',
      'msme': 'msme'
    };

    // Static image fallbacks for certifications
    const certImageFallbacks: Record<string, string> = {
      'fssai': '/certifications/fssai.png',
      'apeda': '/certifications/apeda.png',
      'fieo': '/certifications/fieo.jpg',
      'spice board': '/certifications/spice-board.jpg',
      'spiceboard': '/certifications/spice-board.jpg',
      'msme india': '/certifications/msme.png',
      'msme': '/certifications/msme.png'
    };

    const seen = new Set<string>();
    const mappedCerts = certs.length > 0
      ? certs
          .map((c) => {
            const key = certKeyMap[c.title.toLowerCase()] ?? c.title.toLowerCase().replace(/\s+/g, '');
            return {
              key,
              name: c.title,
              file: c.image
                ? urlForImage(c.image).url()
                : certImageFallbacks[c.title.toLowerCase()] ?? certImageFallbacks[key],
              boost: key === 'msme',
              // Carried through so a client-added cert (whose key isn't in the
              // i18n `marks` map) still renders its Studio copy; known certs
              // continue to render the translated i18n strings (see cert-list).
              issuedBy: c.issuedBy,
              meaning: c.description
            };
          })
          .filter((c) => {
            if (seen.has(c.key)) return false;
            seen.add(c.key);
            return true;
          })
      : DEFAULT_CERTS;

    return {
      contact: {
        email: settings.emails?.[0] || process.env.NEXT_PUBLIC_CONTACT_EMAIL || DEFAULT_CONTACT.email,
        phone: settings.phone || process.env.NEXT_PUBLIC_CONTACT_PHONE || DEFAULT_CONTACT.phone,
        address: settings.address || process.env.NEXT_PUBLIC_CONTACT_ADDRESS || DEFAULT_CONTACT.address
      },
      legal: {
        gstin: settings.gstin || process.env.NEXT_PUBLIC_GSTIN || '',
        iec: settings.iec || process.env.NEXT_PUBLIC_IEC || ''
      },
      socials: {
        linkedin: settings.social?.linkedin || process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || '',
        instagram: settings.social?.instagram || process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || ''
      },
      catalogueUrl,
      founderPhoto,
      certifications: mappedCerts,
      testimonials: testimonials.map((t) => ({
        quote: t.quote,
        name: t.name,
        role: t.role ?? '',
        location: t.location
      }))
    };
  } catch (err) {
    console.error('[site-settings] Sanity fetch failed, falling back to env:', err);
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (useSanity) {
    const sanity = await fetchFromSanity();
    if (sanity) return sanity;
  }

  return {
    contact: {
      email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || DEFAULT_CONTACT.email,
      phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || DEFAULT_CONTACT.phone,
      address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || DEFAULT_CONTACT.address
    },
    legal: {
      gstin: process.env.NEXT_PUBLIC_GSTIN ?? '',
      iec: process.env.NEXT_PUBLIC_IEC ?? ''
    },
    socials: {
      linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ?? '',
      instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? ''
    },
    catalogueUrl: process.env.NEXT_PUBLIC_CATALOGUE_URL ?? '',
    founderPhoto: process.env.NEXT_PUBLIC_FOUNDER_PHOTO ?? '/team/neha-pardeshi.jpg',
    certifications: DEFAULT_CERTS,
    testimonials: []
  };
}
