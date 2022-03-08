import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function setData(value: any, key: string) {
  try {
    // const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, value);
    return;
  } catch (e) {
    // saving error
    console.error(e);
  }
}

export async function getData(key: string) {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue;
}

export async function removeData(key: string) {
  await AsyncStorage.removeItem(key);
}
