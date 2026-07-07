import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {localeAlternates} from '@/lib/seo';
import {PageHero} from '@/components/ui/page-hero';
import {FinalCta} from '@/components/sections/home/final-cta';
import {
  WhatWeManage,
  Process,
  HowWeShip,
  GlobalReach
} from '@/components/sections/how-we-work/sections';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'HowWeWork.meta'});
  return {
    title: t('title'),
    description: t('description'),
    alternates: localeAlternates(locale, '/how-we-work')
  };
}

export default async function HowWeWorkPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'HowWeWork'});

  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} heading={t('hero.heading')} sub={t('hero.sub')} />
      <WhatWeManage />
      <Process />
      <HowWeShip />
      <GlobalReach />
      {/* Reuses the shared closing CTA band, with this page's copy. */}
      <FinalCta heading={t('cta.heading')} sub={t('cta.sub')} ctaLabel={t('cta.primary')} />
    </>
  );
}
