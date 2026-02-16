import { useRef, useMemo } from 'react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { CustomMention } from '@/lib/tiptap/MentionExtension';
import { NoteMention } from '@/lib/tiptap/NoteMentionExtension';
import { createMentionSuggestion } from '@/lib/tiptap/mentionSuggestion';
import { createNoteMentionSuggestion } from '@/lib/tiptap/noteMentionSuggestion';
import type { WorkspaceMember } from '@/types/workspace';
import type { Note, NoteWithParsed } from '@/types/note';

export type TiptapMode = 'full' | 'chat' | 'minimal' | 'readonly';

export interface UseTiptapExtensionsConfig {
  mode: TiptapMode;
  placeholder?: string;
  enableMemberMentions?: boolean;
  enableNoteMentions?: boolean;
  workspaceMembers?: WorkspaceMember[];
  workspaceNotes?: Note[] | NoteWithParsed[];
}

/**
 * Hook to get configured TipTap extensions based on use case
 */
export function useTiptapExtensions({
  mode,
  placeholder = 'Start typing...',
  enableMemberMentions = false,
  enableNoteMentions = false,
  workspaceMembers = [],
  workspaceNotes = [],
}: UseTiptapExtensionsConfig): any[] {
  // Use refs to avoid recreating suggestion components on every render
  const membersRef = useRef<WorkspaceMember[]>([]);
  const notesRef = useRef<Note[] | NoteWithParsed[]>([]);

  // Update refs when data changes
  membersRef.current = workspaceMembers;
  notesRef.current = workspaceNotes;

  // Memoize extensions - recreate when config or data changes
  return useMemo(() => {
    const extensions: any[] = [];

    const linkExtension = Link.configure({
      openOnClick: true,
      HTMLAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer',
        class: 'tiptap-link',
      },
      autolink: true,
    });

    // Base extensions for all modes
    if (mode === 'readonly' || mode === 'minimal') {
      // Read-only mode: full feature set like NoteEditor but without editing
      extensions.push(
        StarterKit.configure({
          heading: { levels: [1, 2, 3] },
          code: false,
        }),
        Markdown,
        Image,
        linkExtension,
        TaskList,
        TaskItem.configure({
          nested: true,
        })
      );
    } else if (mode === 'chat') {
      // Chat mode: basic formatting only (bold, italic, mentions)
      extensions.push(
        StarterKit.configure({
          heading: false, // No headings in chat
          blockquote: false, // No blockquotes in chat
          codeBlock: false, // No code blocks in chat
          horizontalRule: false, // No horizontal rules in chat
          code: false,
        }),
        Placeholder.configure({
          placeholder,
          showOnlyCurrent: false,
          showOnlyWhenEditable: false,
          includeChildren: true,
        }),
        Markdown,
        linkExtension
      );
    } else if (mode === 'full') {
      // Full editor mode (for notes)
      extensions.push(
        StarterKit.configure({
          heading: { levels: [1, 2, 3] },
          code: false,
        }),
        Placeholder.configure({ placeholder }),
        Markdown,
        Image,
        linkExtension,
        TaskList,
        TaskItem.configure({
          nested: true,
        })
      );
    }

    // Add member mentions if enabled
    if (enableMemberMentions) {
      extensions.push(
        CustomMention.configure({
          HTMLAttributes: {
            class: 'mention',
          },
          suggestion: createMentionSuggestion(() => membersRef.current),
        })
      );
    }

    // Add note mentions if enabled
    if (enableNoteMentions) {
      extensions.push(
        NoteMention.configure({
          HTMLAttributes: {
            class: 'note-mention',
          },
          suggestion: createNoteMentionSuggestion(
            () => notesRef.current as NoteWithParsed[]
          ),
        })
      );
    }

    return extensions;
  }, [mode, placeholder, enableMemberMentions, enableNoteMentions]);
}
