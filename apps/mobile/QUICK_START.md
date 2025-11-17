# 🚀 Quick Start - Google Auth

## Step-by-Step Setup (5 minutes)

### 1️⃣ Install Dependencies

```bash
cd /Users/air13/code/cogni/cogno/cogni-frontend
pnpm install
```

### 2️⃣ Create Environment File

Create `apps/mobile/.env`:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_GOOGLE_AUTH_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
```

### 3️⃣ Set Up Supabase Database

1. Go to https://supabase.com/dashboard
2. Create/select your project
3. Go to **SQL Editor**
4. Run **"User Management Starter"** quickstart (under Community tab)

### 4️⃣ Enable Google OAuth in Supabase

1. Go to **Authentication** → **Providers**
2. Enable **Google**
3. You'll need Google OAuth credentials (next step)

### 5️⃣ Set Up Google OAuth

1. Go to https://console.cloud.google.com/
2. Create/select project
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**

Create THREE OAuth clients:

**a) Web Client** (for OAuth flow):
- Type: Web application
- Authorized redirect URIs:
  - `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
  - `cogni://google-auth`
- Copy the **Client ID** → use in Supabase Google provider settings
- Copy the **Client Secret** → use in Supabase Google provider settings
- Copy the **Client ID** → use in `.env` as `EXPO_PUBLIC_GOOGLE_AUTH_WEB_CLIENT_ID`

**b) iOS Client**:
- Type: iOS
- Bundle ID: `com.cogno.ai.mobile`

**c) Android Client**:
- Type: Android
- Package name: `com.cogno.ai.mobile`
- SHA-1 fingerprint: Get from your keystore
  ```bash
  keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
  ```

### 6️⃣ Run the App

```bash
cd apps/mobile

# Start dev server
npx expo start

# Run on specific platform
npx expo run:ios        # iOS
npx expo run:android    # Android
npx expo start --web    # Web
```

## What You'll See

1. **Login Screen** with "Sign in with Google" button
2. Click button → Opens Google OAuth
3. Sign in with Google account
4. Redirected back to app
5. **Home Screen** showing your profile:
   - Username
   - Full name
   - Email
   - Sign out button

## Files Structure

```
apps/mobile/
├── lib/supabase.ts                        # Supabase client
├── hooks/use-auth-context.tsx             # Auth hook
├── providers/auth-provider.tsx            # Auth provider
├── components/
│   ├── auth/
│   │   ├── google-sign-in-button.tsx      # Google button (mobile)
│   │   ├── google-sign-in-button.web.tsx  # Google button (web)
│   │   └── sign-out-button.tsx            # Sign out
│   └── splash-screen-controller.tsx       # Splash screen
├── app/
│   ├── _layout.tsx                        # Root with AuthProvider
│   ├── (tabs)/index.tsx                   # Home (protected)
│   └── auth/login.tsx                     # Login screen
└── .env                                   # Your credentials
```

## Testing Tips

- **Development**: Disable email confirmation in Supabase (Auth → Providers → Email)
- **iOS**: Test on physical device or simulator
- **Android**: Test on physical device or emulator
- **Web**: Works in any browser

## Common Issues

| Issue | Solution |
|-------|----------|
| `pnpm install` fails | Clear cache: `rm -rf node_modules && pnpm install` |
| OAuth doesn't open | Check Google credentials are correct |
| Redirect fails | Verify redirect URIs match in Google Console and Supabase |
| Session doesn't persist | Check `expo-secure-store` is installed |

## Need More Details?

- 📖 **Full Setup**: `SETUP_INSTRUCTIONS.md`
- 🔐 **Auth Details**: `README_AUTH.md`
- 📋 **Summary**: `PROJECT_SUMMARY.md`

## That's It! 🎉

Your app now has Google authentication working on iOS, Android, and Web!

