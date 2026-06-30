import type {Metadata} from 'next';
import {routing} from '@/i18n/routing';
import {getPathname} from '@/i18n/navigation';

// ─────────────────────────────────────────────────────────────────────────
// Locale-aware canonical + hreflang for every page's generateMetadata.
//
// Problem this solves: with `localePrefix: 'as-needed'`, the same page renders
// at `/about` (en), `/ar/about` (ar) and `/fr/about` (fr). A bare relative
// `canonical: '/about'` resolves (against metadataBase, which has no locale
// prefix) to the EN url for ALL locales — telling Google to de-index the ar/fr
// versions. We also emitted no hreflang at all.
//
// `localeAlternates` returns the correct self-referencing canonical for the
// current locale PLUS the full `languages` map (with `x-default`) so each
// translated page points at itself and declares its siblings.
//
// `pathname` is the locale-agnostic href, e.g. '/about' or
// `/products/${slug}`. Next resolves these relative paths against metadataBase.
// ─────────────────────────────────────────────────────────────────────────
export function localeAlternates(locale: string, pathname: string): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = getPathname({href: pathname, locale: l});
  }
  // x-default → the default-locale URL (clean, unprefixed).
  languages['x-default'] = getPathname({href: pathname, locale: routing.defaultLocale});

  return {
    canonical: getPathname({href: pathname, locale}),
    languages
  };
}
