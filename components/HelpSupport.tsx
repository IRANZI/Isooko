import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from './ThemeContext';

const HelpSupport = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const colors = theme === 'light' ? { bg: '#fff', text: '#222', card: '#f5f5f5', border: '#eee', primary: '#0D4D95' } : { bg: '#181A20', text: '#fff', card: '#23262F', border: '#333', primary: '#4F8EF7' };
  const faqs = [
    { q: 'How do I reset my password?', a: 'Go to Account & Security > Change Password.' },
    { q: 'How do I contact support?', a: 'Tap the button below or email support@isooko.com.' },
    { q: 'How do I enable notifications?', a: 'Go to Preferences and toggle Notifications.' },
  ];
  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={22} color={colors.text} />
        <Text style={[styles.backText, { color: colors.text }]}>Back</Text>
      </TouchableOpacity>
      <Text style={[styles.title, { color: colors.text }]}>Help & Support</Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <Text style={[styles.sectionTitle, { color: colors.text }]}>FAQs</Text>
        {faqs.map((f, i) => (
          <View key={i} style={styles.faqItem}>
            <Text style={[styles.faqQ, { color: colors.text }]}>{f.q}</Text>
            <Text style={[styles.faqA, { color: colors.text }]}>{f.a}</Text>
          </View>
        ))}
        <TouchableOpacity style={[styles.contactBtn, { backgroundColor: colors.primary }]}>
          <Text style={styles.contactText}>Contact Support</Text>
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
  sectionTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 10 },
  faqItem: { marginBottom: 12 },
  faqQ: { fontWeight: 'bold', fontSize: 14 },
  faqA: { fontSize: 13, marginTop: 2, opacity: 0.8 },
  contactBtn: { alignSelf: 'center', marginTop: 18, paddingVertical: 10, paddingHorizontal: 24, borderRadius: 8 },
  contactText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
export default HelpSupport; 