"use client";

import NoteList from "@/components/notes/NoteList";
import { useNotes, formatDate } from "@/hooks/useNotes";

export default function NotesPage() {
  const { notes, loading, error, searchNotes } = useNotes();

  const formattedNotes = notes.map(note => ({
    id: note.id.toString(),
    title: note.title,
    date: formatDate(note.updated_at),
    preview: note.preview,
  }));

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 text-gray-100 p-4 md:p-6 relative overflow-hidden">
      {/* 背景の星 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-white/15 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white/25 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/2 w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse delay-1500"></div>
      </div>

      <div className="relative z-10">
        <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">All Notes</h1>
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-300">
            {error}
          </div>
        )}
        
        {!loading && !error && (
          <NoteList notes={formattedNotes} onSearch={searchNotes} />
        )}
      </div>
    </div>
  );
}

