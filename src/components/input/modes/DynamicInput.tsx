'use client';

import FreeTextInput from './FreeTextInput';

type DynamicInputProps = {
  suggestions: string[]; // 互換性のため残す（未使用）
  inputPlaceholder?: string;
  onSuggestionClick: (suggestion: string) => void; // 互換性のため残す（未使用）
  onFreeTextSubmit: (text: string) => void;
  onStop?: () => void;
  isLoading?: boolean;
  canStop?: boolean;
};

export default function DynamicInput({
  inputPlaceholder = 'メッセージを入力...',
  onFreeTextSubmit,
  onStop,
  isLoading = false,
  canStop = true,
}: DynamicInputProps) {
  return (
    <div className='max-w-4xl mx-auto'>
      <FreeTextInput
        onSend={onFreeTextSubmit}
        onStop={onStop}
        isLoading={isLoading}
        placeholder={inputPlaceholder}
        canStop={canStop}
      />
    </div>
  );
}
