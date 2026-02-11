'use client';

import { WifiOff } from 'lucide-react';
import { useEffect } from 'react';
import GlassCard from '@/components/glass-design/GlassCard';

export default function OfflinePage() {
  const doReload = () => {
    if (!navigator.onLine) return;
    window.location.reload();
  };

  useEffect(() => {
    window.addEventListener('online', doReload);
    return () => window.removeEventListener('online', doReload);
  }, []);

  const handleManualReload = () => doReload();

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-950 text-white flex items-center justify-center px-4'>
      <GlassCard className='max-w-md w-full rounded-3xl px-6 py-8 bg-white/5'>
        <div className='flex flex-col items-center gap-6'>
          <div className='relative'>
            <div className='absolute inset-0 rounded-full bg-emerald-400/10 blur-2xl' />
            <div className='relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-black border border-white/15 shadow-[0_18px_45px_rgba(0,0,0,0.6)]'>
              <WifiOff className='h-10 w-10 text-yellow-300' />
            </div>
          </div>

          <div className='space-y-2 text-center'>
            <h1 className='text-xl font-semibold tracking-wide'>
              オフラインになっています
            </h1>
            <p className='text-sm text-white/70'>
              通信環境を確認してください。
            </p>
            <p className='text-sm text-white/60'>
              接続が復帰すると自動で再読み込みします。
            </p>
          </div>

          <p className='text-xs text-slate-400 text-center'>
            <button
              type='button'
              onClick={handleManualReload}
              className='underline hover:text-slate-300 cursor-pointer'
            >
              切り替わらない場合はここをクリック
            </button>
          </p>

          <div className='w-full'>
            <div className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-xs text-white/70 space-y-1.5'>
              <p className='font-medium text-white/80'>接続チェックリスト</p>
              <ul className='list-disc list-inside space-y-1'>
                <li>Wi‑Fiやモバイルデータに接続されているか確認する</li>
                <li>ルーターやモデムの電源を入れ直してみる</li>
                <li>他のWebサイトにアクセスできるか試してみる</li>
              </ul>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
