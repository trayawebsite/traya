import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {Link} from '@/i18n/navigation';
import {secondaryBtn} from '@/components/sections/home/styles';

// "Why Traya" — editorial 2-column. Left: sticky heading + CTA. Right: 7
// differentiators as an alternating-tone list (even items on card, odd on
// surface) so the long list never feels monotonous. Each item gets a saffron
// diamond marker + bold title + one-line description.
const PILLARS = ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7'] as const;

export async function WhyAbout() {
  const t = await getTranslations('About.why');

  return (
    <section className="border-b border-traya-border bg-background">
      <Container className="py-section">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Left — sticky heading + CTA */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="section-label">{t('eyebrow')}</p>
            <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
              {t('heading')}
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{t('body')}</p>
            <div className="mt-8">
              <Link href="/capabilities" className={secondaryBtn}>
                See our capabilities
              </Link>
            </div>
          </div>

          {/* Right — alternating-tone pillar list */}
          <div>
            {PILLARS.map((w, i) => (
              <div
                key={w}
                data-stagger
                className={`flex gap-4 py-6 ${
                  i > 0 ? 'border-t border-traya-border' : ''
                } ${i % 2 === 0 ? 'rounded-xl bg-traya-surface px-5 -mx-5' : ''}`}
              >
                <span aria-hidden className="mt-2 size-2 shrink-0 rotate-45 bg-traya-saffron" />
                <div>
                  <h3 className="font-display text-lg text-foreground">{t(`${w}Title`)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {t(`${w}Body`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
