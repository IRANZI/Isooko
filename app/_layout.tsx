// navigation/Layout.tsx

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeProvider, useTheme } from '../components/ThemeContext';
import { Colors } from '../constants/Colors';
import { Shadows, Spacing } from '../constants/Spacing';

import {
    RootStackParamList,
    TabParamList
} from './navigation/type';

import AccountSecurity from '../components/AccountSecurity';
import AccountTabScreen from '../components/AccountTabScreen';
import AchievementScreen from '../components/AchievementScreen';
import AchievementsTabScreen from '../components/AchivementTabScreen';
import Feedback from '../components/Feedback';
import ForgotPasswordScreen from '../components/ForgotPassword';
import GetStartedScreen from '../components/GetStarted';
import HelpSupport from '../components/HelpSupport';
import Homepage from '../components/HomeScreen';
import HomeTabScreen from '../components/HomeTabScreen';
import Intro from '../components/IntroScreen';
import LinkedAccounts from '../components/LinkedAccounts';
import NewPasswordScreen from '../components/NewPassword';
import NotificationTabScreen from '../components/NotificationTabScreen';
import PasswordSuccessScreen from '../components/PasswordSuccessScreen';
import PersonalInfo from '../components/PersonalInfo';
import Preferences from '../components/Preferences';
import SendOTP from '../components/SendOTPScreen';
import SignInScreen from '../components/SignInScreen';
import SignUpScreen from '../components/SignUpScreen';
import SplashScreen from '../components/SplashScreen';
import TermsConditions from '../components/TermsConditions';
import WaterQualityScreen from '../components/WaterQualityScreen';
import WaterSourcesMap from '../components/WaterSourcesMap';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HomeTabNavigator: React.FC = () => {
  const { theme } = useTheme();
  const colors = Colors[theme];
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          let iconName: string;
          let iconSize = SCREEN_WIDTH < 350 ? 24 : 26;
          switch (route.name) {
            case 'HomeTab':
              iconName = 'home';
              break;
            case 'NotificationTab':
              iconName = 'notifications';
              break;
            case 'MapTab':
              iconName = 'map';
              break;
            case 'AchievementTab':
              iconName = 'star';
              break;
            case 'AccountTab':
              iconName = 'person';
              break;
            default:
              iconName = 'home';
          }
          return <Icon name={iconName} size={iconSize} color={focused ? colors.primary : colors.icon} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.icon,
        tabBarStyle: {
          backgroundColor: colors.backgroundSecondary,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: Spacing.sm,
          paddingTop: Spacing.sm,
          ...Shadows.medium,
        },
        tabBarLabelStyle: {
          fontSize: SCREEN_WIDTH < 350 ? 9 : 11,
          fontWeight: '600',
          marginTop: Spacing.xs,
        },
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeTabScreen}
      />
      <Tab.Screen 
        name="NotificationTab" 
        component={NotificationTabScreen}
      />
      <Tab.Screen
        name="MapTab"
        component={WaterSourcesMap}
        initialParams={{
          waterSources: [
            {
              latitude: 37.78825,
              longitude: -122.4324,
              name: 'Source 1',
              distance: 1.5,
            },
            // Add more as needed
          ],
          initialRegion: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        }}
      />
      <Tab.Screen 
        name="AchievementTab" 
        component={AchievementsTabScreen}
      />
      <Tab.Screen 
        name="AccountTab" 
        component={AccountTabScreen}
      />
    </Tab.Navigator>
  );
};

const Layout: React.FC = () => {
  return (
    <ThemeProvider>
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.light.background,
        },
      }} 
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="WaterQualityScreen" component={WaterQualityScreen} />
      <Stack.Screen name="AchievementScreen" component={AchievementScreen} />
      <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="Homepage" component={Homepage} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="SendOTP" component={SendOTP} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen name="PasswordSuccess" component={PasswordSuccessScreen} />
      <Stack.Screen name="Home" component={HomeTabNavigator} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
        <Stack.Screen name="Preferences" component={Preferences} />
        <Stack.Screen name="AccountSecurity" component={AccountSecurity} />
        <Stack.Screen name="LinkedAccounts" component={LinkedAccounts} />
        <Stack.Screen name="Feedback" component={Feedback} />
        <Stack.Screen name="TermsConditions" component={TermsConditions} />
        <Stack.Screen name="HelpSupport" component={HelpSupport} />
    </Stack.Navigator>
    </ThemeProvider>
  );
};

export default Layout;
