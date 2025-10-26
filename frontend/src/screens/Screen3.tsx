// src/screens/Screen3.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { verifyOtp } from "../api";  // ✅ Import API

export default function Screen3() {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {}; // get email passed from Screen2

  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      Alert.alert("Error", "Please enter complete OTP");
      return;
    }
    try {
      const res = await verifyOtp({ email, otp: otpCode });
      Alert.alert("Success", res.data.message || "OTP verified successfully");
      navigation.navigate("Screen4", { email }); // go to set password
    } catch (err: any) {
      console.log("Verify error:", err.response?.data || err.message);
      Alert.alert("Error", err.response?.data?.message || "Invalid OTP");
    }
  };

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/bgimage.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <Text style={styles.logoText}>SoCo</Text>

        <View style={styles.signupBox}>
          <Text style={styles.signupTitle}>Verify your Email</Text>
          <Text style={styles.subtitle}>Secure your account !!</Text>

          <Text style={styles.otpInstruction}>
            Enter the 4 Digit OTP sent to {email}
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpBox}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>VERIFY</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#000" },
  background: { flex: 1, justifyContent: "flex-end" },
  logoText: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  signupBox: {
    height: 430,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 30,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  signupTitle: { fontSize: 28, fontWeight: "bold", color: "#000" },
  subtitle: { fontSize: 16, color: "#000", textAlign: "center", marginTop: 8 },
  otpInstruction: { fontSize: 16, color: "#000", textAlign: "center" },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#9AD8DF",
    textAlign: "center",
    fontSize: 20,
    color: "#000",
  },
  button: {
    backgroundColor: "#0E2239",
    paddingVertical: 18,
    paddingHorizontal: 75,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16, letterSpacing: 1 },
});
