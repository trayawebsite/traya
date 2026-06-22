import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';

const MISSION = ['m1', 'm2', 'm3'] as const;

export async function VisionMission() {
  const t = await getTranslations('About.vision');

  return (
    <section className="bg-traya-deep text-traya-cream">
      <Container className="py-section-lg">
        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Vision — left */}
          <div>
            <h2 className="font-display text-display-sm text-traya-saffron lg:text-display">
              {t('visionLabel')}
            </h2>
            <p className="mt-5 text-balance font-display text-xl italic leading-tight text-traya-cream lg:text-2xl">
              {t('vision')}
            </p>
            <p className="mt-6 max-w-md leading-relaxed text-traya-cream/60">
              {t('commitment')}
            </p>
          </div>

          {/* Mission — right */}
          <div>
            <h2 className="font-display text-display-sm text-traya-saffron lg:text-display">
              {t('missionLabel')}
            </h2>
            <div className="mt-6 space-y-6">
              {MISSION.map((m, i) => (
                <div key={m} data-stagger className="flex gap-4 border-t border-traya-cream/15 pt-5">
                  <span className="font-mono text-xs text-traya-cream/50">0{i + 1}</span>
                  <p className="leading-relaxed text-traya-cream/80">{t(m)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
