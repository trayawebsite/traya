import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {CategoryView} from '@/components/sections/catalogue/category-view';
import {getCategoryBySlug, getCategorySlugs} from '@/lib/catalogue';

// The catalogue is a fixed, known set. A slug outside generateStaticParams is a
// real 404, not an on-demand render.
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({locale, slug}))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {slug} = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.title} | ${category.products.length} products`,
    description: `${category.title} from India. ${category.products.length} Food & Agro products available. Specifications, MOQ, packaging, documents, and pricing are confirmed on enquiry. Traya International Exim LLP.`,
    alternates: {canonical: `/categories/${slug}`},
    openGraph: {
      title: `${category.title} | Traya International Exim`,
      description: `${category.title} from India. ${category.products.length} Food & Agro products available. Specs, MOQ, packaging, documents, and pricing are confirmed on enquiry.`
    }
  };
}

export default async function CategoryPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();
  return <CategoryView category={category} />;
}
