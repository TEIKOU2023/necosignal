export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">🎉 Tailwind 样式加载成功！</h1>
      <p className="text-lg text-center">
        如果你看到这个页面样式已经变得漂亮，说明 Tailwind 配置没问题了。
      </p>
      <button className="mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
        点我试试看按钮样式
      </button>
    </main>
  );
}
