'use client';

import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {visionTool} from '@sanity/vision';
import {schemaTypes} from './sanity/schemas';
import {apiVersion, dataset, projectId} from './sanity/env';

// siteSettings is the live singleton. homePage/aboutPage remain registered
// (kept in SINGLETONS so they can't be duplicated) but are NOT shown in the desk
// below   page copy is managed via i18n (messages/*.json), so surfacing those
// editors would let a client edit content that the site doesn't render.
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
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
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
