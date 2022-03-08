import React, { useState, useEffect, SetStateAction } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firedb } from "./lib/fb";
import { ref, onValue } from "firebase/database";
import HomeScreen from "./screens/Home";
import GameScreen from "./screens/Game";
import RulesScreen from "./screens/Rules";
import setData, { getData, removeData } from "./lib/store";
// import { NativeModules } from "react-native";
// import RNGameCenter from "react-native-game-center";

const Stack = createNativeStackNavigator();

export default function App() {
  const [firstTime, setFirstTime] = useState(true);
  // useEffect(() => {
  //   const isFirstTime = async () => {
  //     console.log(await getData("isFirstTime"));
  //     if (!(await getData("isFirstTime"))) {
  //       setData("1", "isFirstTime");
  //     } else {
  //       setFirstTime(false);
  //     }
  //   };
  //   isFirstTime();
  // }, []);

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
        initialRouteName={firstTime ? "Home" : "Home"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Rules" component={RulesScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
