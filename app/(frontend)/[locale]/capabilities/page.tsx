import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
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

// Capabilities — the "solutions house" page: hero → the 5 core capabilities →
// the operating foundations (dark closer). Global Enquiry + Footer from layout.
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
        <CoreCapabilities />
      </Reveal>
      <Reveal>
        <Foundations />
      </Reveal>
    </>
  );
}
