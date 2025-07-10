import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from './ThemeContext';

const TermsConditions = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const colors = theme === 'light' ? { bg: '#fff', text: '#222', card: '#f5f5f5', border: '#eee' } : { bg: '#181A20', text: '#fff', card: '#23262F', border: '#333' };
  const terms = `Welcome to Isooko!\n\nBy using this app, you agree to the following terms...\n\n1. Use responsibly.\n2. Respect privacy.\n3. No misuse.\n4. ... (add more terms here)`;
  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={22} color={colors.text} />
        <Text style={[styles.backText, { color: colors.text }]}>Back</Text>
      </TouchableOpacity>
      <Text style={[styles.title, { color: colors.text }]}>Terms & Conditions</Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <ScrollView style={{ maxHeight: 350 }} showsVerticalScrollIndicator={true}>
          <Text style={[styles.terms, { color: colors.text }]}>{terms}</Text>
        </ScrollView>
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
  terms: { fontSize: 14, lineHeight: 22 },
});
export default TermsConditions; 