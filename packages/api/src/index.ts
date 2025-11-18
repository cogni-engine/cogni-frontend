// Export Supabase client
export { createClient, getClient, resetClient } from './supabase/client';

// Export auth functions
export {
  signUp,
  signIn,
  signInWithGoogle,
  signOut,
  getCurrentUser,
  getSession,
} from './supabase/auth';

// Export workspace functions
export { getPersonalWorkspace } from './workspace';

// Export hooks
export { useAuth } from './hooks/useAuth';

