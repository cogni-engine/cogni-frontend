import { Mark, mergeAttributes } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

export interface DiffSuggestionMarkAttributes {
  type: 'added' | 'deleted';
  suggestionId: string;
  userId: string;
}

export interface DiffSuggestionMarkOptions {
  /** The current user's ID - used to determine ownership of suggestions */
  currentUserId: string | null;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    diffSuggestion: {
      /**
       * Apply a diff suggestion mark to selected text
       */
      setDiffMark: (attrs: DiffSuggestionMarkAttributes) => ReturnType;
      /**
       * Remove diff mark from selected text
       */
      unsetDiffMark: () => ReturnType;
      /**
       * Accept a specific suggestion (remove deleted, keep added)
       * Only works if the current user owns the suggestion
       */
      acceptDiff: (suggestionId: string) => ReturnType;
      /**
       * Reject a specific suggestion (keep deleted, remove added)
       * Only works if the current user owns the suggestion
       */
      rejectDiff: (suggestionId: string) => ReturnType;
      /**
       * Accept all pending suggestions owned by the current user
       */
      acceptAllDiffs: () => ReturnType;
      /**
       * Reject all pending suggestions owned by the current user
       */
      rejectAllDiffs: () => ReturnType;
      /**
       * Insert a diff suggestion (deleted text + added replacement)
       */
      insertDiffSuggestion: (options: {
        suggestionId: string;
        deletedText: string;
        addedText: string;
        userId: string;
      }) => ReturnType;
    };
  }
}

export const DiffSuggestionMark = Mark.create<DiffSuggestionMarkOptions>({
  name: 'diffSuggestion',

  // Allow this mark to span across other marks
  inclusive: false,

  // This mark should not be excluded by other marks
  excludes: '',

  addOptions() {
    return {
      currentUserId: null,
    };
  },

  addAttributes() {
    return {
      type: {
        default: 'added',
        parseHTML: (element: HTMLElement) =>
          element.getAttribute('data-diff-type') || 'added',
        renderHTML: (attributes: { type: string }) => ({
          'data-diff-type': attributes.type,
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
        tag: 'span[data-diff-suggestion]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const type = HTMLAttributes['data-diff-type'] || 'added';
    const userId = HTMLAttributes['data-user-id'];
    const currentUserId = this.options.currentUserId;
    const isOwner = userId === currentUserId;

    // Base class based on type
    let className = type === 'deleted' ? 'diff-deleted' : 'diff-added';

    // Add ownership class
    if (isOwner) {
      className += ' diff-owner';
    } else {
      className += ' diff-other-user';
    }

    return [
      'span',
      mergeAttributes(
        {
          'data-diff-suggestion': '',
          class: className,
        },
        HTMLAttributes
      ),
      0, // 0 means "render content inside"
    ];
  },

  addCommands() {
    return {
      setDiffMark:
        (attrs: DiffSuggestionMarkAttributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attrs);
        },

      unsetDiffMark:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },

      acceptDiff:
        (suggestionId: string) =>
        ({ tr, state, dispatch }) => {
          if (!dispatch) return false;

          const currentUserId = this.options.currentUserId;
          const { doc } = state;
          let modified = false;

          // We need to process from end to start to avoid position shifts
          const rangesToDelete: { from: number; to: number }[] = [];
          const marksToRemove: { from: number; to: number }[] = [];

          doc.descendants((node, pos) => {
            if (!node.isText) return;

            const marks = node.marks.filter(
              mark =>
                mark.type.name === this.name &&
                mark.attrs.suggestionId === suggestionId &&
                mark.attrs.userId === currentUserId // Only accept own suggestions
            );

            marks.forEach(mark => {
              const from = pos;
              const to = pos + node.nodeSize;

              if (mark.attrs.type === 'deleted') {
                // Delete the "deleted" content
                rangesToDelete.push({ from, to });
              } else if (mark.attrs.type === 'added') {
                // Keep "added" content but remove the mark
                marksToRemove.push({ from, to });
              }
            });
          });

          // Sort ranges from end to start
          rangesToDelete.sort((a, b) => b.from - a.from);
          marksToRemove.sort((a, b) => b.from - a.from);

          // First remove marks from "added" content
          marksToRemove.forEach(({ from, to }) => {
            tr.removeMark(from, to, this.type);
            modified = true;
          });

          // Then delete "deleted" content
          rangesToDelete.forEach(({ from, to }) => {
            tr.delete(from, to);
            modified = true;
          });

          return modified;
        },

      rejectDiff:
        (suggestionId: string) =>
        ({ tr, state, dispatch }) => {
          if (!dispatch) return false;

          const currentUserId = this.options.currentUserId;
          const { doc } = state;
          let modified = false;

          const rangesToDelete: { from: number; to: number }[] = [];
          const marksToRemove: { from: number; to: number }[] = [];

          doc.descendants((node, pos) => {
            if (!node.isText) return;

            const marks = node.marks.filter(
              mark =>
                mark.type.name === this.name &&
                mark.attrs.suggestionId === suggestionId &&
                mark.attrs.userId === currentUserId // Only reject own suggestions
            );

            marks.forEach(mark => {
              const from = pos;
              const to = pos + node.nodeSize;

              if (mark.attrs.type === 'added') {
                // Delete the "added" content (reject it)
                rangesToDelete.push({ from, to });
              } else if (mark.attrs.type === 'deleted') {
                // Keep "deleted" content but remove the mark (restore it)
                marksToRemove.push({ from, to });
              }
            });
          });

          // Sort ranges from end to start
          rangesToDelete.sort((a, b) => b.from - a.from);
          marksToRemove.sort((a, b) => b.from - a.from);

          // First remove marks from "deleted" content
          marksToRemove.forEach(({ from, to }) => {
            tr.removeMark(from, to, this.type);
            modified = true;
          });

          // Then delete "added" content
          rangesToDelete.forEach(({ from, to }) => {
            tr.delete(from, to);
            modified = true;
          });

          return modified;
        },

      acceptAllDiffs:
        () =>
        ({ tr, state, dispatch }) => {
          if (!dispatch) return false;

          const currentUserId = this.options.currentUserId;
          const { doc } = state;
          let modified = false;

          const rangesToDelete: { from: number; to: number }[] = [];
          const marksToRemove: { from: number; to: number }[] = [];

          doc.descendants((node, pos) => {
            if (!node.isText) return;

            const marks = node.marks.filter(
              mark =>
                mark.type.name === this.name &&
                mark.attrs.userId === currentUserId // Only accept own suggestions
            );

            marks.forEach(mark => {
              const from = pos;
              const to = pos + node.nodeSize;

              if (mark.attrs.type === 'deleted') {
                rangesToDelete.push({ from, to });
              } else if (mark.attrs.type === 'added') {
                marksToRemove.push({ from, to });
              }
            });
          });

          rangesToDelete.sort((a, b) => b.from - a.from);
          marksToRemove.sort((a, b) => b.from - a.from);

          // Remove marks first (doesn't change positions)
          marksToRemove.forEach(({ from, to }) => {
            try {
              const docSize = tr.doc.content.size;
              if (from >= 0 && to <= docSize) {
                tr.removeMark(from, to, this.type);
                modified = true;
              }
            } catch (e) {
              console.warn('Error removing mark:', e);
            }
          });

          // Then delete ranges (changes positions, so process from end)
          rangesToDelete.forEach(({ from, to }) => {
            try {
              const docSize = tr.doc.content.size;
              if (from >= 0 && to <= docSize) {
                tr.delete(from, to);
                modified = true;
              }
            } catch (e) {
              console.warn('Error deleting range:', e);
            }
          });

          return modified;
        },

      rejectAllDiffs:
        () =>
        ({ tr, state, dispatch }) => {
          if (!dispatch) return false;

          const currentUserId = this.options.currentUserId;
          const { doc } = state;
          let modified = false;

          const rangesToDelete: { from: number; to: number }[] = [];
          const marksToRemove: { from: number; to: number }[] = [];

          doc.descendants((node, pos) => {
            if (!node.isText) return;

            const marks = node.marks.filter(
              mark =>
                mark.type.name === this.name &&
                mark.attrs.userId === currentUserId // Only reject own suggestions
            );

            marks.forEach(mark => {
              const from = pos;
              const to = pos + node.nodeSize;

              if (mark.attrs.type === 'added') {
                rangesToDelete.push({ from, to });
              } else if (mark.attrs.type === 'deleted') {
                marksToRemove.push({ from, to });
              }
            });
          });

          rangesToDelete.sort((a, b) => b.from - a.from);
          marksToRemove.sort((a, b) => b.from - a.from);

          // Remove marks first (doesn't change positions)
          marksToRemove.forEach(({ from, to }) => {
            try {
              const docSize = tr.doc.content.size;
              if (from >= 0 && to <= docSize) {
                tr.removeMark(from, to, this.type);
                modified = true;
              }
            } catch (e) {
              console.warn('Error removing mark:', e);
            }
          });

          // Then delete ranges (changes positions, so process from end)
          rangesToDelete.forEach(({ from, to }) => {
            try {
              const docSize = tr.doc.content.size;
              if (from >= 0 && to <= docSize) {
                tr.delete(from, to);
                modified = true;
              }
            } catch (e) {
              console.warn('Error deleting range:', e);
            }
          });

          return modified;
        },

      insertDiffSuggestion:
        ({ suggestionId, deletedText, addedText, userId }) =>
        ({ chain, state }) => {
          const { from, to } = state.selection;

          // If there's selected text, that becomes the "deleted" text
          const hasSelection = from !== to;
          const actualDeletedText = hasSelection
            ? state.doc.textBetween(from, to)
            : deletedText;

          // Build the diff HTML with userId
          const deletedHtml = actualDeletedText
            ? `<span data-diff-suggestion data-diff-type="deleted" data-suggestion-id="${suggestionId}" data-user-id="${userId}">${actualDeletedText}</span>`
            : '';
          const addedHtml = addedText
            ? `<span data-diff-suggestion data-diff-type="added" data-suggestion-id="${suggestionId}" data-user-id="${userId}">${addedText}</span>`
            : '';

          const combinedHtml = deletedHtml + addedHtml;

          if (hasSelection) {
            return chain().deleteSelection().insertContent(combinedHtml).run();
          }

          return chain().insertContent(combinedHtml).run();
        },
    };
  },

  addProseMirrorPlugins() {
    const markType = this.type;
    const currentUserId = this.options.currentUserId;
    const editor = this.editor;

    return [
      new Plugin({
        key: new PluginKey('diffSuggestionButtons'),
        props: {
          decorations: state => {
            const { doc } = state;
            const decorations: Decoration[] = [];

            // Track suggestion end positions (we'll add buttons at the end of each suggestion)
            const suggestionEnds = new Map<
              string,
              { pos: number; userId: string }
            >();

            // Find all diff suggestion marks and track their end positions
            doc.descendants((node, pos) => {
              if (!node.isText) return;

              const diffMark = node.marks.find(m => m.type === markType);
              if (diffMark) {
                const suggestionId = diffMark.attrs.suggestionId;
                const userId = diffMark.attrs.userId;
                const endPos = pos + node.nodeSize;

                // Update to the furthest end position for this suggestion
                const existing = suggestionEnds.get(suggestionId);
                if (!existing || endPos > existing.pos) {
                  suggestionEnds.set(suggestionId, { pos: endPos, userId });
                }
              }
            });

            // Create button widgets at the end of each suggestion
            suggestionEnds.forEach(({ pos, userId }, suggestionId) => {
              const isOwner = userId === currentUserId;

              // Only show buttons for the owner's suggestions
              if (!isOwner) return;

              const widget = Decoration.widget(
                pos,
                () => {
                  // Create a wrapper with position:relative for absolute positioning of tabs
                  const wrapper = document.createElement('span');
                  wrapper.className = 'inline-diff-button-wrapper';
                  wrapper.contentEditable = 'false';

                  const container = document.createElement('span');
                  container.className = 'inline-diff-buttons';

                  // Accept button (tab style)
                  const acceptBtn = document.createElement('button');
                  acceptBtn.type = 'button';
                  acceptBtn.className = 'inline-diff-btn inline-diff-accept';
                  acceptBtn.title = 'Accept this change';
                  acceptBtn.textContent = '✓';
                  acceptBtn.onclick = e => {
                    e.preventDefault();
                    e.stopPropagation();
                    editor.commands.acceptDiff(suggestionId);
                  };

                  // Reject button (tab style)
                  const rejectBtn = document.createElement('button');
                  rejectBtn.type = 'button';
                  rejectBtn.className = 'inline-diff-btn inline-diff-reject';
                  rejectBtn.title = 'Reject this change';
                  rejectBtn.textContent = '✕';
                  rejectBtn.onclick = e => {
                    e.preventDefault();
                    e.stopPropagation();
                    editor.commands.rejectDiff(suggestionId);
                  };

                  container.appendChild(acceptBtn);
                  container.appendChild(rejectBtn);
                  wrapper.appendChild(container);

                  return wrapper;
                },
                { side: 1 } // Position after the text
              );

              decorations.push(widget);
            });

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});
