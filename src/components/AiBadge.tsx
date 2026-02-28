'use client'

import { useState, useEffect } from 'react'

export default function AiBadge() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = () => setOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  return (
    <span
      role="button"
      className={`ai-badge${open ? ' open' : ''}`}
      tabIndex={0}
      onClick={(e) => { e.stopPropagation(); setOpen(o => !o) }}
      aria-expanded={open}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); setOpen(o => !o) } }}
    >
      AI?
      <span className="ai-tooltip">
        All writing here is my own. I do not use AI to write for me — I use it as a tool for research &amp; proofreading.
      </span>
    </span>
  )
}
