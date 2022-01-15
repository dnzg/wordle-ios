import { ReactNode } from "react";
// import classnames from "classnames";
import { KeyValue } from "../../lib/keyboard";
import { CharStatus } from "../../lib/statuses";
import { Button, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";

type Props = {
  children?: ReactNode;
  value: KeyValue;
  width?: number;
  status?: CharStatus;
  onClick: (value: KeyValue) => void;
};

export const Key = ({
  children,
  status,
  width = 40,
  value,
  onClick,
}: Props) => {
  // const classes = classnames(
  //   "flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer",
  //   {
  //     "bg-slate-200 hover:bg-slate-300 active:bg-slate-400": !status,
  //     "bg-slate-400 text-white": status === "absent",
  //     "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white":
  //       status === "correct",
  //     "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white":
  //       status === "present",
  //   }
  // );

  return (
    <TouchableOpacity
      style={{
        height: 51,
        width: "10%",
        flexGrow: 1,
        padding: 12,
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
        }}
      >
        {children || value}
      </Text>
    </TouchableOpacity>
  );
};
