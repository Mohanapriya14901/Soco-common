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
import { loginUser } from "../api";

export default function Screen6() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Enter all fields");
      return;
    }
    try {
      const res = await loginUser({ email, password });
      Alert.alert("Success", res.data.message || "Login successful");
      navigation.navigate("Screen7"); // Go to dashboard/home
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Login failed");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/bgimage.jpg")}
        style={styles.background}
      >
        <Text style={styles.logoText}>SoCo</Text>
        <View style={styles.box}>
          <Text style={styles.title}>Sign In</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Screen9")}
          >
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  background: { flex: 1, justifyContent: "flex-end" },
  logoText: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  box: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 30,
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  input: {
    backgroundColor: "#9AD8DF",
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#0E2239",
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  link: { color: "blue", marginTop: 10 },
});
