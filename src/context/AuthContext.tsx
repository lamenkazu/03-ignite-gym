import { createContext, ReactNode, useEffect, useState } from 'react'

import { UserDTO } from '@/dtos/UserDTO'
import { api } from '@/lib/axios'
import {
  getAuthToken,
  removeAuthToken,
  saveAuthToken,
} from '@/storage/authToken'
import { getUser, removeUser, saveUser } from '@/storage/user'

interface AuthTokenStorageProps {
  userData: UserDTO
  token: string
}

interface AuthContextProviderProps {
  children: ReactNode
}

export interface AuthContextDataProps {
  user: UserDTO
  isUserStorageDataLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  updateUser: (updatedUser: UserDTO) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isUserStorageDataLoading, setIsUserStorageDataLoading] = useState(true)

  const userAndTokenUpdate = ({ userData, token }: AuthTokenStorageProps) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setUser(userData) // Atualiza estado do usuario para ser usado na aplicação.
  }

  const userAndTokenSave = async ({
    userData,
    token,
  }: AuthTokenStorageProps) => {
    setIsUserStorageDataLoading(true)

    await saveUser(userData) // Salva o usuário no Async Storage para armazenamento da informação.
    await saveAuthToken(token) // Salva o token do usuário no Async Storage.

    setIsUserStorageDataLoading(false)
  }

  const signIn = async (email: string, password: string) => {
    setIsUserStorageDataLoading(true)

    const { data } = await api.post('/sessions', { email, password })

    if (data.user && data.token) {
      await userAndTokenSave({
        userData: data.user,
        token: data.token,
      })
      userAndTokenUpdate({
        userData: data.user,
        token: data.token,
      })
    }
  }

  const updateUser = async (updatedUser: UserDTO) => {
    setUser(updatedUser)
    await saveUser(updatedUser)
  }

  const signOut = async () => {
    setIsUserStorageDataLoading(true)

    await removeUser()
    await removeAuthToken()

    setUser({} as UserDTO)

    setIsUserStorageDataLoading(false)
  }

  useEffect(() => {
    const loadUserData = async () => {
      setIsUserStorageDataLoading(true)

      const userData = await getUser()
      const token = await getAuthToken()

      if (userData && token) {
        userAndTokenUpdate({ userData, token })
      }

      setIsUserStorageDataLoading(false)
    }

    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, signIn, updateUser, signOut, isUserStorageDataLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
