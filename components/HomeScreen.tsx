import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  Homepage: undefined;
  Intro: undefined;
};

interface HomepageProps {
  navigation: StackNavigationProp<RootStackParamList, "Homepage">;
  route: RouteProp<RootStackParamList, "Homepage">;
}

const Homepage: React.FC<HomepageProps> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Intro");
    }, 8000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
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
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});

export default Homepage;
