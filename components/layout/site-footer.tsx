import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {siteConfig} from '@/lib/site-config';

// PRESENTATION — consumes siteConfig + i18n labels. No client logic.
export async function SiteFooter() {
  const t = await getTranslations('Links');
  const tf = await getTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <Container className="py-section-sm">
        {/* brand + blurb */}
        <div className="max-w-sm">
          <span className="font-display text-lg font-semibold tracking-wide text-foreground">
            TRAYA
          </span>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tf('blurb')}</p>
        </div>

        {/* link groups + contact */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.footerGroups.map((group) => (
            <div key={group.titleKey}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {tf(group.titleKey)}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {tf('contactHeading')}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>{siteConfig.contact.address}</li>
            </ul>
            <div className="mt-4 flex gap-4">
              {siteConfig.socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  aria-label={s.label}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* legal line */}
        <div className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>
            © {year} Traya International Exim LLP. {tf('rights')}
          </p>
        </div>
      </Container>
    </footer>
  );
}
