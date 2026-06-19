import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {ProductView} from '@/components/sections/catalogue/product-view';
import {getProductBySlug, getProductSlugs} from '@/lib/catalogue';

// The catalogue is a fixed, known set — a slug outside generateStaticParams is a
// real 404, not an on-demand render.
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getProductSlugs().map((slug) => ({locale, slug}))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {slug} = await params;
  const found = getProductBySlug(slug);
  if (!found) return {};
  return {
    title: found.product.name,
    description: `${found.product.name} — ${found.category.title} from Traya International Exim, India. Specs, MOQ, and pricing on request.`,
    alternates: {canonical: `/products/${slug}`}
  };
}

export default async function ProductPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);
  const found = getProductBySlug(slug);
  if (!found) notFound();
  return <ProductView product={found.product} category={found.category} />;
}
