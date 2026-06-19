import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';

// The 4 operating foundations on a dark espresso band — "the standards behind
// the capabilities". Gold top-rules tie the accent in; the page's one dark
// chapter for tonal rhythm. (Re-homes the Philosophy content cut from About.)
const FOUNDATIONS = ['f1', 'f2', 'f3', 'f4'] as const;

export async function Foundations() {
  const t = await getTranslations('Capabilities.foundations');

  return (
    <section className="bg-traya-deep text-traya-cream">
      <Container className="py-section-lg">
        <div className="max-w-2xl">
          <p className="section-label on-dark">{t('eyebrow')}</p>
          <h2 className="mt-4 text-balance font-display text-display-sm lg:text-display">
            {t('heading')}
          </h2>
          <p className="mt-4 leading-relaxed text-traya-cream/75">{t('body')}</p>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {FOUNDATIONS.map((f) => (
            <div key={f} data-stagger className="border-t-2 border-traya-saffron/40 pt-5">
              <h3 className="font-display text-lg text-traya-cream">{t(`${f}Title`)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-traya-cream/70">{t(`${f}Body`)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
