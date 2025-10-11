"use client";

import { useState, useRef, useEffect } from "react";
import ActionButton from "@/components/ui/ActionButton";
import FreeTextInput from "./FreeTextInput";

type DynamicInputProps = {
  suggestions: string[];
  inputPlaceholder?: string;
  onSuggestionClick: (suggestion: string) => void;
  onFreeTextSubmit: (text: string) => void;
};

export default function DynamicInput({
  suggestions,
  inputPlaceholder = "他の内容を入力...",
  onSuggestionClick,
  onFreeTextSubmit
}: DynamicInputProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputAreaRef = useRef<HTMLDivElement>(null);

  // 外側クリックで入力欄を閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isExpanded && inputAreaRef.current && !inputAreaRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionClick(suggestion);
    setIsExpanded(false);
  };

  const handleFreeTextSubmit = (text: string) => {
    onFreeTextSubmit(text);
    setIsExpanded(false);
  };

  return (
    <div ref={inputAreaRef} className="max-w-4xl mx-auto">
      {!isExpanded ? (
        /* デフォルト: 選択肢ボタン群 + 縮小版入力欄 */
        <div className="flex items-stretch gap-3 h-[56px]">
          {/* 選択肢ボタン - 配列から動的生成 */}
          {suggestions.map((suggestion, index) => (
            <ActionButton
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex-1"
            >
              {suggestion}
            </ActionButton>
          ))}
          
          {/* 縮小版入力欄 - 常に最後に配置 */}
          <button
            onClick={() => setIsExpanded(true)}
            className="flex-1 bg-white/8 backdrop-blur-md text-white/50 px-6 rounded-3xl border border-white/15 hover:bg-white/15 hover:border-white/25 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)] flex items-center text-left text-sm"
          >
            {inputPlaceholder}
          </button>
        </div>
      ) : (
        /* 展開: フリーテキスト入力欄 */
        <FreeTextInput onSend={handleFreeTextSubmit} />
      )}
    </div>
  );
}

