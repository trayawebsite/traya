// ─────────────────────────────────────────────────────────────────────────
// CATALOGUE DATA LAYER — unified seam for catalogue data.
// When NEXT_PUBLIC_SANITY_PROJECT_ID is set → fetches from Sanity CMS.
// Otherwise → falls back to content/product-catalogue.json.
// Return shapes stay identical, so NO caller changes needed.
// ─────────────────────────────────────────────────────────────────────────
import catalogueData from '@/content/product-catalogue.json';

// The 6 browse groups (mirror the home ProductGroups tiles + i18n Home.groups).
export const GROUP_KEYS = ['alliums', 'powders', 'spices', 'herbs', 'nutraceutical', 'wellness'] as const;
export type GroupKey = (typeof GROUP_KEYS)[number];

// Which categories belong to each group. Becomes `category.group` in Sanity.
const GROUP_CATEGORIES: Record<GroupKey, string[]> = {
  alliums: [
    'dehydrated-white-onion',
    'dehydrated-red-onion',
    'dehydrated-pink-onion',
    'fresh-onion',
    'dehydrated-garlic',
    'special-dehydrated-products',
    'dehydrated-vegetables'
  ],
  powders: ['spray-dried-products'],
  spices: ['spices-powders', 'chilli-flakes', 'seasonings', 'taste-enhancers'],
  herbs: ['herbs'],
  nutraceutical: ['herbal-powders'],
  wellness: ['dairy-powders', 'sweeteners-oils', 'edible-seeds-sesame', 'millets-specialty']
};

export type CatalogueProduct = {n: number; name: string; slug: string};
export type CatalogueCategory = {
  title: string;
  slug: string;
  order: number;
  group: GroupKey;
  description?: string;
  products: CatalogueProduct[];
};

// ── JSON fallback (synchronous) ─────────────────────────────────────────
const slugToGroup = new Map<string, GroupKey>();
for (const key of GROUP_KEYS) {
  for (const catSlug of GROUP_CATEGORIES[key]) slugToGroup.set(catSlug, key);
}

const jsonCategories: CatalogueCategory[] = (
  catalogueData.categories as Omit<CatalogueCategory, 'group'>[]
)
  .map((c) => ({...c, group: slugToGroup.get(c.slug) ?? 'wellness'}))
  .sort((a, b) => a.order - b.order);

// ── Sanity fetcher (async) ──────────────────────────────────────────────
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const useSanity = !!projectId;

let sanityCategories: CatalogueCategory[] | null = null;
let sanityFetchPromise: Promise<CatalogueCategory[]> | null = null;

async function fetchSanityCategories(): Promise<CatalogueCategory[]> {
  if (sanityCategories) return sanityCategories;

  if (!sanityFetchPromise) {
    sanityFetchPromise = (async () => {
      try {
        const {getAllCategories, getCategoryBySlug} = await import('@/sanity/lib/fetch');
        const cats = await getAllCategories();

        const mapped: CatalogueCategory[] = cats.map((c, i) => ({
          title: c.title,
          slug: c.slug,
          order: i,
          group: (c.group as GroupKey) ?? 'wellness',
          description: c.description,
          products: [] // products loaded on demand via getCategoryBySlug
        }));

        // Fetch products for each category
        const withProducts = await Promise.all(
          mapped.map(async (cat) => {
            const detail = await getCategoryBySlug(cat.slug);
            return {
              ...cat,
              products: (detail?.products ?? []).map((p, j) => ({
                n: j + 1,
                name: p.title,
                slug: p.slug
              }))
            };
          })
        );

        sanityCategories = withProducts;
        return withProducts;
      } catch (err) {
        console.error('[catalogue] Sanity fetch failed, falling back to JSON:', err);
        sanityCategories = jsonCategories;
        return jsonCategories;
      }
    })();
  }

  return sanityFetchPromise;
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
    return cats.find((c) => c.slug === slug);
  }
  return jsonCategories.find((c) => c.slug === slug);
}

export async function getProductBySlug(
  slug: string
): Promise<{product: CatalogueProduct; category: CatalogueCategory} | undefined> {
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
      return getSanitySlugs();
    } catch {
      return jsonCategories.map((c) => c.slug);
    }
  }
  return jsonCategories.map((c) => c.slug);
}

export async function getProductSlugs(): Promise<string[]> {
  if (useSanity) {
    try {
      const {getProductSlugs: getSanitySlugs} = await import('@/sanity/lib/fetch');
      return getSanitySlugs();
    } catch {
      return jsonCategories.flatMap((c) => c.products.map((p) => p.slug));
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

export const totalCategories = jsonCategories.length;
export const totalProducts = jsonCategories.reduce((n, c) => n + c.products.length, 0);
