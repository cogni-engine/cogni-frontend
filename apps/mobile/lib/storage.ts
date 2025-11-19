// Storage utilities for React Native using AsyncStorage
// This is the mobile equivalent of the cookies.ts in the utils package

import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys - same as cookie keys for consistency
export const STORAGE_KEYS = {
  PERSONAL_WORKSPACE_ID: 'personal_workspace_id',
  PENDING_INVITE_TOKEN: 'pending_invite_token',
  CURRENT_USER_ID: 'current_user_id',
} as const;

// Generic storage functions
export async function setItem(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error setting ${key}:`, error);
  }
}

export async function getItem(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error(`Error getting ${key}:`, error);
    return null;
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
  }
}

// Helper functions for specific storage items
export async function getPersonalWorkspaceId(): Promise<number | null> {
  const id = await getItem(STORAGE_KEYS.PERSONAL_WORKSPACE_ID);
  return id ? parseInt(id, 10) : null;
}

export async function setPersonalWorkspaceId(id: number): Promise<void> {
  await setItem(STORAGE_KEYS.PERSONAL_WORKSPACE_ID, id.toString());
}

export async function getPendingInviteToken(): Promise<string | null> {
  return await getItem(STORAGE_KEYS.PENDING_INVITE_TOKEN);
}

export async function setPendingInviteToken(token: string): Promise<void> {
  await setItem(STORAGE_KEYS.PENDING_INVITE_TOKEN, token);
}

export async function clearPendingInviteToken(): Promise<void> {
  await removeItem(STORAGE_KEYS.PENDING_INVITE_TOKEN);
}

export async function getCurrentUserId(): Promise<string | null> {
  return await getItem(STORAGE_KEYS.CURRENT_USER_ID);
}

export async function setCurrentUserId(userId: string): Promise<void> {
  await setItem(STORAGE_KEYS.CURRENT_USER_ID, userId);
}

export async function clearCurrentUserId(): Promise<void> {
  await removeItem(STORAGE_KEYS.CURRENT_USER_ID);
}

/**
 * Clear all user-related storage (should be called on logout)
 */
export async function clearAllUserStorage(): Promise<void> {
  await Promise.all([
    removeItem(STORAGE_KEYS.PERSONAL_WORKSPACE_ID),
    removeItem(STORAGE_KEYS.PENDING_INVITE_TOKEN),
    removeItem(STORAGE_KEYS.CURRENT_USER_ID),
  ]);
}

