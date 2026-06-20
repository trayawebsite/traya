import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';

// "Who we are" + the 3 founding principles — an editorial numbered list
// (gold index + icon chip on the left, title + description on the right).
// Deliberately NOT a card grid: the horizontal rule treatment reads as more
// considered and avoids the visual repetition of lifted cards.
const PRINCIPLES: {key: string; icon: React.ReactNode}[] = [
  {
    key: 'p1',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 1v3M12 20v3M1 12h3M20 12h3" />
      </svg>
    )
  },
  {
    key: 'p2',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
    )
  },
  {
    key: 'p3',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }
];

export async function Principles() {
  const t = await getTranslations('About.principles');

  return (
    <section className="border-b border-traya-border bg-traya-surface">
      <Container className="py-section">
        <div className="max-w-2xl">
          <p className="section-label">{t('eyebrow')}</p>
          <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
            {t('heading')}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t('body')}</p>
        </div>

        <ul className="mt-12">
          {PRINCIPLES.map((p, i) => (
            <li
              key={p.key}
              data-stagger
              className="grid gap-x-12 gap-y-4 border-t border-traya-border py-8 first:border-t-0 md:grid-cols-[auto_1fr]"
            >
              <div className="flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-traya-saffron-soft text-traya-saffron-lo">
                  {p.icon}
                </span>
                <span className="font-mono text-sm text-muted-foreground">0{i + 1}</span>
              </div>
              <div className="md:max-w-xl">
                <h3 className="font-display text-xl text-foreground">{t(`${p.key}Title`)}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{t(`${p.key}Body`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
