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
      {/* Error Display */}
      {error && (
        <div className='px-4 py-2 mb-2 bg-white/8 backdrop-blur-xl border border-black rounded-4xl text-center text-sm text-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]'>
          {error}
        </div>
      )}

      {/* Messages */}
      <div className='flex-1 overflow-y-auto p-4'>
        {isConnected ? (
          <WorkspaceMessageList
            messages={messages}
            currentUserId={currentUserId}
          />
        ) : (
          <div className='flex-1 flex items-center justify-center'>
            <div className='text-center'>
              <p className='text-gray-400'>Connecting to real-time chat...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <InputArea
        messages={messages}
        onSend={sendMessage}
        isLoading={isLoading}
        placeholder='Enter a message'
        canStop={false}
      />
    </div>
  );
}
