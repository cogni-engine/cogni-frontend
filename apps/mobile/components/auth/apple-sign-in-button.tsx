import { View, StyleSheet, Alert, Platform, TouchableOpacity, Text } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import * as AppleAuthentication from 'expo-apple-authentication';
import CryptoJS from 'crypto-js';

export default function AppleSignInButton() {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    // Only check availability on iOS
    if (Platform.OS !== 'ios') {
      return;
    }

    // Check if Apple Authentication is available on this device
    const checkAvailability = async () => {
      const available = await AppleAuthentication.isAvailableAsync();
      setIsAvailable(available);
    };
    checkAvailability();
  }, []);

  const handleAppleSignIn = async () => {
    try {
      // Generate a raw nonce for security (as recommended by Supabase docs)
      const rawNonce = Math.random().toString(36).substring(2, 15) + 
                       Math.random().toString(36).substring(2, 15);
      
      // Apple requires the nonce to be SHA-256 hashed
      const hashedNonce = CryptoJS.SHA256(rawNonce).toString(CryptoJS.enc.Hex);
      
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce, // Pass the HASHED nonce to Apple
      });

      // Sign in to Supabase with the Apple identity token
      if (credential.identityToken) {
        const { error } = await supabase.auth.signInWithIdToken({
          provider: 'apple',
          token: credential.identityToken,
          nonce: rawNonce, // Pass the RAW nonce to Supabase (not hashed!)
        });

        if (error) {
          console.error('Supabase sign in error:', error);
          Alert.alert('Sign In Error', error.message);
          return;
        }

        // Apple only provides the user's full name on the first sign-in
        // Save it to user metadata for future use (as recommended by Supabase docs)
        if (credential.fullName) {
          const nameParts = [
            credential.fullName.givenName,
            credential.fullName.middleName,
            credential.fullName.familyName,
          ].filter(Boolean);

          if (nameParts.length > 0) {
            const { error: updateError } = await supabase.auth.updateUser({
              data: {
                full_name: nameParts.join(' '),
                given_name: credential.fullName.givenName || null,
                family_name: credential.fullName.familyName || null,
              },
            });

            if (updateError) {
              console.error('Error updating user metadata:', updateError);
              // Don't fail the sign-in if metadata update fails
            }
          }
        }
      } else {
        console.error('No identity token received from Apple');
        Alert.alert('Sign In Error', 'No identity token received from Apple');
      }
    } catch (e: any) {
      if (e.code === 'ERR_REQUEST_CANCELED') {
        // User canceled the sign-in flow - do nothing
      } else {
        console.error('Apple sign in error:', e);
        Alert.alert('Sign In Error', e.message || 'An error occurred');
      }
    }
  };

  // Only show button if Apple Authentication is available
  if (!isAvailable || Platform.OS !== 'ios') {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleAppleSignIn}
        style={styles.button}
        activeOpacity={0.9}
      >
        <View style={styles.iconContainer}>
          <AntDesign name="apple" size={20} color="#000" />
        </View>
        <Text style={styles.text}>Sign in with Apple</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 9999,
    width: '100%',
    height: 44,
  },
  iconContainer: {
    position: 'absolute',
    left: 50,
  },
  text: {
    position: 'absolute',
    left: 90,
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
});
