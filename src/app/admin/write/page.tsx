"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const slug = title.toLowerCase().replace(/\s+/g, "-");
    console.log("📝 New post:", {
      slug,
      title,
      content,
      date: new Date().toISOString().split("T")[0],
    });

    alert("文章保存成功（模拟）");
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
