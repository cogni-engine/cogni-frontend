import Constants from 'expo-constants';

/**
 * Configuration for the web app URL
 * 
 * Set a custom URL in app.json:
 * {
 *   "expo": {
 *     "extra": {
 *       "webAppUrl": "http://localhost:3000"
 *     }
 *   }
 * }
 * 
 * Or modify the default URL below.
 */

const getWebAppUrl = () => {
  // Check if we have a custom URL in app.json extra config
  const customUrl = Constants.expoConfig?.extra?.webAppUrl;
  if (customUrl) {
    return customUrl;
  }

  // Default to production URL
  return 'https://cogno.studio';
};

const getApiBaseUrl = () => {
  // Check if we have a custom API URL in app.json extra config
  const customUrl = Constants.expoConfig?.extra?.apiBaseUrl;
  if (customUrl) {
    return customUrl;
  }

  // Call Python backend directly (no Next.js proxy needed)
  // In development: local Python server (use localhost for iOS simulator)
  // In production: your production Python API
  return 'http://localhost:8000/api';
};

export const Config = {
  webAppUrl: getWebAppUrl(),
  apiBaseUrl: getApiBaseUrl(),
};

