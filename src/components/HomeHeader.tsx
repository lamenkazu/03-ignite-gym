import { TouchableOpacity } from "react-native";
import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";

import { UserPhoto } from "./UserPhoto";

import defaultUserAvatar from "@/assets/userPhotoDefault.png";
import { api } from "@/lib/axios";

export const HomeHeader = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <HStack bg={"gray.600"} pt={16} pb={5} px={8} alignItems={"center"}>
      <UserPhoto
        source={
          user.avatar
            ? {
                uri: `${api.defaults.baseURL}/avatar/${user.avatar}`,
              }
            : defaultUserAvatar
        }
        alt="imagem do usuário"
        size={16}
        mr={4}
      />
      <VStack flex={1}>
        <Text color={"gray.100"} fontSize={"md"}>
          Olá,
        </Text>

        <Heading color={"gray.100"} fontSize={"md"}>
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={handleSignOut}>
        <Icon as={MaterialIcons} name="logout" color={"gray.200"} size={7} />
      </TouchableOpacity>
    </HStack>
  );
};
