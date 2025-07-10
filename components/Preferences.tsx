import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Switch, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from './ThemeContext';

const LANGUAGES = ['Kinyarwanda', 'English', 'French'];
const UNITS = ['Metric', 'Imperial'];

const Preferences = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [notifications, setNotifications] = React.useState(true);
  const [privacy, setPrivacy] = React.useState(false);
  const [language, setLanguage] = React.useState(LANGUAGES[0]);
  const [units, setUnits] = React.useState(UNITS[0]);
  const [showLang, setShowLang] = React.useState(false);
  const [showUnits, setShowUnits] = React.useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true, easing: Easing.out(Easing.exp) }).start();
  }, []);

  const colors = theme === 'light' ? { bg: '#fff', text: '#222', card: '#f5f5f5', border: '#eee', primary: '#0D4D95' } : { bg: '#181A20', text: '#fff', card: '#23262F', border: '#333', primary: '#4F8EF7' };

  const restoreDefaults = () => {
    setNotifications(true);
    setPrivacy(false);
    setLanguage(LANGUAGES[0]);
    setUnits(UNITS[0]);
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor: colors.bg, opacity: fadeAnim }]}> 
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={22} color={colors.text} />
        <Text style={[styles.backText, { color: colors.text }]}>Back</Text>
      </TouchableOpacity>
      <Text style={[styles.title, { color: colors.text }]}>Preferences</Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <View style={styles.row}>
          <View>
            <Text style={[styles.label, { color: colors.text }]}>Notifications</Text>
            <Text style={styles.desc}>Receive important updates and alerts.</Text>
          </View>
          <Switch value={notifications} onValueChange={setNotifications} thumbColor={notifications ? colors.primary : '#ccc'} />
        </View>
        <View style={styles.row}>
          <View>
            <Text style={[styles.label, { color: colors.text }]}>Language</Text>
            <Text style={styles.desc}>Choose your preferred language.</Text>
          </View>
          <TouchableOpacity onPress={() => setShowLang(!showLang)} style={styles.dropdownBtn}>
            <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{language}</Text>
            <Icon name={showLang ? 'expand-less' : 'expand-more'} size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
        {showLang && (
          <View style={[styles.dropdownList, { backgroundColor: theme === 'dark' ? '#23262F' : '#f9f9f9', borderColor: colors.border }]}> 
            {LANGUAGES.map(l => (
              <TouchableOpacity key={l} onPress={() => { setLanguage(l); setShowLang(false); }} style={styles.dropdownItem}>
                <Text style={{ color: colors.text }}>{l}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={styles.row}>
          <View>
            <Text style={[styles.label, { color: colors.text }]}>Units</Text>
            <Text style={styles.desc}>Display measurements in metric or imperial.</Text>
          </View>
          <TouchableOpacity onPress={() => setShowUnits(!showUnits)} style={styles.dropdownBtn}>
            <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{units}</Text>
            <Icon name={showUnits ? 'expand-less' : 'expand-more'} size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
        {showUnits && (
          <View style={[styles.dropdownList, { backgroundColor: theme === 'dark' ? '#23262F' : '#f9f9f9', borderColor: colors.border }]}> 
            {UNITS.map(u => (
              <TouchableOpacity key={u} onPress={() => { setUnits(u); setShowUnits(false); }} style={styles.dropdownItem}>
                <Text style={{ color: colors.text }}>{u}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={styles.row}>
          <View>
            <Text style={[styles.label, { color: colors.text }]}>Private Account</Text>
            <Text style={styles.desc}>Hide your profile from public search.</Text>
          </View>
          <Switch value={privacy} onValueChange={setPrivacy} thumbColor={privacy ? colors.primary : '#ccc'} />
        </View>
        <TouchableOpacity style={[styles.restoreBtn, { backgroundColor: colors.primary }]} onPress={restoreDefaults}>
          <Icon name="restore" size={18} color="#fff" />
          <Text style={styles.restoreText}>Restore Defaults</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60 },
  backButton: { position: 'absolute', top: 40, left: 20, flexDirection: 'row', alignItems: 'center' },
  backText: { marginLeft: 4, fontSize: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24 },
  card: { width: '90%', borderRadius: 16, padding: 22, borderWidth: 1, marginTop: 10, elevation: 3 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 14 },
  label: { fontSize: 15, fontWeight: 'bold' },
  desc: { fontSize: 12, color: '#888', marginTop: 2, maxWidth: 180 },
  dropdownBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#f0f0f0' },
  dropdownList: { width: '100%', backgroundColor: '#f9f9f9', borderRadius: 8, marginTop: 4, marginBottom: 8, borderWidth: 1, borderColor: '#eee', overflow: 'hidden' },
  dropdownItem: { padding: 10 },
  restoreBtn: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 18, paddingVertical: 8, paddingHorizontal: 20, borderRadius: 8 },
  restoreText: { color: '#fff', marginLeft: 8, fontWeight: 'bold', fontSize: 15 },
});
export default Preferences; 