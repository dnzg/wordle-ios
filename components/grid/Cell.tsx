import { CharStatus } from "../../lib/statuses";
// import classnames from "classnames";
import { Text, View } from "react-native";

type Props = {
  value?: string;
  status?: CharStatus;
};

export const Cell = ({ value, status }: Props) => {
  return (
    <>
      <View
        style={{
          // height: "100%",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderColor: "grey",
          borderRadius: 4,
          marginLeft: 5,
          marginRight: 5,
          marginBottom: 4,
          backgroundColor: !status
            ? "#EBEBEB"
            : status === "absent"
            ? "#4E24B8"
            : status === "correct"
            ? "#2ecc71"
            : status === "present"
            ? "#FFC75D"
            : "",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "700",
            color: !status ? "black" : "white",
          }}
        >
          {value}
        </Text>
      </View>
    </>
  );
};
