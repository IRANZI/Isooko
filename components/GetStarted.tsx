import { RootStackParamList } from '@/app/navigation/type';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { BorderRadius, Layout, Shadows, Spacing } from '../constants/Spacing';

type GetStartedScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GetStartedScreen'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
      <Text style={styles.title}>Let's Get Started</Text>
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
    backgroundColor: Colors.light.background,
    padding: Layout.screenPadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: SCREEN_WIDTH < 350 ? 40 : 50,
    height: SCREEN_WIDTH < 350 ? 50 : 65,
    resizeMode: 'contain',
    marginBottom: SCREEN_WIDTH < 350 ? Spacing.md : Spacing.lg,
  },
  title: {
    fontSize: SCREEN_WIDTH < 350 ? 15 : 18,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: SCREEN_WIDTH < 350 ? 13 : 15,
    color: '#555',
    marginBottom: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
    paddingVertical: SCREEN_WIDTH < 350 ? 6 : 10,
    paddingHorizontal: SCREEN_WIDTH < 350 ? 10 : 16,
    borderRadius: BorderRadius.round,
    marginVertical: SCREEN_WIDTH < 350 ? 3 : Spacing.xs,
    width: '100%',
    backgroundColor: Colors.light.background,
    ...Shadows.small,
  },
  socialIcon: {
    width: SCREEN_WIDTH < 350 ? 16 : 20,
    height: SCREEN_WIDTH < 350 ? 16 : 20,
    marginRight: SCREEN_WIDTH < 350 ? 8 : Spacing.md,
  },
  socialText: {
    fontSize: SCREEN_WIDTH < 350 ? 12 : 14,
    color: Colors.light.text,
  },
  signUpButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: SCREEN_WIDTH < 350 ? 8 : 12,
    paddingHorizontal: SCREEN_WIDTH < 350 ? 16 : 24,
    borderRadius: BorderRadius.round,
    marginTop: SCREEN_WIDTH < 350 ? 10 : Spacing.lg,
    width: '100%',
    alignItems: 'center',
    ...Shadows.medium,
  },
  signUpText: {
    fontSize: SCREEN_WIDTH < 350 ? 14 : 16,
    fontWeight: 'bold',
    color: Colors.light.background,
  },
  signInButton: {
    marginTop: SCREEN_WIDTH < 350 ? 8 : Spacing.md,
    paddingVertical: SCREEN_WIDTH < 350 ? 8 : Spacing.md,
    paddingHorizontal: SCREEN_WIDTH < 350 ? 16 : Spacing.xl,
    borderRadius: BorderRadius.round,
    borderColor: Colors.light.border,
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    ...Shadows.small,
  },
  signInText: {
    fontSize: SCREEN_WIDTH < 350 ? 14 : 16,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  footer: {
    marginTop: Spacing.xl,
  },
  footerText: {
    fontSize: SCREEN_WIDTH < 350 ? 10 : 12,
    color: Colors.light.textTertiary,
  },
});
