import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from './ThemeContext';

const AccountSecurity = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const colors = theme === 'light' ? { bg: '#fff', text: '#222', card: '#f5f5f5', border: '#eee', primary: '#0D4D95' } : { bg: '#181A20', text: '#fff', card: '#23262F', border: '#333', primary: '#4F8EF7' };
  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={22} color={colors.text} />
        <Text style={[styles.backText, { color: colors.text }]}>Back</Text>
      </TouchableOpacity>
      <Text style={[styles.title, { color: colors.text }]}>Account & Security</Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Change Password</Text>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary }]}>
          <Icon name="lock" size={18} color="#fff" />
          <Text style={styles.actionText}>Change Password</Text>
        </TouchableOpacity>
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 18 }]}>Two-Factor Authentication</Text>
        <Text style={[styles.info, { color: colors.text }]}>2FA is not enabled. Enable for extra security.</Text>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary }]}>
          <Icon name="security" size={18} color="#fff" />
          <Text style={styles.actionText}>Enable 2FA</Text>
        </TouchableOpacity>
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 18 }]}>Security Tips</Text>
        <Text style={[styles.info, { color: colors.text }]}>- Use a strong password.\n- Don't share your credentials.\n- Enable 2FA for extra protection.</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60 },
  backButton: { position: 'absolute', top: 40, left: 20, flexDirection: 'row', alignItems: 'center' },
  backText: { marginLeft: 4, fontSize: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24 },
  card: { width: '90%', borderRadius: 12, padding: 20, borderWidth: 1, marginTop: 10 },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', marginTop: 8 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginTop: 8, paddingVertical: 6, paddingHorizontal: 14, borderRadius: 8 },
  actionText: { color: '#fff', marginLeft: 6, fontWeight: 'bold', fontSize: 14 },
  info: { fontSize: 13, marginTop: 4, opacity: 0.8 },
});
export default AccountSecurity; 