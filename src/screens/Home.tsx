import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Center, FlatList, Heading, HStack, Text, VStack } from "native-base";

import { AppNavigationRoutesProp } from "@/routes/app.routes";

import { ExerciseCard } from "@/components/ExerciseCard";
import { Group } from "@/components/Group";
import { HomeHeader } from "@/components/HomeHeader";

export const Home = () => {
  const [groups, setGroups] = useState([
    "costas",
    "ombro",
    "tricepes",
    "bícepes",
  ]);
  const [exercises, setExercises] = useState([
    "Puxada frontal",
    "Remada curvada",
    "Remada unilateral",
    "Levantamento terra",
  ]);
  const [selectedGroup, setSelectedGroup] = useState("costas");

  const { navigate } = useNavigation<AppNavigationRoutesProp>();
  const handleOpenExerciseDetails = () => {
    navigate("exercise");
  };

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              selectedGroup.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
            onPress={() => setSelectedGroup(item)}
          />
        )}
        _contentContainerStyle={{
          px: 8,
        }}
        my={10}
        maxH={10}
        // minH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent={"space-between"} mb={5}>
          <Heading color={"gray.200"} fontSize={"md"}>
            Exercícios
          </Heading>

          <Text color={"gray.200"} fontSize={"sm"}>
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={() => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 20 }}
        />
      </VStack>
    </VStack>
  );
};
