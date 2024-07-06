import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_TOKEN_STORAGE } from './config'

interface StorageAuthTokenProps {
  token: string
  refreshToken: string
}

export const saveAuthToken = async ({
  token,
  refreshToken,
}: StorageAuthTokenProps) => {
  await AsyncStorage.setItem(
    AUTH_TOKEN_STORAGE,
    JSON.stringify({ token, refreshToken }),
  )
}

export const getAuthToken = async () => {
  const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)

  const { token, refreshToken }: StorageAuthTokenProps = response
    ? JSON.parse(response)
    : {}

  return { token, refreshToken }
}

export const removeAuthToken = async () => {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}
