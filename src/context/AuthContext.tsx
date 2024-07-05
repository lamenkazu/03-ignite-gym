import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "@/lib/axios";

import { UserDTO } from "@/dtos/UserDTO";
import { getUser, removeUser, saveUser } from "@/storage/user";
import {
  getAuthToken,
  removeAuthToken,
  saveAuthToken,
} from "@/storage/authToken";

interface AuthTokenStorageProps {
  userData: UserDTO;
  token: string;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  user: UserDTO;
  isUserStorageDataLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  updateUser: (updatedUser: UserDTO) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isUserStorageDataLoading, setIsUserStorageDataLoading] =
    useState(true);

  const loadUserData = async () => {
    setIsUserStorageDataLoading(true);

    try {
      const userData = await getUser();
      const token = await getAuthToken();

      if (userData && token) {
        userAndTokenUpdate({ userData, token });
      }
    } catch (error) {
      throw error;
    } finally {
      setIsUserStorageDataLoading(false);
    }
  };

  const userAndTokenUpdate = ({ userData, token }: AuthTokenStorageProps) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(userData); // Atualiza estado do usuario para ser usado na aplicação.
  };

  const userAndTokenSave = async ({
    userData,
    token,
  }: AuthTokenStorageProps) => {
    setIsUserStorageDataLoading(true);

    try {
      await saveUser(userData); // Salva o usuário no Async Storage para armazenamento da informação.
      await saveAuthToken(token); // Salva o token do usuário no Async Storage.
    } catch (error) {
      throw error;
    } finally {
      setIsUserStorageDataLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsUserStorageDataLoading(true);

    try {
      const { data } = await api.post("/sessions", { email, password });

      if (data.user && data.token) {
        await userAndTokenSave({
          userData: data.user,
          token: data.token,
        });
        userAndTokenUpdate({
          userData: data.user,
          token: data.token,
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (updatedUser: UserDTO) => {
    try {
      setUser(updatedUser);
      await saveUser(updatedUser);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    setIsUserStorageDataLoading(true);

    try {
      await removeUser();
      await removeAuthToken();

      setUser({} as UserDTO);
    } catch (error) {
      throw error;
    } finally {
      setIsUserStorageDataLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, updateUser, signOut, isUserStorageDataLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
