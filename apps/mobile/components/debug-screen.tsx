import { View, Text, ScrollView, StyleSheet } from 'react-native';

/**
 * Temporary debug screen to show environment configuration
 * Use this to diagnose why the app crashes on launch
 * 
 * REMOVE THIS FILE AFTER DEBUGGING
 */
export function DebugScreen() {
  const envVars = Object.entries(process.env)
    .filter(([key]) => key.startsWith('EXPO_PUBLIC'))
    .map(([key, value]) => ({
      key,
      value: value ? `${String(value).substring(0, 30)}...` : 'MISSING',
      exists: !!value,
    }));

  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
  const googleClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🔧 Debug Information</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Critical Environment Variables:</Text>
        
        <View style={styles.item}>
          <Text style={styles.label}>EXPO_PUBLIC_SUPABASE_URL:</Text>
          <Text style={supabaseUrl ? styles.success : styles.error}>
            {supabaseUrl ? '✅ SET' : '❌ MISSING'}
          </Text>
          {supabaseUrl && (
            <Text style={styles.value}>{supabaseUrl.substring(0, 40)}...</Text>
          )}
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>EXPO_PUBLIC_SUPABASE_ANON_KEY:</Text>
          <Text style={supabaseAnonKey ? styles.success : styles.error}>
            {supabaseAnonKey ? '✅ SET' : '❌ MISSING'}
          </Text>
          {supabaseAnonKey && (
            <Text style={styles.value}>{supabaseAnonKey.substring(0, 40)}...</Text>
          )}
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID:</Text>
          <Text style={googleClientId ? styles.success : styles.error}>
            {googleClientId ? '✅ SET' : '❌ MISSING'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All EXPO_PUBLIC Variables:</Text>
        {envVars.length > 0 ? (
          envVars.map(({ key, value, exists }) => (
            <View key={key} style={styles.item}>
              <Text style={styles.label}>{key}:</Text>
              <Text style={exists ? styles.success : styles.error}>
                {exists ? '✅' : '❌'}
              </Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.error}>No EXPO_PUBLIC environment variables found!</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Diagnosis:</Text>
        {!supabaseUrl || !supabaseAnonKey ? (
          <Text style={styles.error}>
            ❌ PROBLEM: Environment variables are missing!{'\n\n'}
            This means:{'\n'}
            1. Variables not set in EAS dashboard, OR{'\n'}
            2. Build was not done with --clear-cache, OR{'\n'}
            3. Wrong EAS project being used{'\n\n'}
            Solution:{'\n'}
            • Verify secrets in EAS dashboard{'\n'}
            • Run: eas build --profile preview --platform ios --clear-cache
          </Text>
        ) : (
          <Text style={styles.success}>
            ✅ Environment variables are present!{'\n\n'}
            If the app still crashes, check Console.app logs for other errors.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#aaa',
    fontFamily: 'monospace',
  },
  value: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
    marginTop: 2,
  },
  success: {
    color: '#4ade80',
    fontSize: 14,
    fontWeight: 'bold',
  },
  error: {
    color: '#f87171',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

