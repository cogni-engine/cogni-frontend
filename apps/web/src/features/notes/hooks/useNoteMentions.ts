import { useEffect, useState, useCallback } from 'react';
import { Editor } from '@tiptap/react';
import {
  syncNoteMemberMentions,
  syncNoteToNoteMentions,
} from '@/lib/api/mentionsApi';
import { createClient } from '@/lib/supabase/browserClient';
import { WorkspaceMember } from '@/types/workspace';

interface UseNoteMentionsProps {
  isGroupNote: boolean;
  noteId: number | undefined;
  workspaceId: number | undefined;
  editor: Editor | null;
  members: WorkspaceMember[];
  content: string | undefined;
}

export function useNoteMentions({
  isGroupNote,
  noteId,
  workspaceId,
  editor,
  members,
  content,
}: UseNoteMentionsProps) {
  const [currentMemberId, setCurrentMemberId] = useState<number | null>(null);
  const supabase = createClient();

  // Get current user's workspace member ID
  useEffect(() => {
    if (isGroupNote && workspaceId && members.length > 0) {
      const getCurrentMember = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const member = members.find(m => m.user_id === user.id);
          if (member) {
            setCurrentMemberId(member.id);
          }
        }
      };
      getCurrentMember();
    }
  }, [isGroupNote, workspaceId, members, supabase.auth]);

  // Function to extract mentioned member IDs from editor content
  const extractMemberMentions = useCallback(() => {
    if (!editor) return [];

    const mentionedIds: number[] = [];
    editor.state.doc.descendants(node => {
      if (node.type.name === 'mention' && node.attrs.workspaceMemberId) {
        mentionedIds.push(node.attrs.workspaceMemberId);
      }
    });

    return [...new Set(mentionedIds)]; // Remove duplicates
  }, [editor]);

  // Function to extract mentioned note IDs from editor content
  const extractNoteMentions = useCallback(() => {
    if (!editor) return [];

    const mentionedNoteIds: number[] = [];
    editor.state.doc.descendants(node => {
      if (node.type.name === 'noteMention' && node.attrs.noteId) {
        mentionedNoteIds.push(node.attrs.noteId);
      }
    });

    return [...new Set(mentionedNoteIds)]; // Remove duplicates
  }, [editor]);

  // Auto-save member mentions when content changes
  useEffect(() => {
    if (!isGroupNote || !noteId || !workspaceId || !currentMemberId || !editor)
      return;

    const saveMemberMentions = async () => {
      try {
        const mentionedMemberIds = extractMemberMentions();
        await syncNoteMemberMentions(
          noteId,
          workspaceId,
          mentionedMemberIds,
          currentMemberId
        );
      } catch (err) {
        console.error('Failed to save member mentions:', err);
      }
    };

    const timeout = setTimeout(saveMemberMentions, 1000);
    return () => clearTimeout(timeout);
  }, [
    content,
    isGroupNote,
    noteId,
    workspaceId,
    currentMemberId,
    extractMemberMentions,
    editor,
  ]);

  // Auto-save note mentions when content changes
  useEffect(() => {
    if (!noteId || !workspaceId || !currentMemberId || !editor) return;

    const saveNoteMentions = async () => {
      try {
        const mentionedNoteIds = extractNoteMentions();
        await syncNoteToNoteMentions(
          noteId,
          workspaceId,
          mentionedNoteIds,
          currentMemberId
        );
      } catch (err) {
        console.error('Failed to save note mentions:', err);
      }
    };

    const timeout = setTimeout(saveNoteMentions, 1000);
    return () => clearTimeout(timeout);
  }, [
    content,
    noteId,
    workspaceId,
    currentMemberId,
    extractNoteMentions,
    editor,
  ]);

  return {
    currentMemberId,
    extractMemberMentions,
    extractNoteMentions,
  };
}
