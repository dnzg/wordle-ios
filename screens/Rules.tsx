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

export default function RulesScreen({ navigation }: Props) {
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
      </ScrollView>
      <Button text="Начать игру" onPress={() => start()} />
      <Ad />
    </View>
  );
}
