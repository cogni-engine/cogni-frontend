export default function EmptyState() {
  return (
    <div className='flex flex-col items-center justify-center h-full text-center'>
      <div className='w-20 h-20 flex items-center justify-center mb-6'>
        <div className='relative'>
          {/* Comet core */}
          <div className='w-4 h-4 bg-text-primary rounded-full shadow-lg'></div>
          {/* Asymmetric comet tail */}
          <div className='absolute top-1/2 left-0 w-16 h-0.5 bg-gradient-to-r from-text-secondary via-text-muted to-transparent transform -translate-y-1/2'></div>
          <div className='absolute top-1/2 left-0 w-14 h-0.5 bg-gradient-to-r from-text-muted via-transparent to-transparent transform -translate-y-1/2 translate-y-2'></div>
          <div className='absolute top-1/2 left-0 w-12 h-0.5 bg-gradient-to-r from-text-muted via-transparent to-transparent transform -translate-y-1/2 -translate-y-2'></div>
          <div className='absolute top-1/2 left-0 w-10 h-0.5 bg-gradient-to-r from-border-default via-transparent to-transparent transform -translate-y-1/2 translate-y-3'></div>
          <div className='absolute top-1/2 left-0 w-8 h-0.5 bg-gradient-to-r from-border-subtle via-transparent to-transparent transform -translate-y-1/2 -translate-y-3'></div>
        </div>
      </div>
      <h2 className='text-2xl font-bold text-text-primary mb-3'>Cogno</h2>
      <p className='text-text-muted max-w-md text-lg'>
        The space between thought and creation.
      </p>
    </div>
  );
}
