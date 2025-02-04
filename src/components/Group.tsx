import { IPressableProps, Pressable, Text } from 'native-base'

interface GroupProps extends IPressableProps {
  name: string
  isActive: boolean
}

export const Group = ({ name, isActive, ...props }: GroupProps) => {
  return (
    <Pressable
      {...props}
      mr={3}
      w={24}
      h={10}
      bg={'gray.600'}
      rounded={'md'}
      justifyContent={'center'}
      alignItems={'center'}
      overflow={'hidden'}
      isPressed={isActive}
      _pressed={{
        borderColor: 'green.500',
        borderWidth: 1,
      }}
    >
      <Text
        color={isActive ? 'green.500' : 'gray.200'}
        textTransform={'uppercase'}
        fontSize={'xs'}
        fontWeight={'bold'}
      >
        {name}
      </Text>
    </Pressable>
  )
}
