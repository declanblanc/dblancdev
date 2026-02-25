# Responsive container width

**Date:** 2026-02-25

## Change

Updated `.container` in `css/style.css` to scale with display width instead of being fixed at 720px.

**Before:**
```css
.container {
  max-width: 720px;
  ...
}
```

**After:**
```css
.container {
  max-width: min(1200px, 90vw);
  width: 100%;
  ...
}
```

The container now grows up to 1200px wide, always leaving 5% margins on each side (`90vw`). On smaller screens behavior is unchanged since padding already kept things narrow.

## Fix (same day)

Also updated `.nav` from `max-width: 720px` to `max-width: min(1200px, 90vw)` to match `.container`. Without this, nav and content had different horizontal extents, making page content appear left-shifted relative to the nav bar.

## Fix 2 (same day)

Removed `max-width: 65ch` from `#markdown-content` in `css/markdown.css` and replaced with `width: 100%`. The article element was capping prose width at ~65 characters regardless of the container size, preventing markdown post content from filling the wider container.
