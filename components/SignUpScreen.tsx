import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/navigation/type';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUpScreen'>;

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = () => {
    if (!email || !password || !isChecked) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Home'); // Adjust target screen if needed
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Isooko Today</Text>
      <Text style={styles.subtitle}>
        Create an account to track your water quality and water level.
      </Text>

      <View style={styles.inputContainer}>
        <Icon name="email-outline" size={20} color="#999" style={styles.icon} />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={20} color="#999" style={styles.icon} />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Icon name={secureText ? 'eye-off-outline' : 'eye-outline'} size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? '#0D4D95' : undefined}
        />
        <Text style={styles.checkboxText}>
          I agree to Isooko <Text style={styles.link}>Terms & Conditions</Text>
        </Text>
      </View>

      <Text style={styles.or}>or</Text>

      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>Continue with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.signupButton,
          { backgroundColor: isChecked ? '#0D4D95' : '#ccc' },
        ]}
        onPress={handleSignUp}
        disabled={!isChecked}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.signupText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.loginLink}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignInScreen')}>
          Sign In
        </Text>
      </Text>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#FAFAFA',
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 13,
    color: '#333',
    marginLeft: 8,
  },
  link: {
    color: '#0D4D95',
    fontWeight: 'bold',
  },
  or: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#777',
  },
  socialButton: {
    borderColor: '#ddd',
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  socialText: {
    color: '#333',
  },
  signupButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginLink: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
});