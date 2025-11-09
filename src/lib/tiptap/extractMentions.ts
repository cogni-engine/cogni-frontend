import type { Editor } from '@tiptap/core';

/**
 * Extract workspace member IDs from mention nodes in the editor
 */
export function extractMemberMentions(editor: Editor | null): number[] {
  if (!editor) return [];

  const mentionedIds: number[] = [];
  editor.state.doc.descendants(node => {
    if (node.type.name === 'mention' && node.attrs.workspaceMemberId) {
      mentionedIds.push(node.attrs.workspaceMemberId);
    }
  });

  return [...new Set(mentionedIds)]; // Remove duplicates
}

/**
 * Extract note IDs from note mention nodes in the editor
 */
export function extractNoteMentions(editor: Editor | null): number[] {
  if (!editor) return [];

  const mentionedNoteIds: number[] = [];
  editor.state.doc.descendants(node => {
    if (node.type.name === 'noteMention' && node.attrs.noteId) {
      mentionedNoteIds.push(node.attrs.noteId);
    }
  });

  return [...new Set(mentionedNoteIds)]; // Remove duplicates
}
