import { createClient } from '@/lib/supabase/browserClient';

const supabase = createClient();

export async function signUp(
  email: string,
  password: string,
  emailRedirectTo?: string
) {
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

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signInWithGoogle(
  emailRedirectTo?: string
) {
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

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
