import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import React from 'react'
import { createReader } from '@keystatic/core/reader'
import Markdoc from '@markdoc/markdoc'
import keystaticConfig from '../../../../../keystatic.config'
import Breadcrumb from '@/components/Breadcrumb'
import '@/styles/markdown.css'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const reader = createReader(process.cwd(), keystaticConfig)
  const slugs = await reader.collections.posts.list()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const reader = createReader(process.cwd(), keystaticConfig)
  const post = await reader.collections.posts.read(slug)
  return {
    title: post ? `${post.title} — dblanc.dev` : 'Post — dblanc.dev',
    description: post?.description ?? undefined,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const reader = createReader(process.cwd(), keystaticConfig)
  const post = await reader.collections.posts.read(slug)

  if (!post) notFound()

  const { node } = await post.content()
  const transformed = Markdoc.transform(node)
  const rendered = Markdoc.renderers.react(transformed, React)

  return (
    <>
      <Breadcrumb slug={slug} />
      <article className="prose">
        {rendered}
      </article>
    </>
  )
}
