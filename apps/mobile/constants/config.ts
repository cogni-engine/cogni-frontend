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
  return 'https://app.cogno.studio';
};

export const Config = {
  webAppUrl: getWebAppUrl(),
};

