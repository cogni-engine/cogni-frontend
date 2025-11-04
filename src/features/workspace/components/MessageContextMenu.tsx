'use client';

import { useEffect, useRef, useState } from 'react';
import { Reply, Copy, Check } from 'lucide-react';

type MessageContextMenuProps = {
  messageText: string;
  onReply: () => void;
  onClose: () => void;
  position: { x: number; y: number };
};

export default function MessageContextMenu({
  messageText,
  onReply,
  onClose,
  position,
}: MessageContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

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

  return (
    <div
      ref={menuRef}
      className='fixed z-50 bg-white/15 backdrop-blur-xl border border-black rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] overflow-hidden'
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <button
        onClick={() => {
          onReply();
          onClose();
        }}
        className='w-full px-4 py-3 flex items-center gap-3 text-white hover:bg-white/10 transition-colors text-sm border-b border-white/10'
      >
        <Reply className='w-4 h-4' />
        <span>Reply</span>
      </button>
      <button
        onClick={handleCopy}
        className='w-full px-4 py-3 flex items-center gap-3 text-white hover:bg-white/10 transition-colors text-sm'
      >
        {copied ? (
          <>
            <Check className='w-4 h-4' />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className='w-4 h-4' />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
