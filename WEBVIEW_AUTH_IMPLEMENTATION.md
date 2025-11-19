# WebView Authentication Implementation

## Overview

This document describes the comprehensive webview authentication system that ensures seamless integration between the mobile app (React Native) and the web app (Next.js), with a focus on preventing users from ever seeing the web login page when using the mobile app.

## Architecture

### 1. Initial Authentication Flow

**Mobile App → Web App Session Setup**

```
User opens app
    ↓
Native auth check (SecureStore)
    ↓
Has session? → WebView loads: /mobile-auth?access_token=xxx&refresh_token=yyy
    ↓
Server validates tokens
    ↓
Sets HTTP-only cookies
    ↓
Redirects to /home
    ↓
User is authenticated in webview!
```

### 2. Key Components

#### Web App (Next.js)

**New Files:**

1. **`apps/web/src/app/mobile-auth/route.ts`**
   - Route handler (GET) that receives tokens via URL params
   - Validates tokens with Supabase
   - Sets session cookies (Next.js 15 requires Route Handlers for cookie modification)
   - Redirects to `/home` on success

2. **`apps/web/src/app/mobile-auth-required/page.tsx`**
   - Special page shown when auth is required
   - Sends `AUTH_REQUIRED` message to native app
   - Shows loading state while redirecting

3. **`apps/web/src/lib/webview.ts`**
   - Utility functions for webview detection and communication
   - `isInMobileWebView()` - Detects if running in mobile webview
   - `notifyNativeLogout()` - Notifies native app of logout
   - `sendToNativeApp()` - Generic message sender

**Modified Files:**

4. **`apps/web/src/middleware.ts`**
   - Detects mobile app via `X-Mobile-App` header or User-Agent
   - Redirects mobile users to `/mobile-auth-required` instead of `/login`
   - Blocks mobile app from accessing web auth pages

5. **`apps/web/src/components/layout/UserMenu.tsx`**
   - Logout handler notifies native app before signing out
   - Waits 100ms for message to be received
   - Then proceeds with normal logout

#### Mobile App (React Native/Expo)

**Modified Files:**

6. **`apps/mobile/components/WebAppView.tsx`**
   - Builds auth URL with tokens: `/mobile-auth?access_token=...&refresh_token=...`
   - Adds custom headers to identify mobile app:
     - `X-Mobile-App: true`
     - `User-Agent: iOS/Android Cogni-Mobile/1.0`
   - **URL Interception** (iOS): `onShouldStartLoadWithRequest`
   - **Navigation Handling** (Android): `onNavigationStateChange`
   - Blocks navigation to `/login`, `/register`, `/mobile-auth-required`
   - Handles messages from webview:
     - `AUTH_REQUIRED` → Redirect to native login
     - `LOGOUT` → Redirect to native login
     - `NAVIGATION` → Handle special routes

## Message Protocol

### WebView → Native

Messages are sent via `window.ReactNativeWebView.postMessage()`:

```typescript
// Authentication required
{
  type: 'AUTH_REQUIRED',
  reason: 'Session expired or invalid'
}

// User logged out
{
  type: 'LOGOUT'
}

// Navigation request (optional)
{
  type: 'NAVIGATION',
  path: '/some-path'
}
```

### Native → WebView

Native communicates by:
1. Setting custom HTTP headers on all requests
2. Controlling navigation (blocking/allowing URLs)
3. Redirecting to native screens when needed

## Protection Layers

### Layer 1: Middleware Detection

The middleware detects mobile app requests and redirects them appropriately:

```typescript
// Web middleware
if (!user && isPrivateRoute && fromMobileApp) {
  // Mobile users see special page, not web login
  return redirect('/mobile-auth-required');
}

// Block mobile from web auth pages
if (fromMobileApp && isAuthRoute) {
  return redirect('/mobile-auth-required');
}
```

### Layer 2: URL Interception (Native)

The mobile app blocks navigation to web auth pages:

```typescript
// iOS
onShouldStartLoadWithRequest={(request) => {
  if (url.includes('/login') || url.includes('/register')) {
    router.replace('/auth/login'); // Native login
    return false; // Block navigation
  }
  return true;
}}

// Android
onNavigationStateChange={(navState) => {
  if (navState.url.includes('/login')) {
    router.replace('/auth/login');
    webViewRef.current?.stopLoading();
  }
}}
```

### Layer 3: Message-Based Redirect

If a user somehow reaches `/mobile-auth-required`, the page sends a message:

```typescript
// In mobile-auth-required page
useEffect(() => {
  window.ReactNativeWebView.postMessage(
    JSON.stringify({ type: 'AUTH_REQUIRED' })
  );
}, []);
```

The native app receives this and redirects:

```typescript
// In WebAppView
case 'AUTH_REQUIRED':
  router.replace('/auth/login');
  break;
```

## Session Management

### Native Side
- **Storage**: Expo SecureStore (encrypted)
- **Persistence**: Automatic via Supabase client
- **Refresh**: Auto-refresh enabled
- **Source of truth**: Native session is primary

### Web Side
- **Storage**: HTTP-only cookies (set by `/mobile-auth`)
- **Cookie Name**: `sb-{project-ref}-auth-token`
- **Additional Cookie**: `current_user_id`
- **Duration**: 7 days (refresh token)

## Logout Flow

```
User clicks logout in webview
    ↓
Web detects webview: isInMobileWebView()
    ↓
Sends LOGOUT message to native
    ↓
Waits 100ms for delivery
    ↓
Calls supabase.auth.signOut()
    ↓
Native receives LOGOUT message
    ↓
router.replace('/auth/login')
    ↓
User is at native login screen
```

## Testing Checklist

- [x] User logs in natively → Authenticated in webview
- [x] Session expires → Redirects to native login (not web)
- [x] User navigates to `/login` in webview → Blocked
- [x] User logs out in webview → Native app also logs out
- [x] Middleware detects mobile app correctly
- [x] URL interception works on iOS
- [x] Navigation handling works on Android
- [x] Messages sent from web to native
- [x] Logout button notifies native app

## Configuration

### Mobile App Headers

The app identifies itself with:
- Header: `X-Mobile-App: true`
- User-Agent: `iOS/Android Cogni-Mobile/1.0`

### URL Structure

- **Initial Auth**: `/mobile-auth?access_token=xxx&refresh_token=yyy`
- **Auth Required**: `/mobile-auth-required`
- **Blocked URLs**: `/login`, `/register`, any auth-related routes

### Public Routes (Middleware)

Routes accessible without auth:
- `/invite/*` - Workspace invites
- `/mobile-auth` - Initial session setup
- `/mobile-auth-required` - Auth required page

## Security Considerations

### Tokens in URL
- **Risk**: Tokens visible in URL during initial load
- **Mitigation**: 
  - Short-lived tokens
  - Single-use during session setup
  - WebView history is app-scoped
  - Could use URL fragments if needed (`#` instead of `?`)

### Cookie Security
- HTTP-only cookies prevent XSS
- SameSite=Lax for CSRF protection
- Secure flag in production

### Message Validation
- Messages are JSON-parsed with try-catch
- Unknown message types are logged but ignored
- Native validates all navigation attempts

## Future Enhancements

1. **Token Exchange**: Use one-time exchange tokens instead of direct tokens in URL
2. **Biometric Auth**: Add fingerprint/Face ID for session refresh
3. **Session Sync**: Sync logout across all devices
4. **Deep Links**: Handle deep links to specific content
5. **Offline Mode**: Cache auth state for offline access

## Troubleshooting

### User sees web login page

Check:
1. Mobile app is sending `X-Mobile-App: true` header
2. Middleware is detecting mobile app correctly
3. URL interception is working (check logs)

### Session not persisting

Check:
1. Cookies are being set by `/mobile-auth`
2. WebView has `thirdPartyCookiesEnabled={true}`
3. WebView has `sharedCookiesEnabled={true}`

### Logout doesn't work

Check:
1. `isInMobileWebView()` returns true
2. Message is being sent before signOut()
3. Native app is receiving LOGOUT message
4. Native app has message handler for LOGOUT

## Code References

### Web App
- Middleware: `apps/web/src/middleware.ts`
- Mobile auth route: `apps/web/src/app/mobile-auth/route.ts`
- Auth required page: `apps/web/src/app/mobile-auth-required/page.tsx`
- Webview utils: `apps/web/src/lib/webview.ts`
- Logout handler: `apps/web/src/components/layout/UserMenu.tsx`

### Mobile App
- WebView component: `apps/mobile/components/WebAppView.tsx`
- Auth provider: `apps/mobile/providers/auth-provider.tsx`
- Supabase client: `apps/mobile/lib/supabase.ts`

## Summary

This implementation provides a robust, multi-layered approach to preventing web login pages from appearing in the mobile app. The combination of:
- Server-side detection (middleware)
- Client-side interception (URL blocking)
- Bidirectional messaging (web ↔ native)

...ensures that users always see the native login experience, even in edge cases like session expiration, manual navigation, or network issues.

