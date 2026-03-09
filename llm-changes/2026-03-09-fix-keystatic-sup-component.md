# Fix: Keystatic missing `sup` component definition

## Problem

Opening `/keystatic/branch/main/collection/posts/item/cs485-a4-essay` threw:

```
Error: Field validation failed: content: Unexpected error: Error: 13:Missing component definition for sup 34:Missing component definition for sup
```

The `cs485-a4-essay/index.mdoc` uses `{% sup %}...{% /sup %}` Markdoc tags for footnote superscripts, but `keystatic.config.ts` had no `sup` component registered.

## Fix

Added `sup` as an `inline` component in the `fields.markdoc` `components` map:

```ts
import { inline } from '@keystatic/core/content-components'

// inside fields.markdoc(...)
components: {
  sup: inline({
    label: 'Superscript',
    schema: {},
  }),
},
```

## Files Changed

- `keystatic.config.ts`
