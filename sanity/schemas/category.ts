import {defineField, defineType} from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required()
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 99
    }),
    defineField({name: 'description', type: 'text', rows: 3}),
    defineField({name: 'image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'seo', type: 'seo'})
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}]
    }
  ],
  preview: {select: {title: 'title', subtitle: 'slug.current', media: 'image'}}
});
