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
import { resetPassword } from "../api";

export default function Screen11() {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {};
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async () => {
    if (!password || password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    try {
      const res = await resetPassword({ email, password });
      Alert.alert("Success", res.data.message || "Password reset");
      navigation.navigate("Screen6"); // back to login
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Failed to reset");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/bgimage.jpg")}
        style={styles.background}
      >
        <View style={styles.box}>
          <Text style={styles.title}>Reset Password</Text>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonText}>RESET</Text>
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
