import { useNavigation } from "@react-navigation/native";
import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";

import Logo from "@/assets/logo.svg";
import BackgroundImg from "@/assets/background.png";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { AuthNavigatorAuthProps } from "@/routes/auth.routes";

export const SignUp = () => {
  const { goBack } = useNavigation<AuthNavigatorAuthProps>();

  const handleBackToLogin = () => {
    goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="Pessoas treinando"
        resizeMode="stretch"
        position={"absolute"}
      />

      <VStack flex={1} px={10}>
        <Center my={24}>
          <Logo />

          <Text color={"gray.100"} fontSize={"sm"}>
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading
            color={"gray.100"}
            fontSize={"xl"}
            mb={6}
            fontFamily={"heading"}
          >
            Crie sua conta
          </Heading>

          <Input placeholder="Nome" />

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input placeholder="Senha" secureTextEntry />

          <Input placeholder="Confirmar Senha" secureTextEntry />

          <Button title="Criar e acessar" />
        </Center>

        <Button
          mt={24}
          title="Voltar para o login"
          variant={"outline"}
          onPress={handleBackToLogin}
        />
      </VStack>
    </ScrollView>
  );
};
