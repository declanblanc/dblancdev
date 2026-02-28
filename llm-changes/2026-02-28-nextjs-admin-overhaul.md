# Next.js Migration + Keystatic Admin Portal

**Date**: 2026-02-28
**Branch**: epic/complete-overhaul

## Summary

Complete overhaul of the site from plain HTML/CSS/JS to Next.js 15 (App Router) + TypeScript. Added Keystatic CMS as a web-based admin portal for managing posts without touching the terminal.

## Why

The existing workflow for publishing posts required running a bash script (`new-post.sh`) and editing markdown files manually. The goal was to enable post management entirely from a browser. Since server-side capabilities are required for auth and content management, the site was migrated to Next.js. Keystatic CMS was chosen because:
- Git-based (no external database — posts stay as markdown in the repo)
- GitHub OAuth auth out of the box (only the repo owner can log in)
- Vercel auto-deploys when Keystatic commits a new post
- First-class Next.js App Router integration

## Changes

### New Files

**Project Setup**
- `package.json` — npm project with next, react, @keystatic/core, @keystatic/next
- `tsconfig.json` — TypeScript config (bundler moduleResolution, strict mode)
- `next.config.ts` — Next.js config with URL redirects for old .html routes
- `keystatic.config.ts` — Posts collection schema (title, date, description, content)
- `eslint.config.mjs` — ESLint with next/core-web-vitals rules

**Styles**
- `src/styles/globals.css` — Verbatim port of `css/style.css` with `--font-ibm-plex-mono` CSS var + bg-canvas styles
- `src/styles/markdown.css` — Port of `css/markdown.css` with `#markdown-content` → `.prose` selector

**React Components**
- `src/components/BgCanvas.tsx` — Port of `js/bg.js` canvas animation into a `useEffect` client component
- `src/components/AiBadge.tsx` — Port of `js/ai-disclaimer.js` toggle into React state
- `src/components/PostList.tsx` — Renders `.notes-list` from post metadata array
- `src/components/Breadcrumb.tsx` — Post breadcrumb with inline AiBadge
- `src/components/Layout/SiteHeader.tsx` — Sticky nav (server component)
- `src/components/Layout/NavLinks.tsx` — Active link detection via `usePathname()` (client component)
- `src/components/Layout/SiteFooter.tsx` — Footer with GitHub/LinkedIn links

**App Router Pages**
- `src/app/layout.tsx` — Root layout: IBM_Plex_Mono via `next/font/google`
- `src/app/(site)/layout.tsx` — Site chrome layout (BgCanvas, nav, footer) — route group isolates from Keystatic admin
- `src/app/(site)/page.tsx` — Home page (hero, about sections)
- `src/app/(site)/posts/page.tsx` — Posts list, reads from Keystatic reader, sorted by date desc
- `src/app/(site)/posts/[slug]/page.tsx` — Post page with SSG via `generateStaticParams`, Markdoc rendering
- `src/app/keystatic/keystatic.ts` — Keystatic admin client entrypoint
- `src/app/keystatic/layout.tsx` — Bare layout (no site chrome in admin)
- `src/app/keystatic/[[...params]]/page.tsx` — Catch-all admin route
- `src/app/api/keystatic/[...params]/route.ts` — Keystatic API handler (local reads, GitHub writes)

**Content**
- `content/posts/blocking/index.mdoc` — Migrated from `md/blocking.md`
- `content/posts/creators/index.mdoc` — Migrated from `md/creators.md`
- `content/posts/cs485-a1-essay/index.mdoc` — Migrated from `md/cs485-a1-essay.md`
- `content/posts/cs485-a3-essay/index.mdoc` — Migrated from `md/cs485-a3-essay.md`

### Modified Files
- `.gitignore` — Added `node_modules/`, `.next/`, `.env*`

### Deleted (pending cleanup after verification)
- `index.html`, `posts.html`, `blocking.html`, `creators.html`, `cs485-a1-essay.html`, `cs485-a3-essay.html`, `sample.html`
- `new-post.sh`
- `css/` directory
- `js/` directory
- `md/` directory

## Technical Decisions

**Route group `(site)`**: All public pages are under `src/app/(site)/` so the layout (nav, footer, background canvas) does NOT apply to the Keystatic admin at `/keystatic`. This prevents Monokai styles from bleeding into the admin UI.

**Keystatic path trailing slash**: The collection path must be `'content/posts/*/'` (with trailing slash) to set `dataLocation: 'index'`, which makes Keystatic look for `content/posts/<slug>/index.mdoc`. Without the trailing slash, Keystatic looks for `content/posts/<slug>.mdoc` (flat files).

**`@markdoc/markdoc` rendering**: `fields.markdoc()` returns `{ node: Markdoc.Node }` from the reader. Rendered using `Markdoc.transform(node)` + `Markdoc.renderers.react(transformed, React)` — no `dangerouslySetInnerHTML` needed. The `@markdoc/markdoc` package is a transitive dependency of `@keystatic/core`.

**No `withKeystatic()` wrapper**: `@keystatic/next` v5.x removed the `withKeystatic` config wrapper. Plain `NextConfig` is used in `next.config.ts`.

## Admin Setup (Production)

To enable the admin in production, create a GitHub App and set these Vercel env vars:
- `KEYSTATIC_GITHUB_CLIENT_ID`
- `KEYSTATIC_GITHUB_CLIENT_SECRET`
- `KEYSTATIC_SECRET` (run: `openssl rand -hex 32`)
- `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
- `KEYSTATIC_STORAGE=github`

See the plan at `/Users/dblanc/.claude/plans/tidy-leaping-engelbart.md` for full GitHub App creation steps.

## Verification

Production build passes: `npm run build`
- All 4 post slugs statically generated
- `/`, `/posts`, `/posts/[slug]`, `/keystatic` all return 200
- Keystatic admin loads locally at `http://localhost:3000/keystatic` (no auth in local mode)
