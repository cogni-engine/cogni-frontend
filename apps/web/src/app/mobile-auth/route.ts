import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { logJWTIssuance } from '@/lib/jwtServerUtils';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const access_token = searchParams.get('access_token');
  const refresh_token = searchParams.get('refresh_token');

  // Validate tokens are present
  if (!access_token || !refresh_token) {
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Authentication Error</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background-color: #000;
              color: #fff;
              font-family: system-ui, -apple-system, sans-serif;
            }
            .container {
              text-align: center;
              padding: 2rem;
            }
            h1 {
              font-size: 1.5rem;
              font-weight: bold;
              margin-bottom: 1rem;
            }
            p {
              color: #9ca3af;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Authentication Error</h1>
            <p>Missing authentication tokens</p>
          </div>
        </body>
      </html>
      `,
      {
        status: 400,
        headers: {
          'Content-Type': 'text/html',
        },
      }
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
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            console.error('Error setting cookies:', error);
          }
        },
      },
    }
  );

  // Verify and set the session
  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  // Log new JWT issuance from mobile auth route
  if (data?.session?.access_token) {
    logJWTIssuance(data.session.access_token, 'MOBILE_AUTH_ROUTE');
  }

  if (error || !data.user) {
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Authentication Failed</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background-color: #000;
              color: #fff;
              font-family: system-ui, -apple-system, sans-serif;
            }
            .container {
              text-align: center;
              padding: 2rem;
            }
            h1 {
              font-size: 1.5rem;
              font-weight: bold;
              margin-bottom: 1rem;
            }
            p {
              color: #9ca3af;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Authentication Failed</h1>
            <p>${error?.message || 'Invalid session tokens'}</p>
          </div>
        </body>
      </html>
      `,
      {
        status: 401,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  }

  // Set additional cookies if needed
  cookieStore.set('current_user_id', data.user.id, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  });

  // Success - redirect to workspace
  return NextResponse.redirect(new URL('/workspace', request.url));
}
