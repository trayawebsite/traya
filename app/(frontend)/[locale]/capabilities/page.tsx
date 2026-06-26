import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {getAboutPage} from '@/sanity/lib/fetch';
import {CapabilitiesHero} from '@/components/sections/capabilities/capabilities-hero';
import {CoreCapabilities} from '@/components/sections/capabilities/core-capabilities';
import {Foundations} from '@/components/sections/capabilities/foundations';
import {Reveal} from '@/components/ui/reveal';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Capabilities.meta'});
  return {
    title: t('title'),
    description: t('description'),
    alternates: {canonical: '/capabilities'}
  };
}

export default async function CapabilitiesPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const about = await getAboutPage();

  return (
    <>
      <CapabilitiesHero />
      <Reveal>
        <CoreCapabilities data={about?.capabilities} />
      </Reveal>
      <Reveal>
        <Foundations data={about?.philosophy} />
      </Reveal>
    </>
  );
}
