# # Cogno Mobile App

This is a React Native mobile app built with [Expo](https://expo.dev) that embeds the Cogno web application using a WebView.

## Overview

This mobile app provides a native wrapper around the Cogno web application (https://cogno.studio), giving users a seamless mobile experience while maintaining all the functionality of the web app.

## Get Started

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Start the development server**

   ```bash
   pnpm start
   ```

3. **Run on your device**

   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan the QR code with Expo Go app (development)

## Configuration

The web app URL is configured in `constants/config.ts`. By default, it points to `https://cogno.studio`.

### Using a Custom URL

To use a different URL (e.g., for local development), add this to `app.json`:

```json
{
  "expo": {
    "extra": {
      "webAppUrl": "http://localhost:3000"
    }
  }
}
```

**Note:** For local development:
- iOS Simulator: use `http://localhost:3000`
- Android Emulator: use `http://10.0.2.2:3000`
- Physical Device: use your computer's local IP (e.g., `http://192.168.1.100:3000`)

## Building for Production

### Development Build

For full native features, create a development build:

```bash
npx expo prebuild
npx expo run:ios
npx expo run:android
```

### Production Build

```bash
eas build --platform ios
eas build --platform android
```

## Features

- Full web app embedded in native container
- Native splash screen and app icon
- Automatic handling of dark/light modes
- Error handling with retry functionality
- Loading indicators
- Works offline with proper error messages

## Troubleshooting

### Connection Errors

If you see connection errors:

1. Verify the URL is accessible in your browser
2. Check network permissions in `app.json`
3. For iOS, ensure App Transport Security settings are configured
4. Try reloading the app or using the retry button

### Need Full Rebuild

If you modify `app.json` or add native modules:

```bash
npx expo prebuild --clean
npx expo run:ios
```

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native WebView](https://github.com/react-native-webview/react-native-webview)
- [Cogno Platform](https://cogno.studio)
