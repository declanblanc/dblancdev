# Copilot Instructions

# Keep a record of all changes you make in markdown files in /llm-changes/*
# Keep the Monokai Color Scheme, but feel free to improve it.

## Local development

The site must be served (not opened via `file://`) because content pages use `fetch()` to load markdown files.

```sh
python3 -m http.server 8080   # then open http://localhost:8080
# or
npx serve .
```

## Architecture

Static personal website (dblanc.dev) — no build system, bundler, or package manager. Plain HTML, CSS, and vanilla JS.

**Content pages** (`blocking.html`, `creators.html`, etc.) follow a pattern:
1. An HTML file loads `css/style.css` + `css/markdown.css`, injects the nav via `js/nav.js`, and renders `<article id="markdown-content">`
2. A matching Markdown file in `md/` (e.g. `md/blocking.md`)
3. The HTML fetches the `.md` at runtime and renders it with the `marked` CDN (`https://cdn.jsdelivr.net/npm/marked/marked.min.js`)

`index.html` is the homepage — it does **not** use the markdown pattern.

## Adding a new page

1. Create `md/<slug>.md` with content.
2. Copy `blocking.html` as a template — update `<title>` and the `fetch("md/<slug>.md")` call.
3. Add an `<li>` entry to `posts.html` — this is the only place the post list lives.
4. To promote a page to the nav, add an entry to `NAV_LINKS` in `js/nav.js`.

## CSS conventions

- **`css/style.css`** — global styles and all shared components. Defines the Monokai-inspired design tokens as CSS custom properties on `:root`: `--bg`, `--surface`, `--border`, `--text`, `--muted`, `--green`, `--blue`, `--yellow`, `--orange`, `--pink`, `--purple`. Always use these vars; never hardcode colors.
- **`css/markdown.css`** — prose styles scoped to `#markdown-content`. Used only on markdown content pages.
- **`css/reset.css`** — Meyer reset; not linked anywhere. Do not modify or link it; a minimal reset is already included at the top of `style.css`.
- Font: **IBM Plex Mono** (Google Fonts). Only weights 400, 600, 700 + italic 400 are loaded.

## Homepage placeholder sections

`index.html` contains `<p class="placeholder">` elements in the **about** and **projects** sections. Replace these with real content when ready. The `.placeholder` class is defined in `style.css`.

## Key CSS classes

| Class | Purpose |
|---|---|
| `.container` | Centered max-width wrapper (720px) used in every page's `<main>` |
| `.section-label` | Small-caps green heading with trailing rule; use for every `<h2>` |
| `.card-grid` / `.card` | 2-col responsive project card grid |
| `.notes-list` | Bordered list for page links with right-aligned `.meta` dates |
| `.links-list` | Simple vertical link list for social/external links |
| `.placeholder` | Dashed placeholder box; remove when replacing with real content |
