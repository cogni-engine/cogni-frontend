'use client';

import { REACTION_EMOJIS } from '@/types/workspace';
import { useRef, useEffect, useLayoutEffect, useState, useMemo } from 'react';
import { getInitialEmojis, pushRecent } from '../utils/reactionUtils';

type Props = {
  onSelect: (emoji: string) => void;
  onClose: () => void;
  position: { x: number; y: number };
};

const PICKER_PADDING = 8;

export default function ReactionPicker({ onSelect, onClose, position }: Props) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [adjustedPosition, setAdjustedPosition] = useState(position);
  const [isPositioned, setIsPositioned] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const recentEmojis = useMemo(() => getInitialEmojis(), []);

  const handleSelect = (emoji: string) => {
    pushRecent(emoji);
    onSelect(emoji);
    onClose();
  };

  // 画面内に収まるように位置を調整（調整完了まで非表示でちらつき防止）
  useLayoutEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = position.x;
    let y = position.y;

    if (x + rect.width > viewportWidth - PICKER_PADDING) {
      x = viewportWidth - rect.width - PICKER_PADDING;
    }
    if (x < PICKER_PADDING) {
      x = PICKER_PADDING;
    }
    if (y + rect.height > viewportHeight - PICKER_PADDING) {
      y = viewportHeight - rect.height - PICKER_PADDING;
    }
    if (y < PICKER_PADDING) {
      y = PICKER_PADDING;
    }

    setAdjustedPosition({ x, y });
    setIsPositioned(true);
  }, [position.x, position.y, showAll]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showAll) setShowAll(false);
        else onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose, showAll]);

  const emojisToShow = showAll ? [...REACTION_EMOJIS] : recentEmojis;

  return (
    <div
      ref={menuRef}
      className='fixed z-50 bg-surface-secondary dark:backdrop-blur-xl border border-border-default rounded-2xl shadow-card overflow-hidden'
      style={{
        left: `${adjustedPosition.x}px`,
        top: `${adjustedPosition.y}px`,
        visibility: isPositioned ? 'visible' : 'hidden',
      }}
    >
      <div className='p-2 grid grid-cols-4 gap-1'>
        {emojisToShow.map(emoji => (
          <button
            key={emoji}
            type='button'
            onClick={() => handleSelect(emoji)}
            className='w-10 h-10 flex items-center justify-center text-xl rounded-lg hover:bg-interactive-active transition-colors'
          >
            {emoji}
          </button>
        ))}
      </div>
      <div className='border-t border-border-default px-2 pb-2 pt-1'>
        {showAll ? (
          <button
            type='button'
            onClick={() => setShowAll(false)}
            className='w-full py-2 text-sm text-text-secondary hover:bg-interactive-hover rounded-lg transition-colors'
          >
            Close
          </button>
        ) : (
          <button
            type='button'
            onClick={() => setShowAll(true)}
            className='w-full py-2 text-sm text-text-secondary hover:bg-interactive-hover rounded-lg transition-colors'
          >
            More
          </button>
        )}
      </div>
    </div>
  );
}
