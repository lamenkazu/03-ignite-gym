import { StatusBar, View } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { AuthContextProvider } from "@/context/AuthContext";
import { Routes } from "@/routes";

import { THEME } from "@/theme";
import { Loading } from "@/components/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

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
  );
}
