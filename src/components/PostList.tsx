import Link from 'next/link'

interface PostMeta {
  slug: string
  title: string
  date: string
}

export default function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="notes-list">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          <span className="meta">{formatDate(post.date)}</span>
        </li>
      ))}
    </ul>
  )
}

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-')
  return `${month}/${day}/${year}`
}
