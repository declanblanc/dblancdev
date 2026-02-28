'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/posts', label: 'posts' },
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <ul className="nav-links">
      {NAV_LINKS.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            className={pathname === href || pathname.startsWith(href + '/') ? 'active' : undefined}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
