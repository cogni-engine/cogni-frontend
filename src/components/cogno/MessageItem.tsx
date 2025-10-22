import { Message, AIMessage } from "@/types/chat";
import { AIMessageView } from "./AIMessageView";
import { TimerDisplay } from "./TimerDisplay";

type MessageItemProps = {
  message: Message | AIMessage;
};

export default function MessageItem({ message }: MessageItemProps) {
  // assistantメッセージは常にAIMessageViewを使用（Markdownサポート）
  if (message.role === 'assistant') {
    const hasTimer = 'meta' in message && message.meta?.timer;
    
    // デバッグ用ログ
    console.log('MessageItem - message:', message);
    console.log('MessageItem - hasTimer:', hasTimer);
    console.log('MessageItem - message.meta:', 'meta' in message ? message.meta : 'No meta property');
    
    return (
      <div className="w-full max-w-5xl mx-auto mb-6 px-1 md:px-6">
        <AIMessageView content={message.content} />
        
        {/* タイマー表示 - TimerDisplayが完全自己完結 */}
        {hasTimer && 'meta' in message && message.meta?.timer && (
          <TimerDisplay timer={message.meta.timer} />
        )}
      </div>
    );
  }

  // ユーザーメッセージの場合 - ChatGPT風の右寄せスタイル
  return (
    <div className="w-full max-w-5xl mx-auto flex justify-end mb-4 px-1 md:px-6">
      <div className="max-w-[75%] rounded-3xl px-3.5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg shadow-black/20">
        <div className="text-sm md:text-base text-white whitespace-pre-line">
          {message.content}
        </div>
      </div>
    </div>
  );
}

