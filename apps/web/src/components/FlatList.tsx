'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface FlatListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FlatList = React.forwardRef<HTMLDivElement, FlatListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col w-full', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
FlatList.displayName = 'FlatList';

interface FlatListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  active?: boolean;
  hoverable?: boolean;
  showDivider?: boolean;
}

const FlatListItem = React.forwardRef<HTMLDivElement, FlatListItemProps>(
  (
    {
      className,
      children,
      active,
      hoverable = true,
      showDivider = false,
      ...props
    },
    ref
  ) => {
    return (
      <React.Fragment>
        <div
          ref={ref}
          className={cn(
            'group relative px-5 py-2 cursor-pointer transition-all duration-200 select-none overflow-hidden',
            // Base state
            'bg-transparent',
            // Hover state
            hoverable && 'hover:bg-surface-primary',
            // Active/Clicked state
            active && 'bg-interactive-hover shadow-inner',
            className
          )}
          {...props}
        >
          {children}
        </div>
        {showDivider && <div className='mx-5 border-b border-border-default' />}
      </React.Fragment>
    );
  }
);
FlatListItem.displayName = 'FlatListItem';

export { FlatList, FlatListItem };
