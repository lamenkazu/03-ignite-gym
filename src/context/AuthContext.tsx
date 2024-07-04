import { createContext, ReactNode } from "react";

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
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: "0",
          name: "Erick",
          email: "erick@mail.com",
          avatar: "erick.png",
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
