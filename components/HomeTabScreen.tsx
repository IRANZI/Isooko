import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from '../constants/Colors';
import { Spacing } from "../constants/Spacing";
import { useTheme } from './ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const HomeTabScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Today");
  const { theme, toggleTheme } = useTheme();
  const colors = Colors[theme];

  const getChartData = () => {
    switch (activeTab) {
      case "Today":
        return {
          labels: ["1am", "5am", "9am", "1pm", "5pm", "9pm"],
          datasets: [{ data: [3, 8, 12, 7, 10, 4] }],
        };
      case "Weekly":
        return {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          datasets: [{ data: [10, 15, 20, 30, 38, 45] }],
        };
      case "Monthly":
        return {
          labels: ["W1", "W2", "W3", "W4"],
          datasets: [{ data: [80, 120, 90, 100] }],
        };
      default:
        return { labels: [], datasets: [{ data: [] }] };
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: colors.text }]}>Hello, Gwiza</Text>
          <TouchableOpacity onPress={toggleTheme}>
            <Icon
              name={theme === 'dark' ? 'weather-night' : 'weather-sunny'}
              size={24}
              color={theme === 'dark' ? colors.primary : colors.text}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchBox, { backgroundColor: colors.backgroundSecondary }]}>
          <Icon name="magnify" size={20} color={colors.textTertiary} />
          <TextInput placeholder="Search" placeholderTextColor={colors.textTertiary} style={[styles.searchInput, { color: colors.text }]} />
        </View>

        {/* Water Quality Cards */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>My water's Quality</Text>
        <View style={styles.qualityGrid}>
          <QualityCard label="PH level of water" value="80%" icon="flask" colors={colors} />
          <QualityCard label="Temperature" value="80 C" icon="thermometer" colors={colors} />
          <QualityCard label="Turbidity of water" value="Clear" icon="blur" colors={colors} />
          <QualityCard label="Conductivity" value="80 C" icon="flash" colors={colors} />
        </View>

        {/* Overview Section */}
        <View style={styles.overviewHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Overview</Text>
          <View style={[
            styles.timeToggle,
            { backgroundColor: theme === 'dark' ? colors.backgroundSecondary : '#eee' }
          ]}>
            {['Today', 'Weekly', 'Monthly'].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.toggleBtn,
                  activeTab === tab && { backgroundColor: theme === 'dark' ? colors.card : '#fff' },
                ]}
              >
                <Text
                  style={[
                    styles.toggleText,
                    { color: activeTab === tab ? (theme === 'dark' ? colors.primary : '#1E88E5') : colors.textTertiary },
                    activeTab === tab && styles.toggleTextActive,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Line Chart (was Bar Chart) */}
        <LineChart
          data={getChartData()}
          width={SCREEN_WIDTH + 40}
          height={220}
          fromZero
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: theme === 'dark' ? 'transparent' : '#fff',
            backgroundGradientFrom: theme === 'dark' ? 'transparent' : '#fff',
            backgroundGradientTo: theme === 'dark' ? 'transparent' : '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => theme === 'dark' ? colors.primary : '#1E88E5',
            labelColor: (opacity = 1) => colors.text,
            propsForBackgroundLines: {
              stroke: colors.border,
            },
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: theme === 'dark' ? colors.primary : '#1E88E5',
              fill: theme === 'dark' ? colors.primary : '#1E88E5',
            },
          }}
          bezier
          style={{
            ...styles.chart,
            backgroundColor: theme === 'dark' ? colors.card : '#fff',
            ...(theme === 'dark' ? { shadowColor: 'transparent', elevation: 0 } : {}),
          }}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

const QualityCard = ({ label, value, icon, colors }: any) => (
  <View style={[styles.card, { backgroundColor: colors.card }]}>
    <Icon name={icon} size={24} color={colors.primary} />
    <Text style={[styles.cardLabel, { color: colors.text }]}>{label}</Text>
    <Text style={[styles.cardValue, { color: colors.primary }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  header: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: SCREEN_WIDTH < 350 ? 16 : 18,
    fontWeight: "bold",
  },
  searchBox: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    margin: Spacing.lg,
    borderRadius: 10,
    padding: SCREEN_WIDTH < 350 ? 6 : 10,
    alignItems: "center",
  },
  searchInput: {
    marginLeft: 8,
    fontSize: SCREEN_WIDTH < 350 ? 12 : 14,
    flex: 1,
  },
  sectionTitle: {
    fontSize: SCREEN_WIDTH < 350 ? 13 : 15,
    fontWeight: "bold",
    marginHorizontal: Spacing.lg,
    marginVertical: 8,
  },
  qualityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
  },
  card: {
    backgroundColor: "#f9f9f9",
    width: "47%",
    borderRadius: 10,
    padding: SCREEN_WIDTH < 350 ? 10 : 13,
    marginBottom: 10,
    justifyContent: "center",
  },
  cardLabel: {
    fontSize: SCREEN_WIDTH < 350 ? 11 : 13,
    marginVertical: 3,
  },
  cardValue: {
    fontSize: SCREEN_WIDTH < 350 ? 12 : 14,
    fontWeight: "bold",
    color: "#1E90FF",
  },
  overviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: Spacing.lg,
    marginTop: 12,
  },
  timeToggle: {
    flexDirection: "row",
    borderRadius: 20,
  },
  toggleBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  toggleText: {
    fontSize: SCREEN_WIDTH < 350 ? 10 : 12,
  },
  toggleTextActive: {
    fontWeight: "bold",
  },
  toggleActive: {},
  chart: {
    marginVertical: 12,
    borderRadius: 12,
    alignSelf: "center",
  },
});

export default HomeTabScreen;
