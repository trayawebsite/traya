import {defineField, defineType} from 'sanity';

// Reusable title + description block — used for Philosophy, Capabilities, Why Traya.
export const featureItem = defineType({
  name: 'featureItem',
  title: 'Item',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'description', type: 'text', rows: 2})
  ],
  preview: {select: {title: 'title', subtitle: 'description'}}
});
