import type {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';
import {getCategorySlugs, getProductSlugs} from '@/lib/catalogue';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.trayaexim.com';

const STATIC_PATHS = ['', '/about', '/capabilities', '/products', '/certifications', '/contact', '/enquiry'];

function urlFor(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${baseUrl}${prefix}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categorySlugs, productSlugs] = await Promise.all([
    getCategorySlugs(),
    getProductSlugs()
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: urlFor(routing.defaultLocale, path),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, urlFor(locale, path)])
      )
    }
  }));

  const categoryEntries: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: urlFor(routing.defaultLocale, `/categories/${slug}`),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, urlFor(locale, `/categories/${slug}`)])
      )
    }
  }));

  const productEntries: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: urlFor(routing.defaultLocale, `/products/${slug}`),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, urlFor(locale, `/products/${slug}`)])
      )
    }
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
