"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { primaryButton } from "@/lib/button-styles";

type Item = { key: string; href: string; label: string };

// PRESENTATION + focus management   full-width drawer. Focus trap, Escape to
// close, body-scroll lock, focus restore. No animation; closes on link click.
export function NavMobile({
  id,
  open,
  onClose,
  items,
  pathname,
  ctaLabel,
  ctaHref,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
  items: Item[];
  pathname: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const th = useTranslations("Header");

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), select, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (f.length === 0) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div id={id} className="md:hidden">
      {open && (
        <>
          <div
            onClick={onClose}
            aria-hidden
            className="fixed inset-0 z-[45] bg-foreground/40"
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={th("menuAria")}
            className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background px-6 pb-6 pt-20 shadow-lg"
          >
            <nav aria-label={th("navAria")}>
              <ul className="flex flex-col gap-1">
                {items.map((item) => {
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/");
                  return (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block rounded-md px-3 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          active
                            ? "bg-muted font-medium text-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link
                href={ctaHref}
                onClick={onClose}
                className={cn(primaryButton, "mt-4 w-full")}
              >
                {ctaLabel}
              </Link>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
