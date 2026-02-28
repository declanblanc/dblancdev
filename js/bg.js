// ─── Dot Matrix Background Animation ─────────────────────────────────────────
// A grid of tiny dots whose brightness follows overlapping sine waves.
// Three waves traveling in different directions interfere to create
// slowly shifting moiré-like patterns in the site's Monokai palette.

(function () {

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 900) return;

  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // ── Constants ─────────────────────────────────────────────────────────────
  const SPACING = 28;    // CSS px between dot centers
  const RADIUS  = 1.4;   // CSS px dot radius
  const MAX_OPQ = 0.50;  // peak opacity a dot can reach

  // Color assigned per-dot based on position hash
  // Mostly green, some blue, sparse purple — mirrors the site's accent hierarchy
  const PALETTE = [
    [166, 226,  46],  // --green  (majority)
    [166, 226,  46],  // --green  (weight it heavier)
    [102, 217, 239],  // --blue
    [166, 226,  46],  // --green
    [174, 129, 255],  // --purple (rare)
    [102, 217, 239],  // --blue
  ];

  // ── Canvas / DPR ──────────────────────────────────────────────────────────
  let dpr = 1, W = 0, H = 0, cols = 0, rows = 0;
  // Pre-computed per-dot color index (avoids recalculating each frame)
  let dotColors = [];

  function resize() {
    dpr  = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    W = Math.round(rect.width  * dpr);
    H = Math.round(rect.height * dpr);
    canvas.width  = W;
    canvas.height = H;
    ctx.scale(dpr, dpr);

    cols = Math.ceil((W / dpr) / SPACING) + 1;
    rows = Math.ceil((H / dpr) / SPACING) + 1;

    // Assign a stable color to each grid position
    dotColors = new Uint8Array(cols * rows);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Deterministic hash so colors don't reshuffle on resize
        dotColors[r * cols + c] = (c * 3 + r * 7 + c * r) % PALETTE.length;
      }
    }
  }

  // ── Animation loop ────────────────────────────────────────────────────────
  let startTime = null;
  let rafId = null, running = false;

  function loop(ts) {
    if (!running) return;
    if (!startTime) startTime = ts;
    const t = (ts - startTime) * 0.001; // seconds elapsed

    const cssW = W / dpr;
    const cssH = H / dpr;
    ctx.clearRect(0, 0, cssW, cssH);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Three sine waves traveling in different directions at different speeds.
        // Frequencies tuned so patterns are large enough to read as shapes but
        // small enough to feel like texture rather than repetition.
        const w1 = Math.sin(c * 0.20 + r * 0.11 + t * 0.55);
        const w2 = Math.cos(c * 0.11 - r * 0.17 + t * 0.35);
        const w3 = Math.sin((c - r) * 0.13  + t * 0.22);

        // Average of three waves: -1 → 1, shifted to 0 → 1, then scaled
        const brightness = ((w1 + w2 + w3) / 3 + 1) / 2;
        const opacity    = brightness * MAX_OPQ;

        // Skip near-invisible dots for performance
        if (opacity < 0.02) continue;

        const [rr, gg, bb] = PALETTE[dotColors[r * cols + c]];
        const x = c * SPACING;
        const y = r * SPACING;

        ctx.beginPath();
        ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rr},${gg},${bb},${opacity.toFixed(3)})`;
        ctx.fill();
      }
    }

    rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (running) return;
    running = true;
    rafId = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }

  // ── Visibility + resize ───────────────────────────────────────────────────
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stop() : start();
  });

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth < 900) { stop(); return; }
      stop(); resize(); start();
    }, 150);
  });

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  resize();
  start();
  setTimeout(() => canvas.classList.add('is-ready'), 120);

})();
