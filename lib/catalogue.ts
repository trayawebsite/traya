// ─────────────────────────────────────────────────────────────────────────
// CATALOGUE DATA LAYER   unified seam for catalogue data.
// When NEXT_PUBLIC_SANITY_PROJECT_ID is set → fetches from Sanity CMS.
// Otherwise → falls back to content/product-catalogue.json.
// Return shapes stay identical, so NO caller changes needed.
// ─────────────────────────────────────────────────────────────────────────
import catalogueData from '@/content/product-catalogue.json';
import type {SanityImage, SpecRow, ProductForm, FeatureItem} from '@/sanity/lib/types';
import {fileUrlForRef} from '@/sanity/lib/image';

// The 6 browse groups (mirror the home ProductGroups tiles + i18n Home.groups).
export const GROUP_KEYS = ['alliums', 'powders', 'spices', 'herbs', 'nutraceutical', 'chemicals'] as const;
export type GroupKey = (typeof GROUP_KEYS)[number];

export type CatalogueProduct = {
  n: number;
  name: string;
  slug: string;
  shortDescription?: string;
  images?: SanityImage[];
  forms?: ProductForm[];
  specifications?: SpecRow[];
  hsCode?: string;
  origin?: string;
  brochureUrl?: string;
  // Chemicals catalogue fields (undefined for food products)
  series?: string;
  colourIndex?: string;
  packSizes?: string;
};

export type CatalogueCategory = {
  title: string;
  slug: string;
  order: number;
  group: GroupKey;
  description?: string;
  image?: SanityImage;
  // Rich template fields
  moqPackaging?: SpecRow[];
  applications?: FeatureItem[];
  qualityCompliance?: string;
  specSheetUrl?: string;
  products: CatalogueProduct[];
};

// ── JSON fallback (synchronous) ─────────────────────────────────────────
// `group` + `description` + per-product `hsCode` live in the JSON, generated
// from the client's master catalogue (public/Traya_Food Product_List_By_Category.xlsx).
const jsonCategories: CatalogueCategory[] = (catalogueData.categories as CatalogueCategory[])
  .slice()
  .sort((a, b) => a.order - b.order);

// ── Sanity fetcher (async) ──────────────────────────────────────────────
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const useSanity = !!projectId;

async function fetchSanityCategories(): Promise<CatalogueCategory[]> {
  try {
    const {getAllCategories, getCategoryBySlug} = await import('@/sanity/lib/fetch');
    const cats = await getAllCategories();
    if (!cats || cats.length === 0) return jsonCategories;

    const mapped: CatalogueCategory[] = cats.map((c, i) => ({
      title: c.title,
      slug: c.slug,
      order: i,
      group: (c.group as GroupKey) ?? 'spices',
      description: c.description,
      image: c.image,
      products: []
    }));

    const withProducts = await Promise.all(
      mapped.map(async (cat) => {
        const detail = await getCategoryBySlug(cat.slug);
        return {
          ...cat,
          moqPackaging: detail?.moqPackaging,
          applications: detail?.applications,
          qualityCompliance: detail?.qualityCompliance,
          specSheetUrl: detail?.specSheet?.asset?._ref
            ? fileUrlForRef(detail.specSheet.asset._ref) ?? undefined
            : undefined,
          products: (detail?.products ?? []).map((p, j) => ({
            n: j + 1,
            name: p.title,
            slug: p.slug,
            shortDescription: p.shortDescription,
            images: p.images,
            forms: p.forms,
            series: p.series,
            colourIndex: p.colourIndex,
            packSizes: p.packSizes
          }))
        };
      })
    );

    return withProducts;
  } catch (err) {
    console.error('[catalogue] Sanity fetch failed, falling back to JSON:', err);
    return jsonCategories;
  }
}

// ── Public API ──────────────────────────────────────────────────────────
// All functions are async now. Callers (server components) already support await.

export async function getCategories(): Promise<CatalogueCategory[]> {
  if (useSanity) return fetchSanityCategories();
  return jsonCategories;
}

export async function getGroups(): Promise<{key: GroupKey; categories: CatalogueCategory[]}[]> {
  const cats = await getCategories();
  return GROUP_KEYS.map((key) => ({
    key,
    categories: cats.filter((c) => c.group === key)
  })).filter((g) => g.categories.length > 0);
}

export async function getCategoryBySlug(slug: string): Promise<CatalogueCategory | undefined> {
  if (useSanity) {
    const cats = await getCategories();
    const found = cats.find((c) => c.slug === slug);
    if (found) return found;
  }
  return jsonCategories.find((c) => c.slug === slug);
}

export async function getProductBySlug(
  slug: string
): Promise<{product: CatalogueProduct; category: CatalogueCategory} | undefined> {
  if (useSanity) {
    try {
      const {getProductBySlug: getSanityProduct} = await import('@/sanity/lib/fetch');
      const fullProduct = await getSanityProduct(slug);
      if (fullProduct) {
        // Find the category from cached categories
        const cats = await getCategories();
        const category = cats.find((c) =>
          c.products.some((p) => p.slug === slug)
        );

        return {
          product: {
            n: 1,
            name: fullProduct.title,
            slug: fullProduct.slug,
            shortDescription: fullProduct.shortDescription,
            images: fullProduct.images,
            forms: fullProduct.forms,
            specifications: fullProduct.specifications,
            hsCode: fullProduct.hsCode,
            origin: fullProduct.origin,
            series: fullProduct.series,
            colourIndex: fullProduct.colourIndex,
            packSizes: fullProduct.packSizes,
            brochureUrl: fullProduct.brochure?.asset?._ref
              ? fileUrlForRef(fullProduct.brochure.asset._ref) ?? undefined
              : undefined
          },
          category: category ?? {title: fullProduct.category?.title ?? '', slug: '', order: 0, group: 'spices', products: []}
        };
      }
    } catch (err) {
      console.error('[catalogue] Sanity product fetch failed:', err);
    }
  }

  // Fallback: find from cached categories
  const cats = await getCategories();
  for (const category of cats) {
    const product = category.products.find((p) => p.slug === slug);
    if (product) return {product, category};
  }
  return undefined;
}

export async function getCategorySlugs(): Promise<string[]> {
  if (useSanity) {
    try {
      const {getCategorySlugs: getSanitySlugs} = await import('@/sanity/lib/fetch');
      const slugs = await getSanitySlugs();
      if (slugs && slugs.length > 0) return slugs;
    } catch {
      // fall through
    }
  }
  return jsonCategories.map((c) => c.slug);
}

export async function getProductSlugs(): Promise<string[]> {
  if (useSanity) {
    try {
      const {getProductSlugs: getSanitySlugs} = await import('@/sanity/lib/fetch');
      const slugs = await getSanitySlugs();
      if (slugs && slugs.length > 0) return slugs;
    } catch {
      // fall through
    }
  }
  return jsonCategories.flatMap((c) => c.products.map((p) => p.slug));
}

export async function getRelatedProducts(
  category: CatalogueCategory,
  currentSlug: string,
  limit = 6
): Promise<CatalogueProduct[]> {
  // If category already has products (from getCategoryBySlug), use them
  if (category.products.length > 0) {
    return category.products.filter((p) => p.slug !== currentSlug).slice(0, limit);
  }
  // Otherwise fetch the full category
  const full = await getCategoryBySlug(category.slug);
  if (!full) return [];
  return full.products.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

export async function getTotalCategories(): Promise<number> {
  const cats = await getCategories();
  return cats.length;
}

export async function getTotalProducts(): Promise<number> {
  const cats = await getCategories();
  return cats.reduce((n, c) => n + c.products.length, 0);
}
