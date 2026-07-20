"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { primaryButton } from "@/lib/button-styles";
import { useScrolled } from "@/components/hooks/use-scrolled";
import { NavDesktop } from "./nav-desktop";
import { NavMobile } from "./nav-mobile";
import { LanguageSwitcher } from "./language-switcher";
import { EnquiryBadge } from "@/components/enquiry/enquiry-badge";

// CONTAINER   resolves labels via i18n, wires behaviour (active route, mobile
// open/close, sticky elevation). Presentation is token-driven; no animation.
export function SiteHeader() {
  const t = useTranslations("Links");
  const th = useTranslations("Header");
  const pathname = usePathname();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const items = siteConfig.nav.map((n) => ({ ...n, label: t(n.key) }));
  const ctaLabel = th("getQuote");

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-background/90 backdrop-blur",
        scrolled
          ? "border-b border-border shadow-sm"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={th("siteLabel")}
          className="flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Image
            src="/logo-mark.webp"
            alt=""
            width={34}
            height={34}
            priority
            className="size-8 w-auto"
          />
          <span className="font-display text-lg font-semibold tracking-wide text-foreground">
            TRAYA
          </span>
        </Link>

        <NavDesktop
          items={items}
          pathname={pathname}
          ariaLabel={th("navPrimary")}
        />

        <div className="flex items-center gap-2">
          <EnquiryBadge className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          <LanguageSwitcher />
          <Link
            href={siteConfig.cta.href}
            className={cn(primaryButton, "hidden sm:inline-flex")}
          >
            {ctaLabel}
          </Link>
          <button
            type="button"
            aria-label={open ? th("closeMenu") : th("openMenu")}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          >
            <MenuIcon open={open} />
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

// Static icon   swaps menu/close, no morph animation.
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M3 6h18M3 12h18M3 18h18" />
      )}
    </svg>
  );
}
