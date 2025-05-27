"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Post = {
  id: string;
  slug: string;
  title: string;
  created_at: string;
};

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("获取文章失败", error);
      } else {
        setPosts(data as Post[]);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">📂 管理文章</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border-b pb-2">
            <div className="flex items-center justify-between">
              <Link href={`/blog/${post.slug}`}>
                <div className="text-blue-600 hover:underline text-lg">
                  {post.title}
                </div>
              </Link>
              <div className="flex items-center gap-2">
                <Link href={`/admin/edit/${post.slug}`}>
                  <button className="text-sm text-gray-500 hover:text-blue-600">
                    ✏️ 编辑
                  </button>
                </Link>
                <button
                  onClick={async () => {
                    const confirmed = confirm(
                      `确定要删除「${post.title}」吗？`
                    );
                    if (!confirmed) return;

                    const { error } = await supabase
                      .from("posts")
                      .delete()
                      .eq("slug", post.slug);

                    if (error) {
                      alert("删除失败：" + error.message);
                    } else {
                      alert("删除成功！");
                      // 重新加载列表
                      setPosts((prev) =>
                        prev.filter((p) => p.slug !== post.slug)
                      );
                    }
                  }}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  🗑️ 删除
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString()} ｜slug:{" "}
              {post.slug}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
