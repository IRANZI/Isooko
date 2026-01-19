import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/navigation/type';

type GetStartedScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GetStartedScreen'>;

const GetStartedScreen: React.FC = () => {
  const navigation = useNavigation<GetStartedScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/images/favicon.png')}
        style={styles.logo}
      />

      {/* Heading */}
      <Text style={styles.title}>Let’s Get Started</Text>
      <Text style={styles.subtitle}>Choose the best way to preserve water and have better lives.</Text>

      {/* Social Buttons */}
      <TouchableOpacity style={styles.socialButton}>
        <Image source={require('../assets/images/google_icon .png')} style={styles.socialIcon} />
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Image source={require('../assets/images/apple_icon.png')} style={styles.socialIcon} />
        <Text style={styles.socialText}>Continue with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Image source={require('../assets/images/fb_icon .png')} style={styles.socialIcon} />
        <Text style={styles.socialText}>Continue with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Image source={require('../assets/images/twitter_icon.png')} style={styles.socialIcon} />
        <Text style={styles.socialText}>Continue with Twitter</Text>
      </TouchableOpacity>

      {/* Sign Up & Sign In Buttons */}
      <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('SignInScreen')}>
        <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Privacy Policy   ·   Terms of Service</Text>
      </View>
    </View>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 60,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginVertical: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 5,
    width: '100%',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  socialText: {
    fontSize: 14,
    color: '#000',
  },
  signUpButton: {
    backgroundColor: '#0D4D95',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  signUpText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signInButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderColor: '#ddd',
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
  },
  signInText: {
    color: '#0D4D95',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});
