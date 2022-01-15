import { StyleProp, Text, TextStyle, TouchableOpacity } from "react-native";

type Props = {
  text?: string;
  onPress?: () => void;
  style?: object;
};
export const Button = ({ text, onPress, style }: Props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#5026bd",
        paddingLeft: 48,
        paddingRight: 48,
        paddingTop: 20,
        paddingBottom: 20,
        margin: 12,
        borderRadius: 8,
        width: "90%",
        ...style,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          fontSize: 18,
          fontWeight: "700",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
