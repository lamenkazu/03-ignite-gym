import { FormControl, IInputProps, Input as NativeBaseInput } from 'native-base'

interface InputProps extends IInputProps {
  errorMessage?: string | null
}

export const Input = ({
  errorMessage = null,
  isInvalid,
  ...props
}: InputProps) => {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        {...props}
        bg="gray.700"
        borderWidth={0}
        h={14}
        px={4}
        fontSize="md"
        color="white"
        fontFamily="body"
        placeholderTextColor="gray.300"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        _focus={{
          bgColor: 'gray.700',
          borderWidth: 1,
          borderColor: 'green.500',
        }}
      />

      <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
