'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Editor } from '@tiptap/react';

interface UseAICompletionOptions {
  editor: Editor | null;
  noteId?: number;
  workspaceId?: number;
  noteTitle?: string;
  enabled?: boolean;
  debounceMs?: number;
}

interface AICompletionResult {
  suggestion: string | null;
  isLoading: boolean;
  acceptSuggestion: () => void;
  dismissSuggestion: () => void;
  requestSuggestion: (context: string, noteTitle?: string) => void;
}

export function useAICompletion({
  editor,
  noteId,
  workspaceId,
  enabled = true,
  debounceMs = 4000,
}: UseAICompletionOptions): AICompletionResult {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastRequestRef = useRef<string>('');
  const abortControllerRef = useRef<AbortController | null>(null);

  const generateCompletion = useCallback(
    async (context: string, noteTitle?: string) => {
      console.log('🤖 generateCompletion called', {
        enabled,
        contextLength: context.length,
        noteTitle,
      });

      if (!enabled || !context.trim()) {
        console.log('❌ Skipping - not enabled or no context');
        setSuggestion(null);
        return;
      }

      // Cancel any pending request
      if (abortControllerRef.current) {
        console.log('🛑 Aborting previous request');
        abortControllerRef.current.abort();
      }

      console.log('📡 Making API request...');
      setIsLoading(true);
      abortControllerRef.current = new AbortController();

      try {
        // Call our AI completion endpoint
        const response = await fetch('/api/ai-completion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            context,
            noteTitle: noteTitle || '',
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to generate completion');
        }

        const data = await response.json();
        const completion = data.completion?.trim() || null;

        if (completion && completion.length > 0) {
          setSuggestion(completion);
        } else {
          setSuggestion(null);
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          // Request was cancelled, this is expected
          return;
        }
        console.error('Error generating completion:', error);
        setSuggestion(null);
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [enabled]
  );

  const requestSuggestion = useCallback(
    (context: string, noteTitle?: string) => {
      console.log('🎯 requestSuggestion called', {
        contextLength: context.length,
        noteTitle,
      });

      lastRequestRef.current = context;

      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Don't suggest for very short text
      if (context.trim().length < 10) {
        console.log('❌ Context too short');
        setSuggestion(null);
        return;
      }

      // Debounce the request
      console.log(`⏱️ Scheduling AI request in ${debounceMs}ms`);
      debounceTimerRef.current = setTimeout(() => {
        console.log('🚀 Calling generateCompletion now');
        generateCompletion(context, noteTitle || '');
      }, debounceMs);
    },
    [debounceMs, generateCompletion]
  );

  const acceptSuggestion = useCallback(() => {
    if (!editor || !suggestion) {
      return;
    }

    // Clear suggestion from React state
    setSuggestion(null);
  }, [editor, suggestion]);

  const dismissSuggestion = useCallback(() => {
    setSuggestion(null);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    suggestion,
    isLoading,
    acceptSuggestion,
    dismissSuggestion,
    requestSuggestion,
  };
}
