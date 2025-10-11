"use client";

import { useRef } from "react";
import { Message } from "@/types/chat";

type HistoryPanelProps = {
  messages: Message[];
  isExpanded: boolean;
};

export default function HistoryPanel({ messages, isExpanded }: HistoryPanelProps) {
  const inputHistoryRef = useRef<HTMLDivElement>(null);
  const userMessages = messages.filter(m => m.role === "user");

  if (userMessages.length === 0) {
    return null;
  }

  return (
    <div className="transition-colors">
      <div 
        ref={inputHistoryRef}
        className={`overflow-y-auto px-4 md:px-6 space-y-1.5 transition-all duration-300 ${
          isExpanded ? 'max-h-[50vh] pb-2' : 'max-h-0'
        }`}
      >
        {userMessages.map((msg, i) => (
          <div 
            key={i} 
            className="text-gray-400 text-sm max-w-4xl mx-auto"
          >
            {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
}

