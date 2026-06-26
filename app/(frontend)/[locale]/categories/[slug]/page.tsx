import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale, getTranslations} from 'next-intl/server';
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
  const {locale, slug} = await params;
  const t = await getTranslations({locale, namespace: 'Catalogue'});
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  const count = category.products.length;
  const productWord = count === 1 ? t('product') : t('products');
  return {
    title: `${category.title} | ${count} ${productWord}`,
    description: t('category.metaDescription', {title: category.title, count, products: productWord}),
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
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();
  return <CategoryView category={category} />;
}
