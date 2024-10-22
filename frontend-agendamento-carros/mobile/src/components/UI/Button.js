import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string,
};

export function Button({ title, ...rest }: Props) {
  return (
    <ButtonNativeBase {...rest}>
      <Text color="gray.50" fontSize="md" fontWeight="bold">
        {title}
      </Text>
    </ButtonNativeBase>
  );
}

