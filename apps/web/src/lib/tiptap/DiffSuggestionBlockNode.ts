import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { Fragment } from '@tiptap/pm/model';
import { DiffSuggestionBlockNodeView } from './DiffSuggestionNodeView';

export interface DiffSuggestionBlockAttributes {
  type: 'added' | 'deleted';
  suggestionId: string;
  userId: string;
}

export interface DiffSuggestionBlockOptions {
  /** The current user's ID - used to determine ownership of suggestions */
  currentUserId: string | null;
  /** Callback when accept is clicked */
  onAccept?: (suggestionId: string) => void;
  /** Callback when reject is clicked */
  onReject?: (suggestionId: string) => void;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    diffSuggestionBlock: {
      /**
       * Insert a block-level diff suggestion
       */
      insertDiffBlock: (options: {
        type: 'added' | 'deleted';
        suggestionId: string;
        userId: string;
        content: string;
      }) => ReturnType;
      /**
       * Accept a block suggestion (remove if deleted, unwrap if added)
       */
      acceptBlockDiff: (suggestionId: string) => ReturnType;
      /**
       * Reject a block suggestion (remove if added, unwrap if deleted)
       */
      rejectBlockDiff: (suggestionId: string) => ReturnType;
      /**
       * Accept all block suggestions for current user
       */
      acceptAllBlockDiffs: () => ReturnType;
      /**
       * Reject all block suggestions for current user
       */
      rejectAllBlockDiffs: () => ReturnType;
    };
  }
}

// Helper function to process block diffs
function processBlockDiffs(
  doc: ReturnType<typeof Node.create>['state']['doc'],
  nodeName: string,
  currentUserId: string | null,
  suggestionId: string | null,
  mode: 'accept' | 'reject',
  tr: ReturnType<typeof Node.create>['state']['tr']
): boolean {
  let modified = false;

  // Collect nodes to process
  const nodesToProcess: {
    pos: number;
    nodeSize: number;
    type: string;
    content: Fragment;
  }[] = [];

  doc.descendants((node, pos) => {
    if (node.type.name !== nodeName) return;
    if (currentUserId && node.attrs.userId !== currentUserId) return;
    if (suggestionId && node.attrs.suggestionId !== suggestionId) return;

    nodesToProcess.push({
      pos,
      nodeSize: node.nodeSize,
      type: node.attrs.type,
      content: node.content,
    });
  });

  // Sort from end to start - this is crucial!
  // By processing from the end, earlier deletions don't affect later positions
  nodesToProcess.sort((a, b) => b.pos - a.pos);

  // Process each node
  for (const { pos, nodeSize, type, content } of nodesToProcess) {
    // Safety check: ensure positions are within document bounds
    const docSize = tr.doc.content.size;
    if (pos < 0 || pos + nodeSize > docSize) {
      console.warn(
        `Skipping block diff: position ${pos}-${pos + nodeSize} out of bounds (doc size: ${docSize})`
      );
      continue;
    }

    const shouldDelete =
      (mode === 'accept' && type === 'deleted') ||
      (mode === 'reject' && type === 'added');

    const shouldUnwrap =
      (mode === 'accept' && type === 'added') ||
      (mode === 'reject' && type === 'deleted');

    try {
      if (shouldDelete) {
        tr.delete(pos, pos + nodeSize);
        modified = true;
      } else if (shouldUnwrap) {
        tr.replaceWith(pos, pos + nodeSize, content);
        modified = true;
      }
    } catch (error) {
      console.warn(`Error processing block diff at position ${pos}:`, error);
    }
  }

  return modified;
}

export const DiffSuggestionBlockNode = Node.create<DiffSuggestionBlockOptions>({
  name: 'diffSuggestionBlock',

  group: 'block',

  content: 'block+',

  defining: true,

  addOptions() {
    return {
      currentUserId: null,
      onAccept: undefined,
      onReject: undefined,
    };
  },

  addAttributes() {
    return {
      type: {
        default: 'added',
        parseHTML: (element: HTMLElement) =>
          element.getAttribute('data-diff-block-type') || 'added',
        renderHTML: (attributes: { type: string }) => ({
          'data-diff-block-type': attributes.type,
        }),
      },
      suggestionId: {
        default: null,
        parseHTML: (element: HTMLElement) =>
          element.getAttribute('data-suggestion-id'),
        renderHTML: (attributes: { suggestionId: string }) => {
          if (!attributes.suggestionId) return {};
          return {
            'data-suggestion-id': attributes.suggestionId,
          };
        },
      },
      userId: {
        default: null,
        parseHTML: (element: HTMLElement) =>
          element.getAttribute('data-user-id'),
        renderHTML: (attributes: { userId: string }) => {
          if (!attributes.userId) return {};
          return {
            'data-user-id': attributes.userId,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-diff-suggestion-block]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const type = HTMLAttributes['data-diff-block-type'] || 'added';
    const userId = HTMLAttributes['data-user-id'];
    const currentUserId = this.options.currentUserId;
    const isOwner = userId === currentUserId;

    // Base class based on type
    let className =
      type === 'deleted' ? 'diff-block-deleted' : 'diff-block-added';

    // Add ownership class
    if (isOwner) {
      className += ' diff-block-owner';
    } else {
      className += ' diff-block-other-user';
    }

    return [
      'div',
      mergeAttributes(
        {
          'data-diff-suggestion-block': '',
          class: className,
        },
        HTMLAttributes
      ),
      0, // Render content inside
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(DiffSuggestionBlockNodeView);
  },

  addCommands() {
    return {
      insertDiffBlock:
        ({ type, suggestionId, userId, content }) =>
        ({ chain }) => {
          return chain()
            .insertContent({
              type: this.name,
              attrs: { type, suggestionId, userId },
              content: [
                {
                  type: 'paragraph',
                  content: content
                    ? [{ type: 'text', text: content }]
                    : undefined,
                },
              ],
            })
            .run();
        },

      acceptBlockDiff:
        (suggestionId: string) =>
        ({ tr, state, dispatch }) => {
          if (!dispatch) return false;
          return processBlockDiffs(
            state.doc,
            this.name,
            this.options.currentUserId,
            suggestionId,
            'accept',
            tr
          );
        },

      rejectBlockDiff:
        (suggestionId: string) =>
        ({ tr, state, dispatch }) => {
          if (!dispatch) return false;
          return processBlockDiffs(
            state.doc,
            this.name,
            this.options.currentUserId,
            suggestionId,
            'reject',
            tr
          );
        },

      acceptAllBlockDiffs:
        () =>
        ({ tr, state, dispatch }) => {
          if (!dispatch) return false;
          return processBlockDiffs(
            state.doc,
            this.name,
            this.options.currentUserId,
            null, // No specific suggestionId - process all
            'accept',
            tr
          );
        },

      rejectAllBlockDiffs:
        () =>
        ({ tr, state, dispatch }) => {
          if (!dispatch) return false;
          return processBlockDiffs(
            state.doc,
            this.name,
            this.options.currentUserId,
            null, // No specific suggestionId - process all
            'reject',
            tr
          );
        },
    };
  },
});
