import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width - 40;

const HomeTabScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Today");

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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, Gwiza</Text>
          <TouchableOpacity>
            <Icon name="weather-sunny" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Icon name="magnify" size={20} color="#aaa" />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>

        {/* Water Quality Cards */}
        <Text style={styles.sectionTitle}>My water’s Quality</Text>
        <View style={styles.qualityGrid}>
          <QualityCard label="PH level of water" value="80%" icon="flask" />
          <QualityCard label="Temperature" value="80 C" icon="thermometer" />
          <QualityCard label="Turbidity of water" value="Clear" icon="blur" />
          <QualityCard label="Conductivity" value="80 C" icon="flash" />
        </View>

        {/* Overview Section */}
        <View style={styles.overviewHeader}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.timeToggle}>
            {["Today", "Weekly", "Monthly"].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.toggleBtn,
                  activeTab === tab && styles.toggleActive,
                ]}
              >
                <Text
                  style={[
                    styles.toggleText,
                    activeTab === tab && styles.toggleTextActive,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bar Chart */}
       <BarChart
  data={getChartData()}
  width={screenWidth}
  height={220}
  fromZero
  showValuesOnTopOfBars
  yAxisLabel=""
  yAxisSuffix=""  // ✅ Add this line to resolve the TypeScript error
  chartConfig={{
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(31, 90, 243, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForBackgroundLines: {
      stroke: "#e3e3e3",
    },
  }}
  style={styles.chart}
/>

      </ScrollView>
    </SafeAreaView>
  );
};

const QualityCard = ({ label, value, icon }: any) => (
  <View style={styles.card}>
    <Icon name={icon} size={24} color="#1E90FF" />
    <Text style={styles.cardLabel}>{label}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
  },
  searchBox: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    margin: 20,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  qualityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#f9f9f9",
    width: "47%",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    justifyContent: "center",
  },
  cardLabel: {
    fontSize: 14,
    marginVertical: 5,
    color: "#333",
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E90FF",
  },
  overviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  timeToggle: {
    flexDirection: "row",
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  toggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  toggleText: {
    fontSize: 12,
    color: "#555",
  },
  toggleTextActive: {
    color: "#000",
    fontWeight: "bold",
  },
  toggleActive: {
    backgroundColor: "#fff",
  },
  chart: {
    marginVertical: 20,
    borderRadius: 16,
    alignSelf: "center",
  },
});

export default HomeTabScreen;
