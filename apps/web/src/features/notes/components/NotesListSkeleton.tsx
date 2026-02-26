'use client';

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

function SkeletonNoteRow({ showDivider = true }: { showDivider?: boolean }) {
  return (
    <>
      <div className='px-5 py-2'>
        <div className='flex justify-between items-start gap-3'>
          <div className='flex-1 min-w-0'>
            {/* Title */}
            <SkeletonPulse className='h-[21px] w-3/5 mb-1' />
            {/* Date + preview */}
            <div className='flex items-center gap-2 mt-0.5'>
              <SkeletonPulse className='h-[17px] w-10 shrink-0' />
              <SkeletonPulse className='h-[17px] w-2/3' />
            </div>
          </div>
        </div>
      </div>
      {showDivider && <div className='mx-5 border-b border-border-default' />}
    </>
  );
}

function SkeletonGroup({ cardCount = 3 }: { cardCount?: number }) {
  return (
    <div>
      {/* Group header */}
      <SkeletonPulse className='h-4 w-16 mb-3 ml-1' />
      <div className='flex flex-col'>
        {Array.from({ length: cardCount }).map((_, i) => (
          <SkeletonNoteRow key={i} showDivider={i < cardCount - 1} />
        ))}
      </div>
    </div>
  );
}

export function NotesListSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: 100% 0; }
            100% { background-position: -100% 0; }
          }
        `}
      </style>
      <SkeletonGroup cardCount={2} />
      <SkeletonGroup cardCount={3} />
      <SkeletonGroup cardCount={2} />
    </div>
  );
}

export default NotesListSkeleton;
