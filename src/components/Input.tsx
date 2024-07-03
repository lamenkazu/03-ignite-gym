import { Input as NativeBaseInput, IInputProps } from "native-base";

export const Input = ({ ...props }: IInputProps) => {
  return (
    <NativeBaseInput
      {...props}
      borderWidth={0}
      h={14}
      px={4}
      mb={4}
      _focus={{
        bg: "gray.700",
        borderWidth: 1,
        borderColor: "green.500",
      }}
      fontSize={"md"}
      color={"white"}
      fontFamily={"body"}
      placeholderTextColor={"gray.300"}
    />
  );
};
