// src/middleware.ts
import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);

  // Define private routes that require authentication
  const privateRoutes = ['/home', '/notes', '/workspace'];
  const isPrivateRoute = privateRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Redirect to login if accessing private route without authentication
  if (!user && isPrivateRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to home if authenticated user tries to access auth pages
  const authRoutes = ['/login', '/register'];
  const isAuthRoute = authRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL('/home', request.url));
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
