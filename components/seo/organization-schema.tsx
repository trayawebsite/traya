import {getSiteSettings} from '@/lib/site-settings';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.trayaexim.com';

// Organization structured data — helps search engines and AI understand the business
export async function OrganizationSchema() {
  const s = await getSiteSettings();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Traya International Exim LLP',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'Indian food ingredient exporter specializing in dehydrated products, spices, spray-dried powders, herbs & nutraceuticals. FSSAI-licensed and APEDA-registered B2B supplier.',
    founder: {
      '@type': 'Person',
      name: 'Neha Pardeshi',
      jobTitle: 'Founder & CEO'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
      postalCode: '380015'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: s.contact.phone || '+91-99989-16679',
        contactType: 'sales',
        email: s.contact.email || 'info@trayaexim.com',
        availableLanguage: ['English', 'Hindi', 'Arabic', 'French']
      }
    ],
    sameAs: [
      s.socials.linkedin,
      s.socials.instagram
    ].filter(Boolean),
    // `areaServed` intentionally omitted: no specific export-country list is
    // client-confirmed yet (honesty rule — do not assert unverified geography).
    knowsAbout: [
      'Dehydrated onions',
      'Dehydrated garlic',
      'Indian spices',
      'Spray-dried powders',
      'Culinary herbs',
      'Herbal powders',
      'Dairy powders',
      'Food ingredient export'
    ],
    hasCredential: [
      {'@type': 'EducationalOccupationalCredential', name: 'FSSAI License'},
      {'@type': 'EducationalOccupationalCredential', name: 'APEDA Registration'},
      {'@type': 'EducationalOccupationalCredential', name: 'FIEO Membership'},
      {'@type': 'EducationalOccupationalCredential', name: 'Spice Board Registration'},
      {'@type': 'EducationalOccupationalCredential', name: 'MSME Registration'}
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
    />
  );
}

// Website structured data.
// NOTE: no `potentialAction`/SearchAction — the products hub filters client-side
// and has no `?q=` URL entry point, so declaring a sitelinks searchbox would be
// invalid. Re-add once the catalogue search reads a `q` query param.
export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Traya International Exim LLP',
    url: siteUrl,
    description: 'Indian food ingredient exporter. Dehydrated products, spices, powders, herbs & more.'
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
    />
  );
}
