import { Input as NativeBaseInput, IInputProps } from "native-base";

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      bg="gray.50"
      fontSize="lg"
      _focus={{
        bg: "gray.100",
        borderWidth: 1.5,
        borderColor: "gray.400",
      }}
      {...rest}
    />
  );
}
