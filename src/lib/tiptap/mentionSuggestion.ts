import { ReactRenderer } from '@tiptap/react';
import tippy, { Instance as TippyInstance } from 'tippy.js';
import { MentionList, MentionListRef } from '@/components/tiptap/MentionList';
import { WorkspaceMember } from '@/types/workspace';
import { SuggestionOptions, SuggestionProps } from '@tiptap/suggestion';

export const createMentionSuggestion = (
  getMembersRef: () => WorkspaceMember[]
): Omit<SuggestionOptions, 'editor'> => ({
  items: ({ query }: { query: string }) => {
    const members = getMembersRef();
    return members
      .filter(member => {
        const name = member.user_profile?.name?.toLowerCase() || '';
        return name.includes(query.toLowerCase());
      })
      .slice(0, 5);
  },

  render: () => {
    let component: ReactRenderer<MentionListRef> | undefined;
    let popup: TippyInstance[] | undefined;

    return {
      onStart: (props: SuggestionProps) => {
        component = new ReactRenderer(MentionList, {
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
