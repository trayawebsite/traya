import {getTranslations} from 'next-intl/server';
import {siteConfig} from '@/lib/site-config';
import {Container} from '@/components/ui/container';
import {primaryButtonDark} from '@/lib/button-styles';

// Closing CTA band on the deep tone. A single soft, slowly drifting vermilion
// glow gives it quiet life (static under reduced-motion). Funnels into the
// existing pre-footer enquiry form (#enquiry).
export async function FinalCta() {
  const t = await getTranslations('Home.finalCta');
  const {number, message} = siteConfig.whatsapp;
  const waHref = number
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : null;

  return (
    <section className="relative overflow-hidden bg-traya-deep text-traya-cream">
      {/* soft drifting vermilion glow */}
      <div
        aria-hidden
        className="glow-drift pointer-events-none absolute top-1/4 right-[-8rem] size-128 rounded-full bg-traya-red/25 blur-3xl"
      />

      <Container className="relative py-section text-center">
        <h2 className="mx-auto max-w-2xl text-balance font-display text-display-sm lg:text-display">
          {t('heading')}
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-traya-cream/70">{t('sub')}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="#enquiry" className={primaryButtonDark}>
            {t('cta')}
          </a>
          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ring on-dark inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium text-traya-cream focus-visible:outline-none"
            >
              {t('whatsapp')}
            </a>
          )}
        </div>
      </Container>
    </section>
  );
}
