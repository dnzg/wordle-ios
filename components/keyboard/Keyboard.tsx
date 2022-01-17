import { KeyValue } from "../../lib/keyboard";
import { getStatuses } from "../../lib/statuses";
import { Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Key } from "./Key";
import Svg, { Path } from "react-native-svg";

type Props = {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  manual: () => void;
  guesses: string[];
  winningWord: string;
};

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  guesses,
  winningWord,
  manual,
}: Props) => {
  const charStatuses = getStatuses(guesses, winningWord);

  const onClick = (value: KeyValue) => {
    if (value === "ENTER") {
      return onEnter();
    }
    if (value === "DELETE") {
      return onDelete();
    }
    if (value === "HOME") {
      return manual();
    }
    return onChar(value);
  };

  const row = `flex flex-row items-center`;

  return (
    <View style={{ marginTop: 20, marginBottom: 0, flexGrow: 0 }}>
      <View style={tw`${row}`}>
        <Key value="Й" onClick={onClick} status={charStatuses["Й"]} />
        <Key value="Ц" onClick={onClick} status={charStatuses["Ц"]} />
        <Key value="У" onClick={onClick} status={charStatuses["У"]} />
        <Key value="К" onClick={onClick} status={charStatuses["К"]} />
        <Key value="Е" onClick={onClick} status={charStatuses["Е"]} />
      </View>
      <View style={tw`${row}`}>
        <Key value="Н" onClick={onClick} status={charStatuses["Н"]} />
        <Key value="Г" onClick={onClick} status={charStatuses["Г"]} />
        <Key value="Ш" onClick={onClick} status={charStatuses["Ш"]} />
        <Key value="Щ" onClick={onClick} status={charStatuses["Щ"]} />
        <Key value="З" onClick={onClick} status={charStatuses["З"]} />
        <Key value="Х" onClick={onClick} status={charStatuses["Х"]} />
      </View>
      <View style={tw`${row}`}>
        <Key value="Ъ" onClick={onClick} status={charStatuses["Ъ"]} />
        <Key value="Ф" onClick={onClick} status={charStatuses["Ф"]} />
        <Key value="Ы" onClick={onClick} status={charStatuses["Ы"]} />
        <Key value="В" onClick={onClick} status={charStatuses["В"]} />
        <Key value="А" onClick={onClick} status={charStatuses["А"]} />
        <Key value="П" onClick={onClick} status={charStatuses["П"]} />
      </View>
      <View style={tw`${row}`}>
        <Key value="Р" onClick={onClick} status={charStatuses["Р"]} />
        <Key value="О" onClick={onClick} status={charStatuses["О"]} />
        <Key value="Л" onClick={onClick} status={charStatuses["Л"]} />
        <Key value="Д" onClick={onClick} status={charStatuses["Д"]} />
        <Key value="Ж" onClick={onClick} status={charStatuses["Ж"]} />
        <Key value="Э" onClick={onClick} status={charStatuses["Э"]} />
      </View>
      <View style={tw`${row}`}>
        {/* <Key width={65.4} value="ENTER" onClick={onClick}>
          Enter
        </Key>] */}
        <Key value="Ё" onClick={onClick} status={charStatuses["Ё"]} />
        <Key value="Я" onClick={onClick} status={charStatuses["Я"]} />
        <Key value="Ч" onClick={onClick} status={charStatuses["Ч"]} />
        <Key value="С" onClick={onClick} status={charStatuses["С"]} />
        <Key value="М" onClick={onClick} status={charStatuses["М"]} />
        <Key value="И" onClick={onClick} status={charStatuses["И"]} />
      </View>
      <View style={tw`${row}`}>
        <Key
          value="HOME"
          onClick={onClick}
          style={{ backgroundColor: "white", marginLeft: 12, marginTop: -2 }}
          styleText={{ color: "#5026bd", fontSize: 22 }}
        >
          ?
        </Key>
        <Key value="Т" onClick={onClick} status={charStatuses["Т"]} />
        <Key value="Ь" onClick={onClick} status={charStatuses["Ь"]} />
        <Key value="Б" onClick={onClick} status={charStatuses["Б"]} />
        <Key value="Ю" onClick={onClick} status={charStatuses["Ю"]} />
        <Key
          width={65.4}
          style={{ marginBottom: -4 }}
          value="DELETE"
          onClick={onClick}
        >
          <Svg width="27" height="21" viewBox="0 0 27 21">
            <Path
              d="M12.7071 5.79289C12.3166 5.40237 11.6834 5.40237 11.2929 5.79289C10.9024 6.18342 10.9024 6.81658 11.2929 7.20711L12.7071 5.79289ZM19.2929 15.2071C19.6834 15.5976 20.3166 15.5976 20.7071 15.2071C21.0976 14.8166 21.0976 14.1834 20.7071 13.7929L19.2929 15.2071ZM20.7071 7.20711C21.0976 6.81658 21.0976 6.18342 20.7071 5.79289C20.3166 5.40237 19.6834 5.40237 19.2929 5.79289L20.7071 7.20711ZM11.2929 13.7929C10.9024 14.1834 10.9024 14.8166 11.2929 15.2071C11.6834 15.5976 12.3166 15.5976 12.7071 15.2071L11.2929 13.7929ZM2.18109 9.17127L1.43368 8.50691L1.43368 8.50691L2.18109 9.17127ZM8.10497 2.50691L7.35756 1.84254L7.35756 1.84254L8.10497 2.50691ZM8.10497 18.4931L7.35756 19.1575L7.35756 19.1575L8.10497 18.4931ZM2.18109 11.8287L1.43368 12.4931L1.43368 12.4931L2.18109 11.8287ZM11.2929 7.20711L19.2929 15.2071L20.7071 13.7929L12.7071 5.79289L11.2929 7.20711ZM19.2929 5.79289L11.2929 13.7929L12.7071 15.2071L20.7071 7.20711L19.2929 5.79289ZM2.9285 9.83564L8.85238 3.17127L7.35756 1.84254L1.43368 8.50691L2.9285 9.83564ZM10.3472 2.5H19.5V0.5H10.3472V2.5ZM24.5 7.5V13.5H26.5V7.5H24.5ZM19.5 18.5H10.3472V20.5H19.5V18.5ZM8.85238 17.8287L2.9285 11.1644L1.43368 12.4931L7.35756 19.1575L8.85238 17.8287ZM10.3472 18.5C9.77592 18.5 9.23192 18.2557 8.85238 17.8287L7.35756 19.1575C8.11663 20.0114 9.20465 20.5 10.3472 20.5V18.5ZM24.5 13.5C24.5 16.2614 22.2614 18.5 19.5 18.5V20.5C23.366 20.5 26.5 17.366 26.5 13.5H24.5ZM19.5 2.5C22.2614 2.5 24.5 4.73858 24.5 7.5H26.5C26.5 3.63401 23.366 0.5 19.5 0.5V2.5ZM8.85238 3.17127C9.23192 2.7443 9.77592 2.5 10.3472 2.5V0.5C9.20465 0.5 8.11663 0.988592 7.35756 1.84254L8.85238 3.17127ZM1.43368 8.50691C0.42332 9.64357 0.42332 11.3564 1.43368 12.4931L2.9285 11.1644C2.59171 10.7855 2.59171 10.2145 2.9285 9.83564L1.43368 8.50691Z"
              fill="white"
            />
          </Svg>
        </Key>
      </View>
    </View>
  );
};
