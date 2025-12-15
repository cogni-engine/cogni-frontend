import { mergeAttributes } from '@tiptap/core';
import Mention from '@tiptap/extension-mention';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';

export interface FileMentionNodeAttrs {
  id: string;
  label: string;
  fileId: number;
}

export const FileMention = Mention.extend({
  name: 'fileMention',

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
      fileId: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const id = element.getAttribute('data-file-id');
          return id ? parseInt(id, 10) : null;
        },
        renderHTML: (attributes: { fileId: number }) => {
          if (!attributes.fileId) {
            return {};
          }
          return {
            'data-file-id': attributes.fileId,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="fileMention"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, string> }) {
    return [
      'span',
      mergeAttributes(
        { 'data-type': 'fileMention' },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      `📎${HTMLAttributes['data-label'] || ''}`,
    ];
  },

  renderText({ node }: { node: ProseMirrorNode }) {
    return `📎${node.attrs.label}`;
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ tr, state }) => {
          let isFileMention = false;
          const { selection } = state;
          const { empty, anchor } = selection;

          if (!empty) {
            return false;
          }

          state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
            if (node.type.name === this.name) {
              isFileMention = true;
              tr.insertText('', pos, pos + node.nodeSize);
              return false;
            }
          });

          return isFileMention;
        }),
    };
  },
});
