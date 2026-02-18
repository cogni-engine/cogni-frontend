'use client';

import { Plus, Search, Star } from 'lucide-react';
import LiquidGlassButton from '@/components/glass-design/liquid-glass/LiquidGlassButton';
import LiquidGlassCard from '@/components/glass-design/liquid-glass/LiquidGlassCard';

export default function LiquidGlassShowcasePage() {
  return (
    <div
      className='min-h-screen flex flex-col items-center justify-center gap-12 p-8'
      style={{
        backgroundImage:
          'url(https://raw.githubusercontent.com/lucasromerodb/liquid-glass-effect-macos/refs/heads/main/assets/flowers.jpg)',
        backgroundSize: '400px',
        animation: 'scrollBg 60s linear infinite',
      }}
    >
      {/* Card showcase */}
      <LiquidGlassCard className='rounded-[24px] p-8 w-[340px]'>
        <h2 className='text-white text-xl font-semibold mb-2'>
          Liquid Glass Card
        </h2>
        <p className='text-white/70 text-sm'>
          This card uses the procedural distortion filter with the liquid-glass
          CSS border styling.
        </p>
      </LiquidGlassCard>

      {/* Button showcase */}
      <div className='flex items-center gap-6'>
        <LiquidGlassButton className='w-[70px] h-[70px] p-[15px]'>
          <Plus className='w-full h-full text-white' />
        </LiquidGlassButton>

        <LiquidGlassButton className='w-[56px] h-[56px] p-3'>
          <Search className='w-full h-full text-white' />
        </LiquidGlassButton>

        <LiquidGlassButton className='w-[56px] h-[56px] p-3'>
          <Star className='w-full h-full text-white' />
        </LiquidGlassButton>
      </div>

      <style jsx>{`
        @keyframes scrollBg {
          from {
            background-position: 0% 0%;
          }
          to {
            background-position: 0% -1000%;
          }
        }
      `}</style>
    </div>
  );
}
