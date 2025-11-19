import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function MobileAuthPage({
  searchParams,
}: {
  searchParams: Promise<{ access_token?: string; refresh_token?: string }>;
}) {
  const { access_token, refresh_token } = await searchParams;

  // Validate tokens are present
  if (!access_token || !refresh_token) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-black text-white'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Authentication Error</h1>
          <p className='text-gray-400'>Missing authentication tokens</p>
        </div>
      </div>
    );
  }

  // Create Supabase client with cookie handling
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: cookiesToSet => {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  // Verify and set the session
  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  if (error || !data.user) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-black text-white'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Authentication Failed</h1>
          <p className='text-gray-400'>
            {error?.message || 'Invalid session tokens'}
          </p>
        </div>
      </div>
    );
  }

  // Set additional cookies if needed
  cookieStore.set('current_user_id', data.user.id, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  });

  // Success - redirect to home
  redirect('/home');
}
