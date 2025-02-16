export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  liveEdit: false,
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip'],
      },
    },
    {
      name: 'metaImage',
      title: 'Image with metadata',
      type: 'image',
      options: {
        metadata: ['blurhash', 'lqip'],
      },
    },
    {name: 'name', title: 'Name', type: 'string'},
    {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'name', maxLength: 90}},
    {name: 'price', title: 'Price', type: 'number'},
    {name: 'priceRange', title: 'Price Range', type: 'string'},
    {name: 'type', title: 'Type', type: 'string'},
    {name: 'details', title: 'Details', type: 'string'},
    {
      name: 'description',
      type: 'array',
      title: 'Description',
      of: [
        {
          type: 'block',
        },
      ],
    },
    {name: 'stars', title: 'Stars (1-5)', type: 'number'},
    {name: 'reviews', title: 'Reviews', type: 'number'},
    {
      title: 'Dimensions',
      name: 'dimensions',
      type: 'object',
      fields: [
        {name: 'first', type: 'boolean', title: '22x17 cm', initialValue: false},
        {name: 'second', type: 'boolean', title: '27x22 cm', initialValue: false},
        {name: 'third', type: 'boolean', title: '30x30 cm', initialValue: false},
        {name: 'forth', type: 'boolean', title: '40x30 cm', initialValue: false},
        {name: 'fifth', type: 'boolean', title: '40x40 cm', initialValue: false},
      ],
    },
  ],
}
