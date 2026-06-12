import {defineField, defineType} from 'sanity';

// Singleton — the company profile content, fully editable by the client.
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({name: 'heading', type: 'string', initialValue: 'About Us'}),
    defineField({
      name: 'tagline',
      type: 'string',
      description: 'e.g. A Refined Approach to Global Trade'
    }),
    defineField({
      name: 'intro',
      title: 'About / Who We Are',
      type: 'array',
      of: [{type: 'block'}]
    }),
    defineField({name: 'vision', type: 'text', rows: 2}),
    defineField({
      name: 'mission',
      title: 'Mission points',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'philosophy',
      title: 'Philosophy',
      type: 'array',
      of: [{type: 'featureItem'}]
    }),
    defineField({
      name: 'capabilities',
      title: 'Core Capabilities',
      type: 'array',
      of: [{type: 'featureItem'}]
    }),
    defineField({
      name: 'whyTraya',
      title: 'Why Traya (pillars)',
      type: 'array',
      of: [{type: 'featureItem'}]
    }),
    defineField({
      name: 'commitment',
      title: 'Commitment statement',
      type: 'text',
      rows: 3,
      description: 'Short closing statement used on About page and CTA sections'
    }),
    defineField({
      name: 'founder',
      title: 'Founder',
      type: 'object',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({name: 'name',  type: 'string', initialValue: 'Neha Pardeshi'}),
        defineField({name: 'title', type: 'string', initialValue: 'Founder & CEO'}),
        defineField({
          name: 'photo',
          type: 'image',
          options: {hotspot: true},
          description: 'Square crop recommended. Displayed on About page next to the letter.'
        }),
        defineField({
          name: 'letter',
          title: 'Founder letter',
          type: 'text',
          rows: 8,
          description: 'The personal note from the founder — displayed verbatim on About page'
        }),
      ]
    }),
    defineField({
      name: 'stats',
      title: 'Stats (optional)',
      type: 'array',
      of: [{type: 'stat'}]
    }),
    defineField({name: 'seo', type: 'seo'})
  ],
  preview: {select: {title: 'heading'}}
});
