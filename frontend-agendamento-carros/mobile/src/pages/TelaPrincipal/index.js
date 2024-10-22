import { Box, Center } from "native-base";
import CardPrincipal from "./../../components/TelaPrincipal/CardPrincipal";
import HeaderPrincipal from "./../../components/TelaPrincipal/HeaderPrincipal";
import HistoricoContainer from "./../../components/TelaPrincipal/HistoricoContainer";
import ModalAgendamento from "./../../components/TelaPrincipal/ModalAgendamento";
import { Button } from "./../../components/UI/Button";
import { useEffect, useState } from "react";
import { getRevisoes } from "../../services/api/api";


export default function TelaPrincipal() {
  const [isModalAgendamentoOpen, setIsModalAgendamentoOpen] = useState(false);   //modal para cadastro de agendamento
  const [isAdding, setIsAdding] = useState(false); // Adicionando o estado isAdding para cadastrar um agendamento


  const openModalAgendamento = () => {
    setIsModalAgendamentoOpen(true);
    setIsAdding(true);
  };

  const closeModalAgendamento = () => {
    setIsModalAgendamentoOpen(false);
    setIsAdding(false);
  };

  return (
    <Box bg="white">
      <HeaderPrincipal />
      <CardPrincipal />
      <Center>
        <Button title="Agendar Revisão" onPress={openModalAgendamento} />
      </Center>
      <HistoricoContainer/>
      {/* Passa o estado do modalAgendamento e a função de fechamento como props */}
      <ModalAgendamento
        isAdding={isAdding} // Passa isAdding como prop
        isOpen={isModalAgendamentoOpen}
        onClose={closeModalAgendamento}
      />
    </Box>
  );
}
