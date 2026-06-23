import {client} from './client';
import * as q from './queries';
import type {
  AboutPage,
  CategoryListItem,
  CategoryWithProducts,
  Certification,
  Product,
  ProductListItem,
  SiteSettings,
  Testimonial
} from './types';

// Typed data-access layer. Every read is cached by the Next data cache and
// tagged by document type, so the /api/revalidate webhook can bust exactly the
// right content on publish (instant updates) while everything else stays cached.
// Time-based `revalidate` is a safety net if the webhook isn't configured.

const REVALIDATE = 3600; // 1h fallback

function opts(tags: string[]) {
  return {next: {tags, revalidate: REVALIDATE}} as const;
}

export const SANITY_TAGS = {
  category: 'category',
  product: 'product',
  certification: 'certification',
  siteSettings: 'siteSettings',
  aboutPage: 'aboutPage',
  testimonial: 'testimonial'
} as const;

// ── Categories ──────────────────────────────────────────────────────────
export function getAllCategories() {
  return client.fetch<CategoryListItem[]>(q.allCategoriesQuery, {}, opts(['category', 'product']));
}

export function getCategorySlugs() {
  return client.fetch<string[]>(q.categorySlugsQuery, {}, opts(['category']));
}

export function getCategoryBySlug(slug: string) {
  // tagged with both because it embeds its products
  return client.fetch<CategoryWithProducts | null>(
    q.categoryBySlugQuery,
    {slug},
    opts(['category', 'product'])
  );
}

// ── Products ────────────────────────────────────────────────────────────
export function getAllProducts() {
  return client.fetch<ProductListItem[]>(q.allProductsQuery, {}, opts(['product']));
}

export function getProductsByCategory(category: string) {
  return client.fetch<ProductListItem[]>(q.productsByCategoryQuery, {category}, opts(['product']));
}

export function getFeaturedProducts() {
  return client.fetch<ProductListItem[]>(q.featuredProductsQuery, {}, opts(['product']));
}

export function getProductBySlug(slug: string) {
  return client.fetch<Product | null>(q.productBySlugQuery, {slug}, opts(['product']));
}

export function getProductSlugs() {
  return client.fetch<string[]>(q.productSlugsQuery, {}, opts(['product']));
}

// ── Singletons & misc ───────────────────────────────────────────────────
export function getSiteSettings() {
  return client.fetch<SiteSettings | null>(q.siteSettingsQuery, {}, opts(['siteSettings']));
}

export function getAboutPage() {
  return client.fetch<AboutPage | null>(q.aboutPageQuery, {}, opts(['aboutPage']));
}

export function getCertifications() {
  return client.fetch<Certification[]>(q.certificationsQuery, {}, opts(['certification']));
}

export function getTestimonials() {
  return client.fetch<Testimonial[]>(q.testimonialsQuery, {}, opts(['testimonial']));
}
