export const metadata = {
  title: 'User Settings',
};

export default function UserSettingsPage() {
  return (
    <div className='flex h-full flex-col gap-6 overflow-auto p-6 text-white'>
      <div>
        <h1 className='text-3xl font-semibold'>User Settings</h1>
        <p className='text-white/60'>Manage your account preferences.</p>
      </div>
      <div className='rounded-xl border border-white/10 bg-white/5 p-6 text-white/70'>
        <p>
          Settings controls will live here. For now, this placeholder keeps the
          layout ready.
        </p>
      </div>
    </div>
  );
}
