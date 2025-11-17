# Google Authentication Setup Guide

This app implements Google social authentication using Supabase Auth for Expo React Native.

## Prerequisites

1. **Supabase Project**: Create a project at [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Google Cloud Console**: Set up OAuth credentials at [https://console.cloud.google.com/](https://console.cloud.google.com/)

## Setup Instructions

### 1. Database Setup

In your Supabase project, set up the database schema. You can use the "User Management Starter" quickstart in the SQL Editor:

1. Go to SQL Editor in Supabase Dashboard
2. Click "User Management Starter" under Community > Quickstarts
3. Click Run

This creates a `profiles` table that stores user profile information.

### 2. Configure Google OAuth Provider

#### In Google Cloud Console:

1. Create a new project or select an existing one
2. Go to "APIs & Services" > "Credentials"
3. Click "Create Credentials" > "OAuth client ID"
4. For **iOS**:
   - Application type: iOS
   - Bundle ID: `com.cogno.ai.mobile` (from app.json)
5. For **Android**:
   - Application type: Android
   - Package name: `com.cogno.ai.mobile` (from app.json)
   - SHA-1 certificate fingerprint (get from your keystore)
6. For **Web** (used in OAuth flow):
   - Application type: Web application
   - Authorized redirect URIs:
     - `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
     - `cogni://google-auth` (for mobile deep linking)

#### In Supabase Dashboard:

1. Go to Authentication > Providers
2. Enable Google provider
3. Add your Google OAuth Client ID and Secret
4. Add authorized redirect URLs:
   - `cogni://google-auth`

### 3. Environment Variables

Create a `.env` file in the mobile app directory:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_GOOGLE_AUTH_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
```

Get these values from:
- Supabase URL and anon key: Project Settings > API
- Google Web Client ID: Google Cloud Console > Credentials

### 4. Install Dependencies

The required packages are already in `package.json`:

```bash
npm install
# or
pnpm install
```

Key dependencies:
- `@supabase/supabase-js` - Supabase client
- `expo-secure-store` - Secure token storage (mobile)
- `@react-native-async-storage/async-storage` - Storage (web)
- `expo-web-browser` - OAuth browser flow
- `@react-oauth/google` - Google OAuth for web (needs to be installed)

### 5. Install @react-oauth/google for Web Support

```bash
cd apps/mobile
npx expo install @react-oauth/google
```

### 6. Build and Run

#### Development:

```bash
# Start the development server
npx expo start

# Run on iOS
npx expo run:ios

# Run on Android
npx expo run:android

# Run on Web
npx expo start --web
```

#### Production Build:

```bash
# Prebuild native projects
npx expo prebuild --clean

# Build with EAS
eas build --profile preview --platform all
```

## App Structure

### Authentication Flow

1. **Auth Context** (`hooks/use-auth-context.tsx`): Provides authentication state
2. **Auth Provider** (`providers/auth-provider.tsx`): Manages session and profile data
3. **Supabase Client** (`lib/supabase.ts`, `lib/supabase.web.ts`): Platform-specific clients
4. **Login Screen** (`app/auth/login.tsx`): Login UI with Google button
5. **Protected Routes** (`app/_layout.tsx`): Redirects unauthenticated users

### Key Components

- `components/auth/google-sign-in-button.tsx` - Mobile Google sign-in
- `components/auth/google-sign-in-button.web.tsx` - Web Google sign-in
- `components/auth/sign-out-button.tsx` - Sign out functionality
- `components/splash-screen-controller.tsx` - Handles splash screen while loading

### How It Works

1. User clicks "Sign in with Google"
2. App opens browser with Google OAuth consent screen
3. User grants permission
4. Google redirects to `cogni://google-auth` with tokens
5. App extracts tokens and creates Supabase session
6. Profile is fetched from `profiles` table
7. User is redirected to home screen

## Testing

### Disable Email Confirmation (Development Only)

For faster testing, disable email confirmation:

1. Go to Supabase Dashboard > Authentication > Providers > Email
2. Disable "Confirm email"
3. **Important**: Re-enable for production!

### Test on Physical Device

OAuth requires testing on physical devices:

```bash
# iOS
npx expo run:ios --device

# Android
npx expo run:android --device
```

## Troubleshooting

### Common Issues

1. **"No OAuth URL found"**: Check that Google provider is enabled in Supabase
2. **Redirect not working**: Verify redirect URIs in both Google Console and Supabase
3. **Bundle ID mismatch**: Ensure bundle ID in app.json matches Google Console
4. **Session not persisting**: Check that expo-secure-store is properly installed

### Deep Linking

The app uses the scheme `cogni://` (defined in app.json). Test deep linking:

```bash
# iOS
xcrun simctl openurl booted "cogni://google-auth"

# Android
adb shell am start -W -a android.intent.action.VIEW -d "cogni://google-auth"
```

## Additional Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Expo Authentication](https://docs.expo.dev/guides/authentication/)
- [Google OAuth Setup](https://support.google.com/cloud/answer/6158849)
- [React Native Google Sign In](https://github.com/react-native-google-signin/google-signin)

## Security Notes

- Never commit `.env` file to version control
- Use Row Level Security (RLS) policies in Supabase
- Keep your Supabase anon key secret (though it's safe for client use with RLS)
- For production, set up proper redirect URI allowlists

