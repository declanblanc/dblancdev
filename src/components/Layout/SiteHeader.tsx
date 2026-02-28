import Link from 'next/link'
import NavLinks from './NavLinks'

export default function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="nav">
        <Link href="/" className="nav-brand">dblanc.dev</Link>
        <NavLinks />
      </nav>
    </header>
  )
}
