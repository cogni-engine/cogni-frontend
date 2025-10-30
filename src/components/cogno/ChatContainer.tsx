import { Message, AIMessage } from '@/types/chat';
import { forwardRef } from 'react';
import StarBackground from './StarBackground';
import MessageList from './MessageList';

type ChatContainerProps = {
  messages: Message[] | AIMessage[];
  sendMessage: (
    content: string,
    notificationId?: number,
    timerCompleted?: boolean
  ) => Promise<void>;
};

const ChatContainer = forwardRef<HTMLDivElement, ChatContainerProps>(
  ({ messages, sendMessage }, ref) => {
    return (
      <div className='flex-1 bg-gradient-to-br from-slate-950 via-black to-slate-950 relative overflow-hidden'>
        <StarBackground />

        {/* メッセージエリア - GPU最適化 */}
        <div
          ref={ref}
          className='h-full overflow-y-auto relative z-10 p-6 md:p-8 space-y-6 scroll-smooth'
          style={{
            willChange: 'scroll-position',
            transform: 'translateZ(0)',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <MessageList messages={messages} sendMessage={sendMessage} />
        </div>
      </div>
    );
  }
);

ChatContainer.displayName = 'ChatContainer';

export default ChatContainer;
