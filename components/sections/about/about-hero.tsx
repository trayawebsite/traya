import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';

// About page header — clean light opening. Eyebrow → headline → a gold italic
// tagline (the brand's "refined approach" line) → lead paragraph.
export async function AboutHero() {
  const t = await getTranslations('About.hero');

  return (
    <section className="border-b border-traya-border bg-background">
      <Container className="py-section-lg">
        <div className="max-w-3xl">
          <p className="section-label">{t('eyebrow')}</p>
          <h1 className="mt-5 text-balance font-display text-display-lg text-foreground">
            {t('heading')}
          </h1>
          <p className="mt-4 font-display text-lg italic text-traya-saffron-lo">{t('tagline')}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t('body')}</p>
        </div>
      </Container>
    </section>
  );
}
