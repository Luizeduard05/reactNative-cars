import React, {useContext} from 'react'
import { Text, Box, HStack, VStack, Image, ZStack } from "native-base";
import { AgendamentoContext } from "../../context/agendamento-context";

export default function CardPrincipal() {
  const logo = require("../../assets/logo-project.png");
  const agendamentosCtx = useContext(AgendamentoContext);

  const hoje = new Date(); // Capturando data atual
  const hojeFormatado = hoje.toISOString().split('T')[0]; // Extraindo apenas a data
  const datas = agendamentosCtx.agendamentos.map(agendamento => agendamento.data); // Obter todas as datas dos agendamnetos
  const datasValidas = datas.filter(data => { return data >= hojeFormatado;  }); // Filtrando apenas os proximos agendamentos
  const proximaRevisao = datasValidas.sort() // Ordenando as datas em ordem crescente

  return (
    <ZStack alignItems="center" justifyContent="center" my={20}>
      <Box
        maxW="85%"
        w={"85%"}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Box>
          <VStack
            space={2}
            justifyContent="center"
            alignItems="center"
            safeAreaTop
            mb={6}
          >
            <HStack>
              <Text fontSize="md">Próxima revisão: </Text>
              <Text fontSize="md" bold>
                {proximaRevisao.length > 0 ? new Date(proximaRevisao[0]).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : "Sem revisões"}
              </Text>
            </HStack>

            <Image source={logo} alt="image" size="xl" resizeMode="cover" />
          </VStack>
        </Box>
      </Box>
    </ZStack>
  );
}
