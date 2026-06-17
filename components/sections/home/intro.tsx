import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {SpecLine} from './spec-line';

// "Who we are" — narrative → the Vision/Mission pair. The headline numbers now
// live in their own dark <Stats> band below this section (more impact + tonal
// rhythm), so this section stays light and reads as a clean set of two cards.
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

        {/* Vision / Mission — the matched pair, lifted off the surface as real cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {(['vision', 'mission'] as const).map((k) => (
            <div
              key={k}
              className="rounded-2xl border border-traya-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-traya-saffron-soft text-traya-saffron-lo">
                  {VM_ICONS[k]}
                </span>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-traya-saffron-lo">
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
