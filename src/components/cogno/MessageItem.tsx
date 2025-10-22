import { Message, AIMessage } from "@/types/chat";
import { AIMessageView } from "./AIMessageView";
import { TimerDisplay } from "./TimerDisplay";

type MessageItemProps = {
  message: Message | AIMessage;
  remainingSeconds?: number | null;
};

export default function MessageItem({ message, remainingSeconds }: MessageItemProps) {
  // assistantメッセージは常にAIMessageViewを使用（Markdownサポート）
  if (message.role === 'assistant') {
    const hasTimer = 'meta' in message && message.meta?.timer;
    
    return (
      <div className="max-w-5xl mb-6 px-4 md:px-6">
        <AIMessageView content={message.content} />
        
        {/* タイマー表示 */}
        {hasTimer && 'meta' in message && message.meta?.timer && (
          <TimerDisplay 
            timer={message.meta.timer} 
            remainingSeconds={remainingSeconds}
          />
        )}
      </div>
    );
  }

  // ユーザーメッセージの場合 - ChatGPT風の右寄せスタイル（黄金比適用）
  return (
    <div className="flex justify-end mb-4 px-4.5 md:px-6">
      <div className="max-w-[75%] rounded-3xl px-3.5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg shadow-black/20">
        <div className="text-sm md:text-base text-white whitespace-pre-line">
          {message.content}
        </div>
      </div>
    </div>
  );
}

