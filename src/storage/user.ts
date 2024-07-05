import { UserDTO } from "@/dtos/UserDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "./config";

export const saveUser = async (user: UserDTO) => {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
};

export const getUser = async () => {
  const storedUser = await AsyncStorage.getItem(USER_STORAGE);

  const user: UserDTO = storedUser ? JSON.parse(storedUser) : {};

  return user;
};

export const removeUser = async () => {
  await AsyncStorage.removeItem(USER_STORAGE);
};
