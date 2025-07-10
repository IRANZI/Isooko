import { RootStackParamList } from '@/app/navigation/type';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { API_URL } from '../constants/api';
import { Colors } from '../constants/Colors';
import { BorderRadius, Spacing } from '../constants/Spacing';

// Add to RootStackParamList: VerifyEmail: { email: string }
type Props = NativeStackScreenProps<RootStackParamList, 'VerifyEmail'>;

const VerifyEmailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { email } = route.params;
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleVerify = async () => {
    if (!code) return;
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch(`${API_URL}/api/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Email verified! You can now log in.');
        setTimeout(() => navigation.replace('SignInScreen'), 1500);
      } else {
        setMessage(data.error || 'Verification failed');
      }
    } catch (err) {
      setMessage('Network error');
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.subtitle}>Enter the code sent to {email}</Text>
      <TextInput
        style={styles.input}
        placeholder="Verification Code"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleVerify} disabled={isLoading || !code}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify</Text>}
      </TouchableOpacity>
      {!!message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

export default VerifyEmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    padding: Spacing.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: Spacing.md,
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    fontSize: 16,
    backgroundColor: Colors.light.backgroundSecondary,
    color: Colors.light.text,
  },
  button: {
    backgroundColor: Colors.light.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    marginTop: Spacing.md,
    color: Colors.light.primary,
    textAlign: 'center',
  },
}); 