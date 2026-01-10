interface OnboardingNameProps {
  error: string | null;
  loading: boolean;
  name: string;
  setName: (name: string) => void;
  handleNameSubmit: (e: React.FormEvent) => void;
  handleBack?: () => void;
}

const MAX_NAME_LENGTH = 20;

export function OnboardingName({
  error,
  loading,
  name,
  setName,
  handleNameSubmit,
  handleBack,
}: OnboardingNameProps) {
  const isFormValid = name.trim().length >= 2 && name.length <= MAX_NAME_LENGTH;
  const characterCount = name.length;

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
              <h1 className='text-4xl md:text-5xl font-bold text-white leading-tight'>
                What&apos;s your preferred name?
              </h1>
              <p className='text-lg md:text-xl text-gray-300 max-w-md mx-auto'>
                We are really glad that you&apos;re here! What should we call
                you?
              </p>
            </div>

            {/* Input Field */}
            <div className='space-y-2 mt-12'>
              <div className='relative'>
                <div className='flex items-center gap-4 border-b border-white/20 pb-2 focus-within:border-blue-500 transition-colors'>
                  <input
                    id='name'
                    type='text'
                    value={name}
                    onChange={handleNameChange}
                    placeholder='Enter your name'
                    className='flex-1 bg-transparent text-white text-lg placeholder-gray-500 outline-none border-none'
                    required
                    minLength={2}
                    maxLength={MAX_NAME_LENGTH}
                    autoFocus
                  />
                  <span className='text-sm text-gray-400 shrink-0'>
                    {characterCount}/{MAX_NAME_LENGTH}
                  </span>
                </div>
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
            <button
              type='submit'
              disabled={!isFormValid || loading}
              className='w-full px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg rounded-full shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-600'
            >
              {loading ? 'Saving...' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
