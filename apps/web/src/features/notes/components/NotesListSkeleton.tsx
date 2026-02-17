'use client';

import GlassCard from '@/components/glass-design/GlassCard';

function SkeletonPulse({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded ${className}`}
      style={{
        background:
          'linear-gradient(90deg, var(--surface-primary) 25%, var(--surface-secondary) 50%, var(--surface-primary) 75%)',
        backgroundSize: '400% 100%',
        animation: 'shimmer 2s ease-in-out infinite',
      }}
    />
  );
}

function SkeletonNoteCard() {
  return (
    <GlassCard className='rounded-[20px] px-5 py-[8px]'>
      <div className='flex justify-between items-start gap-3 mb-1'>
        <div className='flex-1 min-w-0'>
          {/* Title skeleton */}
          <SkeletonPulse className='h-[22px] w-3/4 mb-1' />
        </div>
        {/* Date skeleton */}
        <SkeletonPulse className='h-4 w-12 mt-0.5' />
      </div>
      {/* Preview text skeleton - two lines */}
      <SkeletonPulse className='h-4 w-full mb-1.5' />
      <SkeletonPulse className='h-4 w-2/3' />
    </GlassCard>
  );
}

function SkeletonGroup({ cardCount = 3 }: { cardCount?: number }) {
  return (
    <div>
      {/* Group header skeleton */}
      <SkeletonPulse className='h-4 w-16 mb-3 ml-1' />
      {/* Cards in this group */}
      <div className='flex flex-col gap-[14px]'>
        {Array.from({ length: cardCount }).map((_, i) => (
          <SkeletonNoteCard key={i} />
        ))}
      </div>
    </div>
  );
}

export function NotesListSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      {/* Inject keyframes once */}
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: 100% 0; }
            100% { background-position: -100% 0; }
          }
        `}
      </style>

      {/* First group - "Today" with 2 cards */}
      <SkeletonGroup cardCount={2} />
      {/* Second group - "Yesterday" with 3 cards */}
      <SkeletonGroup cardCount={3} />
      {/* Third group - "This week" with 2 cards */}
      <SkeletonGroup cardCount={2} />
    </div>
  );
}

export default NotesListSkeleton;
