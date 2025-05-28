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

export default function BlogListPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("is_draft", false)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("获取文章失败", error);
        return;
      }

      setPosts(data as Post[]);
    };

    fetchPosts();
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">📘 博客列表</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <div className="text-xl font-semibold text-blue-600 hover:underline">
                {post.title}
              </div>
            </Link>
            <div className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
