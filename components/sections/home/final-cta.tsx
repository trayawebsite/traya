import {getTranslations} from 'next-intl/server';
import {siteConfig} from '@/lib/site-config';
import {Container} from '@/components/ui/container';
import {primaryButtonDark} from '@/lib/button-styles';
import {Photo} from './photo';

// Closing CTA band over a dark, moody ingredient still-life (subject weighted
// right). A left-heavy scrim keeps the copy crisp on the dark left while the
// photo breathes on the right. Funnels into the pre-footer enquiry form
// (#enquiry).
export async function FinalCta() {
  const t = await getTranslations('Home.finalCta');
  const {number, message} = siteConfig.whatsapp;
  const waHref = number
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : null;

  return (
    <section className="relative isolate overflow-hidden bg-traya-deep text-traya-cream">
      {/* Background photograph */}
      <div className="absolute inset-0">
        <Photo
          src="/home/final-cta.png"
          alt=""
          dark
          sizes="100vw"
          className="size-full"
          imgClassName="object-bottom"
        />
      </div>
      {/* Left-heavy scrim — copy stays legible; the still-life breathes on the right */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-traya-deep via-traya-deep/85 to-traya-deep/30"
      />

      <Container className="relative z-10 py-section">
        <div className="max-w-xl">
          <h2 className="text-balance font-display text-display-sm lg:text-display">
            {t('heading')}
          </h2>
          <p className="mt-5 leading-relaxed text-traya-cream/75">{t('sub')}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
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
        </div>
      </Container>
    </section>
  );
}
