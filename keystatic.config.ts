import { config, collection, fields } from '@keystatic/core'
<<<<<<< Updated upstream
=======
import { mark } from '@keystatic/core/content-components'
import { createElement } from 'react'
>>>>>>> Stashed changes

export default config({
  storage: {
          kind: 'github',
          repo: 'declanblanc/dblancdev',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'content/posts/*/',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({
          label: 'Date',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Description',
          description: 'Short summary for metadata/SEO (optional)',
        }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/posts/{slug}',
              publicPath: '/images/posts/{slug}/',
            },
          },
<<<<<<< Updated upstream
=======
          components: {
            sup: mark({
              label: 'Superscript',
              icon: createElement('sup', null, 'sup'),
              schema: {},
              tag: 'sup',
            }),
          },
>>>>>>> Stashed changes
        }),
      },
    }),
  },
})
