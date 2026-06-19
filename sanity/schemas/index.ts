import type {SchemaTypeDefinition} from 'sanity';

import {specRow} from './specRow';
import {seo} from './seo';
import {productForm} from './productForm';
import {featureItem} from './featureItem';
import {stat} from './stat';
import {category} from './category';
import {product} from './product';
import {certification} from './certification';
import {testimonial} from './testimonial';
import {siteSettings} from './siteSettings';
import {aboutPage} from './aboutPage';
import {homePage} from './homePage';

export const schemaTypes: SchemaTypeDefinition[] = [
  // Reusable objects
  specRow,
  seo,
  productForm,
  featureItem,
  stat,
  // Documents
  category,
  product,
  certification,
  testimonial,
  siteSettings,
  aboutPage,
  homePage
];
