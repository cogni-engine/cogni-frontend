import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const code = searchParams.get('code'); // OAuth code parameter
  const inviteToken = searchParams.get('invite'); // Check for invite parameter

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options?: { [key: string]: unknown }) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options?: { [key: string]: unknown }) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );

  // Handle OAuth callback - Supabase automatically exchanges the code for a session
  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error('Error exchanging code for session:', error);
      return NextResponse.redirect(new URL('/auth/error', origin));
    }

    // If OAuth was successful, set user ID and fetch personal workspace
    if (data?.user?.id) {
      // The session is now set in cookies, so we can proceed with redirect
      // Note: Personal workspace fetching will happen client-side after redirect
    }
  }

  // Verify the OTP/magic link
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      // email認証のみなので、EmailOtpTypeを使用
      type: type as
        | 'signup'
        | 'magiclink'
        | 'recovery'
        | 'invite'
        | 'email_change',
    });

    if (error) {
      console.error('Error verifying OTP:', error);
      // Redirect to error page
      return NextResponse.redirect(new URL('/auth/error', origin));
    }
  }

  // After successful verification, determine where to redirect
  let redirectTo = '/workspace'; // Default redirect

  // Priority 1: Invite token from URL (from email verification link)
  if (inviteToken) {
    redirectTo = `/invite/${inviteToken}`;
  }
  // Priority 2: Check for pending invite token in cookies
  else {
    const pendingInvite = cookieStore.get('pending_invite_token')?.value;
    if (pendingInvite) {
      redirectTo = `/invite/${pendingInvite}`;
    }
  }

  return NextResponse.redirect(new URL(redirectTo, origin));
}
