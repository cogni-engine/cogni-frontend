'use client';

import Image from 'next/image';
import { useRef, memo, useState } from 'react';

import type { NoteFolder } from '@/types/note';
import type { FormattedNote } from '../NotesProvider';
import { groupAndSortNotes } from '../lib/noteListHelpers';
import { FolderGroupHeader } from './FolderGroupHeader';
import { FlatList, FlatListItem } from '@/components/FlatList';

type NoteListProps = {
  notes: FormattedNote[];
  onNoteClick?: (id: string) => void;
  onContextMenu?: (e: React.MouseEvent, id: string, isDeleted: boolean) => void;
  groupBy?: 'time' | 'folder';
  folders?: NoteFolder[];
  selectedFolder?: 'trash' | number | null;
  onBackFromFolder?: () => void;
  onDeleteAll?: () => void;
};
function NoteCardComponent({
  note,
  onNoteClick,
  onContextMenu,
  showWorkspaceBadge = true,
  inRecentlyDeleted = false,
}: {
  note: FormattedNote;
  onNoteClick?: (id: string) => void;
  onContextMenu?: (e: React.MouseEvent, id: string, isDeleted: boolean) => void;
  showWorkspaceBadge?: boolean;
  inRecentlyDeleted?: boolean;
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
    if (onNoteClick) {
      onNoteClick(note.id);
    }
  };

  const handleContextMenuEvent = (e: React.MouseEvent) => {
    if (onContextMenu) {
      onContextMenu(e, note.id, isDeleted);
    }
  };

  return (
    <FlatListItem
      className={isDeleted && !inRecentlyDeleted ? 'opacity-60' : ''}
      onClick={handleClick}
      onContextMenu={handleContextMenuEvent}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div className='flex justify-between items-start gap-3'>
        <div className='flex-1 min-w-0'>
          <h2 className='font-semibold text-white/90 text-[15px] leading-[1.4] line-clamp-2'>
            {note.title}
          </h2>
          <div className='flex items-center gap-2 mt-0.5'>
            <span className='text-[11px] text-gray-400 whitespace-nowrap'>
              {note.date}
            </span>
            <p className='text-[13px] text-gray-400 leading-[1.6] line-clamp-1 flex-1 min-w-0'>
              {note.preview || 'No content'}
            </p>
          </div>
        </div>
        {showWorkspaceBadge && note.isGroupNote && note.workspace?.title && (
          <div className='flex items-center gap-1.5 shrink-0'>
            {note.workspace.icon_url ? (
              <Image
                src={note.workspace.icon_url}
                alt={note.workspace.title}
                width={16}
                height={16}
                className='w-4 h-4 rounded-md object-cover'
              />
            ) : (
              <div className='w-4 h-4 rounded-md bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[8px] text-white/90 font-bold'>
                {note.workspace.title.charAt(0).toUpperCase()}
              </div>
            )}
            <span className='text-[11px] text-white whitespace-nowrap'>
              {note.workspace.title}
            </span>
          </div>
        )}
      </div>
    </FlatListItem>
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
  onDeleteAll,
}: NoteListProps) {
  const { groups, sortedKeys, workspaceGroups, sortedWorkspaceKeys } =
    groupAndSortNotes(notes, groupBy, folders);
  const [collapsedFolders, setCollapsedFolders] = useState<Set<string>>(
    new Set()
  );

  // Determine folder name for selected folder
  const selectedFolderName =
    selectedFolder === 'trash'
      ? 'Recently Deleted'
      : selectedFolder !== null
        ? folders.find(f => f.id === selectedFolder)?.title || ''
        : null;

  const isRecentlyDeleted = selectedFolder === 'trash';

  // If a folder is selected, show only that folder
  if (selectedFolder !== null && groupBy === 'folder') {
    const folderName = selectedFolderName || '';
    // When selectedFolder is 'trash', notes already contains only deleted notes (formattedDeletedNotes)
    // When selectedFolder is a number, notes already contains only notes from that folder
    const folderNotes = notes;

    return (
      <div className='flex flex-col gap-6'>
        <div className='flex items-center justify-between'>
          <FolderGroupHeader
            folderName={folderName}
            isCollapsed={false}
            onToggle={() => {}}
            showBackButton={true}
            onBack={onBackFromFolder}
          />
          {isRecentlyDeleted && folderNotes.length > 0 && onDeleteAll && (
            <button
              onClick={onDeleteAll}
              className='text-sm text-gray-400 hover:text-white px-5 transition-colors'
            >
              Delete All
            </button>
          )}
        </div>
        <FlatList>
          {folderNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onNoteClick={onNoteClick}
              onContextMenu={onContextMenu}
              inRecentlyDeleted={isRecentlyDeleted}
            />
          ))}
          {folderNotes.length === 0 && (
            <div className='text-center py-12 text-gray-400'>
              {isRecentlyDeleted
                ? 'No recently deleted notes'
                : 'No notes in this folder'}
            </div>
          )}
        </FlatList>
      </div>
    );
  }

  const toggleCollapse = (key: string) => {
    setCollapsedFolders(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <div className='flex flex-col gap-6'>
      {/* Folder groups (Personal notes) */}
      {sortedKeys.map(group => {
        const isCollapsed = collapsedFolders.has(group);
        return (
          <div key={group}>
            {groupBy === 'folder' ? (
              <>
                <FolderGroupHeader
                  folderName={group}
                  isCollapsed={isCollapsed}
                  onToggle={() => toggleCollapse(group)}
                />
                {!isCollapsed && (
                  <FlatList>
                    {groups[group].map(note => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        onNoteClick={onNoteClick}
                        onContextMenu={onContextMenu}
                      />
                    ))}
                  </FlatList>
                )}
              </>
            ) : (
              <>
                <h3 className='text-sm font-medium text-gray-400 mb-3 px-1'>
                  {group}
                </h3>
                <FlatList>
                  {groups[group].map(note => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onNoteClick={onNoteClick}
                      onContextMenu={onContextMenu}
                    />
                  ))}
                </FlatList>
              </>
            )}
          </div>
        );
      })}

      {/* Workspace groups (notes from other workspaces) */}
      {groupBy === 'folder' &&
        sortedWorkspaceKeys.map(wsName => {
          const wsInfo = workspaceGroups[wsName];
          const isCollapsed = collapsedFolders.has(`ws:${wsName}`);
          return (
            <div key={`ws:${wsName}`}>
              <FolderGroupHeader
                folderName={wsName}
                iconUrl={wsInfo.iconUrl}
                isCollapsed={isCollapsed}
                onToggle={() => toggleCollapse(`ws:${wsName}`)}
              />
              {!isCollapsed && (
                <FlatList>
                  {wsInfo.notes.map(note => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onNoteClick={onNoteClick}
                      onContextMenu={onContextMenu}
                      showWorkspaceBadge={false}
                    />
                  ))}
                </FlatList>
              )}
            </div>
          );
        })}
    </div>
  );
}
