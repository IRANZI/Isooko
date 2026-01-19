import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface WaterSourcesMapProps {
  waterSources: { latitude: number; longitude: number; name: string; distance: number }[];
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

const WaterSourcesMap: React.FC<WaterSourcesMapProps> = ({ waterSources, initialRegion }) => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {waterSources.map((source, index) => (
          <Marker
            key={index.toString()}
            coordinate={{ latitude: source.latitude, longitude: source.longitude }}
            title={source.name}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default WaterSourcesMap;