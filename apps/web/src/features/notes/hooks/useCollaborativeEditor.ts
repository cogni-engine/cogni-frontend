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
}: UseCollaborativeEditorProps): UseCollaborativeEditorReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    'connecting' | 'connected' | 'disconnected'
  >('disconnected');

  // Create Y.Doc instance
  const ydoc = useMemo(() => {
    if (!noteId) return null;
    return new Y.Doc();
  }, [noteId]);

  // Get Supabase access token for authentication
  const getToken = useCallback(async (): Promise<string> => {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

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
      extensions,
      editorProps: {
        attributes: {
          class:
            'prose prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none max-w-none min-h-full text-gray-300',
        },
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
