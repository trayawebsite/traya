import {defineField, defineType} from 'sanity';

// A single label/value row, reused for product & form specifications.
export const specRow = defineType({
  name: 'specRow',
  title: 'Specification',
  type: 'object',
  fields: [
    defineField({name: 'label', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'value', type: 'string', validation: (r) => r.required()})
  ],
  preview: {select: {title: 'label', subtitle: 'value'}}
});
