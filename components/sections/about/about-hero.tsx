import {getTranslations} from 'next-intl/server';
import {PageHero} from '@/components/ui/page-hero';
import {Photo} from '@/components/sections/home/photo';

// About page header — centered statement (eyebrow → headline → gold tagline →
// lead), then a wide framed image banner beneath it, so the visual sits as
// evidence under the thesis. Shared PageHero recipe. Image is a placeholder —
// swap for Traya's own imagery.
export async function AboutHero() {
  const t = await getTranslations('About.hero');

  return (
    <PageHero
      eyebrow={t('eyebrow')}
      heading={t('heading')}
      tagline={t('tagline')}
      sub={t('body')}
    >
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-traya-border shadow-sm">
        <Photo
          src="/about/global-trade.jpg"
          alt="Container ships and cranes at an international shipping port"
          sizes="(min-width: 1024px) 64rem, 100vw"
          className="aspect-21/9 w-full"
        />
      </div>
    </PageHero>
  );
}
