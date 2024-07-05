import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Center,
  Heading,
  SectionList,
  Text,
  useToast,
  VStack,
} from "native-base";

import { AppError } from "utils/AppError";
import { api } from "@/lib/axios";

import { Header } from "@/components/Header";
import { HistoryCard } from "@/components/HistoryCard";
import { HistoryByDayDTO } from "@/dtos/HistoryDTO";

export const History = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchHistory = async () => {
        setIsLoading(true);
        try {
          const response = await api.get("/history");
          setExercises(response.data);
        } catch (error) {
          const isAppError = error instanceof AppError;
          const title = isAppError
            ? error.message
            : "Não foi possível carregar o histórico.";

          toast.show({
            title,
            placement: "bottom",
            marginBottom: "5",
            bgColor: "red.500",
          });
        } finally {
          setIsLoading(false);
        }
      };

      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <Header title="Histórico de Exercícios" />
      <SectionList
        sections={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoryCard data={item} />}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: "center" }
        }
        ListEmptyComponent={() => (
          <Text color={"gray.100"} textAlign={"center"}>
            Não há exericios registrados ainda.
          </Text>
        )}
        // showsVerticalScrollIndicator={false}
        px={8}
      />
    </VStack>
  );
};
