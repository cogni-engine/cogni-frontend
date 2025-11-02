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
    icon_url?: string | null;
  };
  isGroupNote?: boolean;
  updated_at: string;
};

type GroupedNotes = {
  [key: string]: NoteListItem[];
};

function getTimeGroup(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);

  // Reset time to midnight for date comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const noteDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  // Today
  if (noteDate.getTime() === today.getTime()) {
    return '今日';
  }

  // This week (last 7 days)
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  if (noteDate > weekAgo) {
    return '今週';
  }

  // This month
  if (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return '今月';
  }

  // Previous months in the same year
  if (date.getFullYear() === now.getFullYear()) {
    return `${date.getMonth() + 1}月`;
  }

  // Previous years
  return `${date.getFullYear()}年`;
}

function groupNotesByTime(notes: NoteListItem[]): GroupedNotes {
  const grouped: GroupedNotes = {};

  notes.forEach(note => {
    const group = getTimeGroup(note.updated_at);
    if (!grouped[group]) {
      grouped[group] = [];
    }
    grouped[group].push(note);
  });

  return grouped;
}

function sortGroupKeys(keys: string[]): string[] {
  const order = ['今日', '今週', '今月'];

  return keys.sort((a, b) => {
    // Priority order
    const aIndex = order.indexOf(a);
    const bIndex = order.indexOf(b);

    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    // Month comparison (e.g., "10月", "11月")
    const aMonth = a.match(/^(\d+)月$/);
    const bMonth = b.match(/^(\d+)月$/);
    if (aMonth && bMonth) {
      return parseInt(bMonth[1]) - parseInt(aMonth[1]); // Descending
    }

    // Year comparison (e.g., "2024年", "2023年")
    const aYear = a.match(/^(\d+)年$/);
    const bYear = b.match(/^(\d+)年$/);
    if (aYear && bYear) {
      return parseInt(bYear[1]) - parseInt(aYear[1]); // Descending
    }

    // Months come before years
    if (aMonth) return -1;
    if (bMonth) return 1;

    return 0;
  });
}

export default function NoteList({ notes }: { notes: NoteListItem[] }) {
  const groupedNotes = groupNotesByTime(notes);
  const sortedGroups = sortGroupKeys(Object.keys(groupedNotes));

  return (
    <div className='flex flex-col gap-6'>
      {sortedGroups.map(group => (
        <div key={group}>
          {/* Group Header */}
          <h3 className='text-sm font-medium text-gray-400 mb-3 px-1'>
            {group}
          </h3>
          {/* Notes in this group */}
          <div className='flex flex-col gap-[14px]'>
            {groupedNotes[group].map(note => (
              <Link
                key={note.id}
                href={`/notes/${note.id}`}
                className='group bg-white/8 backdrop-blur-xl transition-all duration-300 rounded-[20px] px-5 py-[8px] border border-black shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] relative'
              >
                <div className='flex justify-between items-start gap-3 mb-1'>
                  <div className='flex-1 min-w-0'>
                    <h2 className='font-semibold text-white text-[17px] leading-[1.4] line-clamp-2'>
                      {note.title}
                    </h2>
                    {note.isGroupNote && note.workspace?.title && (
                      <div className='flex items-center gap-1.5 mt-1'>
                        {note.workspace.icon_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={note.workspace.icon_url}
                            alt={note.workspace.title}
                            className='w-4 h-4 rounded-md object-cover'
                          />
                        ) : (
                          <div className='w-4 h-4 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[8px] text-white font-bold'>
                            {note.workspace.title.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className='text-[11px] text-purple-300'>
                          {note.workspace.title}
                        </span>
                      </div>
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
        </div>
      ))}
    </div>
  );
}
