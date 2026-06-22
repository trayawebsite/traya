import {getTranslations} from 'next-intl/server';
import {siteConfig} from '@/lib/site-config';
import {Container} from '@/components/ui/container';
import {primaryButtonDark} from '@/lib/button-styles';
import {secondaryBtnDark} from './styles';
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
          src="/home/cta.png"
          alt=""
          dark
          sizes="100vw"
          className="size-full"
          imgClassName="object-bottom"
        />
      </div>
      {/* Center scrim — keeps centered copy legible over the background */}
      <div
        aria-hidden
        className="absolute inset-0 bg-radial from-traya-deep/90 via-traya-deep/70 to-traya-deep/30"
      />
      <Container className="relative z-10 py-section">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance font-display text-display-sm lg:text-display">
            {t('heading')}
          </h2>
          <p className="mt-5 leading-relaxed text-traya-cream/75">{t('sub')}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#enquiry" className={primaryButtonDark}>
              {t('cta')}
            </a>
            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryBtnDark}
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
