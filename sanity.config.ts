'use client';

import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {visionTool} from '@sanity/vision';
import {schemaTypes} from './sanity/schemas';
import {apiVersion, dataset, projectId} from './sanity/env';

// siteSettings + aboutPage are singletons — one fixed document each.
const SINGLETONS = new Set(['siteSettings', 'aboutPage', 'homePage']);

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Keep singletons out of the global "create new" menu.
    templates: (prev) => prev.filter((t) => !SINGLETONS.has(t.schemaType))
  },
  document: {
    // Drop duplicate/unpublish actions on singleton docs.
    actions: (actions, {schemaType}) =>
      SINGLETONS.has(schemaType)
        ? actions.filter(({action}) => action !== 'duplicate' && action !== 'unpublish')
        : actions
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Home Page')
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('About Page')
              .id('aboutPage')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.divider(),
            S.documentTypeListItem('category').title('Categories'),
            S.documentTypeListItem('product').title('Products'),
            S.documentTypeListItem('certification').title('Certifications'),
            S.documentTypeListItem('testimonial').title('Testimonials')
          ])
    }),
    visionTool({defaultApiVersion: apiVersion})
  ]
});
