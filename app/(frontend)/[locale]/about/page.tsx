import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {AboutHero} from '@/components/sections/about/about-hero';
import {FounderLetter} from '@/components/sections/about/founder-letter';
import {Principles} from '@/components/sections/about/principles';
import {WhyAbout} from '@/components/sections/about/why-about';
import {VisionMission} from '@/components/sections/about/vision-mission';
import {Reveal} from '@/components/ui/reveal';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'About.meta'});
  return {
    title: t('title'),
    description: t('description'),
    alternates: {canonical: '/about'}
  };
}

// About — the company + founder story (per the design playbook): light header →
// founder letter (dark centerpiece) → who we are / principles → philosophy →
// why Traya → vision & mission (dark closer). The global Enquiry section + Footer
// come from the layout. Sections fade up on scroll via <Reveal>.
export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <Reveal>
        <FounderLetter />
      </Reveal>
      <Reveal>
        <Principles />
      </Reveal>
      <Reveal>
        <WhyAbout />
      </Reveal>
      <Reveal>
        <VisionMission />
      </Reveal>
    </>
  );
}
