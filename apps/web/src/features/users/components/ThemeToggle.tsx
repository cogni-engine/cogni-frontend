'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Monitor, Sun, Moon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const themes = [
  { value: 'system', label: 'System', icon: Monitor },
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className='h-fit'>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Choose how Cogno looks to you.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-3 gap-2'>
            {themes.map(t => (
              <div
                key={t.value}
                className='flex flex-col items-center gap-2 rounded-lg border border-border-default p-3'
              >
                <t.icon className='h-5 w-5 text-text-muted' />
                <span className='text-xs font-medium text-text-muted'>
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Choose how Cogno looks to you.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-3 gap-2'>
          {themes.map(t => {
            const isActive = theme === t.value;
            return (
              <button
                key={t.value}
                type='button'
                onClick={() => setTheme(t.value)}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-lg border p-3 transition-colors',
                  isActive
                    ? 'border-emerald-500 bg-emerald-500/10 text-text-primary'
                    : 'border-border-default text-text-secondary hover:bg-interactive-hover hover:text-text-primary'
                )}
              >
                <t.icon className='h-5 w-5' />
                <span className='text-xs font-medium'>{t.label}</span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
