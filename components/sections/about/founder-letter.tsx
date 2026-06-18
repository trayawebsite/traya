import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {getSiteSettings} from '@/lib/site-settings';
import {Photo} from '@/components/sections/home/photo';

// The founder's letter — the emotional centerpiece of the About page, on a deep
// espresso band so it reads as the page's memorable "chapter". Real portrait +
// the letter verbatim; the opening line is set as a large italic Lora pullquote.
export async function FounderLetter() {
  const t = await getTranslations('About.founder');
  const s = await getSiteSettings();

  return (
    <section className="bg-traya-deep text-traya-cream">
      <Container className="py-section-lg">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Photo
            src={s.founderPhoto}
            alt={t('name')}
            dark
            sizes="(min-width: 1024px) 24rem, 100vw"
            className="order-2 mx-auto aspect-4/5 w-full max-w-sm rounded-2xl lg:order-1"
          />

          <div className="order-1 lg:order-2">
            <p className="section-label on-dark">{t('eyebrow')}</p>
            <h2 className="mt-4 text-balance font-display text-display-sm lg:text-display">
              {t('heading')}
            </h2>

            <div className="mt-6 space-y-4 leading-relaxed text-traya-cream/75">
              <p className="font-display text-lg italic text-traya-cream">{t('p1')}</p>
              <p>{t('p2')}</p>
              <p>{t('p3')}</p>
              <p>{t('p4')}</p>
            </div>

            <p className="mt-8 border-t border-traya-cream/15 pt-6 text-sm">
              <span className="font-medium text-traya-cream">{t('name')}</span>
              <span className="text-traya-cream/60"> · {t('role')}</span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
