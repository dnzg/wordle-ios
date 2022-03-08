import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";
import { ScrollView, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import Svg, { Path } from "react-native-svg";

type Props = {
  guesses: string[];
  currentGuess: string;
  winningWord: string;
  colorScheme: string;
};

export const Grid = ({
  guesses,
  currentGuess,
  winningWord,
  colorScheme,
}: Props) => {
  const empties =
    guesses.length < 5 ? Array.from(Array(5 - guesses.length)) : [];
  const height = 24;

  return (
    <View
      style={tw.style(`pb-6 pt-20 pl-8 pr-8 rounded-b-3xl w-full`, {
        minHeight: "59%",
        maxHeight: "59%",
        backgroundColor: colorScheme === "dark" ? "#000" : "white",
      })}
    >
      {/* <View style={{ display: "flex", flexDirection: "row", marginBottom: 16 }}>
        <Svg width={0.85 * height} height={height} viewBox="0 0 224 256">
          <Path
            d="M124.42 255.283C175.773 249.531 216.929 208.479 222.786 157.126C230.474 89.9792 178.284 32.821 112.863 32.0888V1.96704C112.863 0.293611 110.771 -0.595401 109.359 0.450495L47.3375 45.9993C46.2916 46.7837 46.2916 48.3002 47.3375 49.0847L109.359 94.6334C110.771 95.6793 112.863 94.738 112.863 93.1169V63.0474C158.83 63.7795 195.645 102.896 192.508 149.648C189.841 189.862 157.052 222.494 116.837 225.057C74.217 227.776 37.9767 197.34 31.4921 157.073C30.2894 149.595 23.7525 144.157 16.2221 144.157C6.86129 144.157 -0.459979 152.471 1.00427 161.728C10.1036 219.095 63.0782 262.134 124.42 255.283Z"
            fill="black"
          />
        </Svg>
      </View> */}
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          guess={guess}
          winningWord={winningWord}
          colorScheme={colorScheme}
        />
      ))}
      {guesses.length < 6 && (
        <CurrentRow guess={currentGuess} colorScheme={colorScheme} />
      )}
      {empties.map((_, i) => (
        <EmptyRow key={i} colorScheme={colorScheme} />
      ))}
    </View>
  );
};
