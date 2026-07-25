import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';

// Values band icons — line icons at a size that reads crisp inside the saffron
// ring chip below (smaller + slightly heavier stroke than a bare floating icon,
// which looked wiry). Same icon language as the rest of the site.
const IconGlobe = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);
// Shield-check for "Trusted" — a clean shield conveys trust without the
// armless-handshake rendering artefacts the old line-handshake had.
const IconDeal = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden="true">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const IconBlocks = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden="true">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);
// Award rosette for "Quality" — a recognisable quality/credential mark.
const IconQuality = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden="true">
    <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
    <circle cx="12" cy="8" r="6" />
  </svg>
);

const ITEMS = [
  {key: 's1', icon: IconGlobe},
  {key: 's2', icon: IconDeal},
  {key: 's3', icon: IconBlocks},
  {key: 's4', icon: IconQuality}
] as const;

// Brand-value band on the deep espresso: saffron ring-chip icon → Lora label →
// DM-Mono credential sub, four across with hairline dividers + saffron diamond
// seams.
export async function Stats() {
  const t = await getTranslations('Home.stats');

  return (
    <section className="relative isolate overflow-hidden bg-traya-deep text-traya-cream">
      {/* brand top rule */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-traya-red/60 to-transparent" />
      {/* ambient maroon glow — slow breathing radial behind the content */}
      <div
        aria-hidden
        className="stats-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[150%] w-[62%] -translate-x-1/2 -translate-y-1/2"
      />
      <Container className="relative py-14 lg:py-16">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-0 lg:gap-y-0 lg:divide-x lg:divide-traya-cream/10">
          {ITEMS.map((item, i) => (
            <li
              key={item.key}
              data-stagger
              className="relative flex flex-col items-center px-4 text-center lg:px-8"
            >
              {/* saffron diamonds on the interior seams only (desktop) */}
              {i > 0 && (
                <span
                  aria-hidden
                  className="absolute start-0 top-1/2 hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-traya-saffron/80 rtl:translate-x-1/2 lg:block"
                />
              )}
              <span className="flex size-16 items-center justify-center rounded-full border border-traya-saffron/25 bg-traya-saffron/[0.07] text-traya-saffron">
                {item.icon}
              </span>
              <p className="mt-5 font-display text-lg uppercase tracking-[0.1em] text-traya-cream lg:text-xl">
                {t(item.key)}
              </p>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-traya-cream/55">
                {t(`${item.key}Sub`)}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
