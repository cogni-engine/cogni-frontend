'use client';

import { useState, useEffect, useRef } from 'react';
import { Copy, Trash2, RotateCcw, Trash } from 'lucide-react';

interface NoteContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onSoftDelete?: () => void;
  onHardDelete?: () => void;
  onDuplicate?: () => void;
  onRestore?: () => void;
  isDeleted?: boolean;
}

export default function NoteContextMenu({
  x,
  y,
  onClose,
  onSoftDelete,
  onHardDelete,
  onDuplicate,
  onRestore,
  isDeleted = false,
}: NoteContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x, y });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
    document.addEventListener('keydown', handleEscape);

    // Adjust position if menu goes off-screen
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let adjustedX = x;
      let adjustedY = y;

      if (rect.right > viewportWidth) {
        adjustedX = viewportWidth - rect.width - 10;
      }

      if (rect.bottom > viewportHeight) {
        adjustedY = viewportHeight - rect.height - 10;
      }

      if (adjustedX !== x || adjustedY !== y) {
        setPosition({ x: adjustedX, y: adjustedY });
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [x, y, onClose]);

  const handleAction = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className='fixed z-50 bg-white/8 backdrop-blur-xl border border-black rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)] py-2 px-2 min-w-[180px] overflow-hidden'
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {isDeleted ? (
        <>
          {/* Restore option for deleted notes */}
          {onRestore && (
            <button
              onClick={() => handleAction(onRestore)}
              className='w-full px-3 py-2.5 text-left text-sm text-white hover:bg-white/10 flex items-center gap-3 transition-all duration-200 rounded-lg mb-1'
            >
              <RotateCcw className='w-4 h-4 text-blue-400' />
              <span className='font-medium'>Restore</span>
            </button>
          )}
          {/* Hard delete option for deleted notes */}
          {onHardDelete && (
            <button
              onClick={() => handleAction(onHardDelete)}
              className='w-full px-3 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-3 transition-all duration-200 rounded-lg'
            >
              <Trash className='w-4 h-4' />
              <span className='font-medium'>Delete Permanently</span>
            </button>
          )}
        </>
      ) : (
        <>
          {/* Duplicate option for active notes */}
          {onDuplicate && (
            <button
              onClick={() => handleAction(onDuplicate)}
              className='w-full px-3 py-2.5 text-left text-sm text-white hover:bg-white/10 flex items-center gap-3 transition-all duration-200 rounded-lg mb-1'
            >
              <Copy className='w-4 h-4 text-blue-400' />
              <span className='font-medium'>Duplicate</span>
            </button>
          )}
          {/* Soft delete option for active notes */}
          {onSoftDelete && (
            <>
              <div className='h-px bg-white/10 my-2' />
              <button
                onClick={() => handleAction(onSoftDelete)}
                className='w-full px-3 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-3 transition-all duration-200 rounded-lg'
              >
                <Trash2 className='w-4 h-4' />
                <span className='font-medium'>Move to Trash</span>
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
