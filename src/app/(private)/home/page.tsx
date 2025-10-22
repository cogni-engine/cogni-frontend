"use client";

import { useEffect, useRef } from "react";
import ChatContainer from "@/components/cogno/ChatContainer";
import InputArea from "@/components/input/InputArea";
import { useCogno } from "@/hooks/useCogno";
import { useThreadContext } from "@/contexts/ThreadContext";
import { useUI } from "@/contexts/UIContext";

export default function HomePage() {
  const { selectedThreadId } = useThreadContext();
  const { 
    messages, 
    sendMessage, 
    fetchMessages, 
    isLoading, 
    error,
    activeTimer,
    remainingSeconds,
  } = useCogno(selectedThreadId);
  const { isThreadSidebarOpen, messageRefreshTrigger } = useUI();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevMessageCountRef = useRef(0);

  useEffect(() => {
    if (selectedThreadId) {
      fetchMessages(selectedThreadId);
    }
  }, [selectedThreadId, fetchMessages]);

  // 新しいメッセージが追加されたら自動スクロール
  useEffect(() => {
    const currentCount = messages.length;

    if (currentCount > prevMessageCountRef.current && currentCount > 0 && scrollContainerRef.current) {
      setTimeout(() => {
        scrollContainerRef.current?.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }

    prevMessageCountRef.current = currentCount;
  }, [messages]);

  // Listen to message refresh trigger from NotificationPanel
  useEffect(() => {
    if (messageRefreshTrigger > 0 && selectedThreadId) {
      fetchMessages(selectedThreadId);
    }
  }, [messageRefreshTrigger, selectedThreadId, fetchMessages]);

  return (
    <div 
      className={`flex flex-col h-full transition-all duration-300 ${
        isThreadSidebarOpen ? 'ml-80' : 'ml-0'
      }`}
    >
      <ChatContainer 
        ref={scrollContainerRef} 
        messages={messages}
        remainingSeconds={remainingSeconds}
      />
      <InputArea 
        messages={messages} 
        onSend={sendMessage}
        isLoading={isLoading}
      />
      {error && <div className="text-red-500 text-center p-4">{error}</div>}
    </div>
  );
}

