"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // const error = null; // 去掉未使用警告
      if (user) {
        setUserEmail(user.email ?? null);
      } else {
        router.push("/login"); // 没登录就跳转回 login
      }
    };

    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-4">🎉 Welcome to Admin Panel</h1>
      <p className="mb-6 text-center text-gray-600 dark:text-gray-300">
        Logged in as <span className="font-mono">{userEmail}</span>
      </p>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Log Out
      </button>
    </main>
  );
}
