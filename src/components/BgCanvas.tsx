'use client'

import { useEffect } from 'react'

export default function BgCanvas() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth < 900) return

    const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement | null
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const SPACING = 28
    const RADIUS = 1.4
    const MAX_OPQ = 0.50

    const PALETTE: [number, number, number][] = [
      [166, 226, 46],
      [166, 226, 46],
      [102, 217, 239],
      [166, 226, 46],
      [174, 129, 255],
      [102, 217, 239],
    ]

    let dpr = 1, W = 0, H = 0, cols = 0, rows = 0
    let dotColors: Uint8Array = new Uint8Array(0)

    function resize() {
      dpr = window.devicePixelRatio || 1
      const rect = canvas!.getBoundingClientRect()
      W = Math.round(rect.width * dpr)
      H = Math.round(rect.height * dpr)
      canvas!.width = W
      canvas!.height = H
      ctx!.scale(dpr, dpr)

      cols = Math.ceil((W / dpr) / SPACING) + 1
      rows = Math.ceil((H / dpr) / SPACING) + 1

      dotColors = new Uint8Array(cols * rows)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dotColors[r * cols + c] = (c * 3 + r * 7 + c * r) % PALETTE.length
        }
      }
    }

    let startTime: number | null = null
    let rafId: number | null = null
    let running = false

    function loop(ts: number) {
      if (!running) return
      if (!startTime) startTime = ts
      const t = (ts - startTime) * 0.001

      const cssW = W / dpr
      const cssH = H / dpr
      ctx!.clearRect(0, 0, cssW, cssH)

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const w1 = Math.sin(c * 0.20 + r * 0.11 + t * 0.55)
          const w2 = Math.cos(c * 0.11 - r * 0.17 + t * 0.35)
          const w3 = Math.sin((c - r) * 0.13 + t * 0.22)

          const brightness = ((w1 + w2 + w3) / 3 + 1) / 2
          const opacity = brightness * MAX_OPQ

          if (opacity < 0.02) continue

          const [rr, gg, bb] = PALETTE[dotColors[r * cols + c]]
          const x = c * SPACING
          const y = r * SPACING

          ctx!.beginPath()
          ctx!.arc(x, y, RADIUS, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(${rr},${gg},${bb},${opacity.toFixed(3)})`
          ctx!.fill()
        }
      }

      rafId = requestAnimationFrame(loop)
    }

    function start() {
      if (running) return
      running = true
      rafId = requestAnimationFrame(loop)
    }

    function stop() {
      running = false
      if (rafId) { cancelAnimationFrame(rafId); rafId = null }
    }

    const onVisibility = () => { if (document.hidden) { stop() } else { start() } }
    document.addEventListener('visibilitychange', onVisibility)

    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        if (window.innerWidth < 900) { stop(); return }
        stop(); resize(); start()
      }, 150)
    }
    window.addEventListener('resize', onResize)

    resize()
    start()
    const readyTimer = setTimeout(() => canvas!.classList.add('is-ready'), 120)

    return () => {
      stop()
      clearTimeout(readyTimer)
      if (resizeTimer) clearTimeout(resizeTimer)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas id="bg-canvas" aria-hidden="true" />
}
