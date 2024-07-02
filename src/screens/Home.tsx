import { Group } from "@/components/Group";
import { HomeHeader } from "@/components/HomeHeader";
import { Center, FlatList, HStack, Text, VStack } from "native-base";
import { useState } from "react";

export const Home = () => {
  const [groups, setGroups] = useState([
    "costa",
    "ombro",
    "tricepes",
    "bícepes",
  ]);
  const [selectedGroup, setSelectedGroup] = useState("costas");

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
            isActive={selectedGroup === item}
            onPress={() => setSelectedGroup(item)}
          />
        )}
        _contentContainerStyle={{
          px: 8,
        }}
        my={10}
        maxH={10}
      />
    </VStack>
  );
};
