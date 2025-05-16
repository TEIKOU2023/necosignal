"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
//import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // const router = useRouter();
  const allowedEmails = ["zhenghengteikou@gmail.com"]; // ← 替换成你自己的邮箱

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!allowedEmails.includes(email)) {
      setMessage("This email is not authorized.");
      return;
    }

    setMessage("Sending magic link...");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000/admin",
      },
    });

    if (error) {
      setMessage(`Login error: ${error.message}`);
    } else {
      setMessage("Check your email for the magic link!");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black px-4">
      <h1 className="text-2xl font-bold mb-4">Login with Magic Link</h1>
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
