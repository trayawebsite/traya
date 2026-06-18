import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';

// Vision & mission — the closing dark espresso band. Vision as a large statement
// on the left; the mission points + a commitment pull-line on the right. Saffron
// labels/marks (gold on dark reads well and ties to the home stats band).
const MISSION = ['m1', 'm2', 'm3'] as const;

export async function VisionMission() {
  const t = await getTranslations('About.vision');

  return (
    <section className="bg-traya-deep text-traya-cream">
      <Container className="py-section-lg">
        <p className="section-label on-dark">{t('eyebrow')}</p>
        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-traya-saffron">
              {t('visionLabel')}
            </p>
            <h2 className="mt-3 text-balance font-display text-display-sm lg:text-display">
              {t('vision')}
            </h2>
          </div>

          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-traya-saffron">
              {t('missionLabel')}
            </p>
            <ul className="mt-5 space-y-4">
              {MISSION.map((m) => (
                <li key={m} className="flex gap-3 leading-relaxed text-traya-cream/80">
                  <svg
                    className="mt-1 size-4 shrink-0 text-traya-saffron"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 10.5l4 4 8-9" />
                  </svg>
                  {t(m)}
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-traya-cream/15 pt-6 font-display text-lg italic text-traya-cream">
              {t('commitment')}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
