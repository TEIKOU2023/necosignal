import { getAllPosts } from '@/lib/blog'
import Link from 'next/link'

export default function BlogListPage() {
  const posts = getAllPosts()

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📘 博客列表</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-semibold hover:underline">{post.title}</h2>
            </Link>
            <p className="text-sm text-gray-500">{post.date}</p>
            <div className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
              {post.content.slice(0, 100)}...
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
