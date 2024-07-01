import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

interface ButtonProps extends IButtonProps {
  title: string;
}

export const Button = ({ title, ...props }: ButtonProps) => {
  return (
    <ButtonNativeBase
      {...props}
      w={"full"}
      h={14}
      rounded={"sm"}
      bg={"green.700"}
      _pressed={{
        bg: "green.500",
      }}
    >
      <Text color={"white"} fontFamily={"heading"} fontSize={"sm"}>
        {title}
      </Text>
    </ButtonNativeBase>
  );
};
