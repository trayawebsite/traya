import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';

// Philosophy — 4 foundations as a clean typographic grid (forest top-rule, no
// cards) so it reads differently from the card sections around it, and threads
// the forest secondary back in.
const FOUNDATIONS = ['f1', 'f2', 'f3', 'f4'] as const;

export async function Philosophy() {
  const t = await getTranslations('About.philosophy');

  return (
    <section className="border-b border-traya-border bg-background">
      <Container className="py-section">
        <div className="max-w-2xl">
          <p className="section-label">{t('eyebrow')}</p>
          <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
            {t('heading')}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{t('body')}</p>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {FOUNDATIONS.map((f) => (
            <div key={f} className="border-t-2 border-traya-forest/30 pt-5">
              <h3 className="font-display text-lg text-foreground">{t(`${f}Title`)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t(`${f}Body`)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
