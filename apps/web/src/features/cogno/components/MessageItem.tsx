import { useCallback } from 'react';
import { Message, AIMessage } from '@/types/chat';
import { TimerDisplay } from './TimerDisplay';
import { AIInitiatedMessageWrapper } from './AIInitiatedMessageWrapper';
import MessageFiles from '@/features/workspace/components/MessageFiles';
import { MemoizedTiptapRenderer as TiptapRenderer } from '@/components/tiptap/TiptapRenderer';
import { useGlobalUI } from '@/contexts/GlobalUIContext';
import type { WorkspaceMember } from '@/types/workspace';
import type { Note } from '@/types/note';

type MessageItemProps = {
  message: Message | AIMessage;
  sendMessage: (
    content: string,
    fileIds?: number[],
    mentionedMemberIds?: number[],
    mentionedNoteIds?: number[],
    notificationId?: number,
    timerCompleted?: boolean
  ) => Promise<void>;
  workspaceMembers?: WorkspaceMember[];
  workspaceNotes?: Note[];
};

export default function MessageItem({
  message,
  sendMessage,
  workspaceMembers = [],
  workspaceNotes = [],
}: MessageItemProps) {
  const { openNoteDrawer } = useGlobalUI();

  const handleNoteMentionClick = useCallback(
    (noteId: number) => {
      openNoteDrawer(noteId);
    },
    [openNoteDrawer]
  );

  // assistantメッセージはTiptapRendererを使用（Markdownとメンションサポート）
  if (message.role === 'assistant') {
    const hasTimer = 'meta' in message && message.meta?.timer;
    const isAIInitiated =
      'meta' in message && message.meta?.is_ai_initiated === true;

    const aiMessageContent = (
      <TiptapRenderer
        content={message.content}
        contentType='markdown'
        enableMemberMentions={true}
        enableNoteMentions={true}
        workspaceMembers={workspaceMembers}
        workspaceNotes={workspaceNotes}
        className='tiptap-ai-message-content'
        onNoteMentionClick={handleNoteMentionClick}
      />
    );

    return (
      <div className='w-full max-w-5xl mx-auto mb-6 px-1 md:px-3'>
        {isAIInitiated ? (
          <AIInitiatedMessageWrapper>
            {aiMessageContent}
          </AIInitiatedMessageWrapper>
        ) : (
          aiMessageContent
        )}

        {/* タイマー表示 - TimerDisplayが完全自己完結 */}
        {hasTimer &&
          'meta' in message &&
          message.meta?.timer &&
          'thread_id' in message && (
            <TimerDisplay
              timer={message.meta.timer}
              sendMessage={sendMessage}
              threadId={message.thread_id}
            />
          )}
      </div>
    );
  }

  // ユーザーメッセージの場合 - ChatGPT風の右寄せスタイル
  const hasFiles =
    'files' in message && message.files && message.files.length > 0;

  return (
    <div className='w-full max-w-5xl mx-auto flex justify-end mb-4 px-1 md:px-3'>
      <div className='max-w-[75%] flex flex-col items-end gap-2'>
        {/* File attachments */}
        {hasFiles && 'files' in message && (
          <div className='w-full'>
            <MessageFiles files={message.files!} />
          </div>
        )}

        {/* Text content */}
        {message.content && (
          <div className='rounded-3xl px-4 py-2.5 bg-white/8 backdrop-blur-xl border border-black shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]'>
            <div className='text-sm md:text-sm text-white'>
              <TiptapRenderer
                content={message.content}
                contentType='markdown'
                enableMemberMentions={true}
                enableNoteMentions={true}
                workspaceMembers={workspaceMembers}
                workspaceNotes={workspaceNotes}
                className='tiptap-message-content'
                onNoteMentionClick={handleNoteMentionClick}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
