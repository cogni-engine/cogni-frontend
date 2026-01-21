import { useCallback } from 'react';
import { Message, AIMessage } from '@/features/cogno/domain/chat';
import { TimerDisplay } from './TimerDisplay';
import { AIInitiatedMessageWrapper } from './AIInitiatedMessageWrapper';
import MessageFiles from '@/features/workspace/components/MessageFiles'; // TODO: Move to @cogni/components
import { TiptapRenderer } from '@/components/tiptap/TiptapRenderer';
import { useGlobalUIStore } from '@/stores/useGlobalUIStore';
import type { WorkspaceMember } from '@/types/workspace';
import type { Note } from '@/types/note';
import type { UploadedFile } from '@/lib/api/workspaceFilesApi';
import { format } from 'date-fns';

type MessageItemProps = {
  message: Message | AIMessage;
  sendMessage: (
    content: string,
    files?: UploadedFile[],
    mentionedMemberIds?: number[],
    mentionedNoteIds?: number[],
    notificationId?: number,
    timerCompleted?: boolean
  ) => Promise<void>;
  workspaceMembers?: WorkspaceMember[];
  workspaceNotes?: Note[];
  showTimestamp?: boolean;
};

export default function MessageItem({
  message,
  sendMessage,
  workspaceMembers = [],
  workspaceNotes = [],
  showTimestamp = false,
}: MessageItemProps) {
  const openNoteDrawer = useGlobalUIStore(state => state.openNoteDrawer);

  const handleNoteMentionClick = useCallback(
    (noteId: number) => {
      openNoteDrawer(noteId);
    },
    [openNoteDrawer]
  );

  // Wrapper for TimerDisplay - adapts full sendMessage to simplified version
  const handleTimerSendMessage = useCallback(
    async (
      content: string,
      notificationId?: number,
      timerCompleted?: boolean
    ) => {
      return sendMessage(
        content,
        undefined, // files
        undefined, // mentionedMemberIds
        undefined, // mentionedNoteIds
        notificationId,
        timerCompleted
      );
    },
    [sendMessage]
  );

  // assistantメッセージはTiptapRendererを使用（Markdownとメンションサポート）
  if (message.role === 'assistant') {
    const hasTimer = 'meta' in message && message.meta?.timer;
    const isAIInitiated =
      'meta' in message && message.meta?.is_ai_initiated === true;

    const content = message.content;

    const aiMessageContent = (
      <TiptapRenderer
        content={content}
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
              sendMessage={handleTimerSendMessage}
              threadId={message.thread_id}
            />
          )}
      </div>
    );
  }

  // ユーザーメッセージの場合 - ChatGPT風の右寄せスタイル
  const hasFiles =
    'files' in message && message.files && message.files.length > 0;

  // Get timestamp from AIMessage
  const timestamp = 'created_at' in message ? message.created_at : null;

  return (
    <div className='w-full max-w-5xl mx-auto flex justify-end mb-4 px-1 md:px-3'>
      <div className='max-w-[80%] flex flex-col items-end gap-2'>
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

        {/* Timestamp - only show when showTimestamp is true */}
        {showTimestamp && timestamp && (
          <p className='text-xs text-gray-500 mt-0.5'>
            {format(new Date(timestamp), 'HH:mm')}
          </p>
        )}
      </div>
    </div>
  );
}
