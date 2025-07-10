import { RootStackParamList } from '@/app/navigation/type';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { default as Icon } from 'react-native-vector-icons/MaterialCommunityIcons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUpScreen'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

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

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password || !isChecked) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Isooko Today</Text>
      <Text style={styles.subtitle}>
        Create an account to track your water quality and water level.
      </Text>

      <View style={styles.inputContainer}>
        <Icon name="account-outline" size={20} color="#999" style={styles.icon} />
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="account-outline" size={20} color="#999" style={styles.icon} />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="email-outline" size={20} color="#999" style={styles.icon} />
        <TextInput
          placeholder="Email"
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

      <TouchableOpacity
        style={[
          styles.signupButton,
          { backgroundColor: isChecked && !emailError && email && password && firstName && lastName ? '#0D4D95' : '#ccc' },
        ]}
        onPress={handleSignUp}
        disabled={!isChecked || !!emailError || !email || !password || !firstName || !lastName}
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
    padding: SCREEN_WIDTH < 350 ? 12 : 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: SCREEN_WIDTH < 350 ? 18 : 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: SCREEN_WIDTH < 350 ? 12 : 14,
    color: '#555',
    marginBottom: 14,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  checkboxText: {
    fontSize: SCREEN_WIDTH < 350 ? 12 : 13,
    color: '#333',
    marginLeft: 8,
  },
  link: {
    color: '#0D4D95',
    fontWeight: 'bold',
    fontSize: SCREEN_WIDTH < 350 ? 12 : 14,
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
    justifyContent: 'flex-start',
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
  signupButton: {
    paddingVertical: SCREEN_WIDTH < 350 ? 10 : 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  signupText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: SCREEN_WIDTH < 350 ? 14 : 16,
  },
  loginLink: {
    textAlign: 'center',
    marginTop: 16,
    color: '#555',
    fontSize: SCREEN_WIDTH < 350 ? 12 : 14,
  },
});