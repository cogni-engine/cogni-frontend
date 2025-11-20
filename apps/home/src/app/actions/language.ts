'use server';

import { cookies } from 'next/headers';
import { LANGUAGE_COOKIE_NAME, SUPPORTED_LANGUAGES } from '../lib/language';
import type { Language } from '../constants/copy';

/**
 * Server action to set the user's language preference
 */
export async function setLanguagePreference(language: Language) {
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const cookieStore = await cookies();

  // Set cookie with 1 year expiration
  cookieStore.set(LANGUAGE_COOKIE_NAME, language, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return { success: true, language };
}
