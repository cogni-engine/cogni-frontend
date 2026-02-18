'use client';

import { useMemo, useEffect, useState, useCallback } from 'react';
import { useEditor, Editor } from '@tiptap/react';
import { HocuspocusProvider } from '@hocuspocus/provider';
import * as Y from 'yjs';
import { createClient } from '@/lib/supabase/browserClient';
import { createCollaborativeExtensions } from '../lib/collaborativeExtensions';
import { WorkspaceMember } from '@/types/workspace';

interface UserInfo {
  name: string;
  color: string;
  id: string;
}

interface UseCollaborativeEditorProps {
  noteId: number | null;
  isGroupNote: boolean;
  membersRef: React.MutableRefObject<WorkspaceMember[]>;
  notesRef: React.MutableRefObject<any[]>;
  user: UserInfo | null;
  initialYdocState?: string | null;
}

interface UseCollaborativeEditorReturn {
  editor: Editor | null;
  provider: HocuspocusProvider | null;
  ydoc: Y.Doc | null;
  isConnected: boolean;
  isSynced: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected';
}

// Generate a consistent color from user ID
function generateUserColor(userId: string): string {
  const colors = [
    '#958DF1', // Purple
    '#F98181', // Red
    '#FBBC88', // Orange
    '#FAF594', // Yellow
    '#70CFF8', // Blue
    '#94FADB', // Teal
    '#B9F18D', // Green
    '#FFA8A8', // Pink
  ];

  // Simple hash function to get consistent color
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function useCollaborativeEditor({
  noteId,
  isGroupNote,
  membersRef,
  notesRef,
  user,
  initialYdocState,
}: UseCollaborativeEditorProps): UseCollaborativeEditorReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    'connecting' | 'connected' | 'disconnected'
  >('disconnected');

  // Create Y.Doc instance and pre-populate before provider connects
  const ydoc = useMemo(() => {
    if (!noteId) return null;

    const doc = new Y.Doc();

    // Pre-populate with ydoc_state if available (before provider connects)
    // This ensures content is visible immediately and properly syncs with server
    if (initialYdocState) {
      try {
        console.log('📝 Pre-populating Y.Doc with ydoc_state');
        const buffer = Buffer.from(initialYdocState, 'base64');
        const state = new Uint8Array(buffer);
        Y.applyUpdate(doc, state);
        console.log('✅ Y.Doc pre-populated - ready for provider connection');
      } catch (error) {
        console.error('Failed to apply ydoc_state:', error);
      }
    }

    return doc;
  }, [noteId, initialYdocState]);

  // Get Supabase access token for authentication with auto-refresh
  const getToken = useCallback(async (): Promise<string> => {
    const supabase = createClient();

    // Get current session
    let {
      data: { session },
    } = await supabase.auth.getSession();

    // Check if token is expired or about to expire (within 5 minutes)
    if (session?.expires_at) {
      const expiresAt = session.expires_at * 1000; // Convert to ms
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;

      if (now >= expiresAt - fiveMinutes) {
        console.log('🔄 Token expiring soon, refreshing session...');
        try {
          const { data } = await supabase.auth.refreshSession();
          session = data.session;
          console.log('✅ Session refreshed successfully');
        } catch (error) {
          console.error('❌ Failed to refresh session:', error);
          throw new Error('Failed to refresh authentication token');
        }
      }
    }

    if (!session?.access_token) {
      throw new Error('No access token available');
    }

    return session.access_token;
  }, []);

  // Create Hocuspocus provider
  const provider = useMemo(() => {
    if (!noteId || !ydoc) return null;

    const hocuspocusUrl =
      process.env.NEXT_PUBLIC_HOCUSPOCUS_URL || 'ws://localhost:1234';

    const newProvider = new HocuspocusProvider({
      url: hocuspocusUrl,
      name: `note:${noteId}`,
      document: ydoc,
      token: getToken,
      connect: true, // Ensure auto-connect is enabled
      forceSyncInterval: 10000, // Force sync every 10 seconds to detect issues early

      onConnect: () => {
        console.log('🔌 Connected to Hocuspocus');
        setIsConnected(true);
        setConnectionStatus('connected');
      },
      onDisconnect: () => {
        console.log('🔌 Disconnected from Hocuspocus');
        setIsConnected(false);
        setConnectionStatus('disconnected');
      },
      onSynced: () => {
        console.log('✅ Document synced');
        setIsSynced(true);
      },
      onStatus: ({ status }) => {
        console.log('📡 Connection status:', status);
        setConnectionStatus(
          status as 'connecting' | 'connected' | 'disconnected'
        );
      },
    });

    return newProvider;
  }, [noteId, ydoc, getToken]);

  // Create TipTap extensions with collaboration
  const extensions = useMemo(() => {
    if (!ydoc || !provider) return [];

    return createCollaborativeExtensions({
      ydoc,
      provider,
      isGroupNote,
      membersRef,
      notesRef,
      user: user || {
        name: 'Anonymous',
        color: '#888888',
        id: 'anonymous',
      },
    });
  }, [ydoc, provider, isGroupNote, membersRef, notesRef, user]);

  // Initialize TipTap editor
  const editor = useEditor(
    {
      immediatelyRender: false,
      extensions: extensions as any, // Type assertion needed due to pnpm hoisting creating duplicate @tiptap/core paths
      editorProps: {
        attributes: {
          class:
            'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none max-w-none min-h-full text-foreground',
        },
      },
      onCreate: ({ editor }) => {
        // Fix duplicate block IDs on initial load (for existing documents)
        const seenIds = new Set<string>();
        const tr = editor.state.tr;
        let modified = false;

        editor.state.doc.descendants((node, pos) => {
          // Check if node has blockId attribute
          if (node.attrs && node.attrs.blockId) {
            if (seenIds.has(node.attrs.blockId)) {
              // Duplicate found! Assign new unique ID
              const newId = `blk-${crypto.randomUUID().slice(0, 8)}`;
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                blockId: newId,
              });
              modified = true;
              seenIds.add(newId);
              console.warn(
                `Fixed duplicate block ID: ${node.attrs.blockId} -> ${newId}`
              );
            } else {
              seenIds.add(node.attrs.blockId);
            }
          }
        });

        if (modified) {
          editor.view.dispatch(tr);
          console.log('Fixed duplicate block IDs in document');
        }
      },
    },
    [extensions]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (provider) {
        provider.destroy();
      }
      if (ydoc) {
        ydoc.destroy();
      }
    };
  }, [provider, ydoc]);

  return {
    editor,
    provider,
    ydoc,
    isConnected,
    isSynced,
    connectionStatus,
  };
}

export { generateUserColor };
