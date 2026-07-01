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

// `list` sections render as ✓ bullets (items[]), `text` sections as a paragraph.
const SECTIONS = [
  {key: 'dataCollection', type: 'list'},
  {key: 'dataUsage', type: 'list'},
  {key: 'dataSecurity', type: 'text'},
  {key: 'thirdParty', type: 'text'},
  {key: 'cookies', type: 'text'},
  {key: 'contact', type: 'text'}
] as const;

export default async function PrivacyPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'Legal.privacy'});
  const sections = SECTIONS.map((s) => ({
    title: t(`sections.${s.key}.title`),
    ...(s.type === 'list'
      ? {items: t.raw(`sections.${s.key}.items`) as string[]}
      : {content: t(`sections.${s.key}.content`)})
  }));

  return (
    <LegalLayout
      title={t('title')}
      lastUpdated={t('lastUpdated')}
      intro={t('intro')}
      sections={sections}
    />
  );
}
