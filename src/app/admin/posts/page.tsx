"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Post = {
  id: number;
  title: string;
  slug: string;
  created_at: string;
  is_draft: boolean;
};

export default function PostListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showDrafts, setShowDrafts] = useState(false);
  const router = useRouter();

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("获取文章失败：" + error.message);
    } else {
      setPosts(data || []);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    const ok = confirm("确定要删除这篇文章吗？");
    if (!ok) return;

    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      alert("删除失败：" + error.message);
    } else {
      alert("删除成功！");
      fetchPosts();
    }
  };

  const filtered = posts.filter((p) => p.is_draft === showDrafts);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">📋 文章列表</h1>
        <button
          className="text-sm underline text-blue-600"
          onClick={() => setShowDrafts((prev) => !prev)}
        >
          {showDrafts ? "显示已发布" : "显示草稿"}
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">暂无文章</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((post) => (
            <li
              key={post.id}
              className="border rounded p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-lg font-semibold">{post.title}</p>
                <p className="text-sm text-gray-500">{post.created_at}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="text-blue-600 underline"
                  onClick={() => router.push(`/admin/edit/${post.slug}`)}
                >
                  编辑
                </button>
                <button
                  className="text-red-600 underline"
                  onClick={() => handleDelete(post.id)}
                >
                  删除
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
