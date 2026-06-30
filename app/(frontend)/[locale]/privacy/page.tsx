import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {localeAlternates} from '@/lib/seo';
import {LegalLayout} from '@/components/ui/legal-layout';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Legal.privacy'});
  return {
    title: t('title'),
    description: t('description'),
    alternates: localeAlternates(locale, '/privacy')
  };
}

const SECTIONS = ['dataCollection', 'dataUsage', 'cookies', 'contact'] as const;

export default async function PrivacyPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'Legal.privacy'});
  const sections = SECTIONS.map((k) => ({
    title: t(`sections.${k}.title`),
    content: t(`sections.${k}.content`)
  }));

  return <LegalLayout title={t('title')} lastUpdated={t('lastUpdated')} sections={sections} />;
}
