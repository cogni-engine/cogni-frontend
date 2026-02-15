import { useRef, useEffect } from 'react';
import { NextStepButton } from '../components/NextStepButton';
import { SubText } from '../components/SubText';

interface OnboardingNameProps {
  error: string | null;
  loading: boolean;
  name: string;
  setName: (name: string) => void;
  handleNameSubmit: (e: React.FormEvent) => void;
}

const MAX_NAME_LENGTH = 20;

export function OnboardingName({
  error,
  loading,
  name,
  setName,
  handleNameSubmit,
}: OnboardingNameProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isFormValid = name.trim().length >= 2 && name.length <= MAX_NAME_LENGTH;
  const characterCount = name.length;

  // Delay focus to avoid scroll-into-view during framer-motion enter animation
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_NAME_LENGTH) {
      setName(value);
    }
  };

  return (
    <div className='flex flex-col h-full animate-in fade-in duration-500'>
      {/* Main Content */}
      <div className='flex-1 flex flex-col justify-between'>
        <form onSubmit={handleNameSubmit} className='flex-1 flex flex-col'>
          <div className='space-y-6 flex-1'>
            {/* Title */}
            <div className='text-center space-y-3'>
              <h1 className='text-3xl md:text-4xl font-bold text-white leading-tight'>
                What&apos;s your
                <br />
                preferred name?
              </h1>
              <SubText>
                We are really glad that you&apos;re here! What should we call
                you?
              </SubText>
            </div>

            {/* Input Field */}
            <div className='space-y-2 mt-12'>
              <div className='relative pb-6'>
                <div className='flex items-center gap-4 border-b border-white pb-2 focus-within:border-white transition-colors'>
                  <input
                    ref={inputRef}
                    id='name'
                    type='text'
                    value={name}
                    onChange={handleNameChange}
                    onFocus={() => {
                      setTimeout(() => {
                        window.scrollTo(0, 0);
                      }, 100);
                    }}
                    className='flex-1 bg-transparent text-white text-lg outline-none border-none autofill:bg-transparent autofill:text-white text-center'
                    required
                    minLength={2}
                    maxLength={MAX_NAME_LENGTH}
                    autoComplete='off'
                  />
                </div>
                <span className='absolute bottom-0 right-0 text-sm text-gray-400'>
                  {characterCount}/{MAX_NAME_LENGTH}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className='bg-red-900/30 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm'>
                <p className='text-red-300 text-sm'>{error}</p>
              </div>
            )}
          </div>

          {/* Continue Button */}
          <div className='mt-8 pt-6'>
            <NextStepButton
              type='submit'
              isFormValid={isFormValid}
              loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
