import { Stack, Link } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { supabase } from '@/lib/supabase';
import GoogleSignInButton from '@/components/auth/google-sign-in-button';
import AppleSignInButton from '@/components/auth/apple-sign-in-button';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSignUp() {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      Alert.alert(
        'Success!',
        'Account created! Please check your email to verify your account.',
        [{ text: 'OK' }]
      );
      // Clear form
      setEmail('');
      setPassword('');
    }
    setLoading(false);
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Register', headerShown: false }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.title}>Create your account</Text>

              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#71717a"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setError('');
                  }}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="email"
                  editable={!loading}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#71717a"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setError('');
                  }}
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password-new"
                  editable={!loading}
                  returnKeyType="go"
                  onSubmitEditing={handleSignUp}
                />

                <TouchableOpacity
                  style={[styles.primaryButton, loading && styles.buttonDisabled]}
                  onPress={handleSignUp}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator color="#fff" size="small" />
                      <Text style={styles.primaryButtonText}>Creating account...</Text>
                    </View>
                  ) : (
                    <Text style={styles.primaryButtonText}>Create account</Text>
                  )}
                </TouchableOpacity>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}
              </View>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or continue with</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.googleButtonContainer}>
                <GoogleSignInButton />
              </View>

              <View style={styles.appleButtonContainer}>
                <AppleSignInButton />
              </View>

              <View style={styles.registerContainer}>
                <Text style={styles.registerPrompt}>Already have an account?</Text>
                <Link href="/auth/login" asChild>
                  <TouchableOpacity>
                    <Text style={styles.registerLink}>Sign in</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#000',
  },
  card: {
    width: '100%',
    maxWidth: 448,
    backgroundColor: 'rgba(24, 24, 27, 0.8)', // zinc-900/80
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 40,
    elevation: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  formContainer: {
    gap: 16,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#27272a', // zinc-800
    borderWidth: 1,
    borderColor: '#3f3f46', // zinc-700
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#fff',
  },
  primaryButton: {
    width: '100%',
    height: 48,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#52525b', // zinc-600
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 1,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  errorText: {
    color: '#ef4444', // red-500
    fontSize: 14,
    marginTop: 4,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#3f3f46', // zinc-700
  },
  dividerText: {
    marginHorizontal: 8,
    color: '#9ca3af', // gray-400
    fontSize: 14,
    backgroundColor: 'rgba(24, 24, 27, 0.8)', // matches card bg
    paddingHorizontal: 4,
  },
  googleButtonContainer: {
    width: '100%',
  },
  appleButtonContainer: {
    width: '100%',
    marginTop: 12,
  },
  registerContainer: {
    marginTop: 32,
    alignItems: 'center',
    gap: 12,
  },
  registerPrompt: {
    color: '#d4d4d8', // gray-300
    fontSize: 14,
  },
  registerLink: {
    color: '#60a5fa', // blue-400
    fontSize: 16,
    fontWeight: '600',
  },
});

