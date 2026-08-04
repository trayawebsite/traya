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
  const {product, category} = found;

  // Chemical SKUs repeat across sub-ranges (Tartrazine is both a Synthetic Food
  // Colour and a Lake Colour), so the bare "<product> | <category>" title
  // collided on 14 pages. The series makes each one unique.
  const title = product.series
    ? t('productMeta.titleWithSeries', {
        product: product.name,
        series: product.series,
        category: category.title
      })
    : t('productMeta.title', {product: product.name, category: category.title});

  return {
    title,
    description: t('productMeta.description', {product: product.name, category: category.title}),
    alternates: localeAlternates(locale, `/products/${slug}`),
    openGraph: {
      title: `${product.name} | Traya International Exim`,
      description: t('productMeta.ogDescription', {product: product.name, category: category.title}),
      // Next REPLACES the parent's openGraph wholesale rather than merging it,
      // so omitting images here stripped the share image from all 452 product
      // pages   a shared product link previewed as bare text.
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${product.name}   Traya International Exim`
        }
      ]
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
