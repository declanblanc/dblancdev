# 2026-02-24 — Site overhaul

## Changes

### New
- `js/nav.js` — shared nav component injected into every page via JS. Edit `NAV_LINKS` to add pages.

### Modified
- `css/style.css` — complete rewrite: minimal reset, updated Monokai tokens (`--bg`, `--surface`, `--border`, `--text`, `--muted`, `--green`, `--blue`, `--yellow`, `--orange`, `--pink`, `--purple`), sticky nav, container layout, section/card/list components, placeholder styles, footer.
- `css/markdown.css` — rewrite: clean prose styles scoped to `#markdown-content`, using CSS vars from `style.css`.
- `index.html` — complete rewrite: sticky nav via `js/nav.js`, hero + about + projects + notes + elsewhere sections with placeholder content for user to fill in.
- `blocking.html` — updated to new structure: relative CSS paths, `js/nav.js` nav, `<main class="container">`, consistent footer.
- `creators.html` — same updates as `blocking.html`.
- `.github/copilot-instructions.md` — updated to reflect new architecture.

### Unchanged
- `md/blocking.md`, `md/creators.md` — content untouched.
- `css/reset.css` — untouched (not linked anywhere; reset is now inline in `style.css`).
