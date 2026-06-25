import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import type {HomePage} from '@/sanity/lib/types';

type FaqData = HomePage['faq'];

// Buyer FAQ — native <details>/<summary> accordions. Uses Sanity items when available.
const FAQ_KEYS = ['moq', 'samples', 'leadtime', 'payment', 'packaging', 'certs'] as const;

export async function Faq({data}: {data?: FaqData}) {
  const t = await getTranslations('Home.faq');

  const eyebrow = data?.eyebrow || t('eyebrow');
  const heading = data?.heading || t('heading');

  // Use Sanity items if provided, otherwise fall back to i18n
  const items = data?.items && data.items.length > 0
    ? data.items.map((item) => ({question: item.question, answer: item.answer}))
    : FAQ_KEYS.map((k) => ({question: t(`${k}Q`), answer: t(`${k}A`)}));

  return (
    <section className="border-b border-traya-border bg-background">
      <Container className="py-section">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">{eyebrow}</p>
          <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
            {heading}
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-traya-border border-y border-traya-border">
          {items.map((item, i) => (
            <details key={i} className="group faq-item">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-5 font-display text-lg text-foreground transition-colors hover:text-traya-red-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                {item.question}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5 shrink-0 text-traya-saffron-lo transition-transform duration-150 ease-expo group-open:rotate-180 motion-reduce:transition-none"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <p className="max-w-2xl pb-5 text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
