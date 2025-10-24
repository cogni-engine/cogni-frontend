'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    { name: 'Chat', path: '/workspace' },
    { name: 'Cogno', path: '/home' },
    { name: 'Notes', path: '/notes' },
  ];

  return (
    <div className='border-t border-white/5 bg-white/3 backdrop-blur-md relative z-10'>
      <div className='flex items-center justify-around py-4 px-4'>
        {tabs.map(tab => {
          const isActive = pathname.startsWith(tab.path);

          return (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className={`flex flex-col items-center gap-2 transition-all duration-300 group ${
                isActive ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className='relative'>
                {/* 中心の丸 - サイズがアニメーション */}
                <div
                  className={`bg-white rounded-full shadow-lg transition-all duration-500 ease-out ${
                    isActive
                      ? 'w-3.5 h-3.5 scale-100'
                      : 'w-2.5 h-2.5 scale-100 group-hover:scale-110'
                  }`}
                ></div>

                {/* 彗星の尾 - アクティブ時にフェードイン */}
                <div
                  className={`absolute top-1/2 left-0 transition-all duration-500 ease-out ${
                    isActive
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-2'
                  }`}
                >
                  <div className='absolute top-1/2 left-0 w-10 h-0.5 bg-gradient-to-r from-white/60 via-white/30 to-transparent transform -translate-y-1/2'></div>
                  <div className='absolute top-1/2 left-0 w-8 h-0.5 bg-gradient-to-r from-white/40 via-white/20 to-transparent transform -translate-y-1/2 translate-y-1.5'></div>
                  <div className='absolute top-1/2 left-0 w-6 h-0.5 bg-gradient-to-r from-white/30 via-white/15 to-transparent transform -translate-y-1/2 -translate-y-1.5'></div>
                  <div className='absolute top-1/2 left-0 w-4 h-0.5 bg-gradient-to-r from-white/20 via-white/10 to-transparent transform -translate-y-1/2 translate-y-2.5'></div>
                </div>

                {/* 土星の環 - 非アクティブ時にフェードイン */}
                <div
                  className={`transition-all duration-500 ease-out ${
                    isActive ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                  }`}
                >
                  <div className='absolute top-1/2 left-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-12'></div>
                  <div className='absolute top-1/2 left-1/2 w-7 h-0.5 bg-gradient-to-r from-transparent via-white/25 to-transparent transform -translate-x-1/2 -translate-y-1/2 -rotate-12'></div>
                  <div className='absolute top-1/2 left-1/2 w-6 h-0.5 bg-gradient-to-r from-transparent via-white/15 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-6'></div>
                </div>
              </div>

              <span className='text-xs font-medium'>{tab.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
