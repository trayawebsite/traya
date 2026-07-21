// Categories that have a dedicated cover image at /public/categories/<slug>.webp.
// These are the dark-background "poster" images (chemicals so far). Extend this
// set as more per-category art is produced (food set next).
export const CATEGORY_COVERS = new Set<string>([
  // chemicals (dark posters)
  "reactive-dyes",
  "direct-dyes",
  "acid-dyes",
  "food-colours",
  "pigments",
  "paint-resins",
  // food (travertine tiles) — added per batch as art lands
  "dehydrated-garlic",
  "fried-onion",
  "cloves",
  "cassia",
  "dehydrated-onion",
  "dehydrated-vegetables",
  "black-pepper",
  // food batch 2 (spices)
  "cinnamon",
  "nutmeg",
  "mace",
  "green-cardamom",
  "star-anise",
  "dry-ginger",
  "seeds",
  "spice-powders",
  // food batch 3
  "red-chilli-flakes",
  "spice-leaves-herbs",
  "herbal-powders",
  "psyllium-husk",
  "dehydrated-fruit-powders",
  "spray-dried-fruit-powders",
  "spray-dried-vegetables",
]);

// Returns the dark "poster" cover for a category slug (hub tiles), or null.
export function categoryCover(slug: string): string | null {
  return CATEGORY_COVERS.has(slug) ? `/categories/${slug}.webp` : null;
}

// Categories that also have a transparent cut-out at /categories/<slug>-cut.webp
// (floated on the ivory category-page hero, like the food images).
export const CATEGORY_CUTOUTS = new Set<string>([
  // chemicals
  "reactive-dyes",
  "direct-dyes",
  "acid-dyes",
  "food-colours",
  "pigments",
  "paint-resins",
  // food
  "dehydrated-garlic",
  "fried-onion",
  "cloves",
  "cassia",
  "dehydrated-onion",
  "dehydrated-vegetables",
  "black-pepper",
  // food batch 2 (spices)
  "cinnamon",
  "nutmeg",
  "mace",
  "green-cardamom",
  "star-anise",
  "dry-ginger",
  "seeds",
  "spice-powders",
  // food batch 3
  "red-chilli-flakes",
  "spice-leaves-herbs",
  "herbal-powders",
  "psyllium-husk",
  "dehydrated-fruit-powders",
  "spray-dried-fruit-powders",
  "spray-dried-vegetables",
]);

// Returns the transparent cut-out for a category slug, or null if it has none.
export function categoryCutout(slug: string): string | null {
  return CATEGORY_CUTOUTS.has(slug) ? `/categories/${slug}-cut.webp` : null;
}
