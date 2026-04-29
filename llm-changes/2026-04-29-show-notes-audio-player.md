# Add audio player to show notes (2026-04-29)

## Goal
Add a polished audio player to `show-notes.html` so visitors can play, pause, change volume, and scrub through the episode audio.

## Implementation
- Updated `show-notes.html` with a styled "Listen" panel and native `<audio controls>` player.
- Added `src/app/reclaim-your-time.mp3/route.ts` to serve the root-level `reclaim-your-time.mp3` file.
- Implemented HTTP range request handling in the audio route so seeking/scrubbing works reliably in browser players.

## Why this approach
- Keeps your MP3 in the root location you specified.
- Avoids requiring a move to `public/` while still making the audio URL web-accessible at `/reclaim-your-time.mp3`.
- Preserves native browser media controls for accessibility and mobile compatibility.
