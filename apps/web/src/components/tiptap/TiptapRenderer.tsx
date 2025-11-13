'use client';

import { useEditor, EditorContent } from '@tiptap/react';
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
 */
export function TiptapRenderer({
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
  const extensions = useTiptapExtensions({
    mode: 'readonly',
    enableMemberMentions,
    enableNoteMentions,
    workspaceMembers,
    workspaceNotes,
  });

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content: content || '',
    contentType: contentType,
    editable: false,
    editorProps: {
      attributes: {
        class: `tiptap-editor ${className}`,
      },
      handleClickOn: (view, pos, node, nodePos, event) => {
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
    },
  });

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
}
