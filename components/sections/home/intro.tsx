import {getTranslations} from 'next-intl/server';
import Image from 'next/image';
import {Container} from '@/components/ui/container';
import {IconChip} from '@/components/ui/icon-chip';
import type {HomePage} from '@/sanity/lib/types';

type IntroData = HomePage['intro'];

// "How Traya helps" — split hero-style band: narrative on the left, a reserved
// slot for the world-map artwork on the right (client to supply), and the three
// service pillars in a divided row underneath.
const FEATURE_ICONS = [
  // Product sourcing — globe
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>,
  // Export documentation — document with lines
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>,
  // Shipment support — ship
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
    <path d="M12 10.189V14" />
    <path d="M12 2v3" />
    <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
    <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 1.62 6" />
    <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
  </svg>
];

const FEATURE_KEYS = ['f1', 'f2', 'f3'] as const;

export async function Intro({data}: {data?: IntroData}) {
  const t = await getTranslations('Home');

  const eyebrow = data?.eyebrow || t('intro.eyebrow');
  const body = data?.body || t('intro.body');

  return (
    <section className="border-b border-traya-border bg-traya-surface">
      <Container className="py-section">
        {/* Reference layout: narrative + pillar row stacked in the left column,
            the map filling the right column's full height */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">
            <p className="section-label">{eyebrow}</p>
            <h2 className="mt-5 max-w-2xl text-balance font-display text-display-sm text-foreground lg:text-display">
              {data?.heading ? (
                data.heading
              ) : (
                <>
                  {t('intro.heading')}{' '}
                  <span className="text-traya-red">{t('intro.headingAccent')}</span>
                </>
              )}
            </h2>
            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              {body}
            </p>

            {/* Service pillars — anchored under the narrative, reference-style */}
            <ul className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-0">
              {FEATURE_KEYS.map((k, i) => (
                <li
                  key={k}
                  data-stagger
                  className={`flex flex-col items-start ${
                    i > 0 ? 'sm:border-s sm:border-traya-border sm:ps-6' : ''
                  } ${i < FEATURE_KEYS.length - 1 ? 'sm:pe-6' : ''}`}
                >
                  <IconChip className="size-11">{FEATURE_ICONS[i]}</IconChip>
                  <h3 className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-foreground">
                    {t(`intro.${k}Title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`intro.${k}Body`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Global-reach map (decorative) — fills the right column's height */}
          <div aria-hidden className="relative hidden min-h-96 lg:col-span-5 lg:block lg:self-stretch">
            <Image
              src="/home/global-reach.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
