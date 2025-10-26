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
import { useNavigation } from "@react-navigation/native";
import { forgotPassword } from "../api";

export default function Screen9() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const handleForgot = async () => {
    if (!email) return Alert.alert("Error", "Enter email");
    try {
      const res = await forgotPassword({ email });
      Alert.alert("OTP Sent", res.data.message || "Check your email");
      navigation.navigate("Screen10", { email });
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/bgimage.jpg")}
        style={styles.background}
      >
        <View style={styles.box}>
          <Text style={styles.title}>Forgot Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.button} onPress={handleForgot}>
            <Text style={styles.buttonText}>SEND OTP</Text>
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
