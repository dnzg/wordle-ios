import { Cell } from "./Cell";
import { Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";

export const EmptyRow = ({ colorScheme }: { colorScheme: string }) => {
  const emptyCells = Array.from(Array(5));

  return (
    <View
      style={tw.style(`flex flex-row justify-center mb-1 w-full`, {
        flexGrow: 1,
      })}
    >
      {emptyCells.map((_, i) => (
        <Cell key={i} colorScheme={colorScheme} />
      ))}
    </View>
  );
};
