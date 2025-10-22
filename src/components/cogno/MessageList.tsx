import { Message, AIMessage } from "@/types/chat";
import MessageItem from "./MessageItem";
import EmptyState from "./EmptyState";

type MessageListProps = {
  messages: Message[] | AIMessage[];
  remainingSeconds?: number | null;
};

export default function MessageList({ messages, remainingSeconds }: MessageListProps) {
  if (messages.length === 0) {
    return <EmptyState />;
  }
  
  return (
    <>
      {messages.map((message, i) => {
        const key = 'id' in message && typeof message.id === 'number' ? message.id : i;
        
        return (
          <div 
            key={key} 
            data-message-index={i}
          >
            <MessageItem 
              message={message} 
              remainingSeconds={remainingSeconds}
            />
          </div>
        );
      })}
      <div className="h-120"></div>
    </>
  );
}

