"use client";

import { useEffect, useRef } from 'react';
import { useCogno } from '@/hooks/useCogno';
import { useUI } from '@/contexts/UIContext';
import ChatContainer from '@/components/cogno/ChatContainer';
import InputArea from '@/components/input/InputArea';

/**
 * Cogno Demo Page
 * 
 * 新しいCognoアーキテクチャのデモページ
 * - cogni_engineによる意思決定（focus_task + timer判定）
 * - conversationによるユーザー会話
 * - タイマー機能の統合
 */
export default function CognoDemoPage() {
  // TODO: 実際のthreadIdを取得する（現在は仮のID）
  const threadId = 64; // 実際はURLパラメータやstateから取得
  
  const {
    messages,
    sendMessage,
    fetchMessages,
    isLoading,
    error,
    activeTimer,
    remainingSeconds,
  } = useCogno(threadId);
  
  const { messageRefreshTrigger } = useUI();

  const chatEndRef = useRef<HTMLDivElement>(null);

  // 初期メッセージ取得
  useEffect(() => {
    if (threadId) {
      fetchMessages(threadId);
    }
  }, [threadId, fetchMessages]);

  // メッセージが更新されたらスクロール
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Listen to message refresh trigger from NotificationPanel
  useEffect(() => {
    if (messageRefreshTrigger > 0 && threadId) {
      fetchMessages(threadId);
    }
  }, [messageRefreshTrigger, threadId, fetchMessages]);

  const handleSendMessage = async (content: string) => {
    await sendMessage(content);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white">Cogno Demo</h1>
        <p className="text-sm text-gray-400">
          Cogni Engine + Conversation AI + Timer System
        </p>
        {activeTimer && (
          <div className="mt-2 text-xs text-green-400">
            ⏱️ タイマー実行中: {Math.floor((remainingSeconds || 0) / 60)}分{(remainingSeconds || 0) % 60}秒
          </div>
        )}
      </div>

      {/* Chat Container */}
      <ChatContainer 
        messages={messages} 
        remainingSeconds={remainingSeconds}
      />

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 text-sm">
          {error}
        </div>
      )}

      {/* Input Area */}
      <InputArea
        messages={messages}
        onSend={handleSendMessage}
        isLoading={isLoading}
      />

      <div ref={chatEndRef} />
    </div>
  );
}

