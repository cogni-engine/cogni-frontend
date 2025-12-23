'use client';

import Image from 'next/image';
import { useRef, memo, useState } from 'react';

import GlassCard from '@/components/glass-design/GlassCard';
import type { NoteFolder } from '@/types/note';
import type { FormattedNote } from '../NotesProvider';
import { groupAndSortNotes } from '../lib/noteListHelpers';
import { FolderGroupHeader } from './FolderGroupHeader';

type NoteListProps = {
  notes: FormattedNote[];
  onNoteClick?: (id: string) => void;
  onContextMenu?: (e: React.MouseEvent, id: string, isDeleted: boolean) => void;
  groupBy?: 'time' | 'folder';
  folders?: NoteFolder[];
  selectedFolder?: 'trash' | number | null;
  onBackFromFolder?: () => void;
};

function NoteCardComponent({
  note,
  onNoteClick,
  onContextMenu,
}: {
  note: FormattedNote;
  onNoteClick?: (id: string) => void;
  onContextMenu?: (e: React.MouseEvent, id: string, isDeleted: boolean) => void;
}) {
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isDeleted = !!note.deleted_at;

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };

    touchTimerRef.current = setTimeout(() => {
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
        {note.preview || 'No content'}
      </p>
    </GlassCard>
  );
}

const NoteCard = memo(NoteCardComponent);

export default function NoteList({
  notes,
  onNoteClick,
  onContextMenu,
  groupBy = 'folder',
  folders = [],
  selectedFolder = null,
  onBackFromFolder,
}: NoteListProps) {
  const { groups, sortedKeys } = groupAndSortNotes(notes, groupBy, folders);
  const [collapsedFolders, setCollapsedFolders] = useState<Set<string>>(
    new Set()
  );

  // Determine folder name for selected folder
  const selectedFolderName =
    selectedFolder === 'trash'
      ? 'Trash'
      : selectedFolder !== null
        ? folders.find(f => f.id === selectedFolder)?.title || ''
        : null;

  // If a folder is selected, show only that folder
  if (selectedFolder !== null && groupBy === 'folder') {
    const folderName = selectedFolderName || '';
    // When selectedFolder is 'trash', notes already contains only deleted notes (formattedDeletedNotes)
    // When selectedFolder is a number, notes already contains only notes from that folder
    const folderNotes = notes;

    return (
      <div className='flex flex-col gap-6'>
        <FolderGroupHeader
          folderName={folderName}
          isCollapsed={false}
          onToggle={() => {}}
          showBackButton={true}
          onBack={onBackFromFolder}
        />
        <div className='flex flex-col gap-[14px]'>
          {folderNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onNoteClick={onNoteClick}
              onContextMenu={onContextMenu}
            />
          ))}
          {folderNotes.length === 0 && (
            <div className='text-center py-12 text-gray-400'>
              {selectedFolder === 'trash'
                ? 'Trash is empty'
                : 'No notes in this folder'}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      {sortedKeys.map(group => {
        const isCollapsed = collapsedFolders.has(group);
        return (
          <div key={group}>
            {groupBy === 'folder' ? (
              <>
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
                    {groups[group].map(note => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        onNoteClick={onNoteClick}
                        onContextMenu={onContextMenu}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <h3 className='text-sm font-medium text-gray-400 mb-3 px-1'>
                  {group}
                </h3>
                <div className='flex flex-col gap-[14px]'>
                  {groups[group].map(note => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onNoteClick={onNoteClick}
                      onContextMenu={onContextMenu}
                    />
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
