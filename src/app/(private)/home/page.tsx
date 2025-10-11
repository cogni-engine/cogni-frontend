"use client";

import ChatContainer from "@/components/cogno/ChatContainer";
import InputArea from "@/components/input/InputArea";
import { useCognoChat } from "@/hooks/useCognoChat";

export default function HomePage() {
  const { messages, sendMessage } = useCognoChat();

  return (
    <div className="flex flex-col h-full">
      <ChatContainer messages={messages} />
      <InputArea messages={messages} onSend={sendMessage} />
    </div>
  );
}

