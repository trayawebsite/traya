import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {CertHero} from '@/components/sections/certifications/cert-hero';
import {WhyTrust} from '@/components/sections/certifications/why-trust';
import {CertList} from '@/components/sections/certifications/cert-list';
import {Traceability} from '@/components/sections/certifications/traceability';
import {Reveal} from '@/components/ui/reveal';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Certifications.meta'});
  return {
    title: t('title'),
    description: t('description'),
    alternates: {canonical: '/certifications'}
  };
}

// Certifications & Quality — the trust page. Thesis → why trust us (the key
// message) → each cert explained for the buyer → the documentation/traceability
// proof. Global Enquiry + Footer come from the layout.
export default async function CertificationsPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <CertHero />
      <Reveal>
        <CertList />
      </Reveal>
      <Reveal>
        <WhyTrust />
      </Reveal>
      <Reveal>
        <Traceability />
      </Reveal>
    </>
  );
}
