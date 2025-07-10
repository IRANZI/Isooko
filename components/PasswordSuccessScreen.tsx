import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/type";
type PasswordSuccessScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PasswordSuccess"
>;

type PasswordSuccessScreenRouteProp = RouteProp<
  RootStackParamList,
  "PasswordSuccess"
>;

interface PasswordSuccessScreenProps {
  navigation: PasswordSuccessScreenNavigationProp;
  route: PasswordSuccessScreenRouteProp;
}

const PasswordSuccessScreen: React.FC<PasswordSuccessScreenProps> = ({
  navigation,
}) => {
  const handleGoToHomepage = () => {
    navigation.navigate("Home");
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-left" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.overlay} />

      <View style={styles.card}>
        <View style={styles.checkmarkContainer}>
          <Icon name="check-circle" size={60} color="#1E3A8A" />
        </View>

        <Text style={styles.title}>You're all Set!</Text>
        <Text style={styles.subtitle}>
          Your Password has been successfully updated
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleGoToHomepage}>
          <Text style={styles.buttonText}>Go to Homepage</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent gray overlay
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  checkmarkContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default PasswordSuccessScreen;
