"use client";

import { useState } from "react";

type FreeTextInputProps = {
  onSend: (text: string) => void;
};

export default function FreeTextInput({ onSend }: FreeTextInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-3 h-[56px]">
      <div className="flex-1 relative h-full">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask anything"
          autoFocus
          className="w-full h-full bg-white/8 backdrop-blur-md text-white px-6 py-4 pr-14 rounded-3xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-white/25 focus:border-white/30 resize-none shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)]"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/25 hover:scale-105 transition-all shadow-[0_8px_25px_rgba(0,0,0,0.3)]"
        >
          <span className="text-sm font-bold">→</span>
        </button>
      </div>
    </div>
  );
}

