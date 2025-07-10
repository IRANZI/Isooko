import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from './ThemeContext';

const Feedback = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const colors = theme === 'light' ? { bg: '#fff', text: '#222', card: '#f5f5f5', border: '#eee', primary: '#0D4D95' } : { bg: '#181A20', text: '#fff', card: '#23262F', border: '#333', primary: '#4F8EF7' };
  const [feedback, setFeedback] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const handleSubmit = () => { setSubmitted(true); setFeedback(''); setTimeout(() => setSubmitted(false), 2000); };
  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={22} color={colors.text} />
        <Text style={[styles.backText, { color: colors.text }]}>Back</Text>
      </TouchableOpacity>
      <Text style={[styles.title, { color: colors.text }]}>Feedback</Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <Text style={[styles.label, { color: colors.text }]}>Your Feedback</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
          placeholder="Type your feedback here..."
          placeholderTextColor={theme === 'light' ? '#888' : '#aaa'}
          value={feedback}
          onChangeText={setFeedback}
          multiline
        />
        <TouchableOpacity style={[styles.submitBtn, { backgroundColor: colors.primary }]} onPress={handleSubmit} disabled={!feedback}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
        {submitted && <Text style={{ color: colors.primary, marginTop: 10 }}>Thank you for your feedback!</Text>}
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
  label: { fontSize: 15, marginBottom: 8 },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, minHeight: 80, marginBottom: 14, fontSize: 14 },
  submitBtn: { alignSelf: 'flex-end', paddingVertical: 8, paddingHorizontal: 18, borderRadius: 8 },
  submitText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
export default Feedback; 