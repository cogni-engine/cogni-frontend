'use client';

import { useRef, useState, useEffect } from 'react';
import { ArrowUp, Plus, Square } from 'lucide-react';
import { VoiceInputButton } from '../VoiceInputButton';

type FreeTextInputProps = {
  onSend: (text: string) => void;
  onStop?: () => void;
  isLoading?: boolean;
  placeholder?: string;
};

export default function FreeTextInput({
  onSend,
  onStop,
  isLoading = false,
  placeholder = 'メッセージを入力...',
}: FreeTextInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lastEnterPressRef = useRef<number>(0);

  const maxRows = 7;

  const adjustHeight = (el: HTMLTextAreaElement) => {
    // 一旦リセットしてからscrollHeightを測る
    el.style.height = 'auto';
    const computed = window.getComputedStyle(el);
    const lineHeight = parseFloat(computed.lineHeight || '20');
    const maxHeight = lineHeight * maxRows;
    const nextHeight = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${nextHeight}px`;
    // 7行以上はスクロール
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
  };

  // 入力値が変更されたら（音声入力含む）高さを調整
  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight(textareaRef.current);
    }
  }, [input]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput('');
    // 高さをリセット（1行表示に戻す）
    if (textareaRef.current) {
      textareaRef.current.style.height = '';
      textareaRef.current.style.overflowY = 'hidden';
    }
  };

  const handleStop = () => {
    if (onStop && isLoading) {
      onStop();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Cmd/Ctrl+Enterは従来通り即座に送信
      if (e.metaKey || e.ctrlKey) {
        e.preventDefault();
        handleSend();
        return;
      }

      const now = Date.now();
      const timeSinceLastEnter = now - lastEnterPressRef.current;

      // 2000ms以内に2回Enterが押されたら送信
      if (timeSinceLastEnter < 2000 && timeSinceLastEnter > 0) {
        e.preventDefault();
        handleSend();
        lastEnterPressRef.current = 0; // リセット
      } else {
        // 1回目は改行（デフォルト動作を許可）、時刻を記録
        lastEnterPressRef.current = now;
      }
    }
  };

  return (
    <div className='relative'>
      {/* プラスボタン - 入力欄の下端に固定 */}
      <button
        className='absolute left-0 bottom-2 bg-white/8 backdrop-blur-xl text-white/80 rounded-full border border-black transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] flex items-center justify-center w-[50px] h-[50px] p-0 z-10'
        type='button'
      >
        <Plus className='w-5 h-5' />
      </button>
      <div className='flex-1 relative ml-[55px]'>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={e => adjustHeight(e.currentTarget)}
          placeholder={placeholder}
          autoFocus
          disabled={isLoading}
          rows={1}
          className='w-full bg-white/8 backdrop-blur-xl text-white px-5 py-3.5 pr-[140px] rounded-4xl border border-black focus:outline-none resize-none shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] focus:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-y-auto'
        />
        {/* マイクボタン - 送信ボタンの左 */}
        <div className='absolute right-[50px] bottom-2.5 z-10'>
          <VoiceInputButton
            onTranscriptChange={text => setInput(text)}
            currentText={input}
            disabled={isLoading}
            className='w-11 h-11 rounded-full bg-transparent border-0 text-white hover:scale-102 transition-all duration-300'
          />
        </div>
        {/* 送信ボタン / 停止ボタン */}
        <button
          onClick={isLoading ? handleStop : handleSend}
          disabled={!isLoading && (!input.trim() || isLoading)}
          className='absolute right-2.5 bottom-3 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-black text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/15 hover:scale-102 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)]'
        >
          {isLoading ? (
            <Square className='w-4 h-4 fill-current' />
          ) : (
            <ArrowUp className='w-4 h-4' />
          )}
        </button>
      </div>
    </div>
  );
}
