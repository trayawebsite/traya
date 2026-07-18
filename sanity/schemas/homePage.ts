import {defineField, defineType} from 'sanity';

// Singleton   the landing page content, fully editable by the client. Mirrors
// the sections in app/(frontend)/[locale]/page.tsx. The browsable category tiles
// + testimonials + certifications are their own documents (category/testimonial/
// certification)   this doc owns the marketing COPY + section headings + images.
const sectionHeading = (collapsed = true) => ({
  options: {collapsible: true, collapsed}
});

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      ...sectionHeading(false),
      fields: [
        defineField({name: 'eyebrow', type: 'string'}),
        defineField({name: 'heading', type: 'text', rows: 2}),
        defineField({name: 'sub', title: 'Subheading', type: 'text', rows: 2}),
        defineField({name: 'ctaPrimaryLabel', title: 'Primary button label', type: 'string'}),
        defineField({name: 'ctaSecondaryLabel', title: 'Secondary button label', type: 'string'}),
        defineField({name: 'image', type: 'image', options: {hotspot: true}})
      ]
    }),
    defineField({
      name: 'intro',
      title: 'How Traya Helps',
      type: 'object',
      ...sectionHeading(),
      description: 'Vision/mission now lives on the About page; this section is the split narrative + 3 pillars band.',
      fields: [
        defineField({name: 'eyebrow', type: 'string'}),
        defineField({name: 'heading', type: 'text', rows: 2}),
        defineField({name: 'body', type: 'text', rows: 4})
      ]
    }),
    defineField({
      name: 'stats',
      title: 'Stats band',
      type: 'array',
      of: [{type: 'stat'}],
      validation: (r) => r.max(4),
      description: 'Up to 4 headline numbers (value + label). Keep honest.'
    }),
    defineField({
      name: 'productsSection',
      title: 'Products section heading',
      type: 'object',
      ...sectionHeading(),
      description: 'The 6-group category tiles below come from Categories (with a Browse group set).',
      fields: [
        defineField({name: 'eyebrow', type: 'string'}),
        defineField({name: 'heading', type: 'text', rows: 2}),
        defineField({name: 'sub', type: 'text', rows: 2})
      ]
    }),
    defineField({
      name: 'why',
      title: 'Why Traya',
      type: 'object',
      ...sectionHeading(),
      fields: [
        defineField({name: 'eyebrow', type: 'string'}),
        defineField({name: 'heading', type: 'text', rows: 2}),
        defineField({name: 'items', title: 'Pillars', type: 'array', of: [{type: 'featureItem'}]})
      ]
    }),
    defineField({
      name: 'testimonialsSection',
      title: 'Testimonials heading',
      type: 'object',
      ...sectionHeading(),
      description: 'Quotes themselves are Testimonial documents; the section hides when there are none.',
      fields: [
        defineField({name: 'eyebrow', type: 'string'}),
        defineField({name: 'heading', type: 'text', rows: 2})
      ]
    }),
    defineField({
      name: 'certsSection',
      title: 'Certifications heading',
      type: 'object',
      ...sectionHeading(),
      fields: [
        defineField({name: 'eyebrow', type: 'string'}),
        defineField({name: 'heading', type: 'text', rows: 2}),
        defineField({name: 'sub', type: 'text', rows: 2})
      ]
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'object',
      ...sectionHeading(),
      fields: [
        defineField({name: 'eyebrow', type: 'string'}),
        defineField({name: 'heading', type: 'text', rows: 2}),
        defineField({
          name: 'items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({name: 'question', type: 'string'}),
                defineField({name: 'answer', type: 'text', rows: 3})
              ],
              preview: {select: {title: 'question'}}
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'finalCta',
      title: 'Closing CTA',
      type: 'object',
      ...sectionHeading(),
      fields: [
        defineField({name: 'heading', type: 'text', rows: 2}),
        defineField({name: 'sub', type: 'text', rows: 2}),
        defineField({name: 'ctaLabel', title: 'Button label', type: 'string'}),
        defineField({name: 'image', type: 'image', options: {hotspot: true}})
      ]
    }),
    defineField({name: 'seo', type: 'seo'})
  ],
  preview: {prepare: () => ({title: 'Home Page'})}
});
