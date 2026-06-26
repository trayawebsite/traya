import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {getSiteSettings} from '@/lib/site-settings';
import {getHomePage} from '@/sanity/lib/fetch';
import {Hero} from '@/components/sections/home/hero';
import {Intro} from '@/components/sections/home/intro';
import {Stats} from '@/components/sections/home/stats';
import {ProductGroups} from '@/components/sections/home/product-groups';
import {WhyTraya} from '@/components/sections/home/why-traya';
import {Testimonials} from '@/components/sections/home/testimonials';
import {CertBand} from '@/components/sections/home/cert-band';
import {HowItWorks} from '@/components/sections/home/how-it-works';
import {Faq} from '@/components/sections/home/faq';
import {FinalCta} from '@/components/sections/home/final-cta';
import {Reveal} from '@/components/ui/reveal';
import {OrganizationSchema, WebsiteSchema} from '@/components/seo/organization-schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.trayaexim.com';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Indian Food Ingredient Exporter | Dehydrated Products, Spices & Powders',
    description: 'Leading Indian exporter of dehydrated onions, garlic, spices, spray-dried powders, herbs & nutraceuticals. 150+ products across 18 categories. FSSAI & APEDA certified B2B supplier.',
    alternates: {canonical: '/'},
    openGraph: {
      title: 'Traya International Exim | Indian Food Ingredient Exporter',
      description: 'B2B supplier of dehydrated products, spices, powders & herbs from India. 150+ products, FSSAI certified, global shipping.'
    }
  };
}

// Home flow (Who → What → Why → Proof → Act). Content comes from Sanity
// homePage singleton with i18n fallback for fields not yet in CMS.
export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const [s, home] = await Promise.all([getSiteSettings(), getHomePage()]);

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Traya International Exim LLP',
    url: siteUrl,
    description:
      'Indian food ingredient exporter specializing in dehydrated products, spices, spray-dried powders, herbs & nutraceuticals. FSSAI & APEDA certified B2B supplier.',
    founder: {'@type': 'Person', name: 'Neha Pardeshi'},
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      addressCountry: 'IN'
    },
    ...(s.contact.email ? {email: s.contact.email} : {}),
    ...(s.contact.phone ? {telephone: s.contact.phone} : {})
  };

  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(orgSchema)}}
      />
      <Hero data={home?.hero} />
      <Reveal>
        <Intro data={home?.intro} />
      </Reveal>
      <Reveal>
        <Stats data={home?.stats} />
      </Reveal>
      <Reveal>
        <ProductGroups data={home?.productsSection} />
      </Reveal>
      <Reveal>
        <WhyTraya data={home?.why} />
      </Reveal>
      <Reveal>
        <Testimonials data={home?.testimonialsSection} />
      </Reveal>
      <Reveal>
        <CertBand data={home?.certsSection} />
      </Reveal>
      <Reveal>
        <HowItWorks data={home?.process} />
      </Reveal>
      <Reveal>
        <Faq data={home?.faq} />
      </Reveal>
      <Reveal>
        <FinalCta data={home?.finalCta} />
      </Reveal>
    </>
  );
}
