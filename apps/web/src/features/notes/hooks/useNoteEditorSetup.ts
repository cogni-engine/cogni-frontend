import { useEffect, useMemo } from 'react';
import { useEditor, Editor } from '@tiptap/react';
import { getFileUrl } from '@/lib/api/workspaceFilesApi';
import { createEditorExtensions } from '../lib/editorExtensions';
import { WorkspaceMember } from '@/types/workspace';

interface UseNoteEditorSetupProps {
  content: string | undefined;
  setContent: (content: string) => void;
  isGroupNote: boolean;
  membersRef: React.MutableRefObject<WorkspaceMember[]>;
  notesRef: React.MutableRefObject<any[]>;
  aiSuggestionsEnabled: boolean;
  acceptSuggestion: () => void;
  dismissSuggestion: () => void;
}

export function useNoteEditorSetup({
  content,
  setContent,
  isGroupNote,
  membersRef,
  notesRef,
  aiSuggestionsEnabled,
  acceptSuggestion,
  dismissSuggestion,
}: UseNoteEditorSetupProps) {
  // Create extensions
  const extensions = useMemo(
    () =>
      createEditorExtensions({
        isGroupNote,
        membersRef,
        notesRef,
        aiSuggestionsEnabled,
        onAcceptSuggestion: acceptSuggestion,
        onDismissSuggestion: dismissSuggestion,
      }),
    [
      isGroupNote,
      membersRef,
      notesRef,
      aiSuggestionsEnabled,
      acceptSuggestion,
      dismissSuggestion,
    ]
  );

  // Initialize TipTap editor
  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content: content || '',
    contentType: 'markdown',
    editorProps: {
      attributes: {
        class:
          'prose prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none max-w-none min-h-full text-gray-300',
      },
    },
    onUpdate: ({ editor }) => {
      const markdown = editor.getMarkdown();
      setContent(markdown);
    },
  });

  // Update editor content when content from hook changes (e.g., after loading)
  useEffect(() => {
    if (editor && content !== undefined && !editor.isDestroyed) {
      const currentMarkdown = editor.getMarkdown();
      // Only update if the content is actually different to avoid cursor jumps
      if (currentMarkdown !== content) {
        editor.commands.setContent(content || '', { contentType: 'markdown' });

        // Refresh image URLs after content is loaded (for expired signed URLs)
        const refreshImageUrls = async () => {
          const images: Array<{
            node: { attrs: Record<string, unknown> };
            pos: number;
            fileId: number;
          }> = [];

          editor.state.doc.descendants((node, pos) => {
            if (node.type.name === 'image') {
              const fileId = node.attrs['data-file-id'];
              if (fileId) {
                images.push({ node, pos, fileId: parseInt(fileId, 10) });
              }
            }
          });

          if (images.length === 0) return;

          // Refresh URLs for all images with file IDs
          for (const { node, pos, fileId } of images) {
            try {
              const newUrl = await getFileUrl(fileId);
              if (newUrl && newUrl !== node.attrs.src) {
                // Update the image at this position
                const tr = editor.state.tr;
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  src: newUrl,
                });
                editor.view.dispatch(tr);
              }
            } catch (error) {
              console.error('Error refreshing image URL:', error);
            }
          }
        };

        // Small delay to ensure content is fully loaded
        setTimeout(refreshImageUrls, 500);
      }
    }
  }, [content, editor]);

  // Expose editor to window for debugging (optional, can be removed in production)
  useEffect(() => {
    if (editor && typeof window !== 'undefined') {
      (window as any).__TIPTAP_EDITOR__ = editor;
    }
  }, [editor]);

  return editor;
}
