'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { X, Check } from 'lucide-react';
import { useDrag } from '@use-gesture/react';
import { useEditor, EditorContent } from '@tiptap/react';
import GlassCard from '@/components/glass-card/GlassCard';
import { createEditorExtensions } from '../lib/editorExtensions';

interface NoteAIDiffDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (content: string) => void;
  originalContent: string;
  editedContent: string;
}

interface DiffLine {
  type: 'unchanged' | 'added' | 'removed';
  content: string;
}

/**
 * Simple line-based diff algorithm
 * Compares original and edited content line by line
 */
function computeDiff(original: string, edited: string): DiffLine[] {
  const originalLines = original.split('\n');
  const editedLines = edited.split('\n');
  const result: DiffLine[] = [];

  // LCS-based diff for better accuracy
  const lcs = computeLCS(originalLines, editedLines);

  let origIdx = 0;
  let editIdx = 0;
  let lcsIdx = 0;

  while (origIdx < originalLines.length || editIdx < editedLines.length) {
    if (lcsIdx < lcs.length) {
      // Output removed lines (in original but not in LCS at this position)
      while (
        origIdx < originalLines.length &&
        originalLines[origIdx] !== lcs[lcsIdx]
      ) {
        result.push({ type: 'removed', content: originalLines[origIdx] });
        origIdx++;
      }
      // Output added lines (in edited but not in LCS at this position)
      while (
        editIdx < editedLines.length &&
        editedLines[editIdx] !== lcs[lcsIdx]
      ) {
        result.push({ type: 'added', content: editedLines[editIdx] });
        editIdx++;
      }
      // Output unchanged line (common in both)
      if (origIdx < originalLines.length && editIdx < editedLines.length) {
        result.push({ type: 'unchanged', content: originalLines[origIdx] });
        origIdx++;
        editIdx++;
        lcsIdx++;
      }
    } else {
      // No more LCS, output remaining as removed/added
      while (origIdx < originalLines.length) {
        result.push({ type: 'removed', content: originalLines[origIdx] });
        origIdx++;
      }
      while (editIdx < editedLines.length) {
        result.push({ type: 'added', content: editedLines[editIdx] });
        editIdx++;
      }
    }
  }

  return result;
}

/**
 * Compute Longest Common Subsequence of lines
 */
function computeLCS(a: string[], b: string[]): string[] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find LCS
  const lcs: string[] = [];
  let i = m,
    j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      lcs.unshift(a[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcs;
}

export function NoteAIDiffDrawer({
  isOpen,
  onClose,
  onApply,
  originalContent,
  editedContent,
}: NoteAIDiffDrawerProps) {
  const [dragOffset, setDragOffset] = useState(0);
  const [currentContent, setCurrentContent] = useState(editedContent);
  const drawerRef = useRef<HTMLDivElement>(null);
  const membersRef = useRef([]);
  const notesRef = useRef([]);

  // Initialize TipTap editor for editing
  const extensions = useMemo(
    () =>
      createEditorExtensions({
        isGroupNote: false,
        membersRef,
        notesRef,
        aiSuggestionsEnabled: false,
        onAcceptSuggestion: () => {},
        onDismissSuggestion: () => {},
      }),
    []
  );

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content: currentContent || '',
    contentType: 'markdown',
    editable: true,
    editorProps: {
      attributes: {
        class:
          'prose prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none max-w-none min-h-full text-gray-300',
      },
    },
    onUpdate: ({ editor }) => {
      const markdown = editor.getMarkdown();
      setCurrentContent(markdown);
    },
  });

  // Update editor content when editedContent changes
  useEffect(() => {
    if (editor && editedContent && !editor.isDestroyed) {
      const currentMarkdown = editor.getMarkdown();
      if (currentMarkdown !== editedContent) {
        editor.commands.setContent(editedContent, { contentType: 'markdown' });
        setCurrentContent(editedContent);
      }
    }
  }, [editor, editedContent]);

  // Compute diff for visual display
  const diffLines = useMemo(
    () => computeDiff(originalContent, currentContent),
    [originalContent, currentContent]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Swipe down to close gesture handler
  const bind = useDrag(
    ({ last, movement: [, my], velocity: [, vy], direction: [, dy] }) => {
      // Only allow downward swipes
      if (my > 0) {
        if (last) {
          // Close if swiped down more than 100px or fast swipe down
          if (my > 100 || (vy > 0.5 && dy > 0)) {
            onClose();
            setDragOffset(0);
          } else {
            // Snap back
            setDragOffset(0);
          }
        } else {
          // Update drag offset during the drag
          setDragOffset(my);
        }
      }
    },
    {
      axis: 'y',
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    }
  );

  const handleApply = () => {
    if (editor) {
      const finalContent = editor.getMarkdown();
      onApply(finalContent);
    }
  };

  if (!isOpen || !editor) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/50 backdrop-blur-sm z-100'
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className='fixed inset-x-0 bottom-0 z-110 animate-[slide-up_0.3s_ease-out]'
        style={{
          transform: `translateY(${dragOffset}px)`,
          transition: dragOffset === 0 ? 'transform 0.2s ease-out' : 'none',
        }}
      >
        <GlassCard className='rounded-t-3xl rounded-b-none max-h-[80vh] flex flex-col'>
          {/* Drag Handle */}
          <div
            {...bind()}
            className='pt-2 pb-1 cursor-grab active:cursor-grabbing touch-none'
          >
            <div className='w-12 h-1 bg-white/20 rounded-full mx-auto' />
          </div>

          {/* Header */}
          <div className='flex items-center justify-between px-4 pb-2 pt-0 border-b border-white/10'>
            <button
              onClick={onClose}
              className='p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0'
              title='Close'
            >
              <X className='w-5 h-5 text-gray-400 hover:text-white transition-colors' />
            </button>

            <h3 className='text-lg font-semibold text-white'>AI編集結果</h3>

            <button
              onClick={handleApply}
              className='p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0'
              title='Apply changes'
            >
              <Check className='w-5 h-5 text-gray-400 hover:text-white transition-colors' />
            </button>
          </div>

          {/* Editable Content */}
          <div className='flex-1 overflow-y-auto p-4'>
            <div className='prose prose-invert max-w-none'>
              <EditorContent editor={editor} />
            </div>
          </div>
        </GlassCard>
      </div>
    </>
  );
}
