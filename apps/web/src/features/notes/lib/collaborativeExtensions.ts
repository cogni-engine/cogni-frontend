import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCaret from '@tiptap/extension-collaboration-caret';
import Heading from '@tiptap/extension-heading';
import { Markdown } from '@tiptap/markdown';
import { HocuspocusProvider } from '@hocuspocus/provider';
import * as Y from 'yjs';
import { CustomMention } from '@/lib/tiptap/MentionExtension';
import { createMentionSuggestion } from '@/lib/tiptap/mentionSuggestion';
import { NoteMention } from '@/lib/tiptap/NoteMentionExtension';
import { createNoteMentionSuggestion } from '@/lib/tiptap/noteMentionSuggestion';
import { DiffSuggestionMark } from '@/lib/tiptap/DiffSuggestionMark';
import { DiffSuggestionBlockNode } from '@/lib/tiptap/DiffSuggestionBlockNode';
import { BlockIdExtension } from '@/lib/tiptap/BlockIdExtension';
import { WorkspaceMember } from '@/types/workspace';
import type { NoteWithParsed } from '@/types/note';

// Block ID attribute configuration - now handled globally by BlockIdExtension
// No need for manual extensions - BlockIdExtension adds blockId to all block nodes automatically

interface UserInfo {
  name: string;
  color: string;
  id: string;
}

interface CreateCollaborativeExtensionsProps {
  ydoc: Y.Doc;
  provider: HocuspocusProvider;
  isGroupNote: boolean;
  membersRef: React.MutableRefObject<WorkspaceMember[]>;
  notesRef: React.MutableRefObject<NoteWithParsed[]>;
  user: UserInfo;
}

export function createCollaborativeExtensions({
  ydoc,
  provider,
  isGroupNote,
  membersRef,
  notesRef,
  user,
}: CreateCollaborativeExtensionsProps) {
  return [
    // StarterKit provides basic formatting (bold, italic, etc.)
    // We disable history (Y.js handles it) but keep all other nodes
    StarterKit.configure({
      // Disable history - Y.js handles this via Collaboration extension
      history: false,
    } as Parameters<typeof StarterKit.configure>[0]),

    // Markdown extension - enables markdown parsing for AI suggestions
    Markdown,

    // Override heading to support more levels
    Heading.configure({
      levels: [1, 2, 3, 4, 5, 6],
    }),

    // Placeholder text when editor is empty
    Placeholder.configure({
      placeholder: 'Start typing to collaborate...',
    }),

    // Image extension with custom attributes
    Image.extend({
      addAttributes() {
        return {
          ...this.parent?.(),
          'data-file-id': {
            default: null,
            parseHTML: element => element.getAttribute('data-file-id'),
            renderHTML: attributes => {
              if (!attributes['data-file-id']) {
                return {};
              }
              return {
                'data-file-id': attributes['data-file-id'],
              };
            },
          },
        };
      },
    }).configure({
      inline: true,
      allowBase64: false,
      HTMLAttributes: {
        class: 'editor-image',
      },
    }),

    // Task lists
    TaskList.configure({
      HTMLAttributes: {
        class: 'task-list',
      },
    }),
    TaskItem.configure({
      nested: true,
      HTMLAttributes: {
        class: 'task-item',
      },
    }),

    // Y.js Collaboration extension - syncs editor content via Y.Doc
    Collaboration.configure({
      document: ydoc,
    }),

    // Collaboration caret - shows other users' cursors and selections
    CollaborationCaret.configure({
      provider,
      user: {
        name: user.name,
        color: user.color,
      },
      render: user => {
        // Create cursor container
        const cursor = document.createElement('span');
        cursor.classList.add('collaboration-cursor');

        // Create the caret (vertical line)
        const caret = document.createElement('span');
        caret.classList.add('collaboration-cursor__caret');
        caret.style.backgroundColor = user.color;

        // Create the label (user name)
        const label = document.createElement('span');
        label.classList.add('collaboration-cursor__label');
        label.style.backgroundColor = user.color;
        label.textContent = user.name;

        cursor.appendChild(caret);
        cursor.appendChild(label);

        return cursor;
      },
    }),

    // Member mention extension only for group notes
    ...(isGroupNote
      ? [
          CustomMention.configure({
            HTMLAttributes: {
              class: 'mention',
            },
            suggestion: createMentionSuggestion(() => membersRef.current),
          }),
        ]
      : []),

    // Note mention extension (available in all workspaces)
    NoteMention.configure({
      HTMLAttributes: {
        class: 'note-mention',
      },
      suggestion: createNoteMentionSuggestion(() => notesRef.current),
    }),

    // Diff suggestion mark for AI-powered inline editing suggestions
    // This mark syncs via Y.js since it's part of the document
    // Configured with currentUserId for per-user ownership
    DiffSuggestionMark.configure({
      currentUserId: user.id,
    }),

    // Diff suggestion block node for block-level suggestions
    // Supports adding/deleting entire paragraphs with per-user ownership
    DiffSuggestionBlockNode.configure({
      currentUserId: user.id,
    }),

    // BlockId extension - automatically assigns unique IDs to all blocks
    // Must come AFTER other node extensions so it can process them
    BlockIdExtension,

    // NOTE: Markdown extension is NOT included here
    // Collaborative editing uses TipTap's native JSON format
  ];
}
