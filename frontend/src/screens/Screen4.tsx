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
import { setPassword } from "../api";

export default function Screen4() {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {};
  const [password, setPwd] = useState("");
  const [confirmPassword, setConfirmPwd] = useState("");

  const handleSetPassword = async () => {
    if (!password || password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    try {
      const res = await setPassword({ email, password });
      Alert.alert("Success", res.data.message || "Password set successfully");
      navigation.navigate("Screen6"); // go to login
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Failed to set password");
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
          <Text style={styles.signupTitle}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPwd}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPwd}
          />
          <TouchableOpacity style={styles.button} onPress={handleSetPassword}>
            <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
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
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 30,
    alignItems: "center",
  },
  signupTitle: { fontSize: 28, fontWeight: "bold", color: "#000" },
  input: {
    width: "100%",
    backgroundColor: "#9AD8DF",
    padding: 14,
    borderRadius: 10,
    fontSize: 18,
    color: "#000",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#0E2239",
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
