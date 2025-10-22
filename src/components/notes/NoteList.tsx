"use client";

import Link from "next/link";

export default function NoteList({
  notes,
}: {
  notes: { id: string; title: string; date: string; preview: string }[];
}) {
  return (
    <div className="flex flex-col gap-[14px]">
      {/* ノートのリスト */}
      {notes.map((note) => (
       <Link
         key={note.id}
         href={`/notes/${note.id}`}
         className="group bg-white/8 backdrop-blur-xl hover:bg-white/12 transition-all duration-300 rounded-[20px] px-5 py-[8px] border border-white/10 hover:border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] hover:scale-[1.002]"
       >
          <div className="flex justify-between items-start gap-3 mb-1">
            <h2 className="font-semibold text-white text-[17px] leading-[1.4] line-clamp-2">{note.title}</h2>
            <span className="text-[11px] text-gray-400 whitespace-nowrap mt-0.5">{note.date}</span>
          </div>
          <p className="text-[13px] text-gray-400 leading-[1.6] line-clamp-2">{note.preview}</p>
        </Link>
      ))}
    </div>
  );
}