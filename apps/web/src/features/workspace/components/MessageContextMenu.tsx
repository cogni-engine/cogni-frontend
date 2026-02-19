'use client';

import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { Reply, Copy, Check, Smile, Pencil } from 'lucide-react';
import GlassCard from '@/components/glass-design/GlassCard';

type MessageContextMenuProps = {
  messageText: string;
  onReply: () => void;
  onEdit?: () => void;
  onReact?: () => void;
  onClose: () => void;
  position: { x: number; y: number };
  isOwnMessage?: boolean;
};

export default function MessageContextMenu({
  messageText,
  onReply,
  onEdit,
  onReact,
  onClose,
  position,
  isOwnMessage = false,
}: MessageContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [adjustedPos, setAdjustedPos] = useState<{
    left: number;
    top: number;
    visible: boolean;
  }>({ left: position.x, top: position.y, visible: false });

  // Adjust position to stay within viewport after menu renders
  useLayoutEffect(() => {
    if (!menuRef.current) return;

    const { width, height } = menuRef.current.getBoundingClientRect();

    let left = position.x;
    let top = position.y;

    // Keep within viewport
    if (left + width > window.innerWidth) {
      left = window.innerWidth - width - 8;
    }
    if (left < 8) left = 8;
    if (top + height > window.innerHeight) {
      top = window.innerHeight - height - 8;
    }
    if (top < 8) top = 8;

    setAdjustedPos({ left, top, visible: true });
  }, [position]);

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose();
      }, 1000);
    } catch (err) {
      console.error('Failed to copy text:', err);
      onClose();
    }
  };

  // Portal to document.body to escape parent transform stacking contexts
  return createPortal(
    <GlassCard
      ref={menuRef}
      className='fixed z-50 rounded-3xl p-2 min-w-[140px]'
      style={{
        left: adjustedPos.left,
        top: adjustedPos.top,
        visibility: adjustedPos.visible ? 'visible' : 'hidden',
      }}
    >
      <button
        onClick={() => {
          onReply();
          onClose();
        }}
        className='w-full p-2 text-left text-sm text-text-primary hover:bg-surface-primary flex items-center gap-2 transition-colors rounded-xl mb-1'
      >
        <Reply className='w-4 h-4 text-text-primary' />
        <span>Reply</span>
      </button>
      {isOwnMessage && onEdit && (
        <button
          onClick={() => {
            onEdit();
            onClose();
          }}
          className='w-full p-2 text-left text-sm text-text-primary hover:bg-surface-primary flex items-center gap-2 transition-colors rounded-xl mb-1'
        >
          <Pencil className='w-4 h-4 text-text-primary' />
          <span>Edit</span>
        </button>
      )}
      {onReact && (
        <button
          onClick={() => {
            onReact();
            onClose();
          }}
          className='w-full px-4 py-3 flex items-center gap-3 text-text-primary hover:bg-interactive-hover transition-colors text-sm border-b border-border-default'
        >
          <Smile className='w-4 h-4' />
          <span>React</span>
        </button>
      )}
      <button
        onClick={handleCopy}
        className='w-full p-2 text-left text-sm text-text-primary hover:bg-surface-primary flex items-center gap-2 transition-colors rounded-xl'
      >
        {copied ? (
          <>
            <Check className='w-4 h-4 text-text-primary' />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className='w-4 h-4 text-text-primary' />
            <span>Copy</span>
          </>
        )}
      </button>
    </GlassCard>,
    document.body
  );
}
