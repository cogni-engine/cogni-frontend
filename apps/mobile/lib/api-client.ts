/**
 * Custom fetch wrapper for mobile API requests
 * Automatically includes authentication cookies
 */

import { getCurrentUserId, getPersonalWorkspaceId } from './storage';

export async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  // Get auth data from storage
  const [userId, workspaceId] = await Promise.all([
    getCurrentUserId(),
    getPersonalWorkspaceId(),
  ]);

  // Build cookie header
  const cookies: string[] = [];
  if (userId) {
    cookies.push(`current_user_id=${userId}`);
  }
  if (workspaceId) {
    cookies.push(`personal_workspace_id=${workspaceId}`);
  }

  // Add cookies to request
  const headers = new Headers(options.headers);
  if (cookies.length > 0) {
    headers.set('Cookie', cookies.join('; '));
  }

  return fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Include cookies
  });
}

