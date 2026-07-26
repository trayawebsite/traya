import {defineField, defineType} from 'sanity';

// Singleton   global company info editable by the client.
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
      name: 'catalogueFile',
      title: 'Consolidated catalogue (PDF)',
      type: 'file',
      options: {accept: '.pdf'},
      description: 'Buyers can download this from the site (Q19)'
    }),
    defineField({
      name: 'emails',
      title: 'Contact email',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Public contact email shown on the site (the first address is used). Lead delivery is configured in env, not here.'
    }),
    defineField({name: 'phone', type: 'string'}),
    defineField({name: 'address', type: 'text', rows: 3}),
    defineField({name: 'gstin', title: 'GSTIN', type: 'string', description: 'Shown in the footer legal bar'}),
    defineField({name: 'iec', title: 'IEC (Import Export Code)', type: 'string', description: 'Shown in the footer legal bar'}),
    defineField({
      name: 'founderPhoto',
      title: 'Founder photo',
      type: 'image',
      options: {hotspot: true},
      description: 'Used in the inquiry section + About page founder block'
    }),
    defineField({
      name: 'social',
      type: 'object',
      options: {collapsible: true},
      fields: [
        defineField({name: 'linkedin', type: 'url'}),
        defineField({name: 'instagram', type: 'url'})
      ]
    })
  ],
  preview: {select: {title: 'companyName'}}
});
