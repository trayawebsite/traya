import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {CategoryView} from '@/components/sections/catalogue/category-view';
import {getCategoryBySlug, getCategorySlugs} from '@/lib/catalogue';

// The catalogue is a fixed, known set — a slug outside generateStaticParams is a
// real 404, not an on-demand render.
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getCategorySlugs().map((slug) => ({locale, slug}))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {slug} = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.title,
    description: `${category.title} — ${category.products.length} products from Traya International Exim, India. Specifications, MOQ, and pricing on request.`,
    alternates: {canonical: `/categories/${slug}`}
  };
}

export default async function CategoryPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  return <CategoryView category={category} />;
}
