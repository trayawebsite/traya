import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';

// "How it works" — the 3-step buyer journey (Enquire → Sample & Quote → Ship).
// A conversion aid: it shows B2B buyers the path before they commit. Gold step
// chips tie into the accent system. Copy is editable defaults — client confirms
// operational specifics (lead times, terms).
const STEPS: {key: string; icon: React.ReactNode}[] = [
  {
    key: 'step1',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
      </svg>
    )
  },
  {
    key: 'step2',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M14 3v6h6M9 13h6M9 17h4" />
      </svg>
    )
  },
  {
    key: 'step3',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="M3 14h18l-2 5H5l-2-5z" />
        <path d="M5 14V6a1 1 0 0 1 1-1h7l4 4v5M9 5V3" />
      </svg>
    )
  }
];

export async function HowItWorks() {
  const t = await getTranslations('Home.process');

  return (
    <section className="border-b border-traya-border bg-traya-surface">
      <Container className="py-section">
        <div className="max-w-2xl">
          <p className="section-label">{t('eyebrow')}</p>
          <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
            {t('heading')}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{t('sub')}</p>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li
              key={s.key}
              data-stagger
              className="rounded-2xl border border-traya-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-traya-saffron-soft text-traya-saffron-lo">
                  {s.icon}
                </span>
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-traya-saffron-lo">
                  {t('step')} {i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg text-foreground">{t(`${s.key}Title`)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t(`${s.key}Body`)}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
