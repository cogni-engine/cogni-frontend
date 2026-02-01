'use client';

import { REACTION_EMOJIS } from '@/types/workspace';
import { useRef, useEffect, useLayoutEffect, useState } from 'react';

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

  // 画面内に収まるように位置を調整（調整完了まで非表示でちらつき防止）
  useLayoutEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = position.x;
    let y = position.y;

    // 右端にはみ出さない
    if (x + rect.width > viewportWidth - PICKER_PADDING) {
      x = viewportWidth - rect.width - PICKER_PADDING;
    }
    // 左端にはみ出さない
    if (x < PICKER_PADDING) {
      x = PICKER_PADDING;
    }
    // 下端にはみ出さない
    if (y + rect.height > viewportHeight - PICKER_PADDING) {
      y = viewportHeight - rect.height - PICKER_PADDING;
    }
    // 上端にはみ出さない
    if (y < PICKER_PADDING) {
      y = PICKER_PADDING;
    }

    setAdjustedPosition({ x, y });
    setIsPositioned(true);
  }, [position.x, position.y]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
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
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className='fixed z-50 bg-white/15 backdrop-blur-xl border border-black/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] overflow-hidden'
      style={{
        left: `${adjustedPosition.x}px`,
        top: `${adjustedPosition.y}px`,
        visibility: isPositioned ? 'visible' : 'hidden',
      }}
    >
      <div className='p-2 grid grid-cols-4 gap-1'>
        {REACTION_EMOJIS.map(emoji => (
          <button
            key={emoji}
            type='button'
            onClick={() => {
              onSelect(emoji);
              onClose();
            }}
            className='w-10 h-10 flex items-center justify-center text-xl rounded-lg hover:bg-white/20 transition-colors'
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
