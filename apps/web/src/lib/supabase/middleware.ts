import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

/**
 * Decode JWT payload without verification (for reading custom claims)
 */
function decodeJWT(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Decode base64url (JWT uses base64url, not standard base64)
    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      '='
    );
    const decoded = Buffer.from(padded, 'base64').toString('utf-8');

    return JSON.parse(decoded) as Record<string, unknown>;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

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

  // Get session to access JWT token
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Decode JWT to extract orgs and subscription_plan
  let orgs: unknown[] = [];
  let subscriptionPlan: string | null = null;

  if (session?.access_token) {
    const payload = decodeJWT(session.access_token);
    if (payload) {
      orgs = (payload.orgs as unknown[]) || [];
      subscriptionPlan = (payload.subscription_plan as string) || null;
    }
  }

  // Set headers for server-side access
  if (orgs.length > 0) {
    response.headers.set('x-user-orgs', JSON.stringify(orgs));
  }
  if (subscriptionPlan) {
    response.headers.set('x-user-subscription-plan', subscriptionPlan);
  }

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
