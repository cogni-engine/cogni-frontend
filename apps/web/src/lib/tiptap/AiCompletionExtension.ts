import { Extension } from '@tiptap/core';
import { DOMSerializer, Fragment, Slice } from '@tiptap/pm/model';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

export interface AiCompletionOptions {
  suggestion: string | null;
  onAccept: () => void;
  onDismiss: () => void;
  enabled: boolean;
}

export const AiCompletionPluginKey = new PluginKey('aiCompletion');

export const AiCompletion = Extension.create<AiCompletionOptions>({
  name: 'aiCompletion',

  priority: 1000, // High priority to capture Tab before other extensions

  addOptions() {
    return {
      suggestion: null,
      onAccept: () => {},
      onDismiss: () => {},
      enabled: true,
    };
  },

  addProseMirrorPlugins() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const extensionThis = this;

    return [
      new Plugin({
        key: AiCompletionPluginKey,

        state: {
          init() {
            return {
              suggestion: null,
              enabled: true,
              decorations: DecorationSet.empty,
            };
          },

          apply(tr, oldState) {
            // Check if there's new metadata in this transaction
            const metaSuggestion = tr.getMeta('aiCompletionSuggestion');
            const metaEnabled = tr.getMeta('aiCompletionEnabled');

            // Update state from metadata if present, otherwise keep old values
            const suggestion =
              metaSuggestion !== undefined
                ? metaSuggestion
                : oldState.suggestion;
            const enabled =
              metaEnabled !== undefined ? metaEnabled : oldState.enabled;

            // Removed debug logging for cleaner console

            // Map old decorations through the transaction
            let decorationSet = oldState.decorations.map(tr.mapping, tr.doc);

            // Clear decorations if no suggestion or not enabled
            if (!suggestion || !enabled) {
              return {
                suggestion,
                enabled,
                decorations: DecorationSet.empty,
              };
            }

            // Get current cursor position
            const { selection } = tr;
            const { from, to } = selection;

            // Only show suggestion at cursor position when cursor is collapsed
            if (from !== to) {
              return {
                suggestion,
                enabled,
                decorations: DecorationSet.empty,
              };
            }

            // Create a widget decoration for the ghost text
            const widget = document.createElement('span');
            widget.className = 'ai-completion-ghost-text';
            const editorAttributes =
              extensionThis.editor?.options?.editorProps?.attributes;
            if (editorAttributes) {
              const resolvedAttributes =
                typeof editorAttributes === 'function'
                  ? editorAttributes(extensionThis.editor?.state)
                  : editorAttributes;
              const className = resolvedAttributes?.class;
              if (className) {
                widget.className += ` ${className}`;
              }
            }
            const applyMarkdownRendering = () => {
              try {
                const editor = extensionThis.editor;

                if (!editor) {
                  widget.textContent = suggestion;
                  return;
                }

                const markdownManager = editor.storage?.markdown?.manager;
                const schema = editor.schema;

                if (!markdownManager) {
                  widget.textContent = suggestion;
                  return;
                }

                const parsed = markdownManager.parse(suggestion);

                if (!parsed || parsed.type !== 'doc') {
                  widget.textContent = suggestion;
                  return;
                }

                const docNode = schema.nodeFromJSON(parsed);
                const serializer = DOMSerializer.fromSchema(schema);

                widget.textContent = '';

                let appendedChild = false;

                docNode.forEach((child, _offset, index) => {
                  const fragment =
                    child.type.name === 'paragraph'
                      ? serializer.serializeFragment(child.content)
                      : serializer.serializeFragment(Fragment.from(child));

                  widget.appendChild(fragment);
                  appendedChild = true;

                  if (index < docNode.childCount - 1) {
                    widget.appendChild(document.createElement('br'));
                  }
                });

                if (!appendedChild) {
                  widget.textContent = suggestion;
                }
              } catch (error) {
                console.error('Failed to render AI completion markdown', error);
                widget.textContent = suggestion;
              }
            };

            applyMarkdownRendering();
            widget.setAttribute('data-suggestion', suggestion);
            widget.style.cssText = `
              color: rgb(156, 163, 175) !important;
              opacity: 0.5 !important;
              pointer-events: none !important;
              user-select: none !important;
              font-style: italic !important;
              display: inline !important;
              position: relative !important;
            `;

            const decoration = Decoration.widget(from, widget, {
              side: 1,
              key: 'ai-completion',
            });

            decorationSet = DecorationSet.create(tr.doc, [decoration]);

            return {
              suggestion,
              enabled,
              decorations: decorationSet,
            };
          },
        },

        props: {
          decorations(state) {
            const pluginState = this.getState(state);
            return pluginState?.decorations || DecorationSet.empty;
          },

          handleKeyDown(view, event) {
            // Get suggestion from plugin state
            const pluginState = this.getState(view.state);
            const suggestion = pluginState?.suggestion;
            const enabled = pluginState?.enabled;

            if (!suggestion || !enabled) {
              return false;
            }

            // Accept suggestion with Tab
            if (event.key === 'Tab' && !event.shiftKey) {
              event.preventDefault();
              event.stopPropagation();

              const editor = extensionThis.editor;
              if (editor) {
                const handled = editor
                  .chain()
                  .focus()
                  .command(({ state, tr, dispatch, editor }) => {
                    if (!dispatch) {
                      return true;
                    }

                    const { from, to } = state.selection;
                    let transaction = tr;
                    let inserted = false;

                    const markdownManager = editor.storage?.markdown?.manager;

                    if (markdownManager) {
                      try {
                        const parsed = markdownManager.parse(suggestion);

                        if (parsed?.type === 'doc') {
                          const docNode = editor.schema.nodeFromJSON(parsed);

                          if (
                            docNode.childCount === 1 &&
                            docNode.firstChild?.type?.name === 'paragraph'
                          ) {
                            const inlineFragment = docNode.firstChild.content;

                            if (inlineFragment.childCount > 0) {
                              if (from !== to) {
                                transaction = transaction.deleteRange(from, to);
                              }
                              const insertPos = transaction.mapping.map(from);
                              transaction = transaction.insert(
                                insertPos,
                                inlineFragment
                              );
                              inserted = true;
                            }
                          } else if (docNode.content.childCount > 0) {
                            const slice = new Slice(docNode.content, 0, 0);
                            transaction = transaction.replaceRange(
                              from,
                              to,
                              slice
                            );
                            inserted = true;
                          }
                        }
                      } catch (error) {
                        console.error(
                          'Failed to insert AI completion markdown',
                          error
                        );
                      }
                    }

                    if (!inserted) {
                      transaction = transaction.insertText(
                        suggestion,
                        from,
                        to
                      );
                    }

                    transaction.setMeta('aiCompletionSuggestion', null);
                    transaction.setMeta('aiCompletionEnabled', enabled);
                    dispatch(transaction);
                    return true;
                  })
                  .run();

                if (handled) {
                  try {
                    extensionThis.options.onAccept();
                  } catch (e) {
                    console.error('Error calling onAccept:', e);
                  }
                  return true;
                }
              }

              // Fallback if editor instance is unavailable
              const { from } = view.state.selection;
              const tr = view.state.tr;
              tr.insertText(suggestion, from);
              tr.setMeta('aiCompletionSuggestion', null);
              tr.setMeta('aiCompletionEnabled', enabled);
              view.dispatch(tr);

              try {
                extensionThis.options.onAccept();
              } catch (e) {
                console.error('Error calling onAccept:', e);
              }

              return true;
            }

            // Dismiss suggestion with Escape
            if (event.key === 'Escape') {
              extensionThis.options.onDismiss();

              // Clear via transaction
              const tr = view.state.tr;
              tr.setMeta('aiCompletionSuggestion', null);
              tr.setMeta('aiCompletionEnabled', enabled);
              view.dispatch(tr);

              return true;
            }

            // Dismiss on any other typing (will be regenerated if appropriate)
            if (
              event.key.length === 1 ||
              event.key === 'Backspace' ||
              event.key === 'Delete'
            ) {
              extensionThis.options.onDismiss();

              // Clear via transaction
              const tr = view.state.tr;
              tr.setMeta('aiCompletionSuggestion', null);
              tr.setMeta('aiCompletionEnabled', enabled);
              view.dispatch(tr);

              return false; // Allow the key to be processed normally
            }

            return false;
          },
        },
      }),
    ];
  },
});
