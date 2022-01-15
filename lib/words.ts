// import { WORDS } from "../constants/wordlist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async (): Promise<string[]> => {
  const jsonValue = await AsyncStorage.getItem("@storage_Key");
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

export const isWordInWordList = async (word: string) => {
  const WORDS = await getData();
  // console.log(WORDS);
  // return false;
  return WORDS.includes(word.toLowerCase());
};

export const isWinningWord = (word: string, winningWord: string) => {
  return winningWord === word;
};

export const getNewWord = async () => {
  const WORDS = await getData();
  console.log(getRandomArbitrary(0, WORDS.length));
  return WORDS[getRandomArbitrary(0, WORDS.length)].toUpperCase();
};

function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export const getWordOfDay = async () => {
  const WORDS = await getData();
  // January 1, 2022 Game Epoch
  const epochMs = 1641013200000;
  const now = Date.now();
  const msInDay = 86400000;
  const index = Math.floor((now - epochMs) / msInDay);

  return WORDS[index].toUpperCase();
};

export const solution = getWordOfDay();
