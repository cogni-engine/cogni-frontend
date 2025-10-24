// Example utility functions for working with personal workspace

import { getPersonalWorkspaceId } from './cookies';
import { getWorkspace } from './api/workspaceApi';

/**
 * Get the cached personal workspace ID from cookies
 * This is faster than making an API call every time
 */
export function getCachedPersonalWorkspaceId(): number | null {
  return getPersonalWorkspaceId();
}

/**
 * Load the full personal workspace data using the cached ID
 */
export async function loadPersonalWorkspace() {
  const workspaceId = getPersonalWorkspaceId();

  if (!workspaceId) {
    throw new Error('Personal workspace ID not found in cookies');
  }

  return await getWorkspace(workspaceId);
}
