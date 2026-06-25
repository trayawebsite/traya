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
    defineField({
      name: 'group',
      title: 'Browse group',
      type: 'string',
      description: 'Which of the 6 catalogue groups this category appears under on /products',
      options: {
        list: [
          {title: 'Dehydrated Alliums & Vegetables', value: 'alliums'},
          {title: 'Spray-Dried Powders', value: 'powders'},
          {title: 'Spices & Seasonings', value: 'spices'},
          {title: 'Culinary Herbs', value: 'herbs'},
          {title: 'Herbal & Nutraceutical', value: 'nutraceutical'},
          {title: 'Dairy & Premium Wellness', value: 'wellness'}
        ]
      }
    }),
    defineField({name: 'description', type: 'text', rows: 3}),
    defineField({name: 'image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'seo', type: 'seo'}),
    // Rich template fields (Kanegrade pattern)
    defineField({
      name: 'overview',
      title: 'Category overview',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Detailed overview of this category for the rich template page'
    }),
    defineField({
      name: 'moqPackaging',
      title: 'MOQ & Packaging details',
      type: 'array',
      of: [{type: 'specRow'}],
      description: 'MOQ, packaging formats, Incoterms, etc.'
    }),
    defineField({
      name: 'applications',
      title: 'Applications',
      type: 'array',
      of: [{type: 'featureItem'}],
      description: 'Common applications for products in this category (e.g., Bakery, Beverages, Snacks)'
    }),
    defineField({
      name: 'qualityCompliance',
      title: 'Quality & compliance notes',
      type: 'text',
      rows: 4,
      description: 'Quality standards, certifications, and compliance information for this category'
    }),
    defineField({
      name: 'specSheet',
      title: 'Category spec sheet (PDF)',
      type: 'file',
      options: {accept: '.pdf'},
      description: 'Downloadable spec sheet for the entire category'
    })
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
