import {getTranslations} from 'next-intl/server';
import Image from 'next/image';
import {Container} from '@/components/ui/container';
import {Reveal} from '@/components/ui/reveal';
import {SectionHeader} from '@/components/ui/section-header';

// How We Work — built from the client's skeleton, in the Traya design system.
// Sections: What we manage · 8-step process · How we ship · Global reach.
// The closing ask is the global enquiry form (rendered site-wide in the layout).

// ── 1. What we manage for you ──────────────────────────────────────────
export async function WhatWeManage() {
  const t = await getTranslations('HowWeWork.manage');
  const items = ['i1', 'i2', 'i3', 'i4', 'i5'] as const;

  return (
    <Reveal>
      <section className="border-b border-traya-border bg-card">
        <Container className="py-section">
          <div className="max-w-2xl">
            <SectionHeader eyebrow={t('eyebrow')} heading={t('heading')} sub={t('sub')} />
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-traya-border bg-traya-border sm:grid-cols-2">
            {items.map((k, i) => (
              <div key={k} data-stagger className="flex gap-5 bg-background p-7 transition-colors hover:bg-traya-surface">
                <span className="font-mono text-sm font-medium text-traya-saffron-lo">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-lg text-foreground">{t(`${k}Title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`${k}Body`)}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center bg-traya-surface p-7">
              <p className="font-display text-lg italic leading-snug text-foreground/70">“{t('quote')}”</p>
            </div>
          </div>
        </Container>
      </section>
    </Reveal>
  );
}

// ── 2. Our process — 8 steps ───────────────────────────────────────────
export async function Process() {
  const t = await getTranslations('HowWeWork.process');
  const steps = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'] as const;

  return (
    <Reveal>
      <section className="border-b border-traya-border bg-background">
        <Container className="py-section">
          <div className="max-w-2xl">
            <SectionHeader eyebrow={t('eyebrow')} heading={t('heading')} sub={t('sub')} />
          </div>

          <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((k, i) => (
              <li key={k} data-stagger className="relative">
                <p className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-traya-saffron-lo">
                  <span className="size-2 rounded-full bg-traya-red" aria-hidden />
                  {t('step')} {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 font-display text-lg text-foreground">{t(`${k}Title`)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t(`${k}Body`)}</p>
              </li>
            ))}
          </ol>

          <p className="mx-auto mt-12 max-w-3xl text-pretty text-center text-sm italic leading-relaxed text-muted-foreground">
            {t('note')}
          </p>
        </Container>
      </section>
    </Reveal>
  );
}

// ── 3. How we ship — freight modes (deep band) ─────────────────────────
export async function HowWeShip() {
  const t = await getTranslations('HowWeWork.ship');
  const modes = [
    {key: 'sea', icon: <SeaIcon />},
    {key: 'air', icon: <AirIcon />},
    {key: 'courier', icon: <CourierIcon />}
  ] as const;

  return (
    <Reveal>
      <section className="relative isolate overflow-hidden bg-traya-deep text-traya-cream">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-traya-red/60 to-transparent"
        />
        <Container className="py-section">
          <div className="max-w-2xl">
            <SectionHeader eyebrow={t('eyebrow')} heading={t('heading')} sub={t('sub')} dark />
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {modes.map(({key, icon}) => (
              <div
                key={key}
                data-stagger
                className="rounded-2xl border border-traya-cream/12 p-8 transition-colors hover:border-traya-red-hi/50"
              >
                <span className="grid size-11 place-items-center text-traya-red-hi">{icon}</span>
                <h3 className="mt-5 font-display text-lg text-traya-cream">{t(`${key}Title`)}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-traya-cream/60">{t(`${key}Body`)}</p>
                <span className="mt-4 inline-block rounded-full border border-traya-red-hi/40 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-traya-red-hi">
                  {t(`${key}Tag`)}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-8 rounded-2xl border border-traya-cream/10 bg-traya-cream/5 p-6 text-sm leading-relaxed text-traya-cream/60">
            {t('incoterms')}
          </p>
        </Container>
      </section>
    </Reveal>
  );
}

// ── 4. Global reach — copy + world map ─────────────────────────────────
export async function GlobalReach() {
  const t = await getTranslations('HowWeWork.reach');
  const pillars = ['pillar1', 'pillar2', 'pillar3', 'pillar4'] as const;

  return (
    <Reveal>
      <section className="border-b border-traya-border bg-card">
        <Container className="py-section">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <div>
              <p className="section-label">{t('eyebrow')}</p>
              <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
                {t('heading')}
              </h2>
              <div className="mt-5 h-0.5 w-10 bg-traya-red" aria-hidden />
              <p className="mt-6 leading-relaxed text-muted-foreground">{t('p1')}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{t('p2')}</p>
              <ul className="mt-7 space-y-3.5">
                {pillars.map((k) => (
                  <li key={k} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-traya-red" aria-hidden />
                    {t(k)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mx-auto w-full max-w-lg lg:self-center">
              <Image
                src="/home/global-reach.webp"
                alt={t('mapLabel')}
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="h-auto w-full"
              />
              <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">
                {t('mapCaption')}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </Reveal>
  );
}

// ── Freight icons (stroke = currentColor) ──────────────────────────────
function SeaIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" className="size-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 30h36M4 30V20l8-8h20l8 8v10" />
      <rect x="14" y="14" width="6" height="8" rx="1" strokeWidth="1.3" />
      <rect x="24" y="14" width="6" height="8" rx="1" strokeWidth="1.3" />
      <circle cx="12" cy="33" r="3" strokeWidth="1.4" />
      <circle cx="32" cy="33" r="3" strokeWidth="1.4" />
    </svg>
  );
}
function AirIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-7" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}
function CourierIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" className="size-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="8" y="14" width="22" height="16" rx="2" />
      <path d="M30 20h4l4 4v6h-8V20z" />
      <circle cx="14" cy="33" r="2.5" strokeWidth="1.4" />
      <circle cx="34" cy="33" r="2.5" strokeWidth="1.4" />
    </svg>
  );
}
