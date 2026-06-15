// TypeScript shapes for the GROQ query results in queries.ts. These mirror the
// projections (not the raw documents), so pages/components are type-safe.

export type PortableText = unknown[]; // Portable Text blocks (rendered via @portabletext later)

export type SanityImage = {
  _type?: 'image';
  asset?: {_ref: string; _type: string};
  hotspot?: {x: number; y: number; height: number; width: number};
  crop?: {top: number; bottom: number; left: number; right: number};
};

export type SanityFile = {asset?: {_ref: string; _type: string}};

export type SpecRow = {label: string; value: string};
export type ProductForm = {_key?: string; name: string; specs?: SpecRow[]};
export type FeatureItem = {_key?: string; title: string; description?: string};
export type Stat = {_key?: string; value: string; label: string};
export type Seo = {metaTitle?: string; metaDescription?: string};

export type CategoryRef = {title: string; slug: string};

export type CategoryListItem = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  image?: SanityImage;
  productCount: number;
};

export type ProductListItem = {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  images?: SanityImage[];
  forms?: ProductForm[];
  category?: CategoryRef;
};

export type Product = {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  description?: PortableText;
  images?: SanityImage[];
  forms?: ProductForm[];
  specifications?: SpecRow[];
  hsCode?: string;
  origin?: string;
  brochure?: SanityFile;
  featured?: boolean;
  category?: CategoryRef;
  seo?: Seo;
};

export type CategoryWithProducts = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  image?: SanityImage;
  seo?: Seo;
  productCount: number;
  products: ProductListItem[];
};

export type Certification = {
  _id: string;
  title: string;
  image: SanityImage;
  issuedBy?: string;
  description?: string;
  order?: number;
};

export type Social = {linkedin?: string; instagram?: string; facebook?: string};

export type SiteSettings = {
  companyName?: string;
  tagline?: string;
  secondaryTagline?: string;
  about?: PortableText;
  catalogueFile?: SanityFile;
  emails?: string[];
  phone?: string;
  whatsappNumber?: string;
  address?: string;
  social?: Social;
};

export type Founder = {name?: string; title?: string; photo?: SanityImage; letter?: string};

export type AboutPage = {
  heading?: string;
  tagline?: string;
  intro?: PortableText;
  vision?: string;
  mission?: string[];
  philosophy?: FeatureItem[];
  capabilities?: FeatureItem[];
  whyTraya?: FeatureItem[];
  commitment?: string;
  founder?: Founder;
  stats?: Stat[];
  seo?: Seo;
};
