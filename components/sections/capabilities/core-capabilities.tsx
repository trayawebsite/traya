import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import type {FeatureItem} from '@/sanity/lib/types';

// The 5 core capabilities — an editorial list (gold icon chip + DM-Mono index on
// the left, title + description on the right). Reads as "considered", not a card
// dump; handles 5 items cleanly where a grid would orphan one.
const CAPS: {key: string; icon: React.ReactNode}[] = [
  {
    key: 'c1',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" />
      </svg>
    )
  },
  {
    key: 'c2',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
      </svg>
    )
  },
  {
    key: 'c3',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <circle cx="12" cy="5" r="2.5" />
        <circle cx="5" cy="18" r="2.5" />
        <circle cx="19" cy="18" r="2.5" />
        <path d="M10.5 6.8 6.5 15.5M13.5 6.8l4 8.7M7.5 18h9" />
      </svg>
    )
  },
  {
    key: 'c4',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="M9 11H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-4" />
        <path d="M9 11V5a3 3 0 0 1 6 0v6M9 16h6" />
      </svg>
    )
  },
  {
    key: 'c5',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2.3 5-5 2.3 2.3-5 5-2.3z" />
      </svg>
    )
  }
];

export async function CoreCapabilities({data}: {data?: FeatureItem[]}) {
  const t = await getTranslations('Capabilities.core');
  const items = data && data.length > 0
    ? data.map((item, i) => ({
        title: item.title,
        description: item.description ?? '',
        icon: CAPS[i]?.icon ?? CAPS[0].icon
      }))
    : CAPS.map((c) => ({
        title: t(`${c.key}Title`),
        description: t(`${c.key}Body`),
        icon: c.icon
      }));

  return (
    <section className="border-b border-traya-border bg-traya-surface">
      <Container className="py-section">
        <div className="max-w-2xl">
          <p className="section-label">{t('eyebrow')}</p>
          <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
            {t('heading')}
          </h2>
        </div>

        <ul className="mt-12">
          {items.map((item, i) => (
            <li
              key={i}
              data-stagger
              className="grid gap-x-12 gap-y-4 border-t border-traya-border py-8 first:border-t-0 md:grid-cols-[auto_1fr]"
            >
              <div className="flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-traya-saffron-soft text-traya-saffron-lo">
                  {item.icon}
                </span>
                <span className="font-mono text-sm text-muted-foreground">0{i + 1}</span>
              </div>
              <div className="md:max-w-2xl">
                <h3 className="font-display text-xl text-foreground">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
