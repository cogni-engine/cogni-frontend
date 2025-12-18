'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Editor } from '@tiptap/react';

export interface DiffSuggestion {
  id: string;
  type: 'inline' | 'block';
  diffType: 'added' | 'deleted';
  userId: string;
  isOwner: boolean;
}

interface UseDiffSuggestionProps {
  editor: Editor | null;
  userId: string | null;
}

interface UseDiffSuggestionReturn {
  /** List of active suggestions in the document */
  activeSuggestions: DiffSuggestion[];
  /** Whether there are any pending suggestions owned by current user */
  hasPendingSuggestions: boolean;
  /** Whether there are any pending suggestions from other users */
  hasOtherUserSuggestions: boolean;
  /** Insert a new inline diff suggestion at current cursor/selection */
  insertSuggestion: (addedText: string, deletedText?: string) => string | null;
  /** Insert a new block-level diff suggestion */
  insertBlockSuggestion: (
    type: 'added' | 'deleted',
    content: string
  ) => string | null;
  /** Accept a specific suggestion by ID */
  acceptSuggestion: (suggestionId: string) => void;
  /** Reject a specific suggestion by ID */
  rejectSuggestion: (suggestionId: string) => void;
  /** Accept all pending suggestions owned by current user */
  acceptAllSuggestions: () => void;
  /** Reject all pending suggestions owned by current user */
  rejectAllSuggestions: () => void;
  /** Scan the document for active suggestion IDs */
  refreshSuggestions: () => void;
}

/**
 * Hook for managing diff suggestions in a TipTap editor.
 * Works with DiffSuggestionMark and DiffSuggestionBlockNode extensions.
 * Supports per-user ownership of suggestions.
 */
export function useDiffSuggestion({
  editor,
  userId,
}: UseDiffSuggestionProps): UseDiffSuggestionReturn {
  const [activeSuggestions, setActiveSuggestions] = useState<DiffSuggestion[]>(
    []
  );

  // Generate a unique suggestion ID
  const generateSuggestionId = useCallback(() => {
    return `suggestion-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Scan document for all active suggestions
  const refreshSuggestions = useCallback(() => {
    if (!editor) {
      setActiveSuggestions([]);
      return;
    }

    const suggestions = new Map<string, DiffSuggestion>();
    const { doc } = editor.state;

    doc.descendants(node => {
      // Check for inline marks
      if (node.isText) {
        node.marks.forEach(mark => {
          if (
            mark.type.name === 'diffSuggestion' &&
            mark.attrs.suggestionId
          ) {
            const id = mark.attrs.suggestionId;
            if (!suggestions.has(id)) {
              suggestions.set(id, {
                id,
                type: 'inline',
                diffType: mark.attrs.type,
                userId: mark.attrs.userId,
                isOwner: mark.attrs.userId === userId,
              });
            }
          }
        });
      }

      // Check for block nodes
      if (
        node.type.name === 'diffSuggestionBlock' &&
        node.attrs.suggestionId
      ) {
        const id = node.attrs.suggestionId;
        if (!suggestions.has(id)) {
          suggestions.set(id, {
            id,
            type: 'block',
            diffType: node.attrs.type,
            userId: node.attrs.userId,
            isOwner: node.attrs.userId === userId,
          });
        }
      }
    });

    setActiveSuggestions(Array.from(suggestions.values()));
  }, [editor, userId]);

  // Refresh suggestions when editor content changes
  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      refreshSuggestions();
    };

    editor.on('update', handleUpdate);
    // Initial scan
    refreshSuggestions();

    return () => {
      editor.off('update', handleUpdate);
    };
  }, [editor, refreshSuggestions]);

  // Insert a new inline suggestion
  const insertSuggestion = useCallback(
    (addedText: string, deletedText?: string): string | null => {
      if (!editor || !userId) return null;

      const suggestionId = generateSuggestionId();
      const { from, to } = editor.state.selection;

      // If there's selected text and no explicit deletedText, use selection
      const hasSelection = from !== to;
      const actualDeletedText = deletedText ?? (hasSelection ? '' : '');

      // Use the insertDiffSuggestion command with userId
      const success = editor.commands.insertDiffSuggestion({
        suggestionId,
        deletedText: actualDeletedText,
        addedText,
        userId,
      });

      if (success) {
        setTimeout(refreshSuggestions, 50);
        return suggestionId;
      }

      return null;
    },
    [editor, userId, generateSuggestionId, refreshSuggestions]
  );

  // Insert a new block-level suggestion
  const insertBlockSuggestion = useCallback(
    (type: 'added' | 'deleted', content: string): string | null => {
      if (!editor || !userId) return null;

      const suggestionId = generateSuggestionId();

      const success = editor.commands.insertDiffBlock({
        type,
        suggestionId,
        userId,
        content,
      });

      if (success) {
        setTimeout(refreshSuggestions, 50);
        return suggestionId;
      }

      return null;
    },
    [editor, userId, generateSuggestionId, refreshSuggestions]
  );

  // Accept a specific suggestion (inline or block)
  const acceptSuggestion = useCallback(
    (suggestionId: string) => {
      if (!editor) return;

      // Find the suggestion to determine its type
      const suggestion = activeSuggestions.find(s => s.id === suggestionId);

      if (suggestion?.type === 'block') {
        editor.commands.acceptBlockDiff(suggestionId);
      } else {
        editor.commands.acceptDiff(suggestionId);
      }

      setTimeout(refreshSuggestions, 50);
    },
    [editor, activeSuggestions, refreshSuggestions]
  );

  // Reject a specific suggestion (inline or block)
  const rejectSuggestion = useCallback(
    (suggestionId: string) => {
      if (!editor) return;

      const suggestion = activeSuggestions.find(s => s.id === suggestionId);

      if (suggestion?.type === 'block') {
        editor.commands.rejectBlockDiff(suggestionId);
      } else {
        editor.commands.rejectDiff(suggestionId);
      }

      setTimeout(refreshSuggestions, 50);
    },
    [editor, activeSuggestions, refreshSuggestions]
  );

  // Accept all suggestions (both inline and block)
  // Process block nodes first, then inline marks in separate ticks
  // Block nodes must be processed first because inline marks might be inside them
  const acceptAllSuggestions = useCallback(() => {
    if (!editor) return;

    // First, accept all block nodes (they may contain inline marks)
    editor.commands.acceptAllBlockDiffs();

    // Then accept inline marks in a separate tick after the document updates
    setTimeout(() => {
      editor.commands.acceptAllDiffs();
      setTimeout(refreshSuggestions, 50);
    }, 0);
  }, [editor, refreshSuggestions]);

  // Reject all suggestions (both inline and block)
  const rejectAllSuggestions = useCallback(() => {
    if (!editor) return;

    // First, reject all block nodes
    editor.commands.rejectAllBlockDiffs();

    // Then reject inline marks in a separate tick after the document updates
    setTimeout(() => {
      editor.commands.rejectAllDiffs();
      setTimeout(refreshSuggestions, 50);
    }, 0);
  }, [editor, refreshSuggestions]);

  // Computed: whether current user has pending suggestions
  const hasPendingSuggestions = useMemo(
    () => activeSuggestions.some(s => s.isOwner),
    [activeSuggestions]
  );

  // Computed: whether other users have pending suggestions
  const hasOtherUserSuggestions = useMemo(
    () => activeSuggestions.some(s => !s.isOwner),
    [activeSuggestions]
  );

  return {
    activeSuggestions,
    hasPendingSuggestions,
    hasOtherUserSuggestions,
    insertSuggestion,
    insertBlockSuggestion,
    acceptSuggestion,
    rejectSuggestion,
    acceptAllSuggestions,
    rejectAllSuggestions,
    refreshSuggestions,
  };
}
