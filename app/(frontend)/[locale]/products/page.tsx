import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {ProductsHub} from '@/components/sections/catalogue/products-hub';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Food Ingredient Catalogue | 150+ Products from India',
    description: 'Browse our catalogue of dehydrated onions, garlic, spices, spray-dried powders, herbs & nutraceuticals. 150+ products across 18 categories. B2B wholesale from India.',
    alternates: {canonical: '/products'},
    keywords: ['dehydrated products India', 'spice catalogue', 'food ingredient supplier', 'Indian food export products']
  };
}

// Products hub (/products) — the catalogue entry point. Global Enquiry + Footer
// from the layout.
export default async function ProductsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <ProductsHub />;
}
