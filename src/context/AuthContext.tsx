import { createContext } from "react";

import { UserDTO } from "@/dtos/UserDTO";

export interface AuthContextDataProps {
  user: UserDTO;
}

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export { AuthContext };
