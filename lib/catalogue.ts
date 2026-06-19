// ─────────────────────────────────────────────────────────────────────────
// CATALOGUE DATA LAYER — reads content/product-catalogue.json (18 categories,
// 151 products; flat product model). Shaped to mirror the future Sanity
// fetchers, so pages swap data source with no structural change.
//
// Products carry names + slugs only for now; specs/descriptions/images come
// from Sanity/client later. Until then the catalogue is spec-forward: pricing
// and specs are shared on enquiry (RFQ).
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
  products: CatalogueProduct[];
};

const slugToGroup = new Map<string, GroupKey>();
for (const key of GROUP_KEYS) {
  for (const catSlug of GROUP_CATEGORIES[key]) slugToGroup.set(catSlug, key);
}

const categories: CatalogueCategory[] = (
  catalogueData.categories as Omit<CatalogueCategory, 'group'>[]
)
  .map((c) => ({...c, group: slugToGroup.get(c.slug) ?? 'wellness'}))
  .sort((a, b) => a.order - b.order);

export const totalCategories = categories.length;
export const totalProducts = categories.reduce((n, c) => n + c.products.length, 0);

export function getCategories(): CatalogueCategory[] {
  return categories;
}

export function getGroups(): {key: GroupKey; categories: CatalogueCategory[]}[] {
  return GROUP_KEYS.map((key) => ({
    key,
    categories: categories.filter((c) => c.group === key)
  })).filter((g) => g.categories.length > 0);
}

export function getCategoryBySlug(slug: string): CatalogueCategory | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductBySlug(
  slug: string
): {product: CatalogueProduct; category: CatalogueCategory} | undefined {
  for (const category of categories) {
    const product = category.products.find((p) => p.slug === slug);
    if (product) return {product, category};
  }
  return undefined;
}

export function getCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}

export function getProductSlugs(): string[] {
  return categories.flatMap((c) => c.products.map((p) => p.slug));
}

export function getRelatedProducts(
  category: CatalogueCategory,
  currentSlug: string,
  limit = 6
): CatalogueProduct[] {
  return category.products.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
