"use client";

import React, { useEffect, useState } from 'react';
import { TimerState } from '@/types/chat';

type TimerDisplayProps = {
  timer: TimerState;
  remainingSeconds?: number | null;
};

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ timer, remainingSeconds }) => {
  const [localRemaining, setLocalRemaining] = useState<number>(remainingSeconds || 0);

  useEffect(() => {
    if (remainingSeconds !== null && remainingSeconds !== undefined) {
      setLocalRemaining(remainingSeconds);
    }
  }, [remainingSeconds]);

  // ローカルカウントダウン
  useEffect(() => {
    if (timer.status !== 'active') return;

    const interval = setInterval(() => {
      setLocalRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer.status]);

  if (timer.status !== 'active') return null;

  const totalSeconds = timer.duration_minutes * 60;
  const progress = totalSeconds > 0 ? (localRemaining / totalSeconds) * 100 : 0;
  
  // 残り時間をMM:SS形式に変換（先行ゼロ付き）
  const minutes = Math.floor(localRemaining / 60);
  const seconds = localRemaining % 60;
  const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="flex justify-start items-center my-6 px-2">
      <div className="bg-black/20 backdrop-blur-xl rounded-[20px] px-8 py-2 flex items-center justify-between min-w-[320px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300">
        {/* 左側: 時間表示 */}
        <div className="flex flex-col items-start">
          <div className="text-4xl font-light text-white tracking-tight">
            {timeDisplay}
          </div>
          <div className="text-sm text-white/60 font-normal mt-1 px-2">
            Timer
          </div>
        </div>

        {/* 右側: 一時停止ボタン */}
        <div className="relative">
          {/* 一時停止ボタン - 円の中にアイコン */}
          <button className="w-12 h-12 rounded-full border-2 border-orange-400 bg-transparent flex items-center justify-center hover:bg-orange-400/10 transition-colors">
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-orange-400 rounded-full"></div>
              <div className="w-1 h-4 bg-orange-400 rounded-full"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

