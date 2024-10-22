import { Text, Box, HStack, VStack } from "native-base";

export default function HeaderPrincipal() {
  return (
    <HStack justifyContent="space-between" bg="cyan.700">
      <Box justifyContent="space-between">
        <VStack mx={4} my={2} mb={9}>
          <Text color="white" fontSize="lg">
            Agendamento de
          </Text>
          <Text color="white" bold fontSize="lg">
            revisões e serviços
          </Text>
        </VStack>
      </Box>
    </HStack>
  );
}
