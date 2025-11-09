import { ReactRenderer } from '@tiptap/react';
import tippy, { Instance as TippyInstance } from 'tippy.js';
import { FileList, FileListRef } from '@/components/tiptap/FileList';
import { WorkspaceFile } from '@/lib/api/workspaceFilesApi';
import { SuggestionOptions, SuggestionProps } from '@tiptap/suggestion';

export const createFileMentionSuggestion = (
  getFilesRef: () => WorkspaceFile[]
): Omit<SuggestionOptions, 'editor'> => ({
  char: '📎',
  items: ({ query }: { query: string }) => {
    const files = getFilesRef();
    return files
      .filter(file => {
        const filename = file.original_filename?.toLowerCase() || '';
        const queryLower = query.toLowerCase();
        return filename.includes(queryLower);
      })
      .slice(0, 5);
  },

  render: () => {
    let component: ReactRenderer<FileListRef> | undefined;
    let popup: TippyInstance[] | undefined;

    return {
      onStart: (props: SuggestionProps) => {
        component = new ReactRenderer(FileList, {
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
