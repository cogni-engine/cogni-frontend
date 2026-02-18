'use client';

import React from 'react';

type AIInitiatedMessageWrapperProps = {
  children: React.ReactNode;
};

export const AIInitiatedMessageWrapper = ({
  children,
}: AIInitiatedMessageWrapperProps) => {
  return (
    <div
      className='
      border border-border-default
      shadow-card
      bg-surface-overlay
      dark:backdrop-blur-md
      rounded-[1.618rem]
      px-6
      py-2
    '
    >
      {children}
    </div>
  );
};
