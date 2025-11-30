// Utility functions for managing cookies - platform agnostic
// For React Native, this will need to be implemented with AsyncStorage or similar

const isBrowser = typeof document !== 'undefined';

export function setCookie(name: string, value: string, days: number = 365) {
  if (!isBrowser) return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  if (!isBrowser) return null;

  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function deleteCookie(name: string) {
  if (!isBrowser) return;

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// Specific cookie keys
export const COOKIE_KEYS = {
  PERSONAL_WORKSPACE_ID: 'personal_workspace_id',
  PENDING_INVITE_TOKEN: 'pending_invite_token',
  CURRENT_USER_ID: 'current_user_id',
} as const;

// Helper functions for specific cookies
export function getPersonalWorkspaceId(): number | null {
  const id = getCookie(COOKIE_KEYS.PERSONAL_WORKSPACE_ID);
  return id ? parseInt(id, 10) : null;
}

export function getPendingInviteToken(): string | null {
  return getCookie(COOKIE_KEYS.PENDING_INVITE_TOKEN);
}

export function clearPendingInviteToken() {
  deleteCookie(COOKIE_KEYS.PENDING_INVITE_TOKEN);
}

export function getCurrentUserId(): string | null {
  return getCookie(COOKIE_KEYS.CURRENT_USER_ID);
}

export function setCurrentUserId(userId: string) {
  setCookie(COOKIE_KEYS.CURRENT_USER_ID, userId);
}

export function clearCurrentUserId() {
  deleteCookie(COOKIE_KEYS.CURRENT_USER_ID);
}

/**
 * Clear all user-related cookies (should be called on logout)
 */
export function clearAllUserCookies() {
  deleteCookie(COOKIE_KEYS.PERSONAL_WORKSPACE_ID);
  deleteCookie(COOKIE_KEYS.PENDING_INVITE_TOKEN);
  deleteCookie(COOKIE_KEYS.CURRENT_USER_ID);
}


