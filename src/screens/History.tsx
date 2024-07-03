import { useState } from "react";
import { Center, Heading, SectionList, Text, VStack } from "native-base";

import { Header } from "@/components/Header";
import { HistoryCard } from "@/components/HistoryCard";

export const History = () => {
  const [exercises, setExercises] = useState([
    {
      title: "26.08.22",
      data: ["Puxada frontal", "Remada unilateral"],
    },
    {
      title: "27.08.22",
      data: ["Puxada frontal"],
    },
  ]);

  return (
    <VStack flex={1}>
      <Header title="Histórico de Exercícios" />
      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
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
