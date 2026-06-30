import {getTranslations} from 'next-intl/server';
import {siteConfig} from '@/lib/site-config';
import {Container} from '@/components/ui/container';
import {primaryButtonDark} from '@/lib/button-styles';
import {secondaryBtnDark} from './styles';
import type {HomePage} from '@/sanity/lib/types';

type FinalCtaData = HomePage['finalCta'];

// Closing CTA band. A red gradient circle bleeds in from the right.
// Uses Sanity data when available, falls back to i18n.
export async function FinalCta({data}: {data?: FinalCtaData}) {
  const t = await getTranslations('Home.finalCta');
  const th = await getTranslations('Header');
  const {number} = siteConfig.whatsapp;
  const waHref = number
    ? `https://wa.me/${number}?text=${encodeURIComponent(th('whatsappMessage'))}`
    : null;

  const heading = data?.heading || t('heading');
  const sub = data?.sub || t('sub');
  const ctaLabel = data?.ctaLabel || t('cta');
  const whatsappLabel = t('whatsapp');

  return (
    <section className="relative isolate overflow-hidden bg-traya-deep text-traya-cream">
      {/* Soft drifting vermilion glow */}
      <div
        aria-hidden
        className="glow-drift pointer-events-none absolute top-1/4 right-[-8rem] size-128 rounded-full bg-traya-red/25 blur-3xl"
      />
      <Container className="relative z-10 py-section">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance font-display text-display-sm lg:text-display">
            {heading}
          </h2>
          <p className="mt-5 leading-relaxed text-traya-cream/75">{sub}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#enquiry" className={primaryButtonDark}>
              {ctaLabel}
            </a>
            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryBtnDark}
              >
                {whatsappLabel}
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
