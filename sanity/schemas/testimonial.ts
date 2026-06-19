import {defineField, defineType} from 'sanity';

// Buyer testimonial — client-editable. The home Testimonials section renders
// these when present (and hides when there are none). Use real, verified quotes
// only (honesty rule). Anonymised role + region is fine where a name can't be used.
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      rows: 4,
      validation: (r) => r.required()
    }),
    defineField({
      name: 'name',
      type: 'string',
      description: 'Attribution — a name, or an anonymised role (e.g. "Head of Procurement")',
      validation: (r) => r.required()
    }),
    defineField({name: 'role', type: 'string', description: 'e.g. "Spice Importer"'}),
    defineField({name: 'location', type: 'string', description: 'e.g. "Hamburg, Germany"'}),
    defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 99})
  ],
  orderings: [
    {title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}
  ],
  preview: {select: {title: 'name', subtitle: 'role'}}
});
