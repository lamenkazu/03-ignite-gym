import { createContext, ReactNode, useState } from "react";

import { UserDTO } from "@/dtos/UserDTO";

interface AuthContextProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  user: UserDTO;
  signIn: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState({
    id: "0",
    name: "Erick",
    email: "erick@mail.com",
    avatar: "erick.png",
  });

  const signIn = (email: string, password: string) => {
    setUser({
      id: "",
      name: "",
      email,
      avatar: "",
    });
  };

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
