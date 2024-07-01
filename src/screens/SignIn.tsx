import { Image, VStack } from "native-base";
import { View, Text } from "react-native";

import BackgroundImg from "@/assets/background.png";

export const SignIn = () => {
  return (
    <VStack flex={1} bg={"gray.700"}>
      <Image
        source={BackgroundImg}
        alt="Pessoas treinando"
        resizeMode="stretch"
      />
    </VStack>
  );
};
