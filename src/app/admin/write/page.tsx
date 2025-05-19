"use client";

import slugify from "slugify";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const slug = slugify(title, { lower: true, strict: true });
    const date = new Date().toISOString();

    const { data, error } = await supabase.from("posts").insert([
      {
        slug,
        title,
        content,
        created_at: date,
      },
    ]);

    if (error) {
      alert("保存失败：" + error.message);
      return;
    }

    alert("保存成功！");
    router.push(`/blog/${slug}`);
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📝 写文章</h1>
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
          placeholder="在这里写 Markdown 内容..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          保存（模拟）
        </button>
      </form>
    </main>
  );
}
