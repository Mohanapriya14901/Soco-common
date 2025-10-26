import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Screen1 from "../screens/Screen1";
import Screen2 from "../screens/Screen2";
import Screen3 from "../screens/Screen3";
import Screen4 from "../screens/Screen4";
import Screen6 from "../screens/Screen6";
import Screen7 from "../screens/Screen7";
import Screen8 from "../screens/Screen8";
import Screen9 from "../screens/Screen9";
import Screen10 from "../screens/Screen10";
import Screen11 from "../screens/Screen11";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Screen1"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
        <Stack.Screen name="Screen3" component={Screen3} />
        <Stack.Screen name="Screen4" component={Screen4} />
        <Stack.Screen name="Screen6" component={Screen6} />
        <Stack.Screen name="Screen7" component={Screen7} />
        <Stack.Screen name="Screen8" component={Screen8} />
        <Stack.Screen name="Screen9" component={Screen9} />
        <Stack.Screen name="Screen10" component={Screen10} />
        <Stack.Screen name="Screen11" component={Screen11} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
