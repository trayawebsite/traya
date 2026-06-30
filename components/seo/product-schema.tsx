import type {CatalogueProduct, CatalogueCategory} from '@/lib/catalogue';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.trayaexim.com';

// Product structured data — helps search engines and AI understand product details
export function ProductSchema({
  product,
  category
}: {
  product: CatalogueProduct;
  category: CatalogueCategory;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    url: `${siteUrl}/products/${product.slug}`,
    description: product.shortDescription || `${product.name} from India. Available for B2B wholesale export.`,
    category: category.title,
    brand: {
      '@type': 'Brand',
      name: 'Traya International Exim LLP'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Traya International Exim LLP',
      url: siteUrl
    },
    countryOfOrigin: {
      '@type': 'Country',
      name: 'India'
    },
    // No `offers` block: this is a quote-only (RFQ) B2B export catalogue with no
    // listed price. A literal price:"0" reads as "Free" and is rejected by
    // Google's Product rich-result validation — so we omit Offer entirely.
    additionalProperty: [
      ...(product.hsCode
        ? [{
            '@type': 'PropertyValue',
            name: 'HS Code',
            value: product.hsCode
          }]
        : []),
      ...(product.origin
        ? [{
            '@type': 'PropertyValue',
            name: 'Origin',
            value: product.origin
          }]
        : []),
      ...(product.specifications?.map((spec) => ({
        '@type': 'PropertyValue',
        name: spec.label,
        value: spec.value
      })) ?? [])
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
    />
  );
}

// BreadcrumbList structured data
export function BreadcrumbSchema({
  items
}: {
  items: {name: string; url: string}[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
    />
  );
}
