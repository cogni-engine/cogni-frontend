import { mergeAttributes } from '@tiptap/core';
import Mention from '@tiptap/extension-mention';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';

export interface MentionNodeAttrs {
  id: string;
  label: string;
  workspaceMemberId: number;
}

export const CustomMention = Mention.extend({
  name: 'mention',

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
      workspaceMemberId: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const id = element.getAttribute('data-workspace-member-id');
          return id ? parseInt(id, 10) : null;
        },
        renderHTML: (attributes: { workspaceMemberId: number }) => {
          if (!attributes.workspaceMemberId) {
            return {};
          }
          return {
            'data-workspace-member-id': attributes.workspaceMemberId,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="mention"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, string> }) {
    return [
      'span',
      mergeAttributes(
        { 'data-type': 'mention' },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      `@${HTMLAttributes['data-label'] || ''}`,
    ];
  },

  renderText({ node }: { node: ProseMirrorNode }) {
    return `@${node.attrs.label}`;
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ tr, state }) => {
          let isMention = false;
          const { selection } = state;
          const { empty, anchor } = selection;

          if (!empty) {
            return false;
          }

          state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
            if (node.type.name === this.name) {
              isMention = true;
              tr.insertText('', pos, pos + node.nodeSize);
              return false;
            }
          });

          return isMention;
        }),
    };
  },
});
