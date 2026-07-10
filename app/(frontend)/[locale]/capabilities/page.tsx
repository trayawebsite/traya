import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {localeAlternates} from '@/lib/seo';
import {CapabilitiesHero} from '@/components/sections/capabilities/capabilities-hero';
import {IndustriesWeServe} from '@/components/sections/capabilities/industries';
import {CoreCapabilities} from '@/components/sections/capabilities/core-capabilities';
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
    alternates: localeAlternates(locale, '/capabilities')
  };
}

export default async function CapabilitiesPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <CapabilitiesHero />
      <Reveal>
        <IndustriesWeServe />
      </Reveal>
      <Reveal>
        <CoreCapabilities />
      </Reveal>
    </>
  );
}
