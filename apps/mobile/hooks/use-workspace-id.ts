import { useState, useEffect } from 'react';
import { getPersonalWorkspaceId } from '@/lib/storage';
import { useAuthContext } from './use-auth-context';

/**
 * Hook to get the personal workspace ID from storage
 * Automatically loads when user is logged in
 */
export function useWorkspaceId() {
  const { isLoggedIn, isLoading: authLoading } = useAuthContext();
  const [workspaceId, setWorkspaceId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadWorkspaceId = async () => {
      if (authLoading) {
        return;
      }

      if (!isLoggedIn) {
        setWorkspaceId(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        console.log('🔄 Loading workspace ID from storage...');
        const id = await getPersonalWorkspaceId();
        console.log('📱 Workspace ID from storage:', id);
        setWorkspaceId(id);
        setError(null);
      } catch (err) {
        console.error('❌ Error loading workspace ID:', err);
        setError(err instanceof Error ? err : new Error('Failed to load workspace ID'));
        setWorkspaceId(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkspaceId();
  }, [isLoggedIn, authLoading]);

  return { workspaceId, isLoading, error };
}

