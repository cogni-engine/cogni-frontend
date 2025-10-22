"use client";

import { Message, AIMessage } from "@/types/chat";
import DynamicInput from "./modes/DynamicInput";

type InputAreaProps = {
  messages: Message[] | AIMessage[];
  onSend: (content: string) => void;
  isLoading?: boolean;
};

export default function InputArea({ messages, onSend, isLoading = false }: InputAreaProps) {

  // 最新のAIメッセージに基づいて動的に選択肢を生成
  const getCurrentSuggestions = () => {
    const assistantMessages = messages.filter(m => m.role === "assistant");
    const lastAiMessage = assistantMessages[assistantMessages.length - 1];
    
    if (lastAiMessage?.content.includes("休学届")) {
      return {
        suggestions: ["後で見る", "今休学届を書く", "母親に相談"],
        placeholder: "その他..."
      };
    }
    
    // デフォルトの選択肢
    return {
      suggestions: ["もっと詳しく説明して", "具体例を教えて"],
      placeholder: "他の内容を入力..."
    };
  };

  const config = getCurrentSuggestions();

  return (
    <div className="border-t border-white/10 bg-gradient-to-br from-slate-950/50 via-black/50 to-slate-950/50 backdrop-blur-md relative z-10 rounded-t-3xl">
      {/* 入力UI */}
      <div className="px-4 md:px-6 pb-4 md:pb-6 pt-4">
        <DynamicInput
          suggestions={config.suggestions}
          inputPlaceholder={config.placeholder}
          onSuggestionClick={onSend}
          onFreeTextSubmit={onSend}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

