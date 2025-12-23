'use client';

import Image from 'next/image';
import { useRef, memo, useState } from 'react';

import GlassCard from '@/components/glass-design/GlassCard';
import type { NoteFolder } from '@/types/note';
import { FolderGroupHeader } from './components/FolderGroupHeader';

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
  deleted_at?: string | null;
  note_folder_id?: number | null;
};

type NoteListProps = {
  notes: NoteListItem[];
  onNoteClick?: (id: string) => void;
  onContextMenu?: (e: React.MouseEvent, id: string, isDeleted: boolean) => void;
  groupBy?: 'time' | 'folder';
  folders?: NoteFolder[];
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

function groupNotesByFolder(
  notes: NoteListItem[],
  folders: NoteFolder[]
): GroupedNotes {
  const grouped: GroupedNotes = {};

  // Sort folders alphabetically by title
  const sortedFolders = [...folders].sort((a, b) =>
    a.title.localeCompare(b.title, 'ja')
  );

  // Initialize groups for each folder
  sortedFolders.forEach(folder => {
    grouped[folder.title] = [];
  });

  // Add "Notes" group for notes without folder
  grouped['Notes'] = [];

  // Group notes
  notes.forEach(note => {
    if (!note.note_folder_id) {
      grouped['Notes'].push(note);
    } else {
      const folder = folders.find(f => f.id === note.note_folder_id);
      if (folder && grouped[folder.title]) {
        grouped[folder.title].push(note);
      }
    }
  });

  // Remove empty groups (except "Notes")
  Object.keys(grouped).forEach(key => {
    if (key !== 'Notes' && grouped[key].length === 0) {
      delete grouped[key];
    }
  });

  return grouped;
}

function sortFolderGroupKeys(keys: string[]): string[] {
  // "Notes" should come first, then alphabetically
  return keys.sort((a, b) => {
    if (a === 'Notes') return -1;
    if (b === 'Notes') return 1;
    return a.localeCompare(b, 'ja');
  });
}

export default function NoteList({
  notes,
  onNoteClick,
  onContextMenu,
  groupBy = 'folder',
  folders = [],
}: NoteListProps) {
  const groupedNotes =
    groupBy === 'folder'
      ? groupNotesByFolder(notes, folders)
      : groupNotesByTime(notes);
  const sortedGroups =
    groupBy === 'folder'
      ? sortFolderGroupKeys(Object.keys(groupedNotes))
      : sortGroupKeys(Object.keys(groupedNotes));
  const [collapsedFolders, setCollapsedFolders] = useState<Set<string>>(
    new Set()
  );

  // Note card component with touch handlers - memoized to prevent flickering
  const NoteCardComponent = ({ note }: { note: NoteListItem }) => {
    const touchTimerRef = useRef<NodeJS.Timeout | null>(null);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);
    const isDeleted = !!note.deleted_at;

    const handleTouchStart = (e: React.TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };

      // Start long press timer
      touchTimerRef.current = setTimeout(() => {
        // Trigger context menu after 500ms
        if (onContextMenu) {
          onContextMenu(
            {
              preventDefault: () => {},
              clientX: touch.clientX,
              clientY: touch.clientY,
            } as React.MouseEvent,
            note.id,
            isDeleted
          );
        }
      }, 500);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      // Cancel long press if user moves finger too much
      if (touchStartRef.current && touchTimerRef.current) {
        const touch = e.touches[0];
        const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
        const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

        if (deltaX > 10 || deltaY > 10) {
          clearTimeout(touchTimerRef.current);
          touchTimerRef.current = null;
        }
      }
    };

    const handleTouchEnd = () => {
      // Clear the timer if touch ends before long press threshold
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current);
        touchTimerRef.current = null;
      }
      touchStartRef.current = null;
    };

    const handleClick = () => {
      if (!isDeleted && onNoteClick) {
        onNoteClick(note.id);
      }
    };

    const handleContextMenuEvent = (e: React.MouseEvent) => {
      if (onContextMenu) {
        onContextMenu(e, note.id, isDeleted);
      }
    };

    return (
      <GlassCard
        className={`group relative rounded-[20px] px-5 py-[8px] cursor-pointer select-none ${
          isDeleted ? 'opacity-60' : ''
        }`}
        onClick={handleClick}
        onContextMenu={handleContextMenuEvent}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <div className='flex justify-between items-start gap-3 mb-1'>
          <div className='flex-1 min-w-0'>
            <h2 className='font-semibold text-white text-[17px] leading-[1.4] line-clamp-2'>
              {note.title}
            </h2>
            {note.isGroupNote && note.workspace?.title && (
              <div className='flex items-center gap-1.5 mt-1'>
                {note.workspace.icon_url ? (
                  <Image
                    src={note.workspace.icon_url}
                    alt={note.workspace.title}
                    width={16}
                    height={16}
                    className='w-4 h-4 rounded-md object-cover'
                  />
                ) : (
                  <div className='w-4 h-4 rounded-md bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[8px] text-white font-bold'>
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
        <p className='text-[13px] text-gray-400 leading-[1.6] line-clamp-1'>
          {note.preview || 'No Content'}
        </p>
      </GlassCard>
    );
  };

  const NoteCard = memo(NoteCardComponent);

  return (
    <div className='flex flex-col gap-6'>
      {sortedGroups.map(group => {
        const isCollapsed = collapsedFolders.has(group);
        return (
          <div key={group}>
            {groupBy === 'folder' ? (
              <>
                {/* Folder Group Header */}
                <FolderGroupHeader
                  folderName={group}
                  isCollapsed={isCollapsed}
                  onToggle={() => {
                    setCollapsedFolders(prev => {
                      const next = new Set(prev);
                      if (next.has(group)) {
                        next.delete(group);
                      } else {
                        next.add(group);
                      }
                      return next;
                    });
                  }}
                />
                {!isCollapsed && (
                  <div className='flex flex-col gap-[14px]'>
                    {groupedNotes[group].map(note => (
                      <NoteCard key={note.id} note={note} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Time Group Header */}
                <h3 className='text-sm font-medium text-gray-400 mb-3 px-1'>
                  {group}
                </h3>
                <div className='flex flex-col gap-[14px]'>
                  {groupedNotes[group].map(note => (
                    <NoteCard key={note.id} note={note} />
                  ))}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
