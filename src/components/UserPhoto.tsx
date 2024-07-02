import { Image, IImageProps } from "native-base";

interface UserPhotoProps extends IImageProps {
  size: number;
}

export const UserPhoto = ({ size, ...props }: UserPhotoProps) => {
  return (
    <Image
      {...props}
      w={size}
      height={size}
      rounded={"full"}
      borderWidth={2}
      borderColor={"gray.400"}
    />
  );
};
