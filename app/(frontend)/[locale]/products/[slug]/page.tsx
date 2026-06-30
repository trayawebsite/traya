import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {localeAlternates} from '@/lib/seo';
import {routing} from '@/i18n/routing';
import {ProductView} from '@/components/sections/catalogue/product-view';
import {getProductBySlug, getProductSlugs} from '@/lib/catalogue';

// If a slug is outside generateStaticParams (e.g., fallback JSON data when Sanity is partially populated),
// we allow on-demand render so it doesn't hard 404.
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({locale, slug}))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const t = await getTranslations({locale, namespace: 'Catalogue'});
  const found = await getProductBySlug(slug);
  if (!found) return {};
  return {
    title: t('productMeta.title', {product: found.product.name, category: found.category.title}),
    description: t('productMeta.description', {product: found.product.name, category: found.category.title}),
    alternates: localeAlternates(locale, `/products/${slug}`),
    openGraph: {
      title: `${found.product.name} | Traya International Exim`,
      description: t('productMeta.ogDescription', {product: found.product.name, category: found.category.title})
    }
  };
}

export default async function ProductPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);
  const found = await getProductBySlug(slug);
  if (!found) notFound();
  return <ProductView product={found.product} category={found.category} />;
}
