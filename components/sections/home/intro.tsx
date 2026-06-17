import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {StatCounter} from './stat-counter';
import {SpecLine} from './spec-line';

// "Who we are + proof" as ONE cohesive section with a clear vertical rhythm:
// narrative → a clean horizontal stat BAND (counts up on scroll; honest counts
// only) → the Vision/Mission pair. The stats are a band, not a boxed card, so the
// only cards in the section are Vision + Mission — they now read as a set.
const STATS = [
  {value: '150+', key: 'products'},
  {value: '18', key: 'categories'},
  {value: '100%', key: 'origin'},
  {value: '5', key: 'certs'}
] as const;

const VM_ICONS = {
  vision: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m15.6 8.4-2.2 4.9-4.9 2.2 2.2-4.9 4.9-2.2z" />
    </svg>
  ),
  mission: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  )
} as const;

export async function Intro() {
  const t = await getTranslations('Home');

  return (
    <section className="border-b border-traya-border bg-traya-surface">
      <Container className="py-section">
        {/* Narrative */}
        <div className="max-w-3xl">
          <p className="section-label">{t('intro.eyebrow')}</p>
          <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
            {t('intro.heading')}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t('intro.body')}</p>
          <SpecLine items={t('intro.spec').split(' · ')} className="mt-6" />
        </div>

        {/* Proof — clean horizontal stat band (hairline-divided, not a card) */}
        <dl className="mt-12 grid grid-cols-2 gap-y-8 border-y border-traya-border py-8 sm:grid-cols-4 sm:divide-x sm:divide-traya-border">
          {STATS.map((s) => (
            <div key={s.key} className="text-center sm:px-4">
              <dt className="font-display text-4xl text-foreground lg:text-5xl">
                <StatCounter value={s.value} />
              </dt>
              <dd className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {t(`stats.${s.key}`)}
              </dd>
            </div>
          ))}
        </dl>

        {/* Vision / Mission — the matched pair */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {(['vision', 'mission'] as const).map((k) => (
            <div key={k} className="rounded-2xl border border-traya-border bg-card p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-traya-red-soft text-traya-red-deep">
                  {VM_ICONS[k]}
                </span>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-traya-red-deep">
                  {t(`intro.${k}Label`)}
                </h3>
              </div>
              <p className="mt-4 font-display text-lg leading-snug text-foreground/90">
                {t(`intro.${k}`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
