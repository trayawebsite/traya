import {defineField, defineType} from 'sanity';

// A credibility stat, e.g. "25+ / Countries served".
export const stat = defineType({
  name: 'stat',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      type: 'string',
      description: 'e.g. 25+',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'label',
      type: 'string',
      description: 'e.g. Countries served',
      validation: (r) => r.required()
    })
  ],
  preview: {select: {title: 'value', subtitle: 'label'}}
});
