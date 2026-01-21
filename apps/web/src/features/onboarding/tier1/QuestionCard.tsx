import { useState } from 'react';
import type { QuestionConfig } from '../types';
import { NextStepButton } from '../components/NextStepButton';

interface QuestionCardProps {
  config: QuestionConfig;
  value: string | string[] | undefined;
  onAnswer: (value: string | string[]) => void;
  onNext: () => void;
  loading?: boolean;
  error?: string | null;
}

export function QuestionCard({
  config,
  value,
  onAnswer,
  onNext,
  loading = false,
  error = null,
}: QuestionCardProps) {
  const [localValue, setLocalValue] = useState<string | string[]>(
    value || (config.type === 'multi-select' ? [] : '')
  );

  const handleSelect = (option: string) => {
    if (config.type === 'multi-select') {
      const current = Array.isArray(localValue) ? localValue : [];
      const newValue = current.includes(option)
        ? current.filter(v => v !== option)
        : [...current, option];
      setLocalValue(newValue);
      onAnswer(newValue);
    } else {
      setLocalValue(option);
      onAnswer(option);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onAnswer(newValue);
  };

  const handleContinue = () => {
    // Validate required fields
    if (config.required) {
      if (
        config.type === 'multi-select' &&
        Array.isArray(localValue) &&
        localValue.length === 0
      ) {
        return; // Don't proceed if no options selected
      }
      if (config.type === 'single-select' && !localValue) {
        return; // Don't proceed if nothing selected
      }
      if (
        config.type === 'text' &&
        typeof localValue === 'string' &&
        !localValue.trim()
      ) {
        return; // Don't proceed if text is empty
      }
    }
    onNext();
  };

  const isValid = () => {
    if (!config.required) return true;

    if (config.type === 'multi-select') {
      return Array.isArray(localValue) && localValue.length > 0;
    }
    if (config.type === 'single-select') {
      return Boolean(localValue);
    }
    if (config.type === 'text') {
      return typeof localValue === 'string' && localValue.trim().length > 0;
    }
    return true;
  };

  return (
    <div className='flex flex-col h-full animate-in fade-in duration-500'>
      {/* Fixed Header: Title */}
      <div className='shrink-0 text-center space-y-3 mb-8'>
        <h1 className='text-3xl md:text-4xl font-bold text-white leading-tight'>
          {config.title}
        </h1>
        {config.subtitle && (
          <p className='text-lg md:text-xl text-gray-300 max-w-md mx-auto'>
            {config.subtitle}
          </p>
        )}
      </div>

      {/* Scrollable Content: Options */}
      <div className='flex-1 overflow-y-auto min-h-0 question-card-scroll'>
        <div className='space-y-3'>
          {config.type === 'single-select' && config.options && (
            <div className='space-y-3'>
              {config.options.map(option => {
                const isSelected = localValue === option;
                return (
                  <button
                    key={option}
                    type='button'
                    onClick={() => handleSelect(option)}
                    disabled={loading}
                    className={`w-full py-3 px-4 text-left rounded-xl bg-white/5 border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isSelected
                        ? 'text-white border-white/50'
                        : 'text-gray-300 border-transparent'
                    }`}
                  >
                    <span className='font-medium'>{option}</span>
                  </button>
                );
              })}
            </div>
          )}

          {config.type === 'multi-select' && config.options && (
            <div className='space-y-3'>
              {config.options.map(option => {
                const isSelected =
                  Array.isArray(localValue) && localValue.includes(option);
                return (
                  <button
                    key={option}
                    type='button'
                    onClick={() => handleSelect(option)}
                    disabled={loading}
                    className={`w-full py-3 px-4 text-left rounded-xl bg-white/5 border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isSelected
                        ? 'text-white border-white/50'
                        : 'text-gray-300 border-transparent'
                    }`}
                  >
                    <span className='font-medium'>{option}</span>
                  </button>
                );
              })}
            </div>
          )}

          {config.type === 'text' && (
            <div className='space-y-2'>
              <textarea
                value={typeof localValue === 'string' ? localValue : ''}
                onChange={handleTextChange}
                placeholder={config.placeholder}
                disabled={loading}
                className='w-full px-4 py-3 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none min-h-[120px]'
                rows={5}
              />
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className='mt-4 bg-red-900/30 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm'>
            <p className='text-red-300 text-sm'>{error}</p>
          </div>
        )}
      </div>

      {/* Fixed Footer: Continue Button */}
      <div className='shrink-0 mt-4'>
        <NextStepButton
          type='button'
          onClick={handleContinue}
          isFormValid={isValid()}
          loading={loading}
        />
      </div>
    </div>
  );
}
