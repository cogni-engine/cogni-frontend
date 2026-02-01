import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { decodeJWT, logJWTIssuance } from '@/lib/jwtServerUtils';

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

  // Get the previous access token from cookie to detect new JWT issuance
  const previousToken = request.cookies.get('previous_access_token')?.value;

  // Get session to access JWT token
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Track new JWT issuance
  if (session?.access_token) {
    const currentToken = session.access_token;

    // Check if this is a new JWT (different from previous)
    if (previousToken && previousToken !== currentToken) {
      logJWTIssuance(currentToken, 'BACKEND (REFRESHED)');
    } else if (!previousToken && currentToken) {
      // First time we see a token (initial login)
      logJWTIssuance(currentToken, 'BACKEND (INITIAL)');
    }

    // Store current token as previous for next request
    if (currentToken) {
      response.cookies.set({
        name: 'previous_access_token',
        value: currentToken,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax',
        httpOnly: true,
      });
    }
  }

  // Decode JWT to extract orgs, subscription_plan, and onboarding_status
  let orgs: unknown[] = [];
  let subscriptionPlan: string | null = null;
  let onboardingStatus: string | null = null;

  if (session?.access_token) {
    const payload = decodeJWT(session.access_token);
    if (payload) {
      orgs = (payload.orgs as unknown[]) || [];
      subscriptionPlan = (payload.subscription_plan as string) || null;
      onboardingStatus = (payload.onboarding_status as string) || null;
      console.log(
        '[updateSession] JWT payload onboarding_status:',
        onboardingStatus
      );
    }
  }

  // Set headers for server-side access
  if (orgs.length > 0) {
    response.headers.set('x-user-orgs', JSON.stringify(orgs));
  }
  if (subscriptionPlan) {
    response.headers.set('x-user-subscription-plan', subscriptionPlan);
  }
  if (onboardingStatus) {
    response.headers.set('x-user-onboarding-status', onboardingStatus);
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

  return { response, user, onboardingStatus };
}
