import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () =>
          request.cookies.getAll().map(c => ({ name: c.name, value: c.value })),
        setAll: cookiesToSet => {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set({ name, value, ...options });
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Set/update current user ID cookie if user is authenticated
  if (user?.id) {
    const existingUserId = request.cookies.get('current_user_id')?.value;
    // Set cookie if not present or if user ID has changed
    if (!existingUserId || existingUserId !== user.id) {
      response.cookies.set({
        name: 'current_user_id',
        value: user.id,
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax',
      });
    }
  }

  return { response, user };
}
