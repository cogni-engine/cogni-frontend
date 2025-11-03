'use client';

import AiAugmentedInput from './AiAugmentedInput';
import FreeTextInput from './FreeTextInput';

type DynamicInputProps = {
  suggestions: string[]; // 互換性のため残す（未使用）
  inputPlaceholder?: string;
  onSuggestionClick: (suggestion: string) => void; // 互換性のため残す（未使用）
  onFreeTextSubmit: (text: string) => void;
  onStop?: () => void;
  isLoading?: boolean;
  canStop?: boolean;
  ai_augmented_input?: boolean;
};

export default function DynamicInput({
  inputPlaceholder = 'メッセージを入力...',
  onFreeTextSubmit,
  onStop,
  isLoading = false,
  canStop = true,
  ai_augmented_input = true,
}: DynamicInputProps) {
  return (
    <div className='w-full md:max-w-4xl md:mx-auto'>
      {ai_augmented_input ? (
        <AiAugmentedInput
          onSend={onFreeTextSubmit}
          onStop={onStop}
          isLoading={isLoading}
          placeholder={inputPlaceholder}
          canStop={canStop}
        />
      ) : (
        <FreeTextInput
          onSend={onFreeTextSubmit}
          onStop={onStop}
          isLoading={isLoading}
          placeholder={inputPlaceholder}
          canStop={canStop}
        />
      )}
    </div>
  );
}
