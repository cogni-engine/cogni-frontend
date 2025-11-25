import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { logJWTIssuance } from '@/lib/jwtServerUtils';

export async function POST(request: NextRequest) {
  try {
    const { access_token, refresh_token } = await request.json();

    if (!access_token || !refresh_token) {
      return NextResponse.json(
        { error: 'Missing access_token or refresh_token' },
        { status: 400 }
      );
    }

    // Create a Supabase client to verify the tokens
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => [],
          setAll: () => {},
        },
      }
    );

    // Verify the session by setting it
    const {
      data: { user, session },
      error,
    } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error || !user) {
      console.error('Invalid session:', error);
      return NextResponse.json(
        { error: 'Invalid session tokens' },
        { status: 401 }
      );
    }

    // Log new JWT issuance from mobile auth API
    if (session?.access_token) {
      logJWTIssuance(session.access_token, 'MOBILE_AUTH_API');
    }

    // Create response with success
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
    });

    // Set the Supabase session cookies
    // These cookie names must match what @supabase/ssr expects
    response.cookies.set({
      name: `sb-${process.env.NEXT_PUBLIC_SUPABASE_URL!.split('//')[1].split('.')[0]}-auth-token`,
      value: JSON.stringify({
        access_token,
        refresh_token,
        expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
        token_type: 'bearer',
        user,
      }),
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Also set the current user ID cookie
    response.cookies.set({
      name: 'current_user_id',
      value: user.id,
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('Mobile auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
