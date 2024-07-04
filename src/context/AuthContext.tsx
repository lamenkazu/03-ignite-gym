import { createContext, ReactNode, useState } from "react";

import { UserDTO } from "@/dtos/UserDTO";

interface AuthContextProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  user: UserDTO;
}

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState({
    user: {
      id: "0",
      name: "Erick",
      email: "erick@mail.com",
      avatar: "erick.png",
    },
  });

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
