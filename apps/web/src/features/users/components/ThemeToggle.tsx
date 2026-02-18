'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Monitor, Sun, Moon } from 'lucide-react';
import GlassCard from '@/components/glass-design/GlassCard';
import { cn } from '@/lib/utils';

const themes = [
  { value: 'system', label: 'Auto', icon: Monitor },
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeIndex = mounted ? themes.findIndex(t => t.value === theme) : -1;
  const tabWidthPercent = 100 / themes.length;

  return (
    <div className='space-y-3 lg:grid lg:grid-cols-[200px_1fr] lg:gap-10 lg:space-y-0'>
      <div className='lg:pt-2'>
        <h3 className='text-base font-semibold text-text-primary'>Theme</h3>
      </div>

      <GlassCard className='rounded-full'>
        <div className='relative flex items-center justify-around p-1'>
          {/* Sliding indicator */}
          <div
            className='absolute h-[calc(100%-8px)] rounded-full liquid-glass-indicator will-change-[transform,opacity]'
            style={{
              width: `calc(${tabWidthPercent}% - 8px)`,
              left: '4px',
              transform: `translateX(calc(${activeIndex} * (100% + 8px)))`,
              opacity: activeIndex === -1 ? 0 : 1,
              transition:
                'transform 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease',
            }}
          />

          {themes.map(t => {
            const isActive = mounted && theme === t.value;

            return (
              <button
                key={t.value}
                type='button'
                onClick={() => setTheme(t.value)}
                className='liquid-glass-button relative z-10 flex flex-col items-center gap-0.5 px-4 py-2 transition-all duration-300 group flex-1 bg-transparent border-none outline-none cursor-pointer'
              >
                <div
                  className={cn(
                    'transition-colors duration-300',
                    isActive
                      ? 'text-text-primary'
                      : 'text-nav-text-inactive group-hover:text-text-primary'
                  )}
                >
                  <t.icon className='w-5 h-5' />
                </div>
                <span
                  className={cn(
                    'text-xs font-medium transition-colors duration-300',
                    isActive
                      ? 'text-text-primary'
                      : 'text-nav-text-inactive group-hover:text-text-primary'
                  )}
                >
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
