"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditPostPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDraft, setIsDraft] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ 登录检查
  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("获取用户失败：", userError.message);
        alert("用户信息获取失败，请重新登录。");
        router.push("/login");
        return;
      }

      if (!user) {
        console.warn("未检测到登录用户，跳转到登录页");
        router.push("/login");
        return;
      }

      console.log("✅ 当前登录用户：", user);

      // 拉取文章
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        alert("获取文章失败：" + error.message);
        router.push("/admin/posts");
        return;
      }

      setTitle(data.title);
      setContent(data.content);
      setIsDraft(data.is_draft);
      setLoading(false);
    };

    checkAuthAndFetch();
  }, [slug, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from("posts")
      .update({
        title,
        content,
        is_draft: isDraft,
      })
      .eq("slug", slug);

    if (error) {
      alert("更新失败：" + error.message);
    } else {
      alert("更新成功！");
      router.push("/admin/posts");
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <main className="max-w-2xl mx-auto p-6">
        <p>加载中...</p>
      </main>
    );
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
          placeholder="在这里写 Markdown 内容..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isDraft}
            onChange={(e) => setIsDraft(e.target.checked)}
          />
          作为草稿保存
        </label>
        <button
          type="button"
          onClick={() => router.push(`/blog/${slug}`)}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          预览文章
        </button>
        <button
          type="submit"
          disabled={saving}
          className={`${
            saving ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          } text-white px-4 py-2 rounded`}
        >
          {saving ? "保存中..." : "保存修改"}
        </button>
      </form>
    </main>
  );
}
