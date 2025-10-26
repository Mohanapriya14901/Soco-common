//screen1
 import React from 'react';
  import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    SafeAreaView,
  } from 'react-native';
  import { useNavigation } from '@react-navigation/native';

  export default function Screen1() {
    const navigation = useNavigation();

    return (
      <SafeAreaView style={styles.safeArea}>
        <ImageBackground
          source={require('../../assets/bgimage.jpg')}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            {/* SoCo Text */}
            <Text style={styles.title}>SoCo</Text>

            {/* Get Started Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Screen2')}
            >
              <Text style={styles.buttonText}>GET STARTED</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#000',
    },
    background: {
      flex: 1,
      justifyContent: 'space-between',
    },
    overlay: {
      flex: 1,
      justifyContent: 'space-between',
      paddingTop: 30,
      paddingBottom: 50,
      paddingHorizontal: 20,
    },
    title: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginTop: 30,
    },
    button: {
      backgroundColor: '#fff',
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 40,
    },
    buttonText: {
      color: '#000',
      fontFamily: 'KulimPark-Regular', // Apply custom font here
      fontSize: 20,
      letterSpacing: 1,
    },
  });