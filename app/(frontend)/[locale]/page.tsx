import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
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

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Home.meta'});
  return {
    title: t('title'),
    description: t('description'),
    alternates: {canonical: '/'}
  };
}

// Home flow (Who → What → Why → Proof → Act). Content comes from Sanity
// homePage singleton with i18n fallback for fields not yet in CMS.
export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const home = await getHomePage();

  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
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
