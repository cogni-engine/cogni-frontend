'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { useMemo, useEffect } from 'react';
import { useTiptapExtensions } from './extensions/useTiptapExtensions';
import type { WorkspaceMember } from '@/types/workspace';
import type { Note } from '@/types/note';
import type { WorkspaceFile } from '@/lib/api/workspaceFilesApi';

interface TiptapRendererProps {
  content: string;
  contentType?: 'markdown' | 'json';
  className?: string;
  enableMemberMentions?: boolean;
  enableNoteMentions?: boolean;
  enableFileMentions?: boolean;
  workspaceMembers?: WorkspaceMember[];
  workspaceNotes?: Note[];
  workspaceFiles?: WorkspaceFile[];
  onMentionClick?: (memberId: number) => void;
  onNoteMentionClick?: (noteId: number) => void;
  onFileMentionClick?: (fileId: number) => void;
}

/**
 * TiptapRenderer - Displays TipTap content in read-only mode
 * Used for rendering messages, previews, etc.
 * Optimized with memoization to reduce re-renders
 */
function TiptapRenderer({
  content,
  contentType = 'markdown',
  className = '',
  enableMemberMentions = false,
  enableNoteMentions = false,
  workspaceMembers = [],
  workspaceNotes = [],
  onMentionClick,
  onNoteMentionClick,
  onFileMentionClick,
}: TiptapRendererProps) {
  // Preprocess markdown to convert [# ...] and [@ ...] mentions to HTML
  const processedContent = useMemo(() => {
    if (contentType !== 'markdown' || !content) return content;

    let processed = content;

    // Convert note mentions: [# id="..." label="..." noteId="..."] to HTML
    processed = processed.replace(
      /\[#\s+id="([^"]*)"\s+label="([^"]*)"(?:\s+noteId="([^"]*)")?\]/g,
      (match, id, label, noteId) => {
        return `<span class="note-mention" data-type="noteMention" data-id="${id}" data-label="${label}" ${noteId ? `data-note-id="${noteId}"` : ''}>#${label}</span>`;
      }
    );

    // Convert member mentions: [@ id="..." label="..." workspaceMemberId="..."] to HTML
    processed = processed.replace(
      /\[@\s+id="([^"]*)"\s+label="([^"]*)"(?:\s+workspaceMemberId="([^"]*)")?\]/g,
      (match, id, label, workspaceMemberId) => {
        return `<span class="mention" data-type="mention" data-id="${id}" data-label="${label}" ${workspaceMemberId ? `data-workspace-member-id="${workspaceMemberId}"` : ''}>@${label}</span>`;
      }
    );

    return processed;
  }, [content, contentType]);

  const extensions = useTiptapExtensions({
    mode: 'readonly',
    enableMemberMentions,
    enableNoteMentions,
    workspaceMembers,
    workspaceNotes,
  });

  // Memoize editorProps to prevent recreating on every render
  const editorProps = useMemo(
    () => ({
      attributes: {
        class: `tiptap-editor ${className}`,
      },
      handleClickOn: (
        view: unknown,
        pos: number,
        node: {
          type: { name: string };
          attrs: {
            workspaceMemberId?: number;
            noteId?: number;
            fileId?: number;
          };
        },
        nodePos: number,
        event: MouseEvent
      ) => {
        // Handle mention clicks
        if (node.type.name === 'mention' && onMentionClick) {
          const memberId = node.attrs.workspaceMemberId;
          if (memberId) {
            event.preventDefault();
            onMentionClick(memberId);
          }
          return true;
        }
        // Handle note mention clicks
        if (node.type.name === 'noteMention' && onNoteMentionClick) {
          const noteId = node.attrs.noteId;
          if (noteId) {
            event.preventDefault();
            onNoteMentionClick(noteId);
          }
          return true;
        }
        // Handle file mention clicks
        if (node.type.name === 'fileMention' && onFileMentionClick) {
          const fileId = node.attrs.fileId;
          if (fileId) {
            event.preventDefault();
            onFileMentionClick(fileId);
          }
          return true;
        }
        return false;
      },
    }),
    [className, onMentionClick, onNoteMentionClick, onFileMentionClick]
  );

  const editor = useEditor({
    immediatelyRender: true,
    shouldRerenderOnTransaction: true,
    extensions,
    content: processedContent || '',
    contentType: contentType,
    editable: false,
    editorProps,
  });

  // Update editor content when content prop changes (for streaming)
  useEffect(() => {
    if (!editor || processedContent === undefined) return;

    // Get current content as markdown to compare
    const currentContent =
      contentType === 'markdown' ? editor.getMarkdown() : editor.getText();
    const newContent = processedContent || '';

    // Only update if content has actually changed
    if (currentContent !== newContent) {
      // Use queueMicrotask to avoid batching issues
      queueMicrotask(() => {
        // Set content with proper contentType for markdown parsing
        editor.commands.setContent(newContent, { contentType });
      });
    }
  }, [editor, processedContent, contentType]);

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
}

export { TiptapRenderer };
