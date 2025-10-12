"use client";

import ChatContainer from "@/components/cogno/ChatContainer";
import InputArea from "@/components/input/InputArea";
import { useCognoChat } from "@/hooks/useCognoChat";
import { useThreadContext } from "@/contexts/ThreadContext";

export default function HomePage() {
  const { messages, sendMessage } = useCognoChat();
  const { selectedThreadId } = useThreadContext();

  // Now you can use selectedThreadId in your home page!
  // For example: fetch messages for the selected thread, etc.

  return (
    <div className="flex flex-col h-full">
      <ChatContainer messages={messages} />
      <InputArea messages={messages} onSend={sendMessage} />
    </div>
  );
}

