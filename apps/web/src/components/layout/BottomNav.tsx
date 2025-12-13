'use client';

import { usePathname, useRouter } from 'next/navigation';
import { HomeIcon, MessageSquare, Notebook } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import GlassCard from '../glass-card/GlassCard';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const tabs = [
    {
      name: 'Workspace',
      path: '/workspace',
      icon: <MessageSquare className='w-6 h-6' />,
    },
    { name: 'Cogno', path: '/home', icon: <HomeIcon className='w-6 h-6' /> },
    { name: 'Note', path: '/notes', icon: <Notebook className='w-6 h-6' /> },
  ];

  // Find active tab index
  const activeIndex = tabs.findIndex(tab => pathname.startsWith(tab.path));

  // Update indicator position based on actual tab positions
  useEffect(() => {
    const updateIndicator = () => {
      if (
        activeIndex === -1 ||
        !containerRef.current ||
        !tabRefs.current[activeIndex]
      ) {
        return;
      }

      const container = containerRef.current;
      const activeTab = tabRefs.current[activeIndex];

      if (activeTab) {
        const containerRect = container.getBoundingClientRect();
        const tabRect = activeTab.getBoundingClientRect();

        const left = tabRect.left - containerRect.left + 4;
        const width = tabRect.width - 8;

        setIndicatorStyle({ left, width });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);

    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeIndex]);

  return (
    <GlassCard className='fixed bottom-0 left-0 right-0 z-50 rounded-full my-3 mx-6'>
      <div
        ref={containerRef}
        className='relative flex items-center justify-around p-1'
      >
        {/* Sliding background indicator */}
        <div
          className='absolute h-[calc(100%-8px)] rounded-full bg-white/10 backdrop-blur-sm transition-all duration-500 ease-out'
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
            transform: 'translateY(0)',
          }}
        />

        {tabs.map((tab, index) => {
          const isActive = pathname.startsWith(tab.path);

          return (
            <button
              key={tab.path}
              ref={el => {
                tabRefs.current[index] = el;
              }}
              onClick={() => router.push(tab.path)}
              className='relative z-10 flex flex-col items-center gap-0.5 px-4 py-2 transition-all duration-300 group flex-1'
            >
              <div
                className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}
              >
                {tab.icon}
              </div>
              <span
                className={`text-xs font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}
              >
                {tab.name}
              </span>
            </button>
          );
        })}
      </div>
    </GlassCard>
  );
}
