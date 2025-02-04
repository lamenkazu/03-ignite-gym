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
import { api } from '@/lib/axios'
import { AuthNavigatorAuthProps } from '@/routes/auth.routes'

const signUpSchema = z
  .object({
    name: z.string().min(1, 'Informe o nome.'),
    email: z.string().min(1, 'Informe o e-mail').email('E-mail inválido.'),
    password: z
      .string()
      .min(1, 'Informe a senha')
      .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
    confirmPassword: z.string().min(1, 'Confirme a senha.'),
  })
  .superRefine((data, context) => {
    if (data.password !== data.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'As senhas devem ser iguais',
      })
    }
  })

type SignUpSchema = z.infer<typeof signUpSchema>

export const SignUp = () => {
  const { goBack } = useNavigation<AuthNavigatorAuthProps>()
  const toast = useToast()
  const { signIn } = useAuth()

  const handleBackToLogin = () => {
    goBack()
  }

  const handleSignUp = async ({ name, email, password }: SignUpSchema) => {
    try {
      await api.post('/users', { name, email, password }) // cria usuario

      await signIn(email, password) // loga o usuario após criado.
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possivel criara conta. Tente novamente.'

      toast.show({
        title,
        placement: 'bottom',
        marginBottom: '5',
        bgColor: 'red.500',
      })
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

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
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

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

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar a Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isSubmitting}
          />
        </Center>

        <Button
          mt={24}
          title="Voltar para o login"
          variant={'outline'}
          onPress={handleBackToLogin}
        />
      </VStack>
    </ScrollView>
  )
}
