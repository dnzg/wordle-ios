import { StatusBar } from "expo-status-bar";
import {
  Share,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import React, { useState, useEffect, SetStateAction } from "react";
import { Grid } from "./components/grid/Grid";
import { Keyboard } from "./components/keyboard/Keyboard";
import { isWordInWordList, isWinningWord, getNewWord } from "./lib/words";
import tw from "tailwind-react-native-classnames";
import { Button } from "./components/Button";
import { getGuessStatuses } from "./lib/statuses";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AdMobBanner, setTestDeviceIDAsync } from "expo-ads-admob";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firedb } from "./fb";
import { ref, onValue } from "firebase/database";
import { CompletedRow } from "./components/grid/CompletedRow";

function GameScreen({ navigation }: Props) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [clipvar, setClipvar] = useState("");
  const [isWordNotFound, setIsWordNotFoundAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [winningWord, setWinword] = useState("");

  const restart = async () => {
    setWinword(await getNewWord());
    setGuesses([]);
    setIsGameWon(false);
    setIsGameLost(false);
    setCurrentGuess("");
    setClipvar("");
  };

  useEffect(() => {
    restart();
  }, []);

  useEffect(() => {
    console.log("Слово катки: ", winningWord);
  }, [winningWord]);

  const onChar = (value: string) => {
    if (currentGuess.length < 5 && guesses.length < 6) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  useEffect(() => {
    if (currentGuess.length === 5) {
      onEnter();
    }
  }, [currentGuess]);

  useEffect(() => {}, [isGameWon]);

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const setAlert = (text: SetStateAction<string>) => {
    setAlertText(text);
    setIsWordNotFoundAlertOpen(true);
    return setTimeout(() => {
      setIsWordNotFoundAlertOpen(false);
    }, 2000);
  };

  const onEnter = async () => {
    if (!(await isWordInWordList(currentGuess))) {
      return setAlert("Похоже, что этого слова нет в базе :(");
    }

    const isWordWinningWord = isWinningWord(currentGuess, winningWord);

    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");

      if (isWordWinningWord) {
        getEmoji();
        return setIsGameWon(true);
      }

      if (guesses.length === 5) {
        getEmoji();
        setIsGameLost(true);
      }
    }
  };

  const getEmoji = () => {
    let emojis = [];
    guesses.map((guess, i) => {
      const statuses = getGuessStatuses(guess, winningWord);
      emojis.push(statuses);
    });
    emojis.push(getGuessStatuses(currentGuess, winningWord));
    let str: string[] = [];
    emojis.map((emoji, i) => {
      let strs: string[] = [];
      emoji.map((emoj, i) => {
        const color =
          emoj === "absent"
            ? "🟪"
            : emoj === "correct"
            ? "🟩"
            : emoj === "present"
            ? "🟧"
            : "";
        strs.push(color);
      });
      str.push(strs.join(""));
    });
    let strEmoji = str.join("\n");
    setClipvar(strEmoji);
  };

  const onShare = async () => {
    const result = await Share.share({
      message: clipvar + "\n\nСлово " + winningWord + " в вордл.рф",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  };

  const copyToCb = () => {
    onShare();
    Clipboard.setString(clipvar);
    return setAlert("Скопировано!");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" />
      {isWordNotFound && alertText !== "" ? (
        <View style={styles.alert}>
          <Text style={{ color: "white", textAlign: "center" }}>
            {alertText}
          </Text>
        </View>
      ) : (
        <></>
      )}
      {isGameWon ? (
        <View style={styles.youwon}>
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.85)"]}
            end={{ x: 0.5, y: 0.35 }}
            style={styles.background}
          />
          <Text
            style={{
              fontWeight: "700",
              fontSize: 24,
              color: "#fff",
              marginTop: 32,
            }}
          >
            Вы победили!
          </Text>
          <Text
            selectable={true}
            style={{ width: "100%", textAlign: "center", marginTop: 24 }}
          >
            {clipvar}
          </Text>
          <Button
            text="Поделиться"
            onPress={() => copyToCb()}
            style={{
              marginTop: 48,
              backgroundColor: "#2ecc71",
            }}
          />
          <Button
            text="Давайте еще раз"
            onPress={() => restart()}
            style={{
              marginBottom: 48,
            }}
          />
        </View>
      ) : (
        <></>
      )}
      {isGameLost ? (
        <View style={styles.youwon}>
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.85)"]}
            end={{ x: 0.5, y: 0.35 }}
            style={styles.background}
          />
          <Text
            style={{
              fontWeight: "700",
              fontSize: 24,
              color: "#fff",
              marginTop: 32,
            }}
          >
            Не получилось :(
          </Text>
          <Text
            style={{
              color: "#fff",
              marginTop: 8,
            }}
          >
            Загаданное слово: {winningWord}
          </Text>
          <Text
            selectable={true}
            style={{ width: "100%", textAlign: "center", marginTop: 24 }}
          >
            {clipvar}
          </Text>
          <Button
            text="Поделиться"
            onPress={() => copyToCb()}
            style={{
              marginTop: 48,
              backgroundColor: "#2ecc71",
            }}
          />
          <Button
            text="Попробовать еще раз"
            onPress={() => restart()}
            style={{
              marginBottom: 48,
            }}
          />
        </View>
      ) : (
        <></>
      )}
      <View style={tw`w-full h-full pb-7 flex flex-col`}>
        <Grid
          guesses={guesses}
          currentGuess={currentGuess}
          winningWord={winningWord}
        />
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          guesses={guesses}
          winningWord={winningWord}
          manual={() => navigation.navigate("Home")}
        />
      </View>
    </View>
  );
}

type RootStackParamList = {
  Home: undefined;
  Game: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList, "Game">;

function HomeScreen({ navigation }: Props) {
  // React.useEffect(() => {
  //   setTestDeviceIDAsync("EMULATOR");
  // }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Вордл по-русски</Text>
      <Text>
        Вам необходимо угадать слово за 6 попыток.{"\n"}Каждое слово должно быть
        длиной ровно 5 символов.{"\n"}После каждой попытки, цвета ячеек
        подскажут вам, верно ли угадана буква.
      </Text>
      <Text>Примеры</Text>
      <View style={{ width: "100%", height: 75 }}>
        <CompletedRow guess="варяг" winningWord="вушку" />
      </View>

      <Text>Буква В угадана и находится на правильном месте.</Text>
      <View style={{ width: "100%", height: 75 }}>
        <CompletedRow guess="шапки" winningWord="ворча" />
      </View>
      <Text>Буква А угадана, но находится не на своем месте.</Text>
      <View style={{ width: "100%", height: 75 }}>
        <CompletedRow guess="харчо" winningWord="ббббб" />
      </View>
      <Text>Никакая буква не угадана.</Text>
      <Button text="Начать игру" onPress={() => navigation.navigate("Game")} />
      {/* <View style={{ backgroundColor: "red" }}>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-7565791511836797/4330076379" // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={(e) => console.log(e)}
        />
      </View> */}
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
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
    // const db = firedb.ref("words");
    // db.on("value", (snapshot: { val: () => any }) => {
    //   const words = snapshot.val();
    //   console.log(words);
    //   storeData(words);
    // });
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5026bd",
  },

  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: "100%",
  },

  youwon: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    bottom: 0,
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0)",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  alert: {
    position: "absolute",
    alignSelf: "center",
    display: "flex",
    backgroundColor: "rgba(80, 38, 189,0.85)",
    flex: 1,
    marginTop: 60,
    width: "90%",
    padding: 12,
    borderRadius: 4,
    zIndex: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
