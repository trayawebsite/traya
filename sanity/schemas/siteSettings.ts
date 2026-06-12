import {defineField, defineType} from 'sanity';

// Singleton — global company info editable by the client.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      type: 'string',
      initialValue: 'Traya International Exim LLP'
    }),
    defineField({
      name: 'tagline',
      type: 'string',
      description: 'Primary tagline — e.g. "Building Partnerships Across Continents"'
    }),
    defineField({
      name: 'secondaryTagline',
      type: 'string',
      description: 'Secondary tagline — e.g. "A Refined Approach to Global Trade"'
    }),
    defineField({name: 'about', title: 'About', type: 'array', of: [{type: 'block'}]}),
    defineField({
      name: 'catalogueFile',
      title: 'Consolidated catalogue (PDF)',
      type: 'file',
      options: {accept: '.pdf'},
      description: 'Buyers can download this from the site (Q19)'
    }),
    defineField({
      name: 'emails',
      title: 'Contact emails',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Lead inquiries can be routed to all of these addresses'
    }),
    defineField({name: 'phone', type: 'string'}),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp number',
      type: 'string',
      description: 'International format, digits only (e.g. 919876543210)'
    }),
    defineField({name: 'address', type: 'text', rows: 3}),
    defineField({
      name: 'social',
      type: 'object',
      options: {collapsible: true},
      fields: [
        defineField({name: 'linkedin', type: 'url'}),
        defineField({name: 'instagram', type: 'url'}),
        defineField({name: 'facebook', type: 'url'})
      ]
    })
  ],
  preview: {select: {title: 'companyName'}}
});
