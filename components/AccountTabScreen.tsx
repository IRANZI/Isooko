import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AccountTabScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => console.log('User logged out') },
    ]);
  };

  const renderItem = (label: string, icon: JSX.Element, onPress: () => void) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemContent}>
        {icon}
        <Text style={styles.itemText}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#888" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Account</Text>

      {/* First Card */}
      <View style={styles.card}>
        {renderItem('Personal info', <Ionicons name="person-outline" size={20} color="#000" />, () =>
          console.log('Navigate to Personal Info'))}
        {renderItem('Preferences', <Feather name="settings" size={20} color="#000" />, () =>
          console.log('Navigate to Preferences'))}
      </View>

      {/* Second Card */}
      <View style={styles.card}>
        {renderItem('Account & Security', <Ionicons name="shield-checkmark-outline" size={20} color="#000" />, () =>
          console.log('Navigate to Account & Security'))}
        {renderItem('Linked Accounts', <Feather name="link" size={20} color="#000" />, () =>
          console.log('Navigate to Linked Accounts'))}
        {renderItem('Feedback', <MaterialIcons name="feedback" size={20} color="#000" />, () =>
          console.log('Navigate to Feedback'))}
        {renderItem('Terms & conditions', <Feather name="file-text" size={20} color="#000" />, () =>
          console.log('Navigate to Terms & Conditions'))}
        {renderItem('Help & support', <Ionicons name="help-circle-outline" size={20} color="#000" />, () =>
          console.log('Navigate to Help & Support'))}
        <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
          <View style={styles.itemContent}>
            <MaterialIcons name="logout" size={20} color="red" />
            <Text style={[styles.itemText, { color: 'red' }]}>Logout</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="red" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemText: {
    fontSize: 16,
  },
});

export default AccountTabScreen;
