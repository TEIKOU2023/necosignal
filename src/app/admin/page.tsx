"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminHome() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">👩‍💻 管理后台</h1>
      <p className="mb-4">欢迎回来！请选择您要进行的操作：</p>
      <ul className="space-y-3">
        <li>
          <a
            href="/admin/posts"
            className="text-blue-600 hover:underline text-lg"
          >
            📋 管理文章列表
          </a>
        </li>
        <li>
          <a
            href="/admin/write"
            className="text-blue-600 hover:underline text-lg"
          >
            ✍️ 写新文章
          </a>
        </li>
      </ul>
    </main>
  );
}
