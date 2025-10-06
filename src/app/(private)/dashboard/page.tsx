"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // ユーザーのメッセージを追加
    const newMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // 仮のAI応答（後でFastAPI連携予定）
    const aiResponse = {
      role: "assistant" as const,
      content: "なるほど、それについてもう少し詳しく教えてください。",
    };
    setTimeout(() => setMessages((prev) => [...prev, aiResponse]), 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-950 via-black to-slate-950 relative overflow-hidden">
      {/* 背景の星 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-white/15 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white/25 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/2 w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse delay-1500"></div>
      </div>

      {/* メッセージエリア */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 relative z-10">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 flex items-center justify-center mb-6">
              <div className="relative">
                {/* 彗星の核 */}
                <div className="w-4 h-4 bg-white rounded-full shadow-lg"></div>
                {/* アシンメトリーな彗星の尾 */}
                <div className="absolute top-1/2 left-0 w-16 h-0.5 bg-gradient-to-r from-white/60 via-white/30 to-transparent transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-0 w-14 h-0.5 bg-gradient-to-r from-white/40 via-white/20 to-transparent transform -translate-y-1/2 translate-y-2"></div>
                <div className="absolute top-1/2 left-0 w-12 h-0.5 bg-gradient-to-r from-white/30 via-white/15 to-transparent transform -translate-y-1/2 -translate-y-2"></div>
                <div className="absolute top-1/2 left-0 w-10 h-0.5 bg-gradient-to-r from-white/20 via-white/10 to-transparent transform -translate-y-1/2 translate-y-3"></div>
                <div className="absolute top-1/2 left-0 w-8 h-0.5 bg-gradient-to-r from-white/15 via-white/5 to-transparent transform -translate-y-1/2 -translate-y-3"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Cogno</h2>
            <p className="text-gray-400 max-w-md text-lg">
              Your cosmic AI companion. Ask anything, explore everything.
            </p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-5 py-4 rounded-3xl backdrop-blur-md border ${
                  msg.role === "user"
                    ? "bg-white/15 text-white border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                    : "bg-white/8 text-gray-100 border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 入力フォーム */}
      <div className="p-4 md:p-6 border-t border-white/5 bg-white/2 backdrop-blur-md relative z-10">
        <div className="flex items-end gap-3 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything"
              className="w-full bg-white/8 backdrop-blur-md text-white px-6 py-4 pr-14 rounded-3xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-white/25 focus:border-white/30 resize-none min-h-[56px] max-h-32 shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)]"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="absolute right-3 top-3 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/25 hover:scale-105 transition-all shadow-[0_8px_25px_rgba(0,0,0,0.3)]"
            >
              <span className="text-sm font-bold">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* ナビゲーションバー */}
      <div className="border-t border-white/5 bg-white/3 backdrop-blur-md relative z-10">
        <div className="flex items-center justify-around py-4 px-4">
          {/* Chat - ボルボ風 */}
          <button className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 group">
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-white rounded-full group-hover:scale-110 transition-transform"></div>
              {/* ボルボの矢印 */}
              <div className="absolute top-1/2 left-0 w-8 h-0.5 bg-gradient-to-r from-white/60 via-white/30 to-transparent transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-0 w-6 h-0.5 bg-gradient-to-r from-white/40 via-white/20 to-transparent transform -translate-y-1/2 translate-y-1"></div>
              <div className="absolute top-1/2 left-0 w-4 h-0.5 bg-gradient-to-r from-white/30 via-white/10 to-transparent transform -translate-y-1/2 -translate-y-1"></div>
            </div>
            <span className="text-xs font-medium">Chat</span>
          </button>

          {/* Cogno - 彗星 */}
          <button className="flex flex-col items-center gap-2 text-white">
            <div className="relative">
              <div className="w-3.5 h-3.5 bg-white rounded-full shadow-lg"></div>
              {/* アシンメトリーな彗星の尾 */}
              <div className="absolute top-1/2 left-0 w-10 h-0.5 bg-gradient-to-r from-white/60 via-white/30 to-transparent transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-0 w-8 h-0.5 bg-gradient-to-r from-white/40 via-white/20 to-transparent transform -translate-y-1/2 translate-y-1.5"></div>
              <div className="absolute top-1/2 left-0 w-6 h-0.5 bg-gradient-to-r from-white/30 via-white/15 to-transparent transform -translate-y-1/2 -translate-y-1.5"></div>
              <div className="absolute top-1/2 left-0 w-4 h-0.5 bg-gradient-to-r from-white/20 via-white/10 to-transparent transform -translate-y-1/2 translate-y-2.5"></div>
            </div>
            <span className="text-xs font-medium">Cogno</span>
          </button>

          {/* Notes - 土星風 */}
          <button className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 group">
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-white rounded-full group-hover:scale-110 transition-transform"></div>
              {/* 土星の環 */}
              <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-12"></div>
              <div className="absolute top-1/2 left-1/2 w-5 h-0.5 bg-gradient-to-r from-transparent via-white/25 to-transparent transform -translate-x-1/2 -translate-y-1/2 -rotate-12"></div>
              <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-gradient-to-r from-transparent via-white/15 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-6"></div>
            </div>
            <span className="text-xs font-medium">Notes</span>
          </button>
        </div>
      </div>
    </div>
  );
}