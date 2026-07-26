// ─────────────────────────────────────────────────────────────────────────
// SPECIALITY CHEMICALS   presentation metadata for the 6 chemical categories
// and their 18 sub-ranges.
//
// Source: the client's approved copy (TRAYA Speciality Chemicals product list
// + layout prototype). Catalogue copy on this site is English-authored (the
// same as category descriptions coming from Sanity), so it lives here as
// config rather than in the 17 i18n message files   only the surrounding UI
// labels are translated.
//
// `subcategories` is the client's approved READING ORDER for each category and
// is what drives the order of the sub-range tiles + sections on the page. A
// sub-range present on products but missing from this list still renders (it is
// appended after the known ones), so catalogue additions can never disappear.
// ─────────────────────────────────────────────────────────────────────────

export type ChemicalCategoryMeta = {
  /** One-line positioning statement shown under the category title. */
  tagline: string;
  /** Buyer industries this category serves. */
  industries: readonly string[];
  /** Approved display order of this category's sub-ranges. */
  subcategories: readonly string[];
};

export const CHEMICAL_CATEGORY_META: Record<string, ChemicalCategoryMeta> = {
  "reactive-dyes": {
    tagline: "Brilliant, wash-fast colour for cellulosic fibres",
    industries: ["Textile & Garment Manufacturing", "Dyehouses & Textile Printing", "Home Textiles & Furnishings"],
    subcategories: ["P Series", "VS Based", "ME Brand (Bi-Functional)", "Cold Brand", "High Exhaust (HE)"]
  },
  "direct-dyes": {
    tagline: "Non-benzidine direct dyes for cellulosics & paper",
    industries: ["Textile & Garment Manufacturing", "Paper & Pulp Industry", "Dyehouses & Textile Printing"],
    subcategories: ["Non-Benzidine Range"]
  },
  "acid-dyes": {
    tagline: "Wool, nylon, silk & leather dyeing solutions",
    industries: ["Woollen & Worsted Textiles", "Nylon & Polyamide Textiles", "Leather & Tannery", "Silk Processing"],
    subcategories: ["Acid & Acid Milling", "1:2 Metal Complex", "Chrome Dyes"]
  },
  "food-colours": {
    tagline: "Certified colours for food, beverage & pharma",
    industries: ["Food & Beverage Manufacturing", "Confectionery & Bakery", "Pharmaceutical & Nutraceutical", "Cosmetics & Personal Care"],
    subcategories: ["Synthetic Food Colours", "Blended Food Colours", "Lake Colours", "Natural Food Colours", "D&C Colours"]
  },
  "pigments": {
    tagline: "Organic & inorganic pigments for coatings, ink & plastics",
    industries: ["Paints & Coatings", "Printing Inks", "Plastics & Polymers", "Construction Materials"],
    subcategories: ["Organic Pigments", "Inorganic Pigments"]
  },
  "paint-resins": {
    tagline: "Alkyd & maleic resins for coatings manufacture",
    industries: ["Paint & Coatings Manufacturing", "Industrial & Decorative Coatings", "Varnish & Ink Binders"],
    subcategories: ["Alkyd Resins", "Maleic Resins"]
  }
};

/** One-line description per sub-range, shown under its heading. */
export const SUBCATEGORY_BLURB: Record<string, string> = {
  "P Series": "Bright, economical reactive range for exhaust dyeing of cotton and viscose.",
  "VS Based": "Vinyl sulphone reactive dyes offering strong reactivity and good build-up.",
  "ME Brand (Bi-Functional)": "Bi-functional reactive dyes for high fixation efficiency and reduced salt/effluent load.",
  "Cold Brand": "Cold-pad-batch and low-temperature exhaust reactive dyes.",
  "High Exhaust (HE)": "High-exhaustion reactive dyes engineered for maximum fixation and lower wastewater colour load.",
  "Non-Benzidine Range": "Restricted-amine-free direct dyes for cellulosic fibres and paper.",
  "Acid & Acid Milling": "Levelling and milling acid dyes for wool, nylon and silk.",
  "1:2 Metal Complex": "Pre-metallised acid dyes for excellent wet fastness on wool and nylon.",
  "Chrome Dyes": "Mordant/chrome dyes for deep, fast shades on wool.",
  "Synthetic Food Colours": "FD&C / E-number referenced synthetic colours for food and beverage use.",
  "Blended Food Colours": "Ready-to-use blended shades for confectionery, beverages and bakery.",
  "Lake Colours": "Insoluble lake pigments for oil-based, fat-based and dry-mix food applications.",
  "Natural Food Colours": "Naturally derived colours — caramel, annatto, curcumin, beet root, paprika, chlorophyll.",
  "D&C Colours": "FDA D&C certified colours for pharmaceutical and cosmetic applications.",
  "Organic Pigments": "High tinting-strength organic pigments for ink, paint and plastics.",
  "Inorganic Pigments": "Heat- and light-stable inorganic pigments including chromes and iron oxides.",
  "Alkyd Resins": "Oil-modified alkyd resins for decorative and industrial paint binders.",
  "Maleic Resins": "Maleic resin binders for varnish and paint formulation."
};

/** Is this one of the six speciality-chemical categories? */
export function isChemicalCategory(slug: string): boolean {
  return slug in CHEMICAL_CATEGORY_META;
}

/**
 * Order a category's sub-ranges by the client's approved sequence, appending
 * any sub-range that isn't in the approved list (so new catalogue data is never
 * silently dropped) and putting un-categorised products last.
 */
export function orderSubcategories(slug: string, found: readonly string[]): string[] {
  const approved = CHEMICAL_CATEGORY_META[slug]?.subcategories ?? [];
  const known = approved.filter((s) => found.includes(s));
  const extra = found.filter((s) => !approved.includes(s)).sort();
  return [...known, ...extra];
}
