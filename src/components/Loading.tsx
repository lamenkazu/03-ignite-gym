import { Center, Spinner } from "native-base";
import { View, Text } from "react-native";

export const Loading = () => {
  return (
    <Center flex={1}>
      <Spinner />
    </Center>
  );
};
