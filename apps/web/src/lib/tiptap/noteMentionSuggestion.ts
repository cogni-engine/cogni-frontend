import { ReactRenderer } from '@tiptap/react';
import tippy, { Instance as TippyInstance } from 'tippy.js';
import { NoteList, NoteListRef } from '@/components/tiptap/NoteList';
import { NoteWithParsed } from '@/types/note';
import { SuggestionOptions, SuggestionProps } from '@tiptap/suggestion';

export const createNoteMentionSuggestion = (
  getNotesRef: () => NoteWithParsed[]
): Omit<SuggestionOptions, 'editor'> => ({
  char: '#',
  items: ({ query }: { query: string }) => {
    const notes = getNotesRef();
    return notes
      .filter(note => {
        const title = note.title?.toLowerCase() || '';
        const content = note.content?.toLowerCase() || '';
        const queryLower = query.toLowerCase();
        return title.includes(queryLower) || content.includes(queryLower);
      })
      .slice(0, 5);
  },

  render: () => {
    let component: ReactRenderer<NoteListRef> | undefined;
    let popup: TippyInstance[] | undefined;

    return {
      onStart: (props: SuggestionProps) => {
        component = new ReactRenderer(NoteList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect as () => DOMRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        });
      },

      onUpdate(props: SuggestionProps) {
        component?.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup?.[0]?.setProps({
          getReferenceClientRect: props.clientRect as () => DOMRect,
        });
      },

      onKeyDown(props: { event: KeyboardEvent }) {
        if (props.event.key === 'Escape') {
          popup?.[0]?.hide();
          return true;
        }

        return component?.ref?.onKeyDown(props) ?? false;
      },

      onExit() {
        popup?.[0]?.destroy();
        component?.destroy();
      },
    };
  },
});
