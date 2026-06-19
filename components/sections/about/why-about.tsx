import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';

// Why Traya — editorial 2-column: a sticky heading/intro on the left, the 4
// pillars as a hairline-divided list on the right (gold diamond markers). A
// different rhythm from the card grids so the page doesn't feel repetitive.
const PILLARS = ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7'] as const;

export async function WhyAbout() {
  const t = await getTranslations('About.why');

  return (
    <section className="border-b border-traya-border bg-background">
      <Container className="py-section">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="section-label">{t('eyebrow')}</p>
            <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
              {t('heading')}
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{t('body')}</p>
          </div>

          <ul className="divide-y divide-traya-border border-y border-traya-border">
            {PILLARS.map((w) => (
              <li key={w} data-stagger className="flex gap-4 py-6">
                <span aria-hidden className="mt-2 size-2 shrink-0 rotate-45 bg-traya-saffron" />
                <div>
                  <h3 className="font-display text-lg text-foreground">{t(`${w}Title`)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(`${w}Body`)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
