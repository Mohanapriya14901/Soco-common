// src/screens/Screen2.tsx
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
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../api";  // ✅ Import API

export default function Screen2() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    if (!name || !email) {
      Alert.alert("Error", "Please enter both name and email");
      return;
    }
    try {
      const res = await registerUser({ name, email });
      Alert.alert("Success", res.data.message || "OTP sent to your email");
      navigation.navigate("Screen3", { email }); // pass email to OTP screen
    } catch (err: any) {
      console.log("Register error:", err.response?.data || err.message);
      Alert.alert("Error", err.response?.data?.message || "Something went wrong");
    }
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
          <Text style={styles.signupTitle}>Sign Up</Text>
          <Text style={styles.subtitle}>Welcome to SoCo - Your Soul Companion</Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#000"
            value={name}
            onChangeText={setName}
          />

          <View style={{ height: 15 }} />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#000"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>GET STARTED</Text>
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
  input: {
    width: "100%",
    backgroundColor: "#9AD8DF",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 18,
    color: "#000",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#0E2239",
    paddingVertical: 18,
    paddingHorizontal: 75,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16, letterSpacing: 1 },
});
