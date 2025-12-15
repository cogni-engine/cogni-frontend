import { mergeAttributes } from '@tiptap/core';
import Mention from '@tiptap/extension-mention';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';

export interface NoteMentionNodeAttrs {
  id: string;
  label: string;
  noteId: number;
}

export const NoteMention = Mention.extend({
  name: 'noteMention',

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute('data-id'),
        renderHTML: (attributes: { id: string }) => {
          if (!attributes.id) {
            return {};
          }
          return {
            'data-id': attributes.id,
          };
        },
      },
      label: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute('data-label'),
        renderHTML: (attributes: { label: string }) => {
          if (!attributes.label) {
            return {};
          }
          return {
            'data-label': attributes.label,
          };
        },
      },
      noteId: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const id = element.getAttribute('data-note-id');
          return id ? parseInt(id, 10) : null;
        },
        renderHTML: (attributes: { noteId: number }) => {
          if (!attributes.noteId) {
            return {};
          }
          return {
            'data-note-id': attributes.noteId,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="noteMention"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, string> }) {
    return [
      'span',
      mergeAttributes(
        { 'data-type': 'noteMention' },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      `#${HTMLAttributes['data-label'] || ''}`,
    ];
  },

  renderText({ node }: { node: ProseMirrorNode }) {
    return `#${node.attrs.label}`;
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ tr, state }) => {
          let isNoteMention = false;
          const { selection } = state;
          const { empty, anchor } = selection;

          if (!empty) {
            return false;
          }

          state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
            if (node.type.name === this.name) {
              isNoteMention = true;
              tr.insertText('', pos, pos + node.nodeSize);
              return false;
            }
          });

          return isNoteMention;
        }),
    };
  },
});
