import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  useToast,
  VStack,
} from "native-base";

import { z } from "zod";
import { api } from "@/lib/axios";
import { useAuth } from "@/hooks/useAuth";
import { AppError } from "utils/AppError";
import * as ImagePicker from "expo-image-picker";

import { Header } from "@/components/Header";
import { UserPhoto } from "@/components/UserPhoto";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

import defaultUserAvatar from "@/assets/userPhotoDefault.png";

const PHOTO_SIZE = 33;

const profileFormSchema = z
  .object({
    name: z.string().min(1, "Informe o nome."),
    email: z.string(),
    oldPassword: z
      .string()
      .optional()
      .transform((value) => (value === "" ? undefined : value))
      .refine(
        (value) => value === undefined || value.length >= 6,
        "A senha deve ter pelo menos 6 dígitos."
      ),
    password: z
      .string()
      .optional()
      .transform((value) => (value === "" ? undefined : value))
      .refine(
        (value) => value === undefined || value.length >= 6,
        "A senha deve ter pelo menos 6 dígitos."
      ),
    confirmPassword: z
      .string()
      .optional()
      .transform((value) => (value === "" ? undefined : value))
      .refine(
        (value) => value === undefined || value.length >= 6,
        "A senha deve ter pelo menos 6 dígitos."
      ),
  })
  .superRefine((data, context) => {
    if (data.password && data.confirmPassword && !data.oldPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["oldPassword"],
        message: "Deve inserir a senha antiga para alterar a senha.",
      });
    }
    if (data.password !== data.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "As senhas devem ser iguais",
      });
    }
  });

type ProfileFormSchema = z.infer<typeof profileFormSchema>;

export const Profile = () => {
  const toast = useToast();
  const { user, updateUser } = useAuth();

  /**** Photo *****/
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/lamenkazu.png"
  );
  const handleUserPhotoSelect = async () => {
    setIsPhotoLoading(true);
    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // tipo de conteudo que quer selecionar da galeria do usuario
        quality: 1, // qualidade da imagem vai de 0 a 1
        aspect: [4, 4], // Aspecto da imagem. No caso, 4 por 4 é uma imagem quadrada, poderia ser 3/4 e dai em diante.
        allowsEditing: true, // Permite o usuário editar a imagem após selecionar ela.
      });

      if (selectedPhoto.canceled) {
        return; //Se o usuario cancelar a seleção de foto, nada deve ser feito.
      }

      const { fileSize, uri, fileName } = selectedPhoto.assets[0];

      if (uri && fileSize) {
        const fileSizeInMb = fileSize / 1024 / 1024;

        if (fileSizeInMb > 5) {
          return toast.show({
            title: "Imagem muito grande! Ecolha uma de até 5MB",
            placement: "top",
            marginTop: "40",
            bgColor: "red.500",
          });
        }

        const fileExtension = selectedPhoto.assets[0].mimeType
          ?.split("/")
          .pop();

        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: selectedPhoto.assets[0].uri,
          type: selectedPhoto.assets[0].mimeType,
        } as any;

        const uplaodUserPhotoForm = new FormData();
        uplaodUserPhotoForm.append("avatar", photoFile);

        const updateAvatarResponse = await api.patch(
          "/users/avatar",
          uplaodUserPhotoForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const updatedUser = user;
        updatedUser.avatar = updateAvatarResponse.data.avatar;
        updateUser(updatedUser);

        // setUserPhoto(selectedPhoto.assets[0].uri);

        toast.show({
          title: "Foto atualizada!",
          placement: "bottom",
          marginBottom: "5",
          bgColor: "green.700",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPhotoLoading(false);
    }
  };

  /*** Form ***/
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const handleUpdateProfile = async (data: ProfileFormSchema) => {
    try {
      await api.put("/users", {
        name: data.name,
        password: data.password,
        old_password: data.oldPassword,
      });

      const updatedUser = user;
      updatedUser.name = data.name;
      await updateUser(updatedUser);

      toast.show({
        title: "Perfil atualizado com sucesso!",
        placement: "bottom",
        marginBottom: "5",
        bgColor: "green.700",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível atualizar os seus dados :(\nTente novamente mais tarde!";

      toast.show({
        title,
        placement: "bottom",
        marginBottom: "5",
        bgColor: "red.500",
      });
    }
  };

  return (
    <VStack flex={1}>
      <Header title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {isPhotoLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded={"full"}
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={
                user.avatar
                  ? {
                      uri: `${api.defaults.baseURL}/avatar/${user.avatar}`,
                    }
                  : defaultUserAvatar
              }
              alt="foto do usuario"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                bg="gray.600"
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
                bg="gray.600"
                placeholder="E-mail"
                isDisabled
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </Center>

        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2}>
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="oldPassword"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.oldPassword?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleUpdateProfile)}
            isLoading={isSubmitting}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
};
