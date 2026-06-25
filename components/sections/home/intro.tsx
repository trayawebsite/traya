import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {SpecLine} from './spec-line';
import type {HomePage} from '@/sanity/lib/types';

type IntroData = HomePage['intro'];

// "Who we are" — narrative → the Vision/Mission pair.
// Uses Sanity data when available, falls back to i18n.
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

export async function Intro({data}: {data?: IntroData}) {
  const t = await getTranslations('Home');

  const eyebrow = data?.eyebrow || t('intro.eyebrow');
  const heading = data?.heading || t('intro.heading');
  const body = data?.body || t('intro.body');
  const specLine = data?.specLine || t('intro.spec');
  const visionLabel = data?.visionLabel || t('intro.visionLabel');
  const vision = data?.vision || t('intro.vision');
  const missionLabel = data?.missionLabel || t('intro.missionLabel');
  const mission = data?.mission || t('intro.mission');

  return (
    <section className="border-b border-traya-border bg-traya-surface">
      <Container className="py-section">
        {/* Narrative */}
        <div className="max-w-3xl">
          <p className="section-label">{eyebrow}</p>
          <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
            {heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{body}</p>
          <SpecLine items={specLine.split(' · ')} className="mt-6" />
        </div>

        {/* Vision / Mission — the matched pair, lifted off the surface as real cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <div
            data-stagger
            className="rounded-2xl border border-traya-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-traya-saffron-soft text-traya-saffron-lo">
                {VM_ICONS.vision}
              </span>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-traya-saffron-lo">
                {visionLabel}
              </h3>
            </div>
            <p className="mt-4 font-display text-lg leading-snug text-foreground/90">
              {vision}
            </p>
          </div>
          <div
            data-stagger
            className="rounded-2xl border border-traya-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-traya-saffron-soft text-traya-saffron-lo">
                {VM_ICONS.mission}
              </span>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-traya-saffron-lo">
                {missionLabel}
              </h3>
            </div>
            <p className="mt-4 font-display text-lg leading-snug text-foreground/90">
              {mission}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
