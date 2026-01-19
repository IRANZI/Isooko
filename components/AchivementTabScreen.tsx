import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type Achievement = {
  unlocked: boolean;
};

const achievements: Achievement[] = [
  ...Array(12).fill({ unlocked: true }),
  ...Array(4).fill({ unlocked: false }),
];

const AchievementsTabScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="water-outline" size={24} color="white" />
        <Text style={styles.title}>Achievements</Text>
        <Ionicons name="share-social-outline" size={24} color="white" />
      </View>

      <Image
        source={require('../assets/images/level.png')}
        style={styles.levelBadge}
      />
      <Text style={styles.levelText}>LEVEL 2</Text>
      <Text style={styles.subText}>Congratulations! You've reached level 2</Text>

      <View style={styles.grid}>
        {achievements.map((achieve, index) => (
          <View key={index} style={styles.achievementItem}>
            {achieve.unlocked ? (
              <Image
                source={require('../assets/images/level.png')}
                style={styles.icon}
              />
            ) : (
              <FontAwesome name="lock" size={40} color="#ccc" />
            )}
            <Text style={styles.label}>Level 1</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#005599',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  levelBadge: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 20,
  },
  levelText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  subText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  achievementItem: {
    width: width / 4.5,
    margin: 10,
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
  label: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default AchievementsTabScreen;
