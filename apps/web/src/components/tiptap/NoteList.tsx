'use client';

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { NoteWithParsed } from '@/types/note';
import { FileText } from 'lucide-react';
import GlassCard from '../glass-design/GlassCard';

export interface NoteListProps {
  items: NoteWithParsed[];
  command: (item: { id: string; label: string; noteId: number }) => void;
}

export interface NoteListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

export const NoteList = forwardRef<NoteListRef, NoteListProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];

    if (item) {
      props.command({
        id: `note-${item.id}`,
        label: item.title || 'Untitled',
        noteId: item.id,
      });
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  const scrollRef = useCallback(
    (node: HTMLButtonElement | null) => {
      if (node) {
        node.scrollIntoView({ block: 'nearest' });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedIndex]
  );

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <GlassCard className='rounded-3xl p-2'>
      <div className='max-h-[300px] overflow-y-auto overscroll-contain'>
        {props.items.length ? (
          props.items.map((item, index) => (
            <button
              ref={index === selectedIndex ? scrollRef : undefined}
              className={`flex items-center gap-2 w-full rounded-xl px-3 py-2 text-left transition-colors ${
                index === selectedIndex
                  ? 'bg-interactive-active'
                  : 'hover:bg-surface-primary'
              }`}
              key={item.id}
              onClick={() => selectItem(index)}
              type='button'
            >
              <div className='flex items-center justify-center w-8 h-8 rounded bg-interactive-hover'>
                <FileText className='w-4 h-4 text-text-secondary' />
              </div>
              <div className='flex-1 min-w-0'>
                <div className='text-text-primary font-medium truncate'>
                  {item.title || 'Untitled'}
                </div>
                {item.content && (
                  <div className='text-xs text-text-muted truncate'>
                    {item.content.substring(0, 60)}
                    {item.content.length > 60 ? '...' : ''}
                  </div>
                )}
              </div>
            </button>
          ))
        ) : (
          <div className='px-3 py-3 text-sm text-text-muted'>No notes found</div>
        )}
      </div>
    </GlassCard>
  );
});

NoteList.displayName = 'NoteList';
