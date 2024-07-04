import { UserDTO } from "@/dtos/UserDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "./config";

export const saveUser = async (user: UserDTO) => {
  try {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
  } catch (error) {
    throw error;
  }
};

export const getUser = async () => {
  try {
    const storedUser = await AsyncStorage.getItem(USER_STORAGE);

    const user: UserDTO = storedUser ? JSON.parse(storedUser) : {};

    return user;
  } catch (error) {
    throw error;
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_STORAGE);
  } catch (error) {
    throw error;
  }
};
