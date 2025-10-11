"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NoteEditor() {
  const router = useRouter();
  const [title, setTitle] = useState("Memo");
  const [content, setContent] = useState(
    "リレーショナルデータベース\n\nUI library\n\nBash\n\nV0\n\nclear"
  );

  const handleSave = () => {
    console.log("Saved:", { title, content });
    // 🔜 Supabaseに保存（update）
    router.push("/notes");
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 relative overflow-hidden">
      {/* 背景の星 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-white/15 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white/25 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/2 w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse delay-1500"></div>
      </div>

      {/* ヘッダー */}
      <header className="flex justify-between items-center px-4 md:px-6 py-4 relative z-10">
        {/* 戻るボタン - 丸く浮き出る */}
        <button 
          onClick={() => router.back()} 
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-400 hover:text-white hover:bg-white/15 hover:scale-110 transition-all shadow-[0_8px_24px_rgba(0,0,0,0.3)] flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        
        {/* 保存ボタン - 丸く浮き出る */}
        <button 
          onClick={handleSave} 
          className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-white/20 hover:scale-110 transition-all shadow-[0_8px_24px_rgba(0,0,0,0.3)] flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
      </header>

      {/* エディタ */}
      <div className="flex flex-col flex-1 p-4 md:p-6 relative z-10">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
          className="text-2xl font-bold bg-transparent focus:outline-none mb-6 text-white placeholder-gray-500"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="メモを入力..."
          className="flex-1 bg-transparent resize-none focus:outline-none leading-relaxed text-gray-300 placeholder-gray-600"
        />
      </div>
    </div>
  );
}
