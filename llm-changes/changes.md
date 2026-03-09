
## 2026-03-02 — Fix intrinsic image sizing in post pages

**File:** `src/app/(site)/posts/[slug]/page.tsx`

**Problem:** `NextImage` wrapped `<Image fill>` in a hardcoded `16/9` aspect ratio div. Images with different ratios were distorted or letterboxed.

**Fix:** Replaced with `width={0} height={0}` + `style={{ width: '100%', height: 'auto' }}` so each image renders at its natural aspect ratio.

**Branch:** `fix/keystatic-image-storage` — commit `1d91488`
