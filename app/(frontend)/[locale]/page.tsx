import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {getSiteSettings} from '@/lib/site-settings';
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

// Home flow (Who → What → Why → Proof → Act). The founder / "human" story lives
// on /about, not here. The global pre-footer Enquiry section + Footer come from
// the layout, so the final CTA funnels into #enquiry rather than repeating a form.
export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const s = await getSiteSettings();

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
      <Hero />
      <Reveal>
        <Intro />
      </Reveal>
      <Reveal>
        <Stats />
      </Reveal>
      <Reveal>
        <ProductGroups />
      </Reveal>
      <Reveal>
        <WhyTraya />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <CertBand />
      </Reveal>
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Reveal>
        <Faq />
      </Reveal>
      <Reveal>
        <FinalCta />
      </Reveal>
    </>
  );
}
