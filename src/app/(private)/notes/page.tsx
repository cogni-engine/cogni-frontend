import NoteList from "@/components/notes/NoteList";

export default function NotesPage() {
  const notes = [
    {
      id: "1",
      title: "Memo",
      date: "2025/07/16",
      preview: "リレーショナルデータベース...",
    },
    {
      id: "2",
      title: "Journal",
      date: "2025/05/03",
      preview: "UI library / Bash / V0...",
    },
  ];

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
        <h1 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">All Notes</h1>
        <NoteList notes={notes} />
      </div>
    </div>
  );
}

