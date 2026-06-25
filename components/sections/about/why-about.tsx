import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {Link} from '@/i18n/navigation';
import {secondaryBtn} from '@/components/sections/home/styles';
import type {FeatureItem, AboutPage} from '@/sanity/lib/types';

type WhyData = AboutPage['whyTraya'];

const PILLAR_KEYS = ['w1', 'w2', 'w3', 'w4', 'w5'] as const;

// Why Traya section on About page. Uses Sanity data when available.
export async function WhyAbout({data}: {data?: WhyData}) {
  const t = await getTranslations('About.why');

  // Use Sanity items if provided, otherwise fall back to i18n
  const pillars = data && data.length > 0
    ? data.map((item: FeatureItem) => ({title: item.title, description: item.description || ''}))
    : PILLAR_KEYS.map((k) => ({title: t(`${k}Title`), description: t(`${k}Body`)}));

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
                {t('cta')}
              </Link>
            </div>
          </div>

          {/* Right — pillar list */}
          <div>
            {pillars.map((p, i) => (
              <div
                key={i}
                data-stagger
                className={`flex gap-4 py-6 ${
                  i > 0 ? 'border-t border-traya-border' : ''
                }`}
              >
                <span aria-hidden className="mt-2 size-2 shrink-0 rotate-45 bg-traya-saffron" />
                <div>
                  <h3 className="font-display text-lg text-foreground">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
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
