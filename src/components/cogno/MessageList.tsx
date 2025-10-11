import { Message } from "@/types/chat";
import MessageItem from "./MessageItem";
import EmptyState from "./EmptyState";

type MessageListProps = {
  messages: Message[];
};

export default function MessageList({ messages }: MessageListProps) {
  const assistantMessages = messages.filter(m => m.role === "assistant");
  
  if (assistantMessages.length === 0) {
    return <EmptyState />;
  }
  
  return (
    <>
      {assistantMessages.map((message, i) => {
        const isLastMessage = i === assistantMessages.length - 1;
        const isNotification = isLastMessage && message.content.includes("休学届");
        
        return (
          <div key={i} className="max-w-5xl mx-auto">
            <MessageItem message={message} isNotification={isNotification} />
            {/* 区切り線 */}
            {!isLastMessage && (
              <div className="mt-6 border-t border-white/10"></div>
            )}
          </div>
        );
      })}
      {/* 最後のメッセージの下に空白スペース */}
      <div className="h-24"></div>
    </>
  );
}

