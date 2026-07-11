"use client";

import { useState, useCallback, useMemo } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, type Locale } from "@/i18n/routing";

const COOKIE_NAME = "NEXT_LOCALE";
const PROMPT_DISMISSED = "locale-prompt-dismissed";

// Locales with real translations (not English stubs). Only these are offered by
// the auto-suggest prompt, so we never nudge a visitor into an untranslated
// locale. Add codes here as translations are completed.
const PROMPT_LOCALES: Locale[] = ["ar", "fr"];

function getBrowserLocale(): Locale | null {
  if (typeof navigator === "undefined") return null;
  const browserLang = navigator.language.split("-")[0].toLowerCase();
  return PROMPT_LOCALES.find((l) => l === browserLang) ?? null;
}

function isDismissed(): boolean {
  if (typeof document === "undefined") return true;
  return (
    document.cookie.includes(`${COOKIE_NAME}=`) ||
    sessionStorage.getItem(PROMPT_DISMISSED) === "1"
  );
}

// Language prompt   shows once when a visitor's browser language matches a
// supported non-default locale. Dismissible; choice saved in cookie.
export function LanguagePrompt() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);

  const suggested = useMemo(() => {
    if (dismissed || isDismissed()) return null;
    const detected = getBrowserLocale();
    return detected && detected !== currentLocale ? detected : null;
  }, [dismissed, currentLocale]);

  const switchLocale = useCallback(
    (locale: Locale) => {
      document.cookie = `${COOKIE_NAME}=${locale};path=/;max-age=31536000;SameSite=Lax`;
      router.replace(pathname, { locale });
      setDismissed(true);
    },
    [router, pathname],
  );

  const dismiss = useCallback(() => {
    sessionStorage.setItem(PROMPT_DISMISSED, "1");
    setDismissed(true);
  }, []);

  if (!suggested) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[100] flex items-center justify-center gap-3 bg-traya-deep px-4 py-2.5 text-sm text-traya-cream shadow-lg">
      <span>
        {suggested === "ar"
          ? "هل تفضل المتابعة بالعربية؟"
          : "Continuer en Français ?"}
      </span>
      <button
        onClick={() => switchLocale(suggested)}
        className="rounded-md bg-traya-cream/15 px-3 py-1 font-medium transition-colors hover:bg-traya-cream/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traya-cream"
      >
        {localeNames[suggested]}
      </button>
      <button
        onClick={() => switchLocale("en")}
        className="rounded-md bg-traya-cream/15 px-3 py-1 font-medium transition-colors hover:bg-traya-cream/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traya-cream"
      >
        English
      </button>
      <button
        onClick={dismiss}
        aria-label={
          suggested === "ar"
            ? "إغلاق"
            : suggested === "fr"
              ? "Fermer"
              : "Dismiss"
        }
        className="ms-1 rounded-md p-1 text-traya-cream/60 transition-colors hover:text-traya-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traya-cream"
      >
        <svg
          className="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
