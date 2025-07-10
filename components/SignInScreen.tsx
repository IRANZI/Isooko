import { RootStackParamList } from '@/app/navigation/type';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { default as Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../constants/Colors';
import { Layout, Spacing } from '../constants/Spacing';
import { TextStyles } from '../constants/Typography';
import { API_URL } from '../constants/api';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignInScreen'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SignInScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (value: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    return re.test(String(value).toLowerCase());
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!validateEmail(value) && value.length > 0) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        navigation.navigate('Home');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      alert('Network error');
    }
    setIsLoading(false);
  };

  const handleSignUp = async () => {
    if (!email || !password || !firstName || !lastName) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });
      const data = await response.json();
      if (response.ok) {
        navigation.replace('SignInScreen');
      } else {
        alert(data.error || 'Signup failed');
      }
    } catch (err) {
      alert('Network error');
    }
    setIsLoading(false);
  };

  const fetchWaterQuality = async () => {
    const response = await fetch(`${API_URL}/api/water-quality`);
    const data = await response.json();
    // Use data in your component
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          Sign in to continue tracking your water quality and level with our smart monitoring system.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Icon name="email-outline" size={20} color={Colors.light.textTertiary} style={styles.icon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor={Colors.light.textTertiary}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            value={email}
            onChangeText={handleEmailChange}
            style={styles.input}
          />
        </View>
        {!!emailError && (
          <Text style={{ color: 'red', fontSize: 12, marginBottom: 4 }}>{emailError}</Text>
        )}

        <View style={styles.inputContainer}>
          <Icon name="lock-outline" size={20} color={Colors.light.textTertiary} style={styles.icon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor={Colors.light.textTertiary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureText}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Icon 
              name={secureText ? 'eye-off-outline' : 'eye-outline'} 
              size={20} 
              color={Colors.light.textTertiary} 
            />
          </TouchableOpacity>
        </View>

        {/* Forgot Password Link */}
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Remember Me Checkbox */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? Colors.light.primary : undefined}
          />
          <Text style={styles.checkboxText}>Remember me</Text>
        </View>

        <Text style={styles.or}>or</Text>

        {/* Social Buttons */}
        <TouchableOpacity style={styles.socialButton}>
          <View style={styles.socialContent}>
            <View style={styles.socialIconBox}>
              <Icon name="google" size={20} color="#EA4335" />
            </View>
            <Text style={styles.socialText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <View style={styles.socialContent}>
            <View style={styles.socialIconBox}>
              <Icon name="apple" size={20} color="#000" />
            </View>
            <Text style={styles.socialText}>Continue with Apple</Text>
          </View>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity
          style={[
            styles.signinButton,
            (!email || !password || !!emailError) && styles.signinButtonDisabled
          ]}
          onPress={handleSignIn}
          disabled={!email || !password || !!emailError}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.light.background} />
          ) : (
            <Text style={styles.signinText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.signupLink}>
          Don't have an account?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('SignUpScreen')}>
            Sign Up
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    flexGrow: 1,
    padding: SCREEN_WIDTH < 350 ? 12 : Layout.screenPadding,
    justifyContent: 'center',
  },
  header: {
    marginBottom: Spacing.lg,
    position: 'relative',
    paddingTop: 48,
  },
  topLeftIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 16,
  },
  title: {
    ...TextStyles.pageTitle,
    fontSize: SCREEN_WIDTH < 350 ? 18 : 22,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...TextStyles.contentBody,
    fontSize: SCREEN_WIDTH < 350 ? 12 : 14,
    marginBottom: Spacing.md,
    color: Colors.light.textSecondary,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
    backgroundColor: '#FAFAFA',
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    paddingVertical: SCREEN_WIDTH < 350 ? 6 : 10,
    fontSize: SCREEN_WIDTH < 350 ? 12 : 14,
  },
  forgotPassword: {
    color: Colors.light.primary,
    fontSize: SCREEN_WIDTH < 350 ? 12 : 14,
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    fontSize: SCREEN_WIDTH < 350 ? 12 : 13,
    color: '#333',
    marginLeft: 8,
  },
  or: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#777',
    fontSize: SCREEN_WIDTH < 350 ? 12 : 13,
  },
  socialButton: {
    borderColor: '#ddd',
    borderWidth: 1,
    paddingVertical: SCREEN_WIDTH < 350 ? 8 : 10,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconBox: {
    width: 28,
    alignItems: 'flex-start',
    marginRight: 8,
  },
  socialText: {
    color: '#333',
    fontSize: SCREEN_WIDTH < 350 ? 12 : 14,
  },
  signinButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: SCREEN_WIDTH < 350 ? 10 : 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  signinButtonDisabled: {
    backgroundColor: '#ccc',
  },
  signinText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: SCREEN_WIDTH < 350 ? 14 : 16,
  },
  signupLink: {
    textAlign: 'center',
    marginTop: 16,
    color: '#555',
    fontSize: SCREEN_WIDTH < 350 ? 12 : 14,
  },
  link: {
    color: Colors.light.primary,
    fontWeight: 'bold',
    fontSize: SCREEN_WIDTH < 350 ? 12 : 14,
  },
});
