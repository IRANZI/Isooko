import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={Object.keys(groupedData)}
        keyExtractor={(item) => item}
        renderItem={({ item: group }) => (
          <View>
            <Text style={styles.groupHeader}>{group}</Text>
            {groupedData[group].map((notif) => (
              <View key={notif.id} style={styles.notificationCard}>
                <View style={styles.notificationRow}>
                  <View style={styles.dot} />
                  <Text style={styles.title}>{notif.title}</Text>
                  <Text style={styles.time}>{notif.time}</Text>
                </View>
                <Text style={styles.message}>{notif.message}</Text>
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
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 10,
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
    color: '#777',
    marginVertical: 10,
  },
  notificationCard: {
    backgroundColor: '#F8F8F8',
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
    backgroundColor: '#FF6B00',
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
