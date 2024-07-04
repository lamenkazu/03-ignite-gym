import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "./config";

export const saveAuthToken = async (token: string) => {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
};
