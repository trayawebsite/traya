import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {getSiteSettings} from '@/lib/site-settings';
import {CertMark} from '@/components/layout/cert-mark';
import {secondaryBtn} from './styles';
import type {HomePage} from '@/sanity/lib/types';

type CertsData = HomePage['certsSection'];

// Edge fade so items appear/disappear softly at the viewport sides.
const maskStyle = {
  WebkitMaskImage: 'linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)',
  maskImage: 'linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)'
} as const;

// Home certifications — a live, infinitely scrolling cert wall.
// Uses Sanity heading data when available.
export async function CertBand({data}: {data?: CertsData}) {
  const t = await getTranslations('Home.certs');
  const s = await getSiteSettings();
  if (s.certifications.length === 0) return null;

  const eyebrow = data?.eyebrow || t('eyebrow');
  const heading = data?.heading || t('heading');
  const sub = data?.sub || t('sub');
  const cta = t('cta');

  const items = [...s.certifications, ...s.certifications];

  return (
    <section className="border-b border-traya-border bg-background py-section">
      <Container>
        <div className="max-w-2xl">
          <p className="section-label">{eyebrow}</p>
          <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
            {heading}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{sub}</p>
          <Link href="/certifications" className={`${secondaryBtn} mt-6`}>
            {cta}
          </Link>
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
