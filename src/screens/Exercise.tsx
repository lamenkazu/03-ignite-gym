import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import { TouchableOpacity } from "react-native";

import { AppNavigationRoutesProp } from "@/routes/app.routes";
import { AppError } from "utils/AppError";
import { api } from "@/lib/axios";

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";

import { Feather } from "@expo/vector-icons";
import BodySvg from "@/assets/body.svg";
import SeriesSvg from "@/assets/series.svg";
import RepetitionsSvg from "@/assets/repetitions.svg";
import { ExerciseDTO } from "@/dtos/ExerciseDTO";

interface RouteParams {
  id: string;
}

export const Exercise = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

  const { goBack } = useNavigation<AppNavigationRoutesProp>();
  const handleGoBack = () => {
    goBack();
  };

  const { params } = useRoute();
  const { id } = params as RouteParams;

  useFocusEffect(
    useCallback(() => {
      const fetchExerciseDetails = async () => {
        setIsLoading(true);
        try {
          const response = await api.get(`/exercises/${id}`);
          setExercise(response.data);
        } catch (error) {
          const isAppError = error instanceof AppError;
          const title = isAppError
            ? error.message
            : "Não foi possível carregar os grupos musculares.";

          toast.show({
            title,
            placement: "bottom",
            bgColor: "red.500",
          });
        } finally {
          setIsLoading(false);
        }
      };

      fetchExerciseDetails();
    }, [id])
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1}>
      <VStack bg={"gray.600"} px={8} pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color={"green.500"} size={6} />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading color="gray.100" fontSize="lg" flexShrink={1}>
            {exercise.name}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />

            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Box rounded={"lg"} mb={3} overflow={"hidden"}>
            <Image
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
              }}
              alt="Nome do exercício"
              w="full"
              h={80}
              rounded="lg"
              resizeMode="cover"
            />
          </Box>

          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mb={6}
              mt={5}
            >
              <HStack>
                <SeriesSvg />
                <Text color="gray.200" ml="2">
                  {exercise.series} séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSvg />
                <Text color="gray.200" ml="2">
                  {exercise.repetitions} repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
};
