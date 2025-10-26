import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function Screen7() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>🎉 Welcome to SoCo Dashboard!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 22, fontWeight: "bold" },
});
