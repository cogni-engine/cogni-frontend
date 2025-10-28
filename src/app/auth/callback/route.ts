import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
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
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );

  // Verify the OTP/magic link
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as any,
    });

    if (error) {
      console.error('Error verifying OTP:', error);
      // Redirect to error page
      return NextResponse.redirect(new URL('/auth/error', origin));
    }
  }

  // After successful verification, determine where to redirect
  let redirectTo = '/home'; // Default redirect

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
