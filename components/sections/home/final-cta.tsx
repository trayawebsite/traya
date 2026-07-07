import {getTranslations} from 'next-intl/server';
import {whatsAppHref} from '@/lib/whatsapp';
import {Container} from '@/components/ui/container';
import {primaryButtonDark} from '@/lib/button-styles';
import {secondaryBtnDark} from './styles';
import type {HomePage} from '@/sanity/lib/types';

type FinalCtaData = HomePage['finalCta'];

// Reusable closing CTA band — a drifting vermilion glow on the deep espresso.
// Content precedence: explicit props > Sanity data > i18n (Home.finalCta).
// Primary → enquiry form; the WhatsApp secondary is standard on every instance.
// Reuse it on any page by passing heading/sub/ctaLabel.
export async function FinalCta({
  data,
  heading: headingProp,
  sub: subProp,
  ctaLabel: ctaLabelProp
}: {
  data?: FinalCtaData;
  heading?: string;
  sub?: string;
  ctaLabel?: string;
}) {
  const t = await getTranslations('Home.finalCta');
  const th = await getTranslations('Header');
  const waHref = whatsAppHref(th('whatsappMessage'));

  const heading = headingProp || data?.heading || t('heading');
  const sub = subProp || data?.sub || t('sub');
  const ctaLabel = ctaLabelProp || data?.ctaLabel || t('cta');
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
