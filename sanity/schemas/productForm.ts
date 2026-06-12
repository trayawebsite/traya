import {defineField, defineType} from 'sanity';

// A form/variant of a product (e.g. Kibbled, Chopped, Powder, Flakes).
export const productForm = defineType({
  name: 'productForm',
  title: 'Form',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Form name',
      type: 'string',
      description: 'e.g. Kibbled, Chopped, Minced, Granules, Powder, Flakes',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'specs',
      title: 'Specs (optional)',
      type: 'array',
      of: [{type: 'specRow'}]
    })
  ],
  preview: {select: {title: 'name'}}
});
