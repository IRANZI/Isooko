import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { Colors } from '../constants/Colors';
import { useTheme } from './ThemeContext';
import { TabParamList, WaterSource } from './types';

type Props = BottomTabScreenProps<TabParamList, 'MapTab'>;

const { width } = Dimensions.get('window');

const WATER_TYPES = [
  { key: 'all', label: 'All' },
  { key: 'river', label: 'River' },
  { key: 'lake', label: 'Lake' },
  { key: 'dam', label: 'Dam' },
  { key: 'borehole', label: 'Borehole' },
  { key: 'well', label: 'Well' },
  { key: 'tap', label: 'Tap' },
  { key: 'other', label: 'Other' },
];

const WaterSourcesMap: React.FC<Props> = ({ route }) => {
  const { waterSources } = route.params;
  const { theme } = useTheme();
  const colors = Colors[theme];

  const [userLocation, setUserLocation] = useState<Region | null>(null);
  const [nearbySources, setNearbySources] = useState<typeof waterSources>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location access is required to find water sources near you.');
          setLoading(false);
          return;
        }

        // Ensure location services are enabled
        const servicesEnabled = await Location.hasServicesEnabledAsync();
        if (!servicesEnabled) {
          Alert.alert('Location Services Disabled', 'Please enable location services in settings.');
          setLoading(false);
          return;
        }

        let location = await Location.getLastKnownPositionAsync();
        if (!location) {
          location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
        }

        const { latitude, longitude } = location.coords;

        const region: Region = {
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };

        setUserLocation(region);

        const nearby = waterSources.filter((source) => {
          const dist = getDistanceFromLatLonInKm(
            latitude,
            longitude,
            source.latitude,
            source.longitude
          );
          return dist <= 5;
        });

        setNearbySources(nearby);
      } catch (error: any) {
        Alert.alert('Location Error', error.message || 'Failed to get your location.');
        console.warn('Location Error:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getDistanceFromLatLonInKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg: number) => deg * (Math.PI / 180);

  // Filter sources by type, but only if 'type' exists
  const filteredSources = selectedType === 'all'
    ? nearbySources
    : nearbySources.filter((s: WaterSource) => {
        // @ts-ignore: type may not exist
        return s.type ? s.type === selectedType : selectedType === 'other';
      });

  if (loading || !userLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0D4D95" />
        <Text>Getting your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Filter Bar */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.filterBar, { backgroundColor: colors.card }]}> 
        {WATER_TYPES.map(type => (
          <TouchableOpacity
            key={type.key}
            style={[styles.filterChip, selectedType === type.key && { backgroundColor: colors.primary }]}
            onPress={() => setSelectedType(type.key)}
          >
            <Text style={[styles.filterLabel, { color: selectedType === type.key ? '#fff' : colors.primary }]}>{type.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <MapView style={StyleSheet.absoluteFillObject} initialRegion={userLocation} region={userLocation}>
        <Marker coordinate={userLocation} title="You are here" pinColor="blue" />
        {filteredSources.map((source: WaterSource, index: number) => (
          <Marker
            key={index}
            coordinate={{ latitude: source.latitude, longitude: source.longitude }}
            title={source.name}
            description={`${getDistanceFromLatLonInKm(userLocation.latitude, userLocation.longitude, source.latitude, source.longitude).toFixed(2)} km away`}
          />
        ))}
      </MapView>
      <View style={[styles.bottomSheet, {
        backgroundColor: theme === 'dark' ? colors.card : '#fff',
        shadowColor: theme === 'dark' ? '#000' : '#000',
      }]}> 
        <Text style={[styles.sheetTitle, { color: colors.text }]}>Water sources near you</Text>
        <FlatList
          data={filteredSources}
          keyExtractor={(_: WaterSource, index: number) => index.toString()}
          renderItem={({ item }: { item: WaterSource }) => (
            <Text style={[styles.sourceItem, { color: colors.text }]}> {item.name}</Text>
          )}
          ListEmptyComponent={<Text style={{ color: colors.text }}>No water sources found nearby.</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  filterBar: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginHorizontal: 8,
    elevation: 2,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: '#f0f0f0',
  },
  filterLabel: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: 'bold',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: width,
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sourceItem: {
    fontSize: 14,
    paddingVertical: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WaterSourcesMap;
