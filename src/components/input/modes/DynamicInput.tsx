"use client";

import { useState, useRef, useEffect } from "react";
import ActionButton from "@/components/ui/ActionButton";
import FreeTextInput from "./FreeTextInput";

type DynamicInputProps = {
  suggestions: string[];
  inputPlaceholder?: string;
  onSuggestionClick: (suggestion: string) => void;
  onFreeTextSubmit: (text: string) => void;
  isLoading?: boolean;
};

export default function DynamicInput({
  suggestions,
  inputPlaceholder = "他の内容を入力...",
  onSuggestionClick,
  onFreeTextSubmit,
  isLoading = false
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
              disabled={isLoading}
            >
              {suggestion}
            </ActionButton>
          ))}
          
          {/* 縮小版入力欄 - 常に最後に配置 */}
          <button
            onClick={() => setIsExpanded(true)}
            disabled={isLoading}
            className="flex-1 bg-white/8 backdrop-blur-xl text-white/50 px-6 rounded-3xl border border-white/10 hover:border-white/15 hover:bg-white/12 hover:scale-[1.01] transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] flex items-center text-left text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "処理中..." : inputPlaceholder}
          </button>
        </div>
      ) : (
        /* 展開: フリーテキスト入力欄 */
        <FreeTextInput onSend={handleFreeTextSubmit} isLoading={isLoading} />
      )}
    </div>
  );
}

