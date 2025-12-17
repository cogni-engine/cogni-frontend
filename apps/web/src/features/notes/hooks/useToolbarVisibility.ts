import { useEffect, useState, useCallback, useRef, RefObject } from 'react';
import { Editor } from '@tiptap/react';

interface UseToolbarVisibilityReturn {
  isVisible: boolean;
  // Counter that changes on each editor update, used to trigger re-renders
  editorUpdateKey: number;
}

export function useToolbarVisibility(
  editor: Editor | null,
  toolbarRef: RefObject<HTMLDivElement | null>,
  viewportHeight: number
): UseToolbarVisibilityReturn {
  const [isVisible, setIsVisible] = useState(false);
  // Counter to force re-renders when editor state changes
  const [editorUpdateKey, setEditorUpdateKey] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function to scroll cursor into view above toolbar
  const scrollCursorIntoView = useCallback(() => {
    if (!editor || !toolbarRef.current) return;

    // Debounce scroll calls
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      try {
        // Get the cursor position element
        const { view } = editor;
        const { state } = view;
        const { selection } = state;

        // Get DOM coordinates of the cursor
        const coords = view.coordsAtPos(selection.from);

        // Get toolbar height
        const toolbarHeight = toolbarRef.current?.offsetHeight || 60;

        // Calculate the available viewport (excluding toolbar)
        const availableViewportBottom = viewportHeight - toolbarHeight - 50; // 20px padding

        // Check if cursor is below the safe zone
        if (coords.top > availableViewportBottom) {
          // Find the scrollable container (the editor content wrapper)
          const editorElement = view.dom;
          const scrollContainer = editorElement.closest('.overflow-auto');

          if (scrollContainer) {
            // Calculate absolute scroll position (not relative offset)
            const scrollNeeded = coords.top - availableViewportBottom;
            const newScrollTop = scrollContainer.scrollTop + scrollNeeded;
            scrollContainer.scrollTo({
              top: newScrollTop,
              behavior: 'instant',
            });
          }
        }
      } catch (error) {
        console.error('Error scrolling cursor into view:', error);
      }
    }, 50);
  }, [editor, viewportHeight, toolbarRef]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Handle editor focus/blur/selection events
  useEffect(() => {
    if (!editor) return;

    const handleFocus = () => {
      setIsVisible(true);
      // Scroll cursor into view when toolbar appears
      scrollCursorIntoView();
    };

    const handleBlur = () => {
      // Delay hiding to allow clicking toolbar buttons
      setTimeout(() => {
        if (!editor.isFocused) {
          setIsVisible(false);
        }
      }, 250);
    };

    const handleSelectionUpdate = () => {
      // Force re-render to update button states
      if (editor.isFocused) {
        setIsVisible(true);
        setEditorUpdateKey(k => k + 1);
        // Scroll cursor into view when selection changes (e.g., pressing Enter)
        scrollCursorIntoView();
      }
    };

    const handleTransaction = () => {
      // Force re-render when editor content/marks change (e.g., bold toggled)
      if (editor.isFocused) {
        setEditorUpdateKey(k => k + 1);
      }
    };

    editor.on('focus', handleFocus);
    editor.on('blur', handleBlur);
    editor.on('selectionUpdate', handleSelectionUpdate);
    editor.on('transaction', handleTransaction);

    // Check initial focus state
    if (editor.isFocused) {
      setIsVisible(true);
      scrollCursorIntoView();
    }

    return () => {
      editor.off('focus', handleFocus);
      editor.off('blur', handleBlur);
      editor.off('selectionUpdate', handleSelectionUpdate);
      editor.off('transaction', handleTransaction);
    };
  }, [editor, scrollCursorIntoView]);

  // Scroll when viewport height changes (keyboard appears/disappears)
  useEffect(() => {
    if (isVisible && editor?.isFocused) {
      scrollCursorIntoView();
    }
  }, [viewportHeight, isVisible, editor, scrollCursorIntoView]);

  return { isVisible, editorUpdateKey };
}
