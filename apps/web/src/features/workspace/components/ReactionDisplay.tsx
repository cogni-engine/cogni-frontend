'use client';

import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import type { MessageReaction } from '@/types/workspace';

export default function ReactionDisplay({
  reactions,
  currentMemberId,
  onReactionClick,
}: {
  reactions: MessageReaction[];
  currentMemberId: number;
  onReactionClick: (emoji: string) => void;
}) {
  const [openEmoji, setOpenEmoji] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Group reactions by emoji
  const grouped = reactions.reduce<Map<string, MessageReaction[]>>((acc, r) => {
    const list = acc.get(r.emoji) ?? [];
    list.push(r);
    acc.set(r.emoji, list);
    return acc;
  }, new Map());

  // クリック外でポップオーバーを閉じる
  useEffect(() => {
    if (!openEmoji) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setOpenEmoji(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openEmoji]);

  // リアクションがない場合は何も表示しない（右クリックメニューの「React」からのみ追加）
  if (grouped.size === 0) return null;

  return (
    <div className='flex flex-wrap items-center gap-1' ref={popoverRef}>
      {Array.from(grouped.entries()).map(([emoji, list]) => {
        const hasCurrentUser = list.some(
          r => r.workspace_member_id === currentMemberId
        );
        const isOpen = openEmoji === emoji;
        return (
          <div key={emoji} className='relative'>
            <button
              type='button'
              onClick={() =>
                setOpenEmoji(prev => (prev === emoji ? null : emoji))
              }
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm transition-colors ${
                hasCurrentUser
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <span>{emoji}</span>
              {list.length > 1 && (
                <span className='text-xs opacity-80'>{list.length}</span>
              )}
            </button>
            {/* クリック時にリアクションした人の一覧を表示 */}
            {isOpen && (
              <div className='absolute bottom-full left-0 mb-1 min-w-[160px] max-w-[240px] rounded-lg bg-black/90 backdrop-blur-xl border border-white/10 shadow-xl z-50 overflow-hidden'>
                <div className='px-3 py-2 border-b border-white/10'>
                  <span className='text-xs text-white/60'>
                    {emoji} のリアクション
                  </span>
                </div>
                <ul className='max-h-[200px] overflow-y-auto py-2'>
                  {list.map(r => {
                    const name =
                      r.workspace_member?.user_profile?.name ?? 'Unknown';
                    const avatarUrl =
                      r.workspace_member?.user_profile?.avatar_url ?? null;
                    const isCurrentUser =
                      r.workspace_member_id === currentMemberId;
                    return (
                      <li
                        key={r.id}
                        className='flex items-center gap-2 px-3 py-1.5 hover:bg-white/5'
                      >
                        <Avatar className='h-6 w-6 shrink-0'>
                          {avatarUrl ? (
                            <AvatarImage src={avatarUrl} alt={name} />
                          ) : (
                            <AvatarFallback className='text-[10px]'>
                              <User className='h-3 w-3' />
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <span className='text-sm text-white truncate flex-1'>
                          {name}
                          {isCurrentUser && (
                            <span className='text-white/50 ml-1'>(あなた)</span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                {hasCurrentUser && (
                  <div className='border-t border-white/10 p-2'>
                    <button
                      type='button'
                      onClick={() => {
                        onReactionClick(emoji);
                        setOpenEmoji(null);
                      }}
                      className='w-full text-left px-2 py-1.5 text-xs text-red-400 hover:bg-red-500/10 rounded transition-colors'
                    >
                      リアクションを取り消す
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
