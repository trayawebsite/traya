import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {CurrentYear} from './current-year';
import {siteConfig} from '@/lib/site-config';

// Credibility strip — only VERIFIABLE facts (honesty rule). No country/volume
// claims until the client confirms them. 150+ items / 18 categories / 6 groups.
const stats = [
  {value: '150+', label: 'Products'},
  {value: '18', label: 'Categories'},
  {value: '6', label: 'Groups'},
  {value: 'India', label: 'Origin'}
];

// PRESENTATION — consumes siteConfig + i18n labels. Semantic <footer>,
// <nav>, <ul>, <address>. No client logic, no animation, tokens only.
export async function SiteFooter() {
  const t = await getTranslations('Links');
  const tf = await getTranslations('Footer');
  const {email, phone, address} = siteConfig.contact;

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <Container className="py-section-sm">
        {/* credibility strip */}
        <ul className="grid grid-cols-2 gap-6 border-b border-border pb-10 sm:grid-cols-4">
          {stats.map((s) => (
            <li key={s.label}>
              <span className="block font-display text-2xl text-foreground">{s.value}</span>
              <span className="mt-1 block text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </span>
            </li>
          ))}
        </ul>

        {/* brand + blurb */}
        <div className="mt-10 max-w-sm">
          <span className="font-display text-lg font-semibold tracking-wide text-foreground">
            TRAYA
          </span>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tf('blurb')}</p>
        </div>

        {/* link groups + contact */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.footerGroups.map((group) => (
            <nav key={group.titleKey} aria-label={tf(group.titleKey)}>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {tf(group.titleKey)}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.key}>
                    <Link href={link.href} className="text-sm text-foreground/80 hover:text-foreground">
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {tf('contactHeading')}
            </h2>
            <address className="mt-4 space-y-2.5 text-sm not-italic text-muted-foreground">
              {email && (
                <a href={`mailto:${email}`} className="block hover:text-foreground">
                  {email}
                </a>
              )}
              {phone && (
                <a href={`tel:${phone}`} className="block hover:text-foreground">
                  {phone}
                </a>
              )}
              {address && <p>{address}</p>}
            </address>
            <ul className="mt-4 flex gap-4">
              {siteConfig.socials.map((s) => (
                <li key={s.key}>
                  <a href={s.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* legal */}
        <div className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>
            © <CurrentYear /> Traya International Exim LLP. {tf('rights')}
          </p>
        </div>
      </Container>
    </footer>
  );
}
