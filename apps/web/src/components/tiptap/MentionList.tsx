'use client';

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { WorkspaceMember } from '@/types/workspace';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import GlassCard from '../glass-design/GlassCard';

export interface MentionListProps {
  items: WorkspaceMember[];
  command: (item: {
    id: string;
    label: string;
    workspaceMemberId: number;
  }) => void;
}

export interface MentionListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

export const MentionList = forwardRef<MentionListRef, MentionListProps>(
  (props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
      const item = props.items[index];

      if (item) {
        props.command({
          id: `member-${item.id}`,
          label: item.user_profile?.name || 'Unknown',
          workspaceMemberId: item.id,
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
                <Avatar className='h-8 w-8 border border-border-default bg-interactive-hover'>
                  {item.user_profile?.avatar_url ? (
                    <AvatarImage
                      src={item.user_profile.avatar_url}
                      alt={item.user_profile.name ?? 'Member'}
                    />
                  ) : (
                    <AvatarFallback>
                      <User className='w-4 h-4 text-text-secondary' />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <div className='text-text-primary font-medium'>
                    {item.user_profile?.name || 'Unknown'}
                  </div>
                  <div className='text-xs text-text-muted capitalize'>
                    {item.role}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className='px-3 py-3 text-sm text-text-muted'>
              No members found
            </div>
          )}
        </div>
      </GlassCard>
    );
  }
);

MentionList.displayName = 'MentionList';
