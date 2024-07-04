import { createContext, ReactNode, useEffect, useState } from "react";

import { UserDTO } from "@/dtos/UserDTO";
import { api } from "@/lib/axios";
import { getUser, removeUser, saveUser } from "@/storage/user";
import { boolean } from "zod";

interface AuthContextProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  user: UserDTO;
  isUserStorageDataLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
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
    try {
      const user = await getUser();

      if (user) {
        setUser(user);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsUserStorageDataLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/sessions", { email, password });

      if (data.user) {
        setUser(data.user);
        saveUser(data.user);
      }
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setIsUserStorageDataLoading(true);
      setUser({} as UserDTO);
      await removeUser();
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
      value={{ user, signIn, signOut, isUserStorageDataLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
