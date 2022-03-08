import { Cell } from "./Cell";
import { Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";

type Props = {
  guess: string;
  colorScheme: string;
};

export const CurrentRow = ({ guess, colorScheme }: Props) => {
  const splitGuess = guess.split("");
  const emptyCells = Array.from(Array(5 - splitGuess.length));

  return (
    <View
      style={tw.style(`flex flex-row justify-center mb-1 w-full`, {
        flexGrow: 1,
      })}
    >
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} colorScheme={colorScheme} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} colorScheme={colorScheme} />
      ))}
    </View>
  );
};
