// src/middleware.ts
import { type NextRequest, NextResponse } from 'next/server';

const LANGUAGE_COOKIE_NAME = 'preferred-language';
const SUPPORTED_LANGUAGES = ['en', 'ja'];
const DEFAULT_LANGUAGE = 'en';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Handle language preference persistence
  const currentLanguageCookie = request.cookies.get(LANGUAGE_COOKIE_NAME);

  // If no language cookie is set, detect from Accept-Language header and set a cookie
  if (!currentLanguageCookie) {
    const acceptLanguage = request.headers.get('accept-language');
    let detectedLanguage = DEFAULT_LANGUAGE;

    if (acceptLanguage) {
      const languages = acceptLanguage
        .split(',')
        .map(lang => lang.split(';')[0].trim().toLowerCase().split('-')[0]);

      for (const lang of languages) {
        if (SUPPORTED_LANGUAGES.includes(lang)) {
          detectedLanguage = lang;
          break;
        }
      }
    }

    // Set the detected language as a cookie
    response.cookies.set(LANGUAGE_COOKIE_NAME, detectedLanguage, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
      sameSite: 'lax',
    });
  }

  // Define route types
  const privateRoutes = ['/home', '/notes', '/workspace'];
  const publicRoutes = ['/invite']; // Allow invite routes for both auth states
  const authRoutes = ['/login', '/register'];

  const isPrivateRoute = privateRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

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
