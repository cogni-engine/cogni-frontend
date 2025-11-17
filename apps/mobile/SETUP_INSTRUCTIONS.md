# Setup Instructions for Google Authentication

## Quick Start

Follow these steps to get Google authentication working in your app:

### 1. Install Dependencies

From the root of the monorepo:

```bash
pnpm install
```

Or if you encounter pnpm store issues, try:

```bash
cd /Users/air13/code/cogni/cogno/cogni-frontend
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install
```

### 2. Set up Environment Variables

Create a `.env` file in `apps/mobile/`:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
EXPO_PUBLIC_GOOGLE_AUTH_WEB_CLIENT_ID=your-google-web-client-id.apps.googleusercontent.com
```

### 3. Configure Supabase

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project (or use an existing one)
3. Run the "User Management Starter" SQL quickstart:
   - Go to SQL Editor
   - Select "User Management Starter" under Quickstarts
   - Click Run

### 4. Configure Google OAuth

#### In Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Navigate to "APIs & Services" > "Credentials"
4. Create OAuth 2.0 credentials:

**For Mobile (iOS/Android):**
- Create "OAuth client ID" for iOS:
  - Application type: iOS
  - Bundle ID: `com.cogno.ai.mobile`
- Create "OAuth client ID" for Android:
  - Application type: Android
  - Package name: `com.cogno.ai.mobile`
  - SHA-1 fingerprint (from your keystore)

**For Web (used in OAuth flow):**
- Create "OAuth client ID" for Web:
  - Application type: Web application
  - Authorized redirect URIs:
    - `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
    - `cogni://google-auth`

#### In Supabase Dashboard:

1. Go to Authentication > Providers
2. Enable "Google" provider
3. Add your Google OAuth Client ID and Secret (from Web credentials)
4. Save changes

### 5. Run the App

```bash
# Start development server
cd apps/mobile
npx expo start

# Run on iOS
npx expo run:ios

# Run on Android
npx expo run:android

# Run on Web
npx expo start --web
```

### 6. Test Authentication

1. Launch the app
2. You should be redirected to the login screen
3. Click "Sign in with Google"
4. Complete the OAuth flow
5. You'll be redirected back to the app and see your profile

## Project Structure

```
apps/mobile/
├── app/
│   ├── _layout.tsx                 # Root layout with AuthProvider
│   ├── (tabs)/
│   │   └── index.tsx              # Home screen (protected)
│   └── auth/
│       └── login.tsx              # Login screen
├── components/
│   ├── auth/
│   │   ├── google-sign-in-button.tsx      # Mobile Google button
│   │   ├── google-sign-in-button.web.tsx  # Web Google button
│   │   └── sign-out-button.tsx            # Sign out button
│   └── splash-screen-controller.tsx        # Splash screen
├── hooks/
│   └── use-auth-context.tsx        # Auth context hook
├── lib/
│   ├── supabase.ts                 # Supabase client (mobile)
│   └── supabase.web.ts             # Supabase client (web)
├── providers/
│   └── auth-provider.tsx           # Auth state provider
└── .env                            # Environment variables (create this)
```

## Key Features Implemented

✅ Supabase Authentication with Google OAuth
✅ Platform-specific storage (SecureStore for mobile, AsyncStorage for web)
✅ Protected routes (redirects unauthenticated users to login)
✅ Session management with auto-refresh
✅ User profile fetching from Supabase
✅ Deep linking support (`cogni://` scheme)
✅ Splash screen while loading
✅ Sign out functionality

## Troubleshooting

### Issue: "No OAuth URL found"
**Solution**: Check that Google provider is enabled in Supabase Dashboard

### Issue: OAuth redirect not working
**Solution**: Verify redirect URIs match in both Google Console and Supabase

### Issue: Dependencies not installing
**Solution**: Clear node_modules and reinstall:
```bash
cd /Users/air13/code/cogni/cogno/cogni-frontend
rm -rf node_modules apps/*/node_modules
pnpm install
```

### Issue: Session not persisting
**Solution**: Ensure expo-secure-store is properly installed and configured

### Issue: Deep linking not working
**Solution**: Test with:
```bash
# iOS
xcrun simctl openurl booted "cogni://google-auth"

# Android
adb shell am start -W -a android.intent.action.VIEW -d "cogni://google-auth"
```

## Next Steps

- [ ] Set up Row Level Security (RLS) policies in Supabase
- [ ] Add user profile editing
- [ ] Add additional OAuth providers (Apple, GitHub, etc.)
- [ ] Implement email/password authentication
- [ ] Add password reset flow
- [ ] Set up deep linking for password resets

## Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [Google OAuth Guide](https://developers.google.com/identity/protocols/oauth2)
- [README_AUTH.md](./README_AUTH.md) - Detailed authentication guide

