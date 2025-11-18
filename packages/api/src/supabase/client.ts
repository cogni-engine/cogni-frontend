import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

// Store the client instance
let supabaseInstance: SupabaseClient | null = null;

/**
 * Create a Supabase client for browser/web environments
 * Uses environment variables for configuration
 */
export function createClient(): SupabaseClient {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  supabaseInstance = createBrowserClient(supabaseUrl, supabaseKey);
  return supabaseInstance;
}

/**
 * Get the existing Supabase client instance
 * Creates one if it doesn't exist
 */
export function getClient(): SupabaseClient {
  if (!supabaseInstance) {
    return createClient();
  }
  return supabaseInstance;
}

/**
 * Reset the Supabase client instance
 * Useful for testing or when switching configurations
 */
export function resetClient(): void {
  supabaseInstance = null;
}

