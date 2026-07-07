import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {SectionHeader} from '@/components/ui/section-header';

// "Why trust Traya" — the trust rationale (the most important message on the
// page): confidence comes from controls + documentation a buyer can check, not
// from claims. Gold icon-chip cards, staggered in.
const PILLARS: {key: string; icon: React.ReactNode}[] = [
  {
    key: 't1',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="M3 21h18M4 21V10l5-3v3l5-3v3l5-3v11" />
        <path d="M9 21v-4h3v4" />
      </svg>
    )
  },
  {
    key: 't2',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  },
  {
    key: 't3',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M14 3v6h6M9 13h6M9 17h6" />
      </svg>
    )
  },
  {
    key: 't4',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="18" r="2.5" />
        <path d="M8.5 6H15a3 3 0 0 1 3 3v6M6 8.5V15a3 3 0 0 0 3 3h6" />
      </svg>
    )
  }
];

export async function WhyTrust() {
  const t = await getTranslations('Certifications.why');

  return (
    <section className="border-b border-traya-border bg-background">
      <Container className="py-section">
        <div className="max-w-2xl">
          <SectionHeader eyebrow={t('eyebrow')} heading={t('heading')} sub={t('body')} lead />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div
              key={p.key}
              data-stagger
              className="rounded-2xl border border-traya-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7"
            >
              <span className="grid size-11 place-items-center rounded-full bg-traya-forest/10 text-traya-forest">
                {p.icon}
              </span>
              <h3 className="mt-4 font-display text-lg text-foreground">{t(`${p.key}Title`)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t(`${p.key}Body`)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
