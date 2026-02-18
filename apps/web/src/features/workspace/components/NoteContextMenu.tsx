'use client';

import { useState, useEffect, useRef } from 'react';
import { Copy, Trash2, RotateCcw, Trash, FolderInput } from 'lucide-react';
import GlassCard from '@/components/glass-design/GlassCard';

interface NoteContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onSoftDelete?: () => void;
  onHardDelete?: () => void;
  onDuplicate?: () => void;
  onRestore?: () => void;
  onMove?: () => void;
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
  onMove,
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
    <GlassCard
      ref={menuRef}
      className='fixed z-50 rounded-3xl p-2 min-w-[180px]'
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
              className='w-full p-2 text-left text-sm text-text-primary hover:bg-surface-primary flex items-center gap-2 transition-colors rounded-xl mb-1'
            >
              <RotateCcw className='w-4 h-4 text-text-primary' />
              <span>Restore</span>
            </button>
          )}
          {/* Hard delete option for deleted notes */}
          {onHardDelete && (
            <button
              onClick={() => handleAction(onHardDelete)}
              className='w-full p-2 text-left text-sm text-text-primary hover:bg-surface-primary flex items-center gap-2 transition-colors rounded-xl'
            >
              <Trash className='w-4 h-4 text-text-primary' />
              <span>Delete Permanently</span>
            </button>
          )}
        </>
      ) : (
        <>
          {/* Duplicate option for active notes */}
          {onDuplicate && (
            <button
              onClick={() => handleAction(onDuplicate)}
              className='w-full p-2 text-left text-sm text-text-primary hover:bg-surface-primary flex items-center gap-2 transition-colors rounded-xl mb-1'
            >
              <Copy className='w-4 h-4 text-text-primary' />
              <span>Duplicate</span>
            </button>
          )}
          {/* Move to Folder option */}
          {onMove && (
            <button
              onClick={() => handleAction(onMove)}
              className='w-full p-2 text-left text-sm text-text-primary hover:bg-surface-primary flex items-center gap-2 transition-colors rounded-xl mb-1'
            >
              <FolderInput className='w-4 h-4 text-text-primary' />
              <span>Move to Folder</span>
            </button>
          )}
          {/* Soft delete option for active notes */}
          {onSoftDelete && (
            <>
              <div className='h-px bg-border-default my-2' />
              <button
                onClick={() => handleAction(onSoftDelete)}
                className='w-full p-2 text-left text-sm text-text-primary hover:bg-surface-primary flex items-center gap-2 transition-colors rounded-xl'
              >
                <Trash2 className='w-4 h-4 text-text-primary' />
                <span>Delete</span>
              </button>
            </>
          )}
        </>
      )}
    </GlassCard>
  );
}
