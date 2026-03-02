# Fix: Keystatic Image Storage (2026-03-02)

## Problem
Images uploaded via Keystatic were stored in `content/posts/<slug>/content/` — a directory that Next.js does **not** serve as static assets. The mdoc referenced them with a relative path (`image.png`), which the browser could never resolve.

## Root Cause
`keystatic.config.ts` had no `options.image` configuration on the `markdoc` field, so Keystatic defaulted to saving images next to the content file in `content/`. Next.js only serves files from `public/`.

## Fix
- Updated `keystatic.config.ts` to set `directory: 'public/images/posts'` and `publicPath: '/images/posts/'` on the markdoc image options.
- Moved `content/posts/cs485-a3-essay/content/image.png` → `public/images/posts/image.png`.
- Updated the reference in `content/posts/cs485-a3-essay/index.mdoc` from `![](image.png)` to `![](/images/posts/image.png)`.

## Branch
`fix/keystatic-image-storage`
