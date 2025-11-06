'use client';

import AiAugmentedInput from './AiAugmentedInput';
import FreeTextInput from './FreeTextInput';
import { forwardRef } from 'react';

type DynamicInputProps = {
  suggestions: string[]; // 互換性のため残す（未使用）
  inputPlaceholder?: string;
  onSuggestionClick: (suggestion: string) => void; // 互換性のため残す（未使用）
  onFreeTextSubmit: (text: string, workspaceFileIds?: number[]) => void;
  onStop?: () => void;
  isLoading?: boolean;
  canStop?: boolean;
  ai_augmented_input?: boolean;
  workspaceId?: number;
};

export type DynamicInputRef = {
  focus: () => void;
};

const DynamicInput = forwardRef<DynamicInputRef, DynamicInputProps>(
  function DynamicInput(
    {
      inputPlaceholder = 'メッセージを入力...',
      onFreeTextSubmit,
      onStop,
      isLoading = false,
      canStop = true,
      ai_augmented_input = true,
      workspaceId,
    },
    ref
  ) {
    return (
      <div className='w-full md:max-w-4xl md:mx-auto'>
        {ai_augmented_input ? (
          <AiAugmentedInput
            ref={ref}
            onSend={onFreeTextSubmit}
            onStop={onStop}
            isLoading={isLoading}
            placeholder={inputPlaceholder}
            canStop={canStop}
            workspaceId={workspaceId}
          />
        ) : (
          <FreeTextInput
            ref={ref}
            onSend={onFreeTextSubmit}
            onStop={onStop}
            isLoading={isLoading}
            placeholder={inputPlaceholder}
            canStop={canStop}
            workspaceId={workspaceId}
          />
        )}
      </div>
    );
  }
);

export default DynamicInput;
