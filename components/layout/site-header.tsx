'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import {siteConfig} from '@/lib/site-config';
import {buttonVariants} from '@/components/ui/button';
import {Container} from '@/components/ui/container';
import {cn} from '@/lib/utils';
import {useScrolled} from '@/components/hooks/use-scrolled';
import {NavDesktop} from './nav-desktop';
import {NavMobile} from './nav-mobile';
import {LanguageSwitcher} from './language-switcher';

// CONTAINER — pulls config, resolves labels via i18n, wires behavior
// (active route, mobile open/close, sticky elevation). Hands plain props to
// the presentational nav components.
export function SiteHeader() {
  const t = useTranslations('Links');
  const th = useTranslations('Header');
  const pathname = usePathname();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const items = siteConfig.nav.map((n) => ({...n, label: t(n.key)}));
  const ctaLabel = th('getQuote');

  return (
    <header
      className={cn(
        'sticky top-0 z-40 bg-background/85 backdrop-blur transition-shadow',
        scrolled ? 'border-b border-border shadow-sm' : 'border-b border-transparent'
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="rounded-sm font-display text-lg font-semibold tracking-wide text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          TRAYA
        </Link>

        <NavDesktop items={items} pathname={pathname} />

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href={siteConfig.cta.href}
            className={cn(buttonVariants({variant: 'default', size: 'lg'}), 'hidden sm:inline-flex')}
          >
            {ctaLabel}
          </Link>
          <button
            type="button"
            aria-label={open ? th('closeMenu') : th('openMenu')}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </Container>

      <NavMobile
        id="mobile-nav"
        open={open}
        onClose={() => setOpen(false)}
        items={items}
        pathname={pathname}
        ctaLabel={ctaLabel}
        ctaHref={siteConfig.cta.href}
      />
    </header>
  );
}

function HamburgerIcon({open}: {open: boolean}) {
  return (
    <span className="relative block h-4 w-5" aria-hidden="true">
      <span
        className={cn(
          'absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-300',
          open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0.5'
        )}
      />
      <span
        className={cn(
          'absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 bg-current transition-opacity duration-200',
          open ? 'opacity-0' : 'opacity-100'
        )}
      />
      <span
        className={cn(
          'absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-300',
          open ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-0.5'
        )}
      />
    </span>
  );
}
