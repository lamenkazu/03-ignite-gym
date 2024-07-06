import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from 'native-base'
import { Controller, useForm } from 'react-hook-form'
import { AppError } from '@/utils/AppError'
import { z } from 'zod'

import BackgroundImg from '@/assets/background.png'
import Logo from '@/assets/logo.svg'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useAuth } from '@/hooks/useAuth'
import { AuthNavigatorAuthProps } from '@/routes/auth.routes'

const signInSchema = z.object({
  email: z.string().min(1, 'Informe o e-mail').email('E-mail inválido.'),
  password: z
    .string()
    .min(1, 'Informe a senha')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
})
type SignInSchema = z.infer<typeof signInSchema>

export const SignIn = () => {
  const { signIn } = useAuth()
  const { navigate } = useNavigation<AuthNavigatorAuthProps>()
  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleNewAccount = () => {
    navigate('signUp')
  }

  const handleSignIn = async ({ email, password }: SignInSchema) => {
    try {
      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível conectar. Tente novamente.'

      toast.show({
        title,
        placement: 'bottom',
        marginBottom: '5',
        bgColor: 'red.500',
      })
    }
  }

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
        position={'absolute'}
      />

      <VStack flex={1} px={10}>
        <Center my={24}>
          <Logo />

          <Text color={'gray.100'} fontSize={'sm'}>
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading
            color={'gray.100'}
            fontSize={'xl'}
            mb={6}
            fontFamily={'heading'}
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
                onSubmitEditing={handleSubmit(handleSignIn)}
              />
            )}
          />

          <Button
            title="Acessar"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isSubmitting}
          />
        </Center>

        <Center mt={24}>
          <Text color={'gray.100'} fontSize={'sm'} mb={3} fontFamily={'body'}>
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar conta"
            variant={'outline'}
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
