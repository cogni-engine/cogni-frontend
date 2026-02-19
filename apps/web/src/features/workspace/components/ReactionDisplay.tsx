'use client';

import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import GlassCard from '@/components/glass-design/GlassCard';
import type { MessageReaction } from '@/types/workspace';

function ReactionPopover({
  reactions,
  currentMemberId,
  onReactionClick,
  onClose,
}: {
  reactions: MessageReaction[];
  currentMemberId: number;
  onReactionClick: (emoji: string) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [align, setAlign] = useState<'center' | 'left' | 'right'>('center');

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const padding = 8;
    if (rect.right > window.innerWidth - padding) {
      setAlign('right');
    } else if (rect.left < padding) {
      setAlign('left');
    }
  }, []);

  const hasCurrentUser = reactions.some(
    r => r.workspace_member_id === currentMemberId
  );

  const alignClass =
    align === 'right'
      ? 'right-0'
      : align === 'left'
        ? 'left-0'
        : 'left-1/2 -translate-x-1/2';

  return (
    <div ref={ref} className={`absolute bottom-full ${alignClass} mb-2 z-50`}>
      <GlassCard className='min-w-[180px] max-w-[240px] rounded-2xl shadow-xl overflow-hidden'>
        <div className='py-1.5'>
          {reactions.map(r => {
            const name = r.workspace_member?.user_profile?.name ?? 'Unknown';
            const avatarUrl =
              r.workspace_member?.user_profile?.avatar_url ?? null;
            const isCurrentUser = r.workspace_member_id === currentMemberId;
            return (
              <div key={r.id} className='flex items-center gap-2.5 px-3 py-2'>
                <Avatar className='h-6 w-6 shrink-0 border border-border-subtle'>
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt={name} />
                  ) : (
                    <AvatarFallback className='text-[10px] bg-surface-secondary'>
                      <User className='h-3 w-3' />
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className='text-[13px] text-text-primary truncate flex-1'>
                  {name}
                  {isCurrentUser && (
                    <span className='text-text-muted text-xs ml-1'>(you)</span>
                  )}
                </span>
                <span className='text-sm shrink-0'>{r.emoji}</span>
              </div>
            );
          })}
        </div>
        {hasCurrentUser && (
          <>
            <div className='mx-3 border-t border-border-default' />
            <div className='p-1.5'>
              <button
                type='button'
                onClick={() => {
                  const myReaction = reactions.find(
                    r => r.workspace_member_id === currentMemberId
                  );
                  if (myReaction) {
                    onReactionClick(myReaction.emoji);
                    onClose();
                  }
                }}
                className='w-full text-center px-3 py-1.5 text-xs text-red-400 hover:text-red-300 rounded-xl hover:bg-white/5 transition-colors'
              >
                Remove reaction
              </button>
            </div>
          </>
        )}
      </GlassCard>
    </div>
  );
}

export default function ReactionDisplay({
  reactions,
  currentMemberId,
  onReactionClick,
  interactive = true,
}: {
  reactions: MessageReaction[];
  currentMemberId: number;
  onReactionClick: (emoji: string) => void;
  interactive?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Group reactions by emoji
  const grouped = reactions.reduce<Map<string, MessageReaction[]>>((acc, r) => {
    const list = acc.get(r.emoji) ?? [];
    list.push(r);
    acc.set(r.emoji, list);
    return acc;
  }, new Map());

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, handleClickOutside]);

  if (grouped.size === 0) return null;

  const totalCount = reactions.length;
  const emojis = Array.from(grouped.keys());

  return (
    <div className='relative inline-flex' ref={popoverRef}>
      <button
        type='button'
        onClick={interactive ? () => setIsOpen(prev => !prev) : undefined}
        className={`inline-flex items-center gap-[3px] bg-surface-secondary/80 backdrop-blur-sm border border-border-default rounded-full px-1.5 py-0.5 shadow-sm ${
          interactive
            ? 'active:scale-95 transition-transform'
            : 'pointer-events-none'
        }`}
      >
        {emojis.map(emoji => (
          <span key={emoji} className='text-base leading-none'>
            {emoji}
          </span>
        ))}
        {totalCount > 1 && (
          <span className='text-[11px] text-text-secondary leading-none'>
            {totalCount}
          </span>
        )}
      </button>
      {isOpen && interactive && (
        <ReactionPopover
          reactions={reactions}
          currentMemberId={currentMemberId}
          onReactionClick={onReactionClick}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
