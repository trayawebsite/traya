import type {SchemaTypeDefinition} from 'sanity';

import {specRow} from './specRow';
import {seo} from './seo';
import {productForm} from './productForm';
import {featureItem} from './featureItem';
import {stat} from './stat';
import {category} from './category';
import {product} from './product';
import {certification} from './certification';
import {siteSettings} from './siteSettings';
import {aboutPage} from './aboutPage';

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
  siteSettings,
  aboutPage
];
