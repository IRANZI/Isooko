import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from './ThemeContext';

const PersonalInfo = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const colors = theme === 'light' ? { bg: '#fff', text: '#222', card: '#f5f5f5', border: '#eee', primary: '#0D4D95' } : { bg: '#181A20', text: '#fff', card: '#23262F', border: '#333', primary: '#4F8EF7' };
  // Dummy user data
  const user = { name: 'John Doe', email: 'john@example.com', phone: '+1234567890' };
  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={22} color={colors.text} />
        <Text style={[styles.backText, { color: colors.text }]}>Back</Text>
      </TouchableOpacity>
      <Text style={[styles.title, { color: colors.text }]}>Personal Info</Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <Text style={[styles.label, { color: colors.text }]}>Name</Text>
        <Text style={[styles.value, { color: colors.text }]}>{user.name}</Text>
        <Text style={[styles.label, { color: colors.text }]}>Email</Text>
        <Text style={[styles.value, { color: colors.text }]}>{user.email}</Text>
        <Text style={[styles.label, { color: colors.text }]}>Phone</Text>
        <Text style={[styles.value, { color: colors.text }]}>{user.phone}</Text>
        <TouchableOpacity style={[styles.editBtn, { backgroundColor: colors.primary }]}>
          <Icon name="edit" size={18} color="#fff" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
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
  label: { fontSize: 13, marginTop: 10, opacity: 0.7 },
  value: { fontSize: 16, fontWeight: '500', marginBottom: 4 },
  editBtn: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginTop: 18, paddingVertical: 6, paddingHorizontal: 14, borderRadius: 8 },
  editText: { color: '#fff', marginLeft: 6, fontWeight: 'bold', fontSize: 14 },
});
export default PersonalInfo; 