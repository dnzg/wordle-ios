import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";
import { ScrollView, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";

type Props = {
  guesses: string[];
  currentGuess: string;
  winningWord: string;
};

export const Grid = ({ guesses, currentGuess, winningWord }: Props) => {
  const empties =
    guesses.length < 5 ? Array.from(Array(5 - guesses.length)) : [];

  return (
    <View
      style={tw.style(`pb-6 pt-20 pl-8 pr-8 bg-white rounded-b-3xl w-full`, {
        minHeight: "55%",
        maxHeight: "55%",
      })}
    >
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} winningWord={winningWord} />
      ))}
      {guesses.length < 6 && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </View>
  );
};
