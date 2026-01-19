// navigation/type.ts

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// WaterSourcesMap-specific props
export interface WaterSourcesMapProps {
  waterSources: {
    latitude: number;
    longitude: number;
    name: string;
    distance: number;
  }[];
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

// Tab Navigator params
export type TabParamList = {
  HomeTab: undefined;
  NotificationTab: undefined;
  MapTab: WaterSourcesMapProps;
  AchievementTab: undefined;
  AccountTab: undefined;
};

// Stack Navigator params
export type RootStackParamList = {
  Splash: undefined;
  Intro: undefined;
  WaterQualityScreen: undefined;
  AchievementScreen: undefined;
  GetStartedScreen: undefined;
  SignUpScreen: undefined;
  SignInScreen: undefined;
  Homepage: undefined;
  ForgotPassword: undefined;
  SendOTP: undefined;
  NewPassword: undefined;
  PasswordSuccess: undefined;
  Home: undefined;
};

// For use inside WaterSourcesMap
export type MapTabScreenProps = BottomTabScreenProps<TabParamList, 'MapTab'>;
