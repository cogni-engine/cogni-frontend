"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";

type FreeTextInputProps = {
  onSend: (text: string) => void;
  isLoading?: boolean;
};

export default function FreeTextInput({ onSend, isLoading = false }: FreeTextInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
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
          placeholder={isLoading ? "処理中..." : "Ask anything"}
          autoFocus
          disabled={isLoading}
          className="w-full h-full bg-white/8 backdrop-blur-xl text-white px-6 py-4 pr-14 rounded-3xl border border-white/10 focus:outline-none focus:border-white/15 focus:scale-[1.01] resize-none shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] focus:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur-xl border border-white/12 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/15 hover:scale-110 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)]"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

