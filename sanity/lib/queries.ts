import {groq} from 'next-sanity';

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    image,
    "productCount": count(*[_type == "product" && references(^._id)])
  }
`;

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
    ...,
    "category": category->{title, "slug": slug.current}
  }
`;

export const productSlugsQuery = groq`
  *[_type == "product" && defined(slug.current)][].slug.current
`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;

export const certificationsQuery = groq`
  *[_type == "certification"] | order(order asc)
`;
