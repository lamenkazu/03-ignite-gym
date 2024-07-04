import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "./config";

export const saveAuthToken = async (token: string) => {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
};

export const getAuthToken = async () => {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

  if (token) {
    return token;
  }
};

export const removeAuthToken = async () => {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
};
