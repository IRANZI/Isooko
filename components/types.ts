import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export interface WaterSource {
  name: string;
  latitude: number;
  longitude: number;
  distance: number;
}

type WaterSourcesMapProps = {
  waterSources: WaterSource[];
  initialRegion: Region;
};

export type TabParamList = {
  HomeTab: undefined;
  NotificationTab: undefined;
  MapTab: WaterSourcesMapProps;
  AchievementTab: undefined;
  AccountTab: undefined;
};
