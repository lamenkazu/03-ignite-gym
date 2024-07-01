import { Center, Image, Text, VStack } from "native-base";

import Logo from "@/assets/logo.svg";
import BackgroundImg from "@/assets/background.png";

export const SignIn = () => {
  return (
    <VStack flex={1} bg={"gray.700"}>
      <Image
        source={BackgroundImg}
        alt="Pessoas treinando"
        resizeMode="stretch"
        position={"absolute"}
      />

      <Center my={24}>
        <Logo />

        <Text color={"gray.100"} fontSize={"sm"}>
          Treine sua mente e o seu corpo
        </Text>
      </Center>
    </VStack>
  );
};
