import { getClient } from './client';

/**
 * Sign up a new user with email and password
 */
export async function signUp(
  email: string,
  password: string,
  emailRedirectTo?: string
) {
  const supabase = getClient();
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo:
        emailRedirectTo ||
        (typeof window !== 'undefined'
          ? `${window.location.origin}/auth/callback`
          : undefined),
    },
  });
  
  if (error) throw error;
  return data;
}

/**
 * Sign in an existing user with email and password
 */
export async function signIn(email: string, password: string) {
  const supabase = getClient();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle(emailRedirectTo?: string) {
  const supabase = getClient();
  
  const redirectTo =
    emailRedirectTo ||
    (typeof window !== 'undefined'
      ? `${window.location.origin}/auth/callback`
      : undefined);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  
  if (error) throw error;
  return data;
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = getClient();
  
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser() {
  const supabase = getClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  
  return user;
}

/**
 * Get the current session
 */
export async function getSession() {
  const supabase = getClient();
  
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  
  return session;
}

