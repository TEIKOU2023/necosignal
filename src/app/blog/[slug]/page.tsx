import { getAllPosts } from '@/lib/blog'
import { markdownToHtml } from '@/lib/markdownToHtml'
import { notFound } from 'next/navigation'

// 明确 dynamic 模式：强制不要 prerender（非常关键）
export const dynamic = 'force-dynamic'

// generateStaticParams 直接返回 slug 数组
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

// 页面组件参数不使用 type 或 interface！直接解构 + inline
export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const posts = getAllPosts()
  const post = posts.find((p) => p.slug === slug)

  if (!post) return notFound()

  const html = await markdownToHtml(post.content)

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{post.date}</p>
      <article
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  )
}
