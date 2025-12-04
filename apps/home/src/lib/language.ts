import { cookies, headers } from 'next/headers';
import type { Language } from '../constants/copy';

export const LANGUAGE_COOKIE_NAME = 'preferred-language';
export const SUPPORTED_LANGUAGES: Language[] = ['en', 'ja'];
export const DEFAULT_LANGUAGE: Language = 'ja';

/**
 * Detects the user's preferred language from cookies or headers (SSR-friendly)
 */
export async function detectLanguage(): Promise<Language> {
  // First, check if there's a cookie preference
  const cookieStore = await cookies();
  const cookieLanguage = cookieStore.get(LANGUAGE_COOKIE_NAME)?.value;

  if (
    cookieLanguage &&
    SUPPORTED_LANGUAGES.includes(cookieLanguage as Language)
  ) {
    return cookieLanguage as Language;
  }

  // Fallback to Accept-Language header
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');

  if (acceptLanguage) {
    // Parse accept-language header (e.g., "ja,en-US;q=0.9,en;q=0.8")
    const languages = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase().split('-')[0]);

    for (const lang of languages) {
      if (SUPPORTED_LANGUAGES.includes(lang as Language)) {
        return lang as Language;
      }
    }
  }

  return DEFAULT_LANGUAGE;
}
