import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { CustomMention } from '@/lib/tiptap/MentionExtension';
import { createMentionSuggestion } from '@/lib/tiptap/mentionSuggestion';
import { NoteMention } from '@/lib/tiptap/NoteMentionExtension';
import { createNoteMentionSuggestion } from '@/lib/tiptap/noteMentionSuggestion';
import { AiCompletion } from '@/lib/tiptap/AiCompletionExtension';
import { WorkspaceMember } from '@/types/workspace';

interface CreateEditorExtensionsProps {
  isGroupNote: boolean;
  membersRef: React.MutableRefObject<WorkspaceMember[]>;
  notesRef: React.MutableRefObject<any[]>;
  aiSuggestionsEnabled: boolean;
  onAcceptSuggestion: () => void;
  onDismissSuggestion: () => void;
}

export function createEditorExtensions({
  isGroupNote,
  membersRef,
  notesRef,
  aiSuggestionsEnabled,
  onAcceptSuggestion,
  onDismissSuggestion,
}: CreateEditorExtensionsProps) {
  return [
    // AI Completion FIRST - needs to capture Tab before other extensions
    AiCompletion.configure({
      suggestion: null,
      onAccept: onAcceptSuggestion,
      onDismiss: onDismissSuggestion,
      enabled: aiSuggestionsEnabled,
    }),
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
      },
      code: false,
    }),
    Placeholder.configure({
      placeholder: 'メモを入力...',
    }),
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
    // Add member mention extension only for group notes
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
    // Add note mention extension (available in all workspaces)
    NoteMention.configure({
      HTMLAttributes: {
        class: 'note-mention',
      },
      suggestion: createNoteMentionSuggestion(() => notesRef.current),
    }),
    Markdown,
  ];
}
