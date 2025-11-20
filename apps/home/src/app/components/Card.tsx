'use client';

import type { ReactNode } from 'react';

type CardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  children?: ReactNode;
};

export function Card({ title, description, icon, children }: CardProps) {
  return (
    <div className='flex h-full flex-col gap-5 rounded-2xl shadow-lg shadow-black/30 backdrop-blur-sm transition hover:border-white/40'>
      {icon ? (
        <div className='flex w-full items-center justify-center'>{icon}</div>
      ) : null}
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold text-white'>{title}</h3>
        <p className='text-sm text-slate-300'>{description}</p>
      </div>
      {children ? (
        <div className='mt-auto text-sm text-slate-400'>{children}</div>
      ) : null}
    </div>
  );
}
