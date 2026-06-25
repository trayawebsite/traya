import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import type {HomePage, FeatureItem} from '@/sanity/lib/types';

type ProcessData = HomePage['process'];

// "How it works" — the 3-step buyer journey. Uses Sanity steps when available.
const STEP_ICONS: React.ReactNode[] = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" /></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M9 13h6M9 17h4" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true"><path d="M3 14h18l-2 5H5l-2-5z" /><path d="M5 14V6a1 1 0 0 1 1-1h7l4 4v5M9 5V3" /></svg>
];

export async function HowItWorks({data}: {data?: ProcessData}) {
  const t = await getTranslations('Home.process');

  const eyebrow = data?.eyebrow || t('eyebrow');
  const heading = data?.heading || t('heading');
  const sub = data?.sub || t('sub');
  const stepLabel = t('step');

  // Use Sanity steps if provided, otherwise fall back to i18n
  const steps = data?.steps && data.steps.length > 0
    ? data.steps.map((item: FeatureItem, i: number) => ({
        title: item.title,
        description: item.description || '',
        icon: STEP_ICONS[i] || STEP_ICONS[0]
      }))
    : [1, 2, 3].map((i) => ({
        title: t(`step${i}Title`),
        description: t(`step${i}Body`),
        icon: STEP_ICONS[i - 1]
      }));

  return (
    <section className="border-b border-traya-border bg-traya-surface">
      <Container className="py-section">
        <div className="max-w-2xl">
          <p className="section-label">{eyebrow}</p>
          <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
            {heading}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{sub}</p>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={i}
              data-stagger
              className="rounded-2xl border border-traya-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-traya-saffron-soft text-traya-saffron-lo">
                  {s.icon}
                </span>
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-traya-saffron-lo">
                  {stepLabel} {i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg text-foreground">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
