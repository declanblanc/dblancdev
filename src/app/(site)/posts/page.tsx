import type { Metadata } from 'next'
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../../../keystatic.config'
import AiBadge from '@/components/AiBadge'
import PostList from '@/components/PostList'

export const metadata: Metadata = {
  title: 'Posts — dblanc.dev',
}

export default async function PostsPage() {
  const reader = createReader(process.cwd(), keystaticConfig)
  const posts = await reader.collections.posts.all()

  const sorted = posts
    .filter((p) => p.entry.date)
    .sort((a, b) => new Date(b.entry.date!).getTime() - new Date(a.entry.date!).getTime())
    .map((p) => ({
      slug: p.slug,
      title: p.entry.title,
      date: p.entry.date!,
    }))

  return (
    <section>
      <div className="section-label-row">
        <h2 className="section-label">posts</h2>
        <AiBadge />
      </div>
      <PostList posts={sorted} />
    </section>
  )
}
