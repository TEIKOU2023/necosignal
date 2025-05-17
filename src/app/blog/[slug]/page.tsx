import { getAllPosts } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdownToHtml";
import { notFound } from "next/navigation";

// ✅ 明确类型定义
type Params = {
  params: {
    slug: string;
  };
};

// ✅ 显式标注 static params 类型
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// ✅ 避免类型混淆：直接 inline 类型，而不使用 BlogPageProps
export default async function BlogDetailPage({ params }: Params) {
  const { slug } = params;
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return notFound();

  const html = await markdownToHtml(post.content);

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{post.date}</p>
      <article
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
