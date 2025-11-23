import * as SecureStore from 'expo-secure-store';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import 'react-native-url-polyfill/auto';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    return SecureStore.deleteItemAsync(key);
  },
};

// Check environment variables
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Log what we have (without exposing full values)
console.log('🔧 Supabase Configuration Check:');
console.log('  EXPO_PUBLIC_SUPABASE_URL:', supabaseUrl ? `✅ ${supabaseUrl.substring(0, 20)}...` : '❌ MISSING');
console.log('  EXPO_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? `✅ ${supabaseAnonKey.substring(0, 20)}...` : '❌ MISSING');
console.log('  All env vars:', Object.keys(process.env).filter(k => k.startsWith('EXPO_PUBLIC')));

let supabase: SupabaseClient;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ CRITICAL: Supabase environment variables are missing!');
  console.error('   This build will not work properly.');
  console.error('   Environment variables needed:');
  console.error('   - EXPO_PUBLIC_SUPABASE_URL');
  console.error('   - EXPO_PUBLIC_SUPABASE_ANON_KEY');
  
  // Create a dummy client that will fail gracefully
  supabase = createClient(
    'https://placeholder.supabase.co',
    'placeholder-key-that-will-fail',
    {
      auth: {
        storage: ExpoSecureStoreAdapter,
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    },
  );
} else {
  console.log('✅ Supabase configuration looks good, creating client...');
  
  supabase = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        storage: ExpoSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    },
  );
}

export { supabase };

