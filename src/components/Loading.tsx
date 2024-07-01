import { Center, Spinner } from "native-base";
import { View, Text } from "react-native";

export const Loading = () => {
  return (
    <Center flex={1} bg={"gray.700"}>
      <Spinner color={"green.500"} />
    </Center>
  );
};
