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
  const t = await getTranslations({locale, namespace: 'Legal.terms'});
  return {
    title: t('title'),
    description: t('description'),
    alternates: localeAlternates(locale, '/terms')
  };
}

const SECTIONS = ['general', 'orders', 'shipping', 'liability'] as const;

export default async function TermsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'Legal.terms'});
  const sections = SECTIONS.map((k) => ({
    title: t(`sections.${k}.title`),
    content: t(`sections.${k}.content`)
  }));

  return <LegalLayout title={t('title')} lastUpdated={t('lastUpdated')} sections={sections} />;
}
