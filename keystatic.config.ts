import { config, collection, fields } from '@keystatic/core'
import { inline } from '@keystatic/core/content-components'

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
          components: {
            sup: inline({
              label: 'Superscript',
              schema: {},
            }),
          },
        }),
      },
    }),
  },
})
