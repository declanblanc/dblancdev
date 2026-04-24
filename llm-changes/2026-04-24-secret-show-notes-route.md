# Add secret `/show-notes` route (2026-04-24)

## Goal
Expose `show-notes.html` on the site without adding any navigation link to it.

## Implementation
- Added `src/app/show-notes/route.ts` as a Next.js Route Handler.
- The handler reads `show-notes.html` from the project root and returns it as `text/html`.
- If the file is missing, the handler returns a `404` with a plain-text message.

## Why this approach
- Keeps the page unlisted in site navigation.
- Serves the original HTML file exactly as authored.
- Avoids duplicating the HTML/CSS into React components.

## Verification
- Ran `npm run lint -- --file src/app/show-notes/route.ts` with no lint errors.
