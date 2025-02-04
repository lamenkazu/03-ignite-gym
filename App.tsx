/* eslint-disable camelcase */
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { NativeBaseProvider } from 'native-base'
import { StatusBar } from 'react-native'

import { Loading } from '@/components/Loading'
import { AuthContextProvider } from '@/context/AuthContext'
import { Routes } from '@/routes'
import { THEME } from '@/theme'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? (
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      ) : (
        <Loading />
      )}
    </NativeBaseProvider>
  )
}
