import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';

// Vision & mission — the closing dark espresso band. Vision is presented as a
// large centered statement (the aspirational anchor), then mission points flow
// in a horizontal row beneath it (varied from the vertical list). Commitment
// line closes as a centered italic pullquote. More dramatic than a simple
// 2-column split.
const MISSION = ['m1', 'm2', 'm3'] as const;

export async function VisionMission() {
  const t = await getTranslations('About.vision');

  return (
    <section className="bg-traya-deep text-traya-cream">
      <Container className="py-section-lg">
        {/* Vision — the aspirational anchor, full-width centered */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label on-dark">{t('eyebrow')}</p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-traya-saffron">
            {t('visionLabel')}
          </p>
          <h2 className="mt-4 text-balance font-display text-display italic leading-tight text-traya-cream">
            {t('vision')}
          </h2>
        </div>

        {/* Mission — horizontal row of 3 pillars */}
        <div className="mt-16 border-t border-traya-cream/15 pt-12">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-traya-saffron">
            {t('missionLabel')}
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {MISSION.map((m, i) => (
              <div key={m} data-stagger className="border-t-2 border-traya-saffron/40 pt-5">
                <span className="font-mono text-xs text-traya-cream/50">0{i + 1}</span>
                <p className="mt-3 leading-relaxed text-traya-cream/80">{t(m)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Commitment — centered pullquote */}
        <div className="mx-auto mt-16 max-w-2xl border-t border-traya-cream/15 pt-12 text-center">
          <p className="font-display text-lg italic leading-relaxed text-traya-cream">
            {t('commitment')}
          </p>
        </div>
      </Container>
    </section>
  );
}
