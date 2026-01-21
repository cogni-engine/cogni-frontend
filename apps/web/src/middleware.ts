// src/middleware.ts
import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { createServerClient } from '@supabase/ssr';

// Helper to detect if request is from mobile app webview
function isFromMobileApp(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent') || '';

  // Check for mobile app identifier
  // Option 1: Custom header (most reliable)
  const isMobileApp = request.headers.get('x-mobile-app') === 'true';

  // Option 2: User agent detection (backup)
  const hasWebViewUA =
    userAgent.includes('Cogni-Mobile') || userAgent.includes('wv'); // Android WebView marker

  return isMobileApp || hasWebViewUA;
}

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);

  // Define route types
  const privateRoutes = [
    '/cogno',
    '/notes',
    '/workspace',
    '/personal',
    '/user',
  ];
  const publicRoutes = ['/invite', '/mobile-auth', '/mobile-auth-required']; // Allow mobile auth routes
  const authRoutes = ['/login', '/register'];
  const onboardingRoutes = ['/onboarding'];

  const isPrivateRoute = privateRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isOnboardingRoute = onboardingRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Allow public routes without authentication check
  if (isPublicRoute) {
    return response;
  }

  // Check if request is from mobile app
  const fromMobileApp = isFromMobileApp(request);

  // Redirect to login if accessing private route without authentication
  if (!user && isPrivateRoute) {
    if (fromMobileApp) {
      // For mobile app: return special page that triggers native login
      return NextResponse.redirect(
        new URL('/mobile-auth-required', request.url)
      );
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to login if accessing onboarding without authentication
  if (!user && isOnboardingRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Block mobile app from accessing web auth pages
  if (fromMobileApp && isAuthRoute) {
    return NextResponse.redirect(new URL('/mobile-auth-required', request.url));
  }

  // Redirect to workspace if authenticated user tries to access auth pages
  // But check for pending invite first
  if (user && isAuthRoute) {
    const inviteToken = request.cookies.get('pending_invite_token')?.value;
    if (inviteToken) {
      return NextResponse.redirect(
        new URL(`/invite/${inviteToken}`, request.url)
      );
    }
    return NextResponse.redirect(new URL('/workspace', request.url));
  }

  // Onboarding routing logic for authenticated users
  if (user) {
    // Get Supabase client from updateSession response
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () =>
            request.cookies
              .getAll()
              .map(c => ({ name: c.name, value: c.value })),
          setAll: cookiesToSet => {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set({ name, value, ...options });
            });
          },
        },
      }
    );

    // Fetch user profile to check onboarding status
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select(
        `
        onboarding_status,
        onboarding_sessions (
          state
        )
      `
      )
      .eq('id', user.id)
      .single();

    // If column doesn't exist yet (migration not applied), skip onboarding check
    if (error) {
      console.log('Onboarding column not found, skipping check');
      return response;
    }

    const status = profile?.onboarding_status || 'not_started';
    const onboardingState = profile?.onboarding_sessions?.[0]?.state;

    // If not completed and not on onboarding route, redirect to onboarding
    // UNLESS the onboarding state is 'tier2'
    if (
      status !== 'completed' &&
      !isOnboardingRoute &&
      !isPublicRoute &&
      onboardingState !== 'tier2'
    ) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }

    // If completed and trying to access onboarding, redirect to cogno
    if (status === 'completed' && isOnboardingRoute) {
      return NextResponse.redirect(new URL('/cogno', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
