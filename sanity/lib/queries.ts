import {groq} from 'next-sanity';

// ── Categories ──────────────────────────────────────────────────────────
export const allCategoriesQuery = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    group,
    description,
    image,
    "productCount": count(*[_type == "product" && references(^._id)])
  }
`;

export const categorySlugsQuery = groq`
  *[_type == "category" && defined(slug.current)][].slug.current
`;

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    group,
    description,
    image,
    seo,
    overview,
    moqPackaging,
    applications,
    qualityCompliance,
    specSheet,
    "productCount": count(*[_type == "product" && references(^._id)]),
    "products": *[_type == "product" && references(^._id)] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      images,
      forms,
      series,
      colourIndex,
      packSizes
    }
  }
`;

// ── Products ────────────────────────────────────────────────────────────
export const allProductsQuery = groq`
  *[_type == "product"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    images,
    forms,
    "category": category->{title, "slug": slug.current}
  }
`;

export const productsByCategoryQuery = groq`
  *[_type == "product" && category->slug.current == $category] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    images,
    forms
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    description,
    images,
    forms,
    specifications,
    hsCode,
    origin,
    series,
    colourIndex,
    packSizes,
    brochure,
    featured,
    seo,
    "category": category->{title, "slug": slug.current}
  }
`;

export const productSlugsQuery = groq`
  *[_type == "product" && defined(slug.current)][].slug.current
`;

// ── Singletons & misc ───────────────────────────────────────────────────
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;

export const homePageQuery = groq`*[_type == "homePage"][0] {
  hero,
  intro,
  stats,
  productsSection,
  why,
  testimonialsSection,
  certsSection,
  faq,
  finalCta,
  seo
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]`;

export const certificationsQuery = groq`
  *[_type == "certification"] | order(order asc) {
    _id,
    title,
    image,
    issuedBy,
    description,
    order
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    quote,
    name,
    role,
    location,
    order
  }
`;
