import type { AIMessage } from '@/features/cogno/domain/chat';
import { createClient } from '@/lib/supabase/browserClient';

// Backend API base URL - defaults to localhost:8000 for development
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// Backend message format (matches SimpleMessage in backend)
export type BackendMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  meta?: Record<string, unknown> | null;
  file_ids?: number[];
};

export interface StreamConversationRequest {
  thread_id: number;
  messages: BackendMessage[];
  mentioned_member_ids?: number[];
  mentioned_note_ids?: number[];
  notification_id?: number;
  timer_completed?: boolean;
}

export interface StreamChunkHandler {
  onChunk: (content: string) => void;
  onComplete: () => void;
  onError?: (error: Error) => void;
}

/**
 * Stream a conversation with Cogno AI backend
 *
 * Calls the backend API directly at /api/cogno/conversations/stream
 *
 * @param request - The conversation request payload
 * @param handler - Callbacks for handling stream chunks, completion, and errors
 * @param signal - AbortSignal for cancelling the request
 */
export async function streamConversation(
  request: StreamConversationRequest,
  handler: StreamChunkHandler,
  signal?: AbortSignal
): Promise<void> {
  const url = `${API_BASE_URL}/api/cogno/conversations/stream`;

  // Get Supabase session to extract JWT token
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(request),
      credentials: 'include', // Still include credentials for other cookies if needed
      signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to send message:', response.status, errorText);
      throw new Error(`Failed to send message: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Response body is null');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      if (signal?.aborted) {
        break;
      }

      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsedData = JSON.parse(data);
            handler.onChunk(parsedData.data);
          } catch (parseError) {
            console.error('Failed to parse SSE data:', parseError);
          }
        }
      }
    }

    if (!signal?.aborted) {
      handler.onComplete();
    }
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      // Don't call error handler for aborted requests
      return;
    }

    const error = err instanceof Error ? err : new Error('An error occurred');
    handler.onError?.(error);
    throw error;
  }
}
