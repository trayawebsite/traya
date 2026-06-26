import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {siteConfig} from '@/lib/site-config';
import {getSiteSettings} from '@/lib/site-settings';
import {CurrentYear} from './current-year';
import {ScrollToTop} from './scroll-to-top';
import {CertMark} from './cert-mark';

// Near-monochrome on the deep band: cream carries it, vermilion punctuates once
// (top rule + eyebrow + scroll-to-top). Headings are cream — clay is reserved
// for the faint line-grid texture only (kept it from reading muddy as text).
const headingCls = 'text-xs font-semibold uppercase tracking-[0.16em] text-traya-cream/90';
const linkCls =
  'rounded-sm text-sm text-traya-cream/70 transition-colors duration-150 hover:text-traya-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traya-red-hi';

// Faint architectural line-grid (the wine-bar "rack" texture), masked to fade.
const gridStyle: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(to right, var(--traya-clay) 1px, transparent 1px), linear-gradient(to bottom, var(--traya-clay) 1px, transparent 1px)',
  backgroundSize: '72px 72px',
  WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
  maskImage: 'linear-gradient(to bottom, black, transparent)'
};

// PRESENTATION — dark-band footer. STRUCTURE from siteConfig, LABELS from i18n,
// VALUES from getSiteSettings() (env now, Sanity later). Re-theme = token change.
export async function SiteFooter() {
  const t = await getTranslations('Footer');
  const tl = await getTranslations('Links');
  const s = await getSiteSettings();

  const socialUrl: Record<string, string> = {
    linkedin: s.socials.linkedin,
    instagram: s.socials.instagram
  };
  const socials = siteConfig.socials.filter((soc) => socialUrl[soc.key]);

  return (
    <footer className="relative mt-auto overflow-hidden bg-traya-deep text-traya-cream">
      {/* Brand spectrum rule — chilli-deep · chilli · turmeric · forest */}
      <div aria-hidden className="flex h-1.5 w-full">
        <span className="w-1/4 bg-traya-red-deep" />
        <span className="w-1/4 bg-traya-red" />
        <span className="w-1/4 bg-traya-saffron" />
        <span className="w-1/4 bg-traya-forest" />
      </div>
      {/* faint line-grid texture */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1.5 h-64 opacity-[0.06]" style={gridStyle} />

      <Container className="relative py-section">
        {/* Masthead: wordmark left, back-to-top right (the big tagline now lives
            in the contact section above — no redundant statement here). */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="rounded-sm font-display text-2xl font-medium tracking-wide text-traya-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traya-red-hi"
          >
            TRAYA
          </Link>
          <ScrollToTop />
        </div>

        {/* Columns */}
        <div className="mt-12 grid gap-12 border-t border-traya-clay/20 pt-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Brand line + address (wordmark is in the masthead above) */}
          <div className="max-w-xs">
            <p className="font-display text-lg leading-snug text-traya-cream/90">{t('tagline')}</p>
            {s.contact.address && (
              <address className="mt-4 text-sm not-italic leading-relaxed text-traya-cream/70">
                {s.contact.address}
              </address>
            )}
          </div>

          {/* Explore */}
          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className={headingCls}>
              {t('explore')}
            </h2>
            <ul className="mt-5 space-y-3">
              {siteConfig.footer.explore.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className={linkCls}>
                    {tl(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick actions */}
          <nav aria-labelledby="footer-actions">
            <h2 id="footer-actions" className={headingCls}>
              {t('actions')}
            </h2>
            <ul className="mt-5 space-y-3">
              {siteConfig.footer.actions.map((item) => {
                const href =
                  item.key === 'downloadCatalogue' && s.catalogueUrl ? s.catalogueUrl : item.href;
                return (
                  <li key={item.key}>
                    <Link href={href} className={linkCls}>
                      {t(item.key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Get in touch + social */}
          <div>
            <h2 id="footer-contact" className={headingCls}>
              {t('getInTouch')}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-traya-cream/70">{t('reachOut')}</p>
            <div className="mt-4 space-y-2 text-sm">
              {s.contact.phone && (
                <a href={`tel:${s.contact.phone.replace(/\s+/g, '')}`} className={`block ${linkCls}`}>
                  {s.contact.phone}
                </a>
              )}
              {s.contact.email && (
                <a href={`mailto:${s.contact.email}`} className={`block ${linkCls}`}>
                  {s.contact.email}
                </a>
              )}
            </div>
            {socials.length > 0 && (
              <ul aria-label={t('social')} className="mt-6 flex gap-5">
                {socials.map((soc) => (
                  <li key={soc.key}>
                    <a href={socialUrl[soc.key]} target="_blank" rel="noopener noreferrer" className={linkCls}>
                      {soc.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Certification trust strip — export legitimacy (client to confirm).
            Official logos on light chips; text fallback until files are added. */}
        {s.certifications.length > 0 && (
          <div className="mt-12 flex flex-col items-start gap-5">
            <h2 className={headingCls}>{t('certified')}</h2>
            <ul className="flex flex-wrap items-center gap-3">
              {s.certifications.map((c, i) => (
                <li
                  key={`${c.name}-${i}`}
                  className="flex h-12 min-w-20 items-center justify-center rounded-lg bg-white px-4"
                >
                  <CertMark name={c.name} src={c.file} boost={c.boost} />
                </li>
              ))}
            </ul>
          </div>
        )}

      </Container>

      {/* Bottom bar — distinct, slightly-lighter sub-band; compact legal row */}
      <div className="relative border-t border-traya-clay/20 bg-traya-deep-mid">
        <Container className="flex flex-col gap-3 py-5 text-xs text-traya-cream/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.name}. {t('rights')}
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {siteConfig.footer.legal.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="rounded-sm transition-colors duration-150 hover:text-traya-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traya-red-hi"
                >
                  {tl(item.key)}
                </Link>
              </li>
            ))}
            {s.legal.gstin && <li className="font-mono">GSTIN {s.legal.gstin}</li>}
            {s.legal.iec && <li className="font-mono">IEC {s.legal.iec}</li>}
          </ul>
          <p>{t('builtBy')}</p>
        </Container>
      </div>
    </footer>
  );
}
