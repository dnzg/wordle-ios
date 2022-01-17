import React, { useState, useEffect, SetStateAction } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firedb } from "./fb";
import { ref, onValue } from "firebase/database";
import HomeScreen from "./Home";
import GameScreen from "./Game";
import AppMetrica from "react-native-appmetrica";

type RootStackParamList = {
  Home: undefined;
  Game: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList, "Game">;

const Stack = createNativeStackNavigator();

export default function App() {
  AppMetrica.activate({
    apiKey: "6bf5fc5b-a5b7-4234-8e5d-2a427f4ee501",
    sessionTimeout: 120,
    firstActivationAsUpdate: true,
  });

  const storeData = async (value: Array<string>) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    const starCountRef = ref(firedb, "words");
    onValue(starCountRef, (snapshot) => {
      const words = snapshot.val();
      storeData(words);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
