import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  IconButton,
  Toast,
  Checkbox,
  Pressable,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import ModalExclusao from "./ModalExclusao";
import React, { useContext, useState, useEffect } from "react";
import ModalAgendamento from "./ModalAgendamento";
import { deleteRevisao, revisaoConcluida } from "../../services/api/api";
import { AgendamentoContext } from "../../context/agendamento-context";
import { Alert } from "react-native";

export default function HistoricoItem(props) {
  const { id, hora, data, servico, modeloCarro, realizado } = props;
  const agendamentosCtx = useContext(AgendamentoContext);
  const [isChecked, setIsChecked] = useState(false);
  const [dataValida, setDataValida] = useState(false);

  const filtrarDatas = () => {
    // Função para capturar se a data ja passou para desabilitar funcionalidades
    const hoje = new Date(); // Capturando data atual
    const hojeFormatado = hoje.toISOString().split("T")[0]; // Extraindo apenas a data

    if (data >= hojeFormatado) {
      setDataValida(true);
    }
  };

  const marcarConcluido = async (id) => {
    // Requisição de marcar um agendamento como concluido
    try {
      setIsChecked(!isChecked);
      await revisaoConcluida(`/api/concluirAgendamento/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = () => {
    if (!isChecked) {
      Alert.alert(
        "Deseja marcar revisão como concluída?",
        `Essa ação não poderá ser revertida. Agendamentos marcados como realizados não poderão ser alterados.`,
        [
          { text: "Cancelar" },
          {
            text: "Confirmar",
            onPress: () => marcarConcluido(id),
          },
        ]
      );
    } else console.log(`Desmarcado`);
  };

  const removerAgendamento = async (id) => {
    // Requisição para remover agendamento
    try {
      if (id != undefined) {
        await deleteRevisao(`/api/agendamentos/${id}`);
        agendamentosCtx.deleteAgendamento(id);
        Toast.show({
          description: "Revisão excluída.",
          duration: 3000,
          bg: "success.400",
        });
      } else {
        Toast.show({
          description: "Ocorreu um erro interno.",
          duration: 3000,
          bg: "error.500",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //modal para exclusão
  const [isModalExclusaoOpen, setIsModalExclusaoOpen] = useState(false);
  const openModalExclusao = () => setIsModalExclusaoOpen(true);
  const closeModalExclusao = () => setIsModalExclusaoOpen(false);

  //modal para edição
  const [isEditing, setIsEditing] = useState(false); // estado isEditing
  const [isModalAgendamentoOpen, setIsModalAgendamentoOpen] = useState(false);
  const openModalAgendamento = () => {
    setIsModalAgendamentoOpen(true);
    setIsEditing(true); // Definindo isEditing como true ao abrir o modal
  };
  const closeModalAgendamento = () => {
    setIsModalAgendamentoOpen(false);
    setIsEditing(false); // Definindo isEditing como false ao fechar o modal
  };

  useEffect(() => {
    // Filtrando as datas na inicilização do componente
    filtrarDatas();
  }, []);

  useEffect(() => {
    // Monitorando o checkbox para setar quando o agendamento ja estiver concluido
    if (realizado === true) {
      setIsChecked(true);
    }
  }, [realizado, handleCheckboxChange]);

  return (
    <>
      <Box
        maxW="100%"
        w={"100%"}
        mt={3}
        rounded="lg"
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
        <VStack space={1} mx={3} my={3}>
          <Text>
            {new Date(data).toLocaleDateString("pt-BR", { timeZone: "UTC" })} -{" "}
            {hora}
          </Text>
          <Text>Tipo de serviço: {servico}</Text>
          <Text>Modelo do Carro: {modeloCarro}</Text>
        </VStack>
        <HStack space={2} mx={3}>
          <Text>Realizado:</Text>
          {
            // Renderização condicional para desabilitar o checkbox de agendamentos concluidos.
            isChecked || !dataValida ? (
              <Checkbox
                aria-label="checkbox"
                isChecked={isChecked}
                isDisabled
              />
            ) : (
              <Checkbox
                aria-label="checkbox"
                isChecked={isChecked}
                onChange={handleCheckboxChange}
              />
            )
          }
        </HStack>
        <HStack justifyContent="flex-end" mb={2}>
          {/* Renderização condicional para desabilitar as funções de editar e excluir de agendamentos concluidos. */}
          {isChecked || !dataValida ? (
            <>
              <IconButton
                isDisabled
                icon={<Icon as={Entypo} name="new-message" />}
                _icon={{
                  color: "gray.600",
                  size: "sm",
                }}
                _hover={{
                  bg: "gray.700:alpha.20",
                }}
                _pressed={{
                  bg: "gray.700:alpha.20",
                }}
              />
              <IconButton
                isDisabled
                icon={<Icon as={Entypo} name="trash" />}
                _icon={{
                  color: "gray.600",
                  size: "sm",
                }}
                _hover={{
                  bg: "gray.700:alpha.20",
                }}
                _pressed={{
                  bg: "gray.700:alpha.20",
                }}
              />
            </>
          ) : (
            <>
              <IconButton
                icon={<Icon as={Entypo} name="new-message" />}
                _icon={{
                  color: "gray.600",
                  size: "sm",
                }}
                _hover={{
                  bg: "gray.700:alpha.20",
                }}
                _pressed={{
                  bg: "gray.700:alpha.20",
                }}
                onPress={openModalAgendamento} // Abre o modal de agendamento(modo edição) ao clicar
              />
              <IconButton
                icon={<Icon as={Entypo} name="trash" />}
                _icon={{
                  color: "gray.600",
                  size: "sm",
                }}
                _hover={{
                  bg: "gray.700:alpha.20",
                }}
                _pressed={{
                  bg: "gray.700:alpha.20",
                }}
                onPress={openModalExclusao} // Abre o modalExclusão ao clicar
              />
            </>
          )}
        </HStack>
      </Box>
      {/* Passa o estado do modalExclusão e a função de fechamento como props */}
      <ModalExclusao
        isOpen={isModalExclusaoOpen}
        onClose={closeModalExclusao}
        removerAgendamento={removerAgendamento}
        id={id}
      />
      {/* Passa o estado do modalAgendamento e a função de fechamento como props */}
      <ModalAgendamento
        isEditing={isEditing} // Passar isEditing como prop
        isOpen={isModalAgendamentoOpen}
        onClose={closeModalAgendamento}
        {...props}
      />
    </>
  );
}
