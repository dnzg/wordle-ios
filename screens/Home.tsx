import {
  Text,
  View,
  Appearance,
  useColorScheme,
  ScrollView,
} from "react-native";
import { CompletedRow } from "../components/grid/CompletedRow";
import { Button } from "../components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Ad from "../components/Ad";
// import { AnalyticsPage } from "./lib/ga";

type RootStackParamList = {
  Home: undefined;
  Game: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Game">;

export default function HomeScreen({ navigation }: Props) {
  let colorScheme = useColorScheme();
  // React.useEffect(() => {
  //   setTestDeviceIDAsync("EMULATOR");
  // }, []);
  // console.log(colorScheme);

  const start = () => {
    // AnalyticsPage("Game");
    navigation.navigate("Game");
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: colorScheme === "dark" ? "#000" : "white",
      }}
    >
      <StatusBar backgroundColor="white" />
      <ScrollView style={{ width: "90%" }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            width: "95%",
            marginBottom: 8,
            marginTop: 85,
            color: colorScheme === "dark" ? "white" : "black",
          }}
        >
          Вордл по-русски
        </Text>
        <Text
          style={{
            fontSize: 14,
            width: "95%",
            lineHeight: 16,
            color: colorScheme === "dark" ? "white" : "black",
          }}
        >
          Вам необходимо угадать слово за 6 попыток.{"\n\n"}Каждое слово должно
          быть длиной ровно 5 символов.{"\n\n"}После каждой попытки, цвета ячеек
          подскажут вам, верно ли угадана буква.
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            width: "95%",
            marginTop: 24,
            marginBottom: 8,
            color: colorScheme === "dark" ? "white" : "black",
          }}
        >
          Примеры
        </Text>
        <Text
          style={{
            fontSize: 14,
            width: "95%",
            marginBottom: 8,
            color: colorScheme === "dark" ? "white" : "black",
          }}
        >
          Буква В угадана и находится на правильном месте:
        </Text>
        <View style={{ width: "100%", height: 75 }}>
          <CompletedRow guess="ВАРЯГ" winningWord="ВУШКУ" />
        </View>

        <Text
          style={{
            fontSize: 14,
            width: "95%",
            marginTop: 24,
            marginBottom: 8,
            color: colorScheme === "dark" ? "white" : "black",
          }}
        >
          Буква А угадана, но находится не на своем месте:
        </Text>
        <View style={{ width: "100%", height: 75 }}>
          <CompletedRow guess="ШАПКИ" winningWord="ВОРЧА" />
        </View>

        <Text
          style={{
            fontSize: 14,
            width: "95%",
            marginTop: 24,
            marginBottom: 8,
            color: colorScheme === "dark" ? "white" : "black",
          }}
        >
          Никакая буква не угадана:
        </Text>
        <View style={{ width: "100%", height: 75 }}>
          <CompletedRow guess="ХАРЧО" winningWord="БББББ" />
        </View>
      </ScrollView>
      <Button text="Начать игру" onPress={() => start()} />
      <Ad />
    </View>
  );
}
