import { ReactNode } from "react";
// import classnames from "classnames";
import { KeyValue } from "../../lib/keyboard";
import { CharStatus } from "../../lib/statuses";
import { Button, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";

type Props = {
  children?: ReactNode;
  value: KeyValue;
  status?: CharStatus;
  onClick: (value: KeyValue) => void;
  style?: object;
  styleText?: object;
  padding?: number;
};

export const Key = ({
  children,
  status,
  value,
  onClick,
  style,
  styleText,
  padding,
}: Props) => {
  return (
    <TouchableOpacity
      style={{
        width: "10%",
        flexGrow: 1,
        paddingLeft: padding ? padding : 12,
        paddingRight: padding ? padding : 12,
        paddingTop: 9,
        paddingBottom: 9,

        // borderColor: "black",
        // borderWidth: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:
          status === "absent"
            ? "rgba(0,0,0,0.15)"
            : status === "correct"
            ? "rgba(46,204,113, 0.5)"
            : status === "present"
            ? "rgba(255,199,93,0.5)"
            : "rgba(0,0,0,0)",
        borderRadius: 58,
        margin: 3,
        ...style,
      }}
      // className={classes}
      onPress={() => onClick(value)}
    >
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 18,
          fontWeight: "700",
          ...styleText,
        }}
      >
        {children || value}
      </Text>
    </TouchableOpacity>
  );
};
