'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, Notebook } from 'lucide-react';
import { CognoSvgIcon } from '../icons/CognoSvgIcon';
import GlassCard from '../glass-design/GlassCard';

const tabs = [
  {
    name: 'Workspace',
    path: '/workspace',
    icon: <HomeIcon className='w-6 h-6' />,
  },
  { name: 'Cogno', path: '/cogno', icon: <CognoSvgIcon className='w-6 h-6' /> },
  { name: 'Note', path: '/notes', icon: <Notebook className='w-6 h-6' /> },
];

export default function BottomNav() {
  const pathname = usePathname();

  const activeIndex = tabs.findIndex(tab => pathname.startsWith(tab.path));
  const tabWidthPercent = 100 / tabs.length;

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 px-4 md:px-6 py-3'>
      <div className='max-w-7xl mx-auto'>
        <GlassCard className='rounded-full'>
          <div className='relative flex items-center justify-around p-1'>
            {/* Sliding background indicator - liquid glass inner element */}
            <div
              className='absolute h-[calc(100%-8px)] rounded-full liquid-glass-indicator transition-all duration-500 ease-out'
              style={{
                width: `calc(${tabWidthPercent}% - 8px)`,
                left: `calc(${activeIndex * tabWidthPercent}% + 4px)`,
                opacity: activeIndex === -1 ? 0 : 1,
              }}
            />

            {tabs.map(tab => {
              const isActive = pathname.startsWith(tab.path);

              return (
                <Link
                  key={tab.path}
                  href={tab.path}
                  prefetch={true}
                  className='relative z-10 flex flex-col items-center gap-0.5 px-4 py-2 transition-all duration-300 group flex-1'
                  data-nav-link={tab.path}
                >
                  <div
                    className={`transition-colors duration-300 ${isActive ? 'text-text-primary' : 'text-nav-text-inactive group-hover:text-text-primary'}`}
                  >
                    {tab.icon}
                  </div>
                  <span
                    className={`text-xs font-medium transition-colors duration-300 ${isActive ? 'text-text-primary' : 'text-nav-text-inactive group-hover:text-text-primary'}`}
                  >
                    {tab.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
