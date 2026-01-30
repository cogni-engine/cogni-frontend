import type { Workspace } from '@/types/workspace';

const WORKSPACE_CACHE_KEY = 'workspace-cache-v1';
const CACHE_MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours

interface CachedData {
  data: Workspace[];
  timestamp: number;
}

export const workspaceCache = {
  /**
   * Synchronously read workspaces from localStorage
   * Returns null if no cache exists or cache is invalid
   */
  get: (): Workspace[] | null => {
    if (typeof window === 'undefined') return null;

    try {
      const cached = localStorage.getItem(WORKSPACE_CACHE_KEY);
      if (!cached) return null;

      const { data, timestamp }: CachedData = JSON.parse(cached);

      // Optional: check if stale
      const age = Date.now() - timestamp;
      if (age > CACHE_MAX_AGE) {
        // Cache is stale, remove it
        localStorage.removeItem(WORKSPACE_CACHE_KEY);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Failed to read workspace cache:', error);
      // Clear corrupted cache
      localStorage.removeItem(WORKSPACE_CACHE_KEY);
      return null;
    }
  },

  /**
   * Synchronously write workspaces to localStorage
   */
  set: (data: Workspace[]): void => {
    if (typeof window === 'undefined') return;

    try {
      const cachedData: CachedData = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(WORKSPACE_CACHE_KEY, JSON.stringify(cachedData));
    } catch (error) {
      console.error('Failed to cache workspaces:', error);
      // Handle quota exceeded or other storage errors gracefully
    }
  },

  /**
   * Clear the workspace cache
   */
  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(WORKSPACE_CACHE_KEY);
  },

  /**
   * Update a single workspace in the cache
   */
  updateWorkspace: (id: number, updates: Partial<Workspace>): void => {
    const cached = workspaceCache.get();
    if (!cached) return;

    const updated = cached.map(ws =>
      ws.id === id ? { ...ws, ...updates } : ws
    );
    workspaceCache.set(updated);
  },

  /**
   * Add a workspace to the cache
   */
  addWorkspace: (workspace: Workspace): void => {
    const cached = workspaceCache.get();
    const updated = cached ? [...cached, workspace] : [workspace];
    workspaceCache.set(updated);
  },

  /**
   * Remove a workspace from the cache
   */
  removeWorkspace: (id: number): void => {
    const cached = workspaceCache.get();
    if (!cached) return;

    const updated = cached.filter(ws => ws.id !== id);
    workspaceCache.set(updated);
  },
};
