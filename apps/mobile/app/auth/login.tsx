import { Stack, Link } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { supabase } from '@/lib/supabase';
import GoogleSignInButton from '@/components/auth/google-sign-in-button';
import AppleSignInButton from '@/components/auth/apple-sign-in-button';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSignIn(e?: any) {
    e?.preventDefault?.();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError('');
    
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(signInError.message);
    }
    setLoading(false);
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Login', headerShown: false }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <View style={styles.card}>
              {/* Logo */}
              <View style={styles.logoContainer}>
                <Image
                  source={require('@/assets/images/cogno-icon.png')}
                  style={styles.logo}
                />
                <Text style={styles.title}>Sign in to Cogno</Text>
              </View>

              {/* Social Sign-In Buttons First */}
              <View style={styles.socialButtonsContainer}>
                <GoogleSignInButton />
                <AppleSignInButton />
              </View>

              {/* OR Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Email/Password Form */}
              <View style={styles.formContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#6b7280"
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
                </View>

                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#6b7280"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      setError('');
                    }}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="password"
                    editable={!loading}
                    returnKeyType="go"
                    onSubmitEditing={handleSignIn}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons
                      name={showPassword ? 'eye' : 'eye-off'}
                      size={20}
                      color="#9ca3af"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[styles.primaryButton, loading && styles.buttonDisabled]}
                  onPress={handleSignIn}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator color="#000" size="small" />
                      <Text style={styles.primaryButtonText}>Signing in...</Text>
                    </View>
                  ) : (
                    <Text style={styles.primaryButtonText}>Sign in</Text>
                  )}
                </TouchableOpacity>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}
              </View>

              {/* Register Link */}
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>
                  Don&apos;t have an account?{' '}
                  <Link href="/auth/register" asChild>
                    <Text style={styles.registerLink}>Create account</Text>
                  </Link>
                </Text>
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
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#000',
  },
  card: {
    width: '100%',
    maxWidth: 448,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  socialButtonsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#3f3f46',
  },
  dividerText: {
    marginHorizontal: 8,
    color: '#9ca3af',
    fontSize: 14,
    paddingHorizontal: 8,
  },
  formContainer: {
    gap: 24,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#3f3f46',
    paddingVertical: 8,
    paddingRight: 40,
    fontSize: 16,
    color: '#fff',
  },
  eyeButton: {
    position: 'absolute',
    right: 0,
    bottom: 8,
    padding: 4,
  },
  primaryButton: {
    width: '100%',
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
  },
  registerContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  registerText: {
    color: '#d1d5db',
    fontSize: 14,
  },
  registerLink: {
    color: '#60a5fa',
    fontWeight: '500',
  },
});
