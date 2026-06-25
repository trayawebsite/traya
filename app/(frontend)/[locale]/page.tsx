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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.trayaexim.com';

export async function generateMetadata(): Promise<Metadata> {
  return {alternates: {canonical: '/'}};
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
      'Indian multi-sector export company helping global buyers source food and agricultural products, chemicals, mechanical and engineering goods, and paper.',
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
