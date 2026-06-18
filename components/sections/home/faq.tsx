import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';

// Buyer FAQ — native <details>/<summary> accordions: no client JS, fully
// keyboard-accessible, and the answers ship in the DOM (good for SEO long-tail).
// Copy is editable defaults; client confirms operational specifics.
const FAQS = ['moq', 'samples', 'leadtime', 'payment', 'packaging', 'certs'] as const;

export async function Faq() {
  const t = await getTranslations('Home.faq');

  return (
    <section className="border-b border-traya-border bg-background">
      <Container className="py-section">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">{t('eyebrow')}</p>
          <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
            {t('heading')}
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-traya-border border-y border-traya-border">
          {FAQS.map((k) => (
            <details key={k} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg text-foreground transition-colors hover:text-traya-red-deep [&::-webkit-details-marker]:hidden">
                {t(`${k}Q`)}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5 shrink-0 text-traya-saffron-lo transition-transform duration-200 ease-expo group-open:rotate-180"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <p className="max-w-2xl pb-5 text-sm leading-relaxed text-muted-foreground">
                {t(`${k}A`)}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
