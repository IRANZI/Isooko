

import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const NotFound = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404 - Page Not Found</Text>
      <Text style={styles.message}>
        The page you are looking for does not exist.
      </Text>
      <Button
        title="Go to Homepage"
        onPress={() => navigation.navigate("Homepage")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default NotFound;
