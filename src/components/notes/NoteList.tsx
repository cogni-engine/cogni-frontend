"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NoteList({
  notes,
}: {
  notes: { id: string; title: string; date: string; preview: string }[];
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="flex flex-col gap-4">
      {/* 検索バー + 新規作成ボタン */}
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto gap-3">
        {/* Search Box */}
        <div className="flex items-center bg-white/8 backdrop-blur-md text-gray-300 px-4 py-3 rounded-full flex-1 shadow-[0_8px_24px_rgba(0,0,0,0.3)] border border-white/15 focus-within:ring-1 focus-within:ring-white/30 transition">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-sm text-gray-200 w-full placeholder-gray-500"
          />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 ml-2">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="22"></line>
          </svg>
        </div>

        {/* 新規作成ボタン */}
        <button 
          onClick={() => router.push("/notes/new")}
          className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full hover:bg-white/15 hover:scale-110 active:scale-95 transition-all shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
            {/* 正方形のアウトライン */}
            <rect x="3" y="3" width="14" height="14" rx="2" ry="2" stroke="currentColor" fill="none"></rect>
            {/* ペンシル */}
            <path d="M17 3l4 4-9.5 9.5-4 1 1-4L17 3z"></path>
          </svg>
        </button>
      </div>
      
      {/* 既存のノート */}
      {notes.map((note) => (
        <Link
          key={note.id}
          href={`/notes/${note.id}`}
          className="bg-white/8 backdrop-blur-md hover:bg-white/12 transition-all rounded-2xl p-5 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-white truncate text-lg">{note.title}</h2>
            <span className="text-xs text-gray-400">{note.date}</span>
          </div>
          <p className="text-sm text-gray-400 truncate">{note.preview}</p>
        </Link>
      ))}
    </div>
  );
}

