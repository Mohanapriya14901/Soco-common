import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity,
  ImageBackground, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../api';

export default function Screen7() {
  const navigation = useNavigation();
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const handleSendOtp = async () => {
    if (!emailOrPhone) {
      Alert.alert('Error', 'Please enter Email/Phone');
      return;
    }
    try {
      const res = await api.post('/auth/forgot-password', { emailOrPhone });
      if (res.data.success) {
        Alert.alert('OTP Sent', 'Check your inbox');
        navigation.navigate('Screen8', { emailOrPhone });
      }
    } catch (err) {
      Alert.alert('Failed', err.response?.data?.message || err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={require('../../assets/bgimage.jpg')} style={styles.background}>
        <View style={styles.signupBox}>
          <Text style={styles.signupTitle}>Forgot Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Email/Phone"
            placeholderTextColor="#000"
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
          />
          <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
            <Text style={styles.buttonText}>SEND OTP</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  background: { flex: 1, justifyContent: 'flex-end' },
  signupBox: { height: 300, width: '100%', backgroundColor: '#fff', borderTopLeftRadius: 50, borderTopRightRadius: 50, padding: 30, alignItems: 'center' },
  signupTitle: { fontSize: 24, fontWeight: 'bold' },
  input: { width: '100%', backgroundColor: '#9AD8DF', padding: 14, borderRadius: 10, fontSize: 18, marginTop: 15 },
  button: { backgroundColor: '#0E2239', padding: 15, borderRadius: 10, marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
