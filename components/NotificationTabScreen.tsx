import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors } from '../constants/Colors';
import { useTheme } from './ThemeContext';

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  dateGroup: string;
};

const notifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Reminder!',
    message: 'You might run out of water in 3 hours!',
    time: '3:30 pm',
    dateGroup: 'Today, Mar 30, 2025',
  },
  {
    id: '2',
    title: 'Reminder!',
    message: 'You might run out of water in 3 hours!',
    time: '3:30 pm',
    dateGroup: 'Today, Mar 30, 2025',
  },
  {
    id: '3',
    title: 'Reminder!',
    message: 'You might run out of water in 3 hours!',
    time: '3:30 pm',
    dateGroup: 'Today, Mar 30, 2025',
  },
  {
    id: '4',
    title: 'Reminder!',
    message: 'You might run out of water in 3 hours!',
    time: '3:30 pm',
    dateGroup: 'Today, Mar 30, 2025',
  },
  {
    id: '5',
    title: 'Reminder!',
    message: 'You might run out of water in 3 hours!',
    time: '3:30 pm',
    dateGroup: 'Yesterday, Mar 29, 2025',
  },
  {
    id: '6',
    title: 'Reminder!',
    message: 'You might run out of water in 3 hours!',
    time: '3:30 pm',
    dateGroup: 'Yesterday, Mar 29, 2025',
  },
  {
    id: '7',
    title: 'Reminder!',
    message: 'You might run out of water in 3 hours!',
    time: '3:30 pm',
    dateGroup: 'Yesterday, Mar 29, 2025',
  },
];

const groupedData = notifications.reduce((acc: Record<string, NotificationItem[]>, item) => {
  if (!acc[item.dateGroup]) {
    acc[item.dateGroup] = [];
  }
  acc[item.dateGroup].push(item);
  return acc;
}, {});

const NotificationScreen = () => {
  const { theme } = useTheme();
  const colors = Colors[theme];
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <Text style={[styles.header, { color: colors.text }]}>Notifications</Text>
      <FlatList
        data={Object.keys(groupedData)}
        keyExtractor={(item) => item}
        renderItem={({ item: group }) => (
          <View>
            <Text style={[styles.groupHeader, { color: colors.textSecondary }]}>{group}</Text>
            {groupedData[group].map((notif) => (
              <View key={notif.id} style={[styles.notificationCard, { backgroundColor: colors.card }]}>
                <View style={styles.notificationRow}>
                  <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                  <Text style={[styles.title, { color: colors.text }]}>{notif.title}</Text>
                  <Text style={[styles.time, { color: colors.textTertiary }]}>{notif.time}</Text>
                </View>
                <Text style={[styles.message, { color: colors.textSecondary }]}>{notif.message}</Text>
              </View>
            ))}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    marginTop: 24,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  groupHeader: {
    fontSize: 13,
    fontWeight: '500',
    marginVertical: 10,
  },
  notificationCard: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  title: {
    fontWeight: 'bold',
    flex: 1,
  },
  time: {
    color: '#888',
    fontSize: 12,
  },
  message: {
    fontSize: 13,
    color: '#444',
  },
});
