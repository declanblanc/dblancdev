import Link from 'next/link'
import AiBadge from './AiBadge'

export default function Breadcrumb({ slug }: { slug: string }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li><Link href="/posts">{'// posts'}</Link></li>
        <li aria-current="page">{slug}</li>
      </ol>
      <AiBadge />
    </nav>
  )
}
