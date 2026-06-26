import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {ProductView} from '@/components/sections/catalogue/product-view';
import {getProductBySlug, getProductSlugs} from '@/lib/catalogue';

// The catalogue is a fixed, known set. A slug outside generateStaticParams is a
// real 404, not an on-demand render.
export const dynamicParams = false;

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
    alternates: {canonical: `/products/${slug}`},
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
