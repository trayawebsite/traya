import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {localeAlternates} from '@/lib/seo';
import {PageHero} from '@/components/ui/page-hero';
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
      {/* Closing ask is the global enquiry form (rendered site-wide in the layout);
          no separate CTA band here, to avoid stacking duplicate requirement asks. */}
    </>
  );
}
