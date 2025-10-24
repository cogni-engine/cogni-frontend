import { useRef, useCallback, useEffect } from 'react';
import { Message, AIMessage } from '@/types/chat';

const SCROLL_OFFSET = 25; // ヘッダー高さ + 余白

/**
 * メッセージスクロール機能を提供するフック
 * - 履歴メッセージクリック時のスクロール
 * - 新規AIメッセージ受信時の自動スクロール
 */
export function useMessageScroll(messages: Message[] | AIMessage[]) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevMessageCountRef = useRef(0);

  const scrollToMessage = useCallback((messageIndex: number) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const messageElement = container.querySelector(
      `[data-message-index="${messageIndex}"]`
    ) as HTMLElement;

    if (!messageElement) return;

    // コンテナ内でのメッセージ要素の相対位置を取得
    const containerRect = container.getBoundingClientRect();
    const elementRect = messageElement.getBoundingClientRect();

    // 現在のスクロール位置 + 要素の相対位置 - 調整値
    const targetScrollTop =
      container.scrollTop +
      (elementRect.top - containerRect.top) -
      SCROLL_OFFSET;

    container.scrollTo({
      top: Math.max(0, targetScrollTop),
      behavior: 'smooth',
    });
  }, []);

  // 新しいAIメッセージが追加されたら自動スクロール
  useEffect(() => {
    const assistantMessages = messages.filter(m => m.role === 'assistant');
    const currentCount = assistantMessages.length;

    // メッセージが増えた場合のみスクロール
    if (currentCount > prevMessageCountRef.current && currentCount > 0) {
      // 最新メッセージのインデックス
      const latestIndex = currentCount - 1;

      // 少し遅延を入れてDOM更新を待つ
      setTimeout(() => {
        scrollToMessage(latestIndex);
      }, 100);
    }

    prevMessageCountRef.current = currentCount;
  }, [messages, scrollToMessage]);

  return {
    scrollContainerRef,
    scrollToMessage,
  };
}
