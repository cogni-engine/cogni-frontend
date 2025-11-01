'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useWorkspaceChat } from '@/hooks/useWorkspaceChat';
import { createClient } from '@/lib/supabase/browserClient';
import InputArea from '@/components/input/InputArea';
import WorkspaceMessageList from '@/features/workspace/components/WorkspaceMessageList';

export default function WorkspaceChatPage() {
  const params = useParams();
  const workspaceId = parseInt(params.id as string);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, isLoading, error, isConnected } =
    useWorkspaceChat(workspaceId);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Get current user ID
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUserId(user?.id || null);
    });
  }, []);

  return (
    <div className='flex flex-col h-full'>
      {/* Connection Status */}
      {!isConnected && (
        <div className='p-2 bg-yellow-500/20 border-b border-yellow-500/30 text-center text-sm text-yellow-400'>
          Connecting to real-time chat...
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className='p-2 bg-red-500/20 border-b border-red-500/30 text-center text-sm text-red-400'>
          {error}
        </div>
      )}

      {/* Messages */}
      <div className='flex-1 overflow-y-auto p-4'>
        <WorkspaceMessageList
          messages={messages}
          currentUserId={currentUserId}
        />
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <InputArea
        messages={messages}
        onSend={sendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}
