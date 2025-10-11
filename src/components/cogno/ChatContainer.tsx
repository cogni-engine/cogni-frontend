import { Message } from "@/types/chat";
import StarBackground from "./StarBackground";
import MessageList from "./MessageList";

type ChatContainerProps = {
  messages: Message[];
};

export default function ChatContainer({ messages }: ChatContainerProps) {
  return (
    <div className="flex-1 bg-gradient-to-br from-slate-950 via-black to-slate-950 relative overflow-hidden">
      <StarBackground />
      
      {/* AI応答エリア - 画面全体を占有 */}
      <div className="h-full overflow-y-auto relative z-10 p-6 md:p-8 space-y-6">
        <MessageList messages={messages} />
      </div>
    </div>
  );
}

