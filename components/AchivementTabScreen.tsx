import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors } from '../constants/Colors';
import { useTheme } from './ThemeContext';

const { width } = Dimensions.get('window');

type Achievement = {
  unlocked: boolean;
};

const achievements: Achievement[] = [
  ...Array(12).fill({ unlocked: true }),
  ...Array(4).fill({ unlocked: false }),
];

const AchievementsTabScreen: React.FC = () => {
  const { theme } = useTheme();
  const colors = Colors[theme];
  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Ionicons name="water-outline" size={24} color={colors.text} />
        <Text style={[styles.title, { color: colors.text }]}>Achievements</Text>
        <Ionicons name="share-social-outline" size={24} color={colors.text} />
      </View>
      <Text style={[styles.levelText, { color: colors.text, marginTop: 24 }]}>LEVEL 2</Text>
      <Text style={[styles.subText, { color: colors.textSecondary }]}>Congratulations! You've reached level 2</Text>
      <View style={styles.grid}>
        {achievements.map((achieve, index) => (
          <View key={index} style={[styles.achievementItem, { backgroundColor: colors.card, borderRadius: 12, padding: 12, margin: 8, alignItems: 'center', justifyContent: 'center', shadowColor: colors.shadow, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 }]}>
            {achieve.unlocked ? (
              <FontAwesome name="trophy" size={36} color={colors.primary} />
            ) : (
              <FontAwesome name="lock" size={36} color={colors.textTertiary} />
            )}
            <Text style={[styles.label, { color: colors.text, marginTop: 8 }]}>{`Level ${index + 1}`}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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
  label: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default AchievementsTabScreen;
