import { Message, AIMessage } from "@/types/chat";
import MessageItem from "./MessageItem";
import EmptyState from "./EmptyState";

type MessageListProps = {
  messages: Message[] | AIMessage[];
};

export default function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return <EmptyState />;
  }
  
  return (
    <>
      {messages.map((message, i) => {
        // より安全なkey生成: ID + インデックスで一意性を保証
        const messageId = 'id' in message && typeof message.id === 'number' ? message.id : `temp-${i}`;
        const key = `${messageId}-${i}`;
        
        return (
          <div 
            key={key} 
            data-message-index={i}
          >
            <MessageItem message={message} />
          </div>
        );
      })}
      <div className="h-120"></div>
    </>
  );
}

