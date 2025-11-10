import { Message, AIMessage } from '@/types/chat';
import { AIMessageView } from './AIMessageView';
import { TimerDisplay } from './TimerDisplay';
import { AIInitiatedMessageWrapper } from './AIInitiatedMessageWrapper';

type MessageItemProps = {
  message: Message | AIMessage;
  sendMessage: (
    content: string,
    notificationId?: number,
    timerCompleted?: boolean
  ) => Promise<void>;
};

export default function MessageItem({
  message,
  sendMessage,
}: MessageItemProps) {
  // assistantメッセージは常にAIMessageViewを使用（Markdownサポート）
  if (message.role === 'assistant') {
    const hasTimer = 'meta' in message && message.meta?.timer;
    const isAIInitiated =
      'meta' in message && message.meta?.is_ai_initiated === true;

    return (
      <div className='w-full max-w-5xl mx-auto mb-6 px-1 md:px-3'>
        {isAIInitiated ? (
          <AIInitiatedMessageWrapper>
            <AIMessageView content={message.content} />
          </AIInitiatedMessageWrapper>
        ) : (
          <AIMessageView content={message.content} />
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
  return (
    <div className='w-full max-w-5xl mx-auto flex justify-end mb-4 px-1 md:px-3'>
      <div className='max-w-[75%] rounded-3xl px-4 py-2.5 bg-white/8 backdrop-blur-xl border border-black shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]'>
        <div className='text-sm md:text-sm text-white whitespace-pre-line'>
          {message.content}
        </div>
      </div>
    </div>
  );
}
