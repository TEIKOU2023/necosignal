"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // 获取当前文章内容
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error || !data) {
        alert("无法加载文章");
        router.push("/admin/posts");
        return;
      }

      setTitle(data.title);
      setContent(data.content);
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  // 保存修改
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from("posts")
      .update({
        title,
        content,
      })
      .eq("slug", slug);

    if (error) {
      alert("保存失败：" + error.message);
      return;
    }

    alert("保存成功！");
    router.push("/admin/posts");
  };

  if (loading) {
    return <p className="p-6">加载中...</p>;
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">✏️ 编辑文章</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border px-4 py-2"
          type="text"
          placeholder="文章标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="border px-4 py-2 min-h-[200px]"
          placeholder="Markdown 内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          保存修改
        </button>
      </form>
    </main>
  );
}
