import {getTranslations} from 'next-intl/server';
import {PageHero} from '@/components/ui/page-hero';

type CertsSection = {eyebrow?: string; heading?: string; sub?: string};

export async function CertHero({data}: {data?: CertsSection} = {}) {
  const t = await getTranslations('Certifications.hero');

  return (
    <PageHero
      eyebrow={data?.eyebrow || t('eyebrow')}
      heading={data?.heading || t('heading')}
      sub={data?.sub || t('body')}
    />
  );
}
