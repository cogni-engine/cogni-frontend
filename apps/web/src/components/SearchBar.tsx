import * as React from 'react';
import { MicIcon, SearchIcon } from 'lucide-react';

import GlassCard from '@/components/glass-card/GlassCard';
import { cn } from '@/lib/utils';

export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  className?: string;
  containerClassName?: string;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ containerClassName, type = 'text', className, ...inputProps }, ref) => (
    <GlassCard
      className={cn(
        'flex flex-1 items-center rounded-4xl px-4 py-3',
        containerClassName
      )}
    >
      <SearchIcon className='mr-2 size-5 text-gray-400' />
      <input
        ref={ref}
        type={type}
        className={cn(
          'w-full bg-transparent text-base text-white outline-none placeholder-white/50',
          className
        )}
        {...inputProps}
      />
      <MicIcon className='ml-2 size-5 text-gray-400' />
    </GlassCard>
  )
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;
