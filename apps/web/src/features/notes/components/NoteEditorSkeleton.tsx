export function NoteEditorSkeleton() {
  return (
    <div className='flex flex-col h-full bg-background text-foreground'>
      {/* Header skeleton */}
      <div className='flex items-center gap-3 px-4 md:px-6 py-4 border-b border-border-default'>
        <div className='w-8 h-8 bg-surface-secondary rounded-lg animate-pulse'></div>
        <div className='flex-1 h-8 bg-surface-secondary rounded-lg animate-pulse max-w-md'></div>
      </div>

      {/* Toolbar skeleton */}
      <div className='hidden md:flex items-center gap-2 px-4 md:px-6 py-3 border-b border-border-default'>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className='w-8 h-8 bg-surface-secondary rounded-lg animate-pulse'
          ></div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className='flex-1 px-4 md:px-8 pt-8 space-y-4 overflow-hidden'>
        <div className='h-8 bg-surface-secondary rounded-lg animate-pulse w-3/4'></div>
        <div className='h-4 bg-surface-secondary rounded-lg animate-pulse w-full'></div>
        <div className='h-4 bg-surface-secondary rounded-lg animate-pulse w-5/6'></div>
        <div className='h-4 bg-surface-secondary rounded-lg animate-pulse w-4/6'></div>
        <div className='mt-6 h-4 bg-surface-secondary rounded-lg animate-pulse w-full'></div>
        <div className='h-4 bg-surface-secondary rounded-lg animate-pulse w-3/4'></div>
      </div>

      {/* AI Input skeleton */}
      <div className='px-4 md:px-6 py-4 border-t border-border-default'>
        <div className='h-12 bg-surface-secondary rounded-lg animate-pulse'></div>
      </div>
    </div>
  );
}
