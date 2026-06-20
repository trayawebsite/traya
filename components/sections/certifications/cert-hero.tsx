import {getTranslations} from 'next-intl/server';
import {PageHero} from '@/components/ui/page-hero';

// Certifications header — centered "trust is documented, not claimed" thesis.
// Shared PageHero recipe.
export async function CertHero() {
  const t = await getTranslations('Certifications.hero');

  return <PageHero eyebrow={t('eyebrow')} heading={t('heading')} sub={t('body')} />;
}
