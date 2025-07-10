import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from './ThemeContext';
import { Feather } from '@expo/vector-icons';

const LinkedAccounts = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const colors = theme === 'light' ? { bg: '#fff', text: '#222', card: '#f5f5f5', border: '#eee', primary: '#0D4D95' } : { bg: '#181A20', text: '#fff', card: '#23262F', border: '#333', primary: '#4F8EF7' };
  // Dummy linked status
  const linked = { google: true, apple: false };
  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={22} color={colors.text} />
        <Text style={[styles.backText, { color: colors.text }]}>Back</Text>
      </TouchableOpacity>
      <Text style={[styles.title, { color: colors.text }]}>Linked Accounts</Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <View style={styles.row}>
          <Feather name="mail" size={20} color={linked.google ? colors.primary : '#aaa'} />
          <Text style={[styles.label, { color: colors.text }]}>Google</Text>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: linked.google ? '#ccc' : colors.primary }]}>
            <Text style={styles.actionText}>{linked.google ? 'Disconnect' : 'Connect'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Feather name="apple" size={20} color={linked.apple ? colors.primary : '#aaa'} />
          <Text style={[styles.label, { color: colors.text }]}>Apple</Text>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: linked.apple ? '#ccc' : colors.primary }]}>
            <Text style={styles.actionText}>{linked.apple ? 'Disconnect' : 'Connect'}</Text>
          </TouchableOpacity>
        </View>
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
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 12 },
  label: { fontSize: 15, flex: 1, marginLeft: 10 },
  actionBtn: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 8 },
  actionText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});
export default LinkedAccounts; 