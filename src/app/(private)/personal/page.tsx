export const metadata = {
  title: 'Personal',
};

export default function PersonalPage() {
  return (
    <div className='flex h-full flex-col items-center justify-center gap-4 p-6 text-white'>
      <h1 className='text-3xl font-semibold'>Personal Space</h1>
      <p className='max-w-md text-center text-white/60'>
        This is your personal page. Feel free to customise it later.
      </p>
    </div>
  );
}
