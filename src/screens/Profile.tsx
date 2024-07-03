import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  useToast,
  VStack,
} from "native-base";

import { Header } from "@/components/Header";
import { UserPhoto } from "@/components/UserPhoto";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

import * as ImagePicker from "expo-image-picker";

const PHOTO_SIZE = 33;

export const Profile = () => {
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/lamenkazu.png"
  );

  const toast = useToast();

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

      const { fileSize, uri } = selectedPhoto.assets[0];

      if (uri && fileSize) {
        const fileSizeInMb = fileSize / 1024 / 1024;
        console.log(fileSizeInMb);

        if (fileSizeInMb > 5) {
          return toast.show({
            title: "Imagem muito grande! Ecolha uma de até 5MB",
            placement: "top",
            marginTop: "40",
            bgColor: "red.500",
          });
        }

        setUserPhoto(selectedPhoto.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPhotoLoading(false);
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
              source={{ uri: userPhoto }}
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

          <Input bg="gray.600" placeholder="Nome" />

          <Input bg="gray.600" placeholder="E-mail" isDisabled />
        </Center>

        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2}>
            Alterar senha
          </Heading>

          <Input bg="gray.600" placeholder="Senha antiga" secureTextEntry />

          <Input bg="gray.600" placeholder="Nova senha" secureTextEntry />

          <Input
            bg="gray.600"
            placeholder="Confirme a nova senha"
            secureTextEntry
          />

          <Button title="Atualizar" mt={4} />
        </VStack>
      </ScrollView>
    </VStack>
  );
};
