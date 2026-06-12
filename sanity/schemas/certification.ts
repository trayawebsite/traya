import {defineField, defineType} from 'sanity';

export const certification = defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'image',
      title: 'Logo / Certificate image',
      type: 'image',
      options: {hotspot: true},
      validation: (r) => r.required()
    }),
    defineField({name: 'issuedBy', title: 'Issued by', type: 'string'}),
    defineField({name: 'description', type: 'text', rows: 2}),
    defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 99})
  ],
  orderings: [
    {title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}
  ],
  preview: {select: {title: 'title', subtitle: 'issuedBy', media: 'image'}}
});
