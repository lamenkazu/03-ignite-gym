import { useNavigation } from "@react-navigation/native";
import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Logo from "@/assets/logo.svg";
import BackgroundImg from "@/assets/background.png";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { AuthNavigatorAuthProps } from "@/routes/auth.routes";
import { useAuth } from "@/hooks/useAuth";

const signInSchema = z.object({
  email: z.string().min(1, "Informe o e-mail").email("E-mail inválido."),
  password: z
    .string()
    .min(1, "Informe a senha")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
});
type SignInSchema = z.infer<typeof signInSchema>;

export const SignIn = () => {
  const { navigate } = useNavigation<AuthNavigatorAuthProps>();
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleNewAccount = () => {
    navigate("signUp");
  };

  const handleSignIn = ({ email, password }: SignInSchema) => {
    signIn(email, password);
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
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            title="Acessar"
            onPress={handleSubmit(handleSignIn)}
            disabled={isSubmitting}
          />
        </Center>

        <Center mt={24}>
          <Text color={"gray.100"} fontSize={"sm"} mb={3} fontFamily={"body"}>
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar conta"
            variant={"outline"}
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
};
