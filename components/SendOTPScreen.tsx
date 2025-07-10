import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/type";// Adjust the import path

type VerifyIdentityScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SendOTP"
>;

type VerifyIdentityScreenRouteProp = RouteProp<RootStackParamList, "SendOTP">;

interface VerifyIdentityScreenProps {
  navigation: VerifyIdentityScreenNavigationProp;
  route: VerifyIdentityScreenRouteProp;
}

const SendOTPScreen: React.FC<VerifyIdentityScreenProps> = ({ navigation }) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]); // 4 digits OTP
  const [timer, setTimer] = useState<number>(56);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      const timeout = setTimeout(() => {
        navigation.navigate("NewPassword");
      }, 4000); // 4 seconds delay
      return () => clearTimeout(timeout);
    }
  }, [otp, navigation]);

  // Handle OTP input changes and focus management
  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, ""); // Only allow numbers
    setOtp(newOtp);

    // Move focus to the next input if a digit is entered
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    // Move focus back if cleared
    else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleGoBack = () => {
    navigation.navigate("ForgotPassword");
  };
  // Timer effect
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  // Clear OTP
  const handleClear = () => {
    setOtp(["", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Icon
          name="chevron-left"
          size={24}
          color="#000"
          onPress={handleGoBack}
        />
      </TouchableOpacity>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Verify your identity</Text>
        <Text style={styles.subtitle}>
          We've sent an OTP code to your email. Please check your inbox and
          enter the code below.
        </Text>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
  key={index}
  ref={(ref) => {
    inputRefs.current[index] = ref;
  }}
  style={[styles.otpInput, otp[index] && styles.filledInput]}
  value={digit}
  onChangeText={(value) => handleOtpChange(index, value)}
  maxLength={1}
  keyboardType="numeric"
  placeholder=""
  placeholderTextColor="#1E3A8A"
  autoFocus={index === 0}
/>

          ))}
        </View>

        {/* Resend Timer */}
        <Text style={styles.timerText}>
          You can resend in {timer} seconds{" "}
          <Text style={styles.resendLink}>Resend code</Text>
        </Text>
      </View>

      {/* Numeric Keypad */}
      <View style={styles.keypad}>
        {[
          ["1", "2", "3"],
          ["4", "5", "6"],
          ["7", "8", "9"],
          ["*", "0", "X"],
        ].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keyRow}>
            {row.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.key}
                onPress={() => {
                  if (item === "X") {
                    handleClear();
                  } else {
                    const emptyIndex = otp.findIndex((d) => !d);
                    if (emptyIndex !== -1) handleOtpChange(emptyIndex, item);
                  }
                }}
              >
                <Text style={styles.keyText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 5,
    color: "#000",
  },
  filledInput: {
    borderColor: "#1E3A8A",
    backgroundColor: "#E6E6FA",
  },
  timerText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  resendLink: {
    color: "#1E3A8A",
    fontWeight: "bold",
    cursor: "pointer",
  },
  keypad: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  keyRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  key: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 35,
    backgroundColor: "#F0F0F0",
  },
  keyText: {
    fontSize: 24,
    color: "#000",
  },
});

export default SendOTPScreen;
