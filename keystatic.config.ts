import { config, collection, fields } from '@keystatic/core'

export default config({
  storage:
    process.env.KEYSTATIC_STORAGE === 'github'
      ? {
          kind: 'github',
          repo: 'declanblanc/dblancdev',
        }
      : {
          kind: 'local',
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
        }),
      },
    }),
  },
})
