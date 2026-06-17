import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {getSiteSettings} from '@/lib/site-settings';
import {CertMark} from '@/components/layout/cert-mark';

// Edge fade so items appear/disappear softly at the viewport sides.
const maskStyle = {
  WebkitMaskImage: 'linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)',
  maskImage: 'linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)'
} as const;

// Home certifications — a live, infinitely scrolling cert wall on the light
// ivory band. Each chip is a lifted white card; pauses on hover, static under
// reduced-motion. Self-hosted logos, honesty-gated.
export async function CertBand() {
  const t = await getTranslations('Home.certs');
  const s = await getSiteSettings();
  if (s.certifications.length === 0) return null;

  const items = [...s.certifications, ...s.certifications];

  return (
    <section className="border-b border-traya-border bg-background py-section">
      <Container>
        <div className="max-w-2xl">
          <p className="section-label">{t('eyebrow')}</p>
          <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
            {t('heading')}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{t('sub')}</p>
        </div>
      </Container>

      {/* Full-bleed marquee */}
      <div className="marquee group relative mt-10 overflow-hidden" style={maskStyle}>
        <ul className="marquee-track flex w-max items-center">
          {items.map((c, i) => (
            <li
              key={i}
              aria-hidden={i >= s.certifications.length}
              className="mr-5 flex w-44 shrink-0 flex-col items-center justify-center gap-4 rounded-2xl border border-traya-border bg-card px-6 py-6 shadow-sm"
            >
              <span className="flex h-12 items-center justify-center">
                <CertMark name={c.name} src={c.file} boost={c.boost} />
              </span>
              <span className="font-display text-base whitespace-nowrap text-foreground">{c.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
