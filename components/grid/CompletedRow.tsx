import { getGuessStatuses } from "../../lib/statuses";
import { Cell } from "./Cell";
import { Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";

type Props = {
  guess: string;
  winningWord: string;
};

export const CompletedRow = ({ guess, winningWord }: Props) => {
  const statuses = getGuessStatuses(guess, winningWord);
  // console.log(statuses);
  return (
    <View
      style={tw.style(`flex flex-row justify-center mb-1 w-full`, {
        flexGrow: 1,
      })}
    >
      {guess.split("").map((letter, i) => (
        <Cell key={i} value={letter} status={statuses[i]} />
      ))}
    </View>
  );
};
