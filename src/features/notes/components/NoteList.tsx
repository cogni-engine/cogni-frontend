'use client';

import Link from 'next/link';

type NoteListItem = {
  id: string;
  title: string;
  date: string;
  preview: string;
  workspace?: {
    id: number;
    title: string;
    type: 'group' | 'personal';
  };
  isGroupNote?: boolean;
};

export default function NoteList({ notes }: { notes: NoteListItem[] }) {
  return (
    <div className='flex flex-col gap-[14px]'>
      {/* ノートのリスト */}
      {notes.map(note => (
        <Link
          key={note.id}
          href={`/notes/${note.id}`}
          className='group bg-white/8 backdrop-blur-xl transition-all duration-300 rounded-[20px] px-5 py-[8px] border border-black shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)]'
        >
          <div className='flex justify-between items-start gap-3 mb-1'>
            <div className='flex-1 min-w-0'>
              <h2 className='font-semibold text-white text-[17px] leading-[1.4] line-clamp-2'>
                {note.title}
              </h2>
              {note.isGroupNote && note.workspace?.title && (
                <span className='inline-block mt-1 px-2 py-0.5 text-[10px] bg-purple-600/20 text-purple-300 rounded-full'>
                  {note.workspace.title}
                </span>
              )}
            </div>
            <span className='text-[11px] text-gray-400 whitespace-nowrap mt-0.5'>
              {note.date}
            </span>
          </div>
          <p className='text-[13px] text-gray-400 leading-[1.6] line-clamp-2'>
            {note.preview}
          </p>
        </Link>
      ))}
    </div>
  );
}
