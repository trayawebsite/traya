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
import { InquiryBadge } from "@/components/inquiry/inquiry-badge";

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
      <Container
        className={cn(
          "flex items-center justify-between gap-4 transition-[height] duration-300 ease-expo motion-reduce:transition-none",
          scrolled ? "h-20" : "h-32",
        )}
      >
        <Link
          href="/"
          aria-label={th("siteLabel")}
          className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Image
            src="/logo-lockup.webp"
            alt="Traya International Exim LLP"
            width={1116}
            height={242}
            priority
            // Horizontal lockup (4.6:1), so heights are much smaller than the
            // old portrait mark   at h-16 this is already ~295px wide.
            className={cn(
              "w-auto transition-[height] duration-300 ease-expo motion-reduce:transition-none",
              scrolled ? "h-8 sm:h-10" : "h-11 sm:h-14",
            )}
          />
        </Link>

        <NavDesktop
          items={items}
          pathname={pathname}
          ariaLabel={th("navPrimary")}
        />

        <div className="flex items-center gap-2">
          <InquiryBadge className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
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
