import { StatusBar, View } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Routes } from "@/routes";

import { THEME } from "@/theme";
import { Loading } from "@/components/Loading";
import { AuthContext } from "@/context/AuthContext";

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
          <Routes />
        </AuthContext.Provider>
      ) : (
        <Loading />
      )}
    </NativeBaseProvider>
  );
}
