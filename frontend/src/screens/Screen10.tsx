import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { verifyForgotOtp } from "../api";

export default function Screen10() {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {};
  const [otp, setOtp] = useState("");

  const handleVerifyOtp = async () => {
    if (!otp) return Alert.alert("Error", "Enter OTP");
    try {
      const res = await verifyForgotOtp({ email, otp });
      Alert.alert("Verified", res.data.message || "OTP Verified");
      navigation.navigate("Screen11", { email });
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "OTP invalid");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/bgimage.jpg")}
        style={styles.background}
      >
        <View style={styles.box}>
          <Text style={styles.title}>Enter OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="OTP"
            value={otp}
            onChangeText={setOtp}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
            <Text style={styles.buttonText}>VERIFY</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  background: { flex: 1, justifyContent: "flex-end" },
  box: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 30,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    backgroundColor: "#9AD8DF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: { backgroundColor: "#0E2239", padding: 16, borderRadius: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
