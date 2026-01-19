// navigation/Layout.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  RootStackParamList,
  TabParamList,
  WaterSourcesMapProps,
} from './navigation/type';

import Homepage from '../components/HomeScreen';
import Intro from '../components/IntroScreen';
import ForgotPasswordScreen from '../components/ForgotPassword';
import SendOTP from '../components/SendOTPScreen';
import NewPasswordScreen from '../components/NewPassword';
import PasswordSuccessScreen from '../components/PasswordSuccessScreen';
import HomeTabScreen from '../components/HomeTabScreen';
import NotificationTabScreen from '../components/NotificationTabScreen';
import AccountTabScreen from '../components/AccountTabScreen';
import SplashScreen from '../components/SplashScreen';
import WaterQualityScreen from '../components/WaterQualityScreen';
import GetStartedScreen from '../components/GetStarted';
import AchievementsTabScreen from '../components/AchivementTabScreen';
import AchievementScreen from '../components/AchievementScreen';
import SignUpScreen from '../components/SignUpScreen';
import SignInScreen from '../components/SignInScreen';
import WaterSourcesMap from '../components/WaterSourcesMap';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const HomeTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

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

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1E90FF',
        tabBarInactiveTintColor: '#000',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeTabScreen} />
      <Tab.Screen name="NotificationTab" component={NotificationTabScreen} />
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
      <Tab.Screen name="AchievementTab" component={AchievementsTabScreen} />
      <Tab.Screen name="AccountTab" component={AccountTabScreen} />
    </Tab.Navigator>
  );
};

const Layout: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
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
    </Stack.Navigator>
  );
};

export default Layout;
