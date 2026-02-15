import { Message, AIMessage } from '@/features/cogno/domain/chat';
import { forwardRef } from 'react';
import MessageItem from './MessageItem';
import EmptyState from './EmptyState';
import { useIsInputActive } from '@/stores/useGlobalUIStore';
import ScrollableView from '@/components/layout/ScrollableView';
import type { WorkspaceMember } from '@/types/workspace';
import type { Note } from '@/types/note';
import type { UploadedFile } from '@/lib/api/workspaceFilesApi';

type ChatContainerProps = {
  messages: Message[] | AIMessage[];
  isLoading?: boolean;
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
  isInitialMount?: React.RefObject<boolean>;
};

const ChatContainer = forwardRef<HTMLDivElement, ChatContainerProps>(
  (
    {
      messages,
      isLoading = false,
      sendMessage,
      workspaceMembers = [],
      workspaceNotes = [],
    },
    ref
  ) => {
    const isInputActive = useIsInputActive();

    return (
      <div className='flex flex-col flex-1 bg-linear-to-br from-slate-950 via-black to-slate-950 relative overflow-hidden'>
        <ScrollableView
          ref={ref}
          className={`pt-20 md:px-8 ${
            isInputActive ? 'pb-6' : 'pb-20'
          } space-y-6`}
        >
          {/* Empty State */}
          {!isLoading && messages.length === 0 && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <EmptyState />
            </div>
          )}

          {/* Messages */}
          <div>
            {messages.map((message, i) => {
              const messageId = 'id' in message ? message.id : i;
              const key = `${messageId}-${i}`;

              return (
                <div key={key} data-message-index={i}>
                  <MessageItem
                    message={message}
                    sendMessage={sendMessage}
                    workspaceMembers={workspaceMembers}
                    workspaceNotes={workspaceNotes}
                  />
                </div>
              );
            })}
          </div>

          {/* Bottom spacing */}
          <div className='h-16'></div>
        </ScrollableView>
      </div>
    );
  }
);

ChatContainer.displayName = 'ChatContainer';

export default ChatContainer;
