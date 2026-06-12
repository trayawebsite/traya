import {defineField, defineType} from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
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
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (r) => r.required()
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 2,
      description: 'One-line summary shown on cards and in search results'
    }),
    defineField({name: 'description', type: 'array', of: [{type: 'block'}]}),
    defineField({
      name: 'images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}]
    }),
    defineField({
      name: 'forms',
      title: 'Forms / Variants',
      type: 'array',
      of: [{type: 'productForm'}],
      description:
        'Different cuts/forms of this product (e.g. Kibbled, Powder). Leave empty for single-form products.'
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [{type: 'specRow'}],
      description: 'Moisture, mesh size, packaging, shelf life, etc.'
    }),
    defineField({name: 'hsCode', title: 'HS Code', type: 'string'}),
    defineField({name: 'origin', type: 'string', initialValue: 'India'}),
    defineField({
      name: 'brochure',
      title: 'Brochure / Spec sheet (PDF)',
      type: 'file',
      options: {accept: '.pdf'}
    }),
    defineField({
      name: 'featured',
      title: 'Featured on homepage',
      type: 'boolean',
      initialValue: false
    }),
    defineField({name: 'seo', type: 'seo'})
  ],
  preview: {
    select: {title: 'title', subtitle: 'category.title', media: 'images.0'}
  }
});
