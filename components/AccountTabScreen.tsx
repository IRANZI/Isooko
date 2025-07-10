import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { JSX } from 'react';
import {
    Alert,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { RootStackParamList } from '../app/navigation/type';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';
import { useTheme } from './ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AccountTabScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const colors = Colors[theme];

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => navigation.navigate('SignInScreen') },
    ]);
  };

  const renderItem = (label: string, icon: JSX.Element, screen: keyof RootStackParamList) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(screen)}>
      <View style={styles.itemContent}>
        {icon}
        <Text style={[styles.itemText, { color: theme === 'light' ? '#000' : colors.text }]}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.primary} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Account</Text>

      {/* First Card */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {renderItem('Personal info', <Ionicons name="person-outline" size={18} color={colors.primary} />, 'PersonalInfo')}
        {renderItem('Preferences', <Feather name="settings" size={18} color={colors.primary} />, 'Preferences')}
      </View>

      {/* Second Card */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {renderItem('Account & Security', <Ionicons name="shield-checkmark-outline" size={18} color={colors.primary} />, 'AccountSecurity')}
        {renderItem('Linked Accounts', <Feather name="link" size={18} color={colors.primary} />, 'LinkedAccounts')}
        {renderItem('Feedback', <MaterialIcons name="feedback" size={18} color={colors.primary} />, 'Feedback')}
        {renderItem('Terms & conditions', <Feather name="file-text" size={18} color={colors.primary} />, 'TermsConditions')}
        {renderItem('Help & support', <Ionicons name="help-circle-outline" size={18} color={colors.primary} />, 'HelpSupport')}
        <TouchableOpacity style={[styles.logoutItem, { backgroundColor: colors.card }]} onPress={handleLogout}>
          <View style={styles.itemContent}>
            <MaterialIcons name="logout" size={18} color={colors.primary} />
            <Text style={[styles.itemText, { color: theme === 'light' ? '#000' : colors.text }]}>{'Logout'}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    marginTop: 24,
  },
  header: {
    fontSize: SCREEN_WIDTH < 350 ? 16 : 18,
    fontWeight: 'bold',
    marginVertical: 16,
    alignSelf: 'center',
  },
  card: {
    borderRadius: 10,
    paddingVertical: 6,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: SCREEN_WIDTH < 350 ? 8 : 10,
    justifyContent: 'space-between',
    marginVertical: 4,
    borderRadius: 8,
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: SCREEN_WIDTH < 350 ? 8 : 10,
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemText: {
    fontSize: SCREEN_WIDTH < 350 ? 12 : 14,
  },
});

export default AccountTabScreen;
