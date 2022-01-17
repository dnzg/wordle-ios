import { Text, View } from "react-native";
import { CompletedRow } from "./components/grid/CompletedRow";
import { Button } from "./components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Ad from "./components/Ad";
import AppMetrica from "react-native-appmetrica";

type RootStackParamList = {
  Home: undefined;
  Game: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Game">;

export default function HomeScreen({ navigation }: Props) {
  // React.useEffect(() => {
  //   setTestDeviceIDAsync("EMULATOR");
  // }, []);

  const start = () => {
    AppMetrica.reportEvent("Start");
    navigation.navigate("Game");
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <StatusBar backgroundColor="white" />
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          width: "95%",
          marginBottom: 8,
          marginTop: 85,
        }}
      >
        Вордл по-русски
      </Text>
      <Text style={{ fontSize: 14, width: "95%", lineHeight: 16 }}>
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
        }}
      >
        Примеры
      </Text>
      <Text style={{ fontSize: 14, width: "95%", marginBottom: 8 }}>
        Буква В угадана и находится на правильном месте:
      </Text>
      <View style={{ width: "100%", height: 75 }}>
        <CompletedRow guess="ВАРЯГ" winningWord="ВУШКУ" />
      </View>

      <Text
        style={{ fontSize: 14, width: "95%", marginTop: 24, marginBottom: 8 }}
      >
        Буква А угадана, но находится не на своем месте:
      </Text>
      <View style={{ width: "100%", height: 75 }}>
        <CompletedRow guess="ШАПКИ" winningWord="ВОРЧА" />
      </View>

      <Text
        style={{ fontSize: 14, width: "95%", marginTop: 24, marginBottom: 8 }}
      >
        Никакая буква не угадана:
      </Text>
      <View style={{ width: "100%", height: 75 }}>
        <CompletedRow guess="ХАРЧО" winningWord="БББББ" />
      </View>
      <Button text="Начать игру" onPress={() => start()} />
      <Ad />
    </View>
  );
}
