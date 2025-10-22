"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useNote } from "@/hooks/useNotes";

export default function NoteEditor({ noteId }: { noteId: string }) {
  const router = useRouter();
  const id = noteId === 'new' ? 'new' : parseInt(noteId, 10);
  const { note, loading, error, saveNote } = useNote(id);
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  // Load note data when available
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSave = async () => {
    try {
      setSaving(true);
      await saveNote(title, content);
      router.push("/notes");
    } catch (err) {
      console.error("Failed to save note:", err);
      alert("Failed to save note. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 items-center justify-center p-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-red-300 max-w-md">
          <h2 className="font-bold mb-2">Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => router.push("/notes")}
            className="mt-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
          >
            Back to Notes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 relative overflow-hidden"
      style={{
        willChange: 'scroll-position',
        transform: 'translateZ(0)',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {/* 背景の星 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-white/15 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white/25 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/2 w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse delay-1500"></div>
      </div>

      {/* ヘッダー */}
      <header className="flex justify-between items-center px-4 md:px-6 py-3 relative z-10">
        {/* 戻るボタン - 丸く浮き出る */}
        <button 
          onClick={() => router.back()} 
          className="w-10 h-10 rounded-full bg-white/8 backdrop-blur-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/12 hover:scale-110 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        
        {/* 保存ボタン - 丸く浮き出る */}
        <button 
          onClick={handleSave}
          disabled={saving}
          className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 text-white hover:bg-white/25 hover:scale-110 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </button>
      </header>

      {/* エディタ */}
      <div 
        className="flex flex-col flex-1 p-4 md:p-6 relative z-10"
        style={{
          willChange: 'scroll-position',
          transform: 'translateZ(0)',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
          className="text-2xl font-bold bg-transparent focus:outline-none mb-3 text-white placeholder-gray-500"
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