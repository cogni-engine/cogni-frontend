'use client';

import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-background text-text-primary'>
      <div className='w-full max-w-sm sm:max-w-md flex flex-col items-center p-8'>
        {children}
      </div>
    </div>
  );
}
