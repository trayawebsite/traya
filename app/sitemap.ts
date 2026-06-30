import type {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';
import {getCategorySlugs, getProductSlugs} from '@/lib/catalogue';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.trayaexim.com';

// Primary marketing/catalogue pages. NOTE: /enquiry is deliberately excluded —
// it's a thin client-side RFQ utility page and is marked noindex.
const STATIC_PATHS = ['', '/about', '/capabilities', '/products', '/certifications', '/contact'];
// Legal pages — indexable but low priority.
const LEGAL_PATHS = ['/privacy', '/terms'];

function urlFor(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${baseUrl}${prefix}${path}`;
}

// hreflang map for a path: one entry per locale + x-default → the default locale.
function languagesFor(path: string): Record<string, string> {
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((locale) => [locale, urlFor(locale, path)])
  );
  languages['x-default'] = urlFor(routing.defaultLocale, path);
  return languages;
}

function entryFor(
  path: string,
  priority: number,
  changeFrequency: 'weekly' | 'monthly'
): MetadataRoute.Sitemap[number] {
  return {
    url: urlFor(routing.defaultLocale, path),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {languages: languagesFor(path)}
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categorySlugs, productSlugs] = await Promise.all([
    getCategorySlugs(),
    getProductSlugs()
  ]);

  const staticEntries = STATIC_PATHS.map((path) =>
    entryFor(path, path === '' ? 1 : 0.8, 'weekly')
  );
  const legalEntries = LEGAL_PATHS.map((path) => entryFor(path, 0.3, 'monthly'));
  const categoryEntries = categorySlugs.map((slug) =>
    entryFor(`/categories/${slug}`, 0.7, 'weekly')
  );
  const productEntries = productSlugs.map((slug) =>
    entryFor(`/products/${slug}`, 0.6, 'monthly')
  );

  return [...staticEntries, ...legalEntries, ...categoryEntries, ...productEntries];
}
