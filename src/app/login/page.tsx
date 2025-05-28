"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // ✅ 替换为你自己的白名单邮箱
  const allowedEmails = ["zhenghengteikou@gmail.com"];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!allowedEmails.includes(email)) {
      setMessage("このメールアドレスは許可されていません。");
      return;
    }

    setMessage("ログインリンクを送信中...");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // ✅ Vercel/Supabase 用的重定向 URL，请在 .env.local 配置
        emailRedirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
      },
    });

    if (error) {
      setMessage(`ログインエラー: ${error.message}`);
    } else {
      setMessage("メールを確認してください（Magic Link を送信しました）");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black px-4">
      <h1 className="text-2xl font-bold mb-4">📮 Magic Link ログイン</h1>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm flex flex-col gap-4"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="px-4 py-2 border rounded bg-white text-black"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Send Magic Link
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </main>
  );
}
