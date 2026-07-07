import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {Reveal} from '@/components/ui/reveal';
import {SectionHeader} from '@/components/ui/section-header';

// How We Work — built from the client's skeleton, in the Traya design system.
// Sections: What we manage · 8-step process · How we ship · Global reach.
// The closing CTA reuses the shared <FinalCta> band (see the page).

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
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-traya-saffron-lo">
                  {t('step')} {String(i + 1).padStart(2, '0')}
                </p>
                <span className="mt-3 block size-2.5 rounded-full bg-traya-red" aria-hidden />
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

            <div>
              <div className="rounded-2xl border border-traya-border bg-traya-surface p-6 sm:p-8">
                <WorldMap label={t('mapLabel')} />
              </div>
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
    <svg viewBox="0 0 44 44" fill="none" className="size-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 28l6-12 10-4 16-4-4 16-10 4-6 6-8-2-4-4z" />
      <path d="M22 12l4 12M12 16l8 4" strokeWidth="1.3" opacity="0.6" />
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

// World map — India highlighted in vermilion, dashed routes to buyer regions.
function WorldMap({label}: {label: string}) {
  const land = 'rgb(20 18 14 / 0.10)';
  const landStroke = 'rgb(20 18 14 / 0.18)';
  const red = '#B5341A';
  return (
    <svg viewBox="0 0 600 340" fill="none" className="block w-full" role="img" aria-label={label}>
      <path d="M55 70 L130 62 L165 80 L178 108 L168 140 L150 160 L128 180 L105 196 L84 185 L62 155 L44 124 L48 95Z" fill={land} stroke={landStroke} />
      <path d="M118 205 L152 200 L172 218 L176 250 L164 288 L148 308 L128 318 L112 304 L104 270 L106 232Z" fill={land} stroke={landStroke} />
      <path d="M252 52 L298 46 L318 62 L326 82 L308 96 L282 100 L260 94 L248 76 L250 60Z" fill={land} stroke={landStroke} />
      <path d="M258 112 L304 106 L328 120 L338 155 L332 198 L316 232 L294 248 L268 248 L252 230 L244 194 L246 152 L250 128Z" fill={land} stroke={landStroke} />
      <path d="M330 48 L450 42 L490 62 L508 94 L496 126 L466 140 L426 136 L390 148 L358 136 L334 110 L326 80Z" fill={land} stroke={landStroke} />
      <path d="M454 220 L514 212 L540 230 L544 266 L528 294 L498 304 L468 296 L450 272 L446 244Z" fill={land} stroke={landStroke} />
      {/* India */}
      <path d="M390 130 L414 124 L428 138 L424 166 L410 192 L394 200 L378 186 L372 162 L376 144Z" fill="rgb(181 52 26 / 0.4)" stroke={red} strokeWidth="1.5" />
      <circle cx="400" cy="158" r="5" fill={red} />
      <circle cx="400" cy="158" r="11" stroke={red} strokeWidth="1" opacity="0.3" />
      <circle cx="400" cy="158" r="18" stroke={red} strokeWidth="0.8" opacity="0.15" />
      {[
        [105, 120],
        [140, 250],
        [280, 78],
        [498, 258],
        [550, 110]
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <line x1="400" y1="158" x2={x} y2={y} stroke={red} strokeWidth="1" strokeDasharray="5 5" opacity="0.4" />
          <circle cx={x} cy={y} r="3.5" fill="rgb(20 18 14 / 0.45)" />
        </g>
      ))}
      <text x="400" y="214" textAnchor="middle" fontSize="9" fill={red} fontFamily="var(--font-mono)" letterSpacing="2" opacity="0.85">
        {label.toUpperCase()}
      </text>
    </svg>
  );
}
