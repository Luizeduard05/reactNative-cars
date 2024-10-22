import {
  Modal,
  FormControl,
  Center,
  VStack,
  Icon,
  Button as ButtonNativeBase,
  Toast,
} from "native-base";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { MaterialIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { useContext, useEffect, useState } from "react";
import {
  addNovaRevisão,
  getRevisoes,
  editarRevisao,
} from "../../services/api/api";
import {
  validaCarro,
  validaData,
  validaHora,
  validaServico,
} from "../../utils/InputValidation";

import { AgendamentoContext } from "../../context/agendamento-context";

const ModalAgendamento = (props) => {
  const {
    isOpen,
    onClose,
    isEditing,
    id,
    modeloCarro,
    servico,
  } = props;
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(""); // String para exibir a data
  const [selectedTime, setSelectedTime] = useState(""); // String para exibir a hora
  const [formData, setData] = useState({ modeloCarro: "", servico: "" }); // capturar os dados dos inputs
  const [errors, setErrors] = useState({}); // fornecer mensagens de erro dos inputs
  const [touched, setTouched] = useState({}); // monitorar se o campo foi clicado pelo usuario

  const agendamentosCtx = useContext(AgendamentoContext);

  const atualizarLista = async () => {
    // Requisição para atualizar lista dos agendamentos
    const response = await getRevisoes(`/api/agendamentos`);
    if (response.data) {
      agendamentosCtx.setAgendamentos(response.data);
    } else {
      console.log("Erro", "Erro interno");
    }
  };

  const addNovoCadastro = async () => {
    // Requisição para adicionar novo cadastro de agendamento
    try {
      const hora = new Date(time);
      hora.setHours(hora.getHours() - 3); // Subtrai 3 horas
      const horaFormatada = hora
        .toISOString()
        .split("T")[1]
        .split(":")
        .slice(0, 2)
        .join(":"); // Formata a hora
      // console.log(horaFormatada);
      const novoCadastro = {
        data: new Date(date).toISOString().split("T", 1)[0], // Trazendo somente a data da variavel
        hora: horaFormatada,
        servico: formData.servico,
        modeloCarro: formData.modeloCarro,
      };
      // console.log(novoCadastro)
      await addNovaRevisão("/api/agendamentos", novoCadastro);
      agendamentosCtx.addAgendamento(novoCadastro);
      limparCamposCadastro()
      atualizarLista();
      Toast.show({
        description: "Nova revisão cadastrada!",
        duration: 3000,
        bg: "success.400",
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        description: "Não foi possível cadastrar uma nova revisão",
        duration: 3000,
        bg: "error.500",
      });
    }
  };

  const updateRevisao = async () => {
    //Requisição para realizar update de um agendamento
    try {
      const editarCadastro = {
        servico: formData.servico,
        modeloCarro: formData.modeloCarro,
      };
      await editarRevisao(`/api/agendamentos/${id}`, editarCadastro); //Requisição para editar um agendamento passando o id como parâmetro
      agendamentosCtx.updateAgendamento(id, editarCadastro); //Atribuindo valor editado ao contexto
      atualizarLista();
      onClose();
      Toast.show({
        description: "Revisão editada!",
        duration: 3000,
        bg: "success.400",
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        description: "Não foi possível editar a revisão",
        duration: 3000,
        bg: "error.500",
      });
    }
  };

  const limparCamposCadastro = () => { // Função para limpar os campos após enviar o cadastro
    setSelectedDate("")
    setSelectedTime("")
    setData({ servico: "", modeloCarro: "" })
  }

  const validate = () => {
    const dataError = validaData(selectedDate);
    const horaError = validaHora(selectedTime);
    const servicoError = validaServico(formData.servico);
    const carroError = validaCarro(formData.modeloCarro);

    setErrors({
      data: dataError,
      hora: horaError,
      servico: servicoError,
      modeloCarro: carroError,
    });

    return !(dataError || horaError || servicoError || carroError);
  };

  const inputChange = (field, value) => {
    // alterando informações de data toda vez que houver mudança no campo
    setData({ ...formData, [field]: value });
  };

  useEffect(() => {
    //preenchendo os inputs com os dados se estiver no modo edição
    if (isEditing) {
      setData({
        modeloCarro: modeloCarro,
        servico: servico,
      });
    }
  }, [isEditing, servico, modeloCarro]);

  useEffect(() => {
    // mudando mensagem de erro quando houver interação com o campo
    if (
      touched.data ||
      touched.hora ||
      touched.servico ||
      touched.modeloCarro
    ) {
      validate();
    }
  }, [date, time, formData.servico, formData.modeloCarro]);

  // Função para tratar o envio do formulário
  const onSubmit = () => {
    setTouched({ data: true, hora: true, servico: true, modeloCarro: true });
    if (validate()) {
      addNovoCadastro();
      onClose();
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
      setSelectedDate(selectedDate.toLocaleDateString("pt-BR")); // Exibe a data formatada
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      setTime(selectedTime);
      setSelectedTime(
        selectedTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
  };

  return (
    <Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>
            {isEditing ? "Editar Agendamento" : "Cadastrar Agendamento"}
          </Modal.Header>
          <Modal.Body>
            <VStack space={3} mt="5">
              <FormControl isRequired isInvalid={!!errors.servico}>
                <Input
                  placeholder="Serviço"
                  value={formData.servico}
                  onChangeText={(value) => inputChange("servico", value)}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, servico: true }))
                  }
                />
                {errors.servico && (
                  <FormControl.ErrorMessage>
                    {errors.servico}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.modeloCarro}>
                <Input
                  placeholder="Modelo do Carro"
                  value={formData.modeloCarro}
                  onChangeText={(value) => inputChange("modeloCarro", value)}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, modeloCarro: true }))
                  }
                />
                {errors.modeloCarro && (
                  <FormControl.ErrorMessage>
                    {errors.modeloCarro}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              {!isEditing && ( //renderização condicional para exibir somente os campos modelo do carro e serviço para edição
                <>
                  <FormControl isRequired isInvalid={!!errors.data}>
                    <Input
                      placeholder="dd/mm/yyyy"
                      value={selectedDate}
                      onFocus={() => setShowDatePicker(true)}
                      InputRightElement={
                        <Icon
                          as={<MaterialIcons name="calendar-month" />}
                          size={5}
                          mr="2"
                          color="muted.400"
                        />
                      }
                    />
                    {errors.data && (
                      <FormControl.ErrorMessage>
                        {errors.data}
                      </FormControl.ErrorMessage>
                    )}
                    {showDatePicker && (
                      <DateTimePicker
                        mode="date"
                        value={date || new Date()}
                        onChange={handleDateChange}
                        display="default"
                      />
                    )}
                  </FormControl>
                  <FormControl isRequired isInvalid={!!errors.hora}>
                    <Input
                      placeholder="HH:mm"
                      value={selectedTime}
                      onFocus={() => setShowTimePicker(true)}
                      InputRightElement={
                        <Icon
                          as={<Entypo name="clock" />}
                          size={5}
                          mr="2"
                          color="muted.400"
                        />
                      }
                    />
                    {errors.hora && (
                      <FormControl.ErrorMessage>
                        {errors.hora}
                      </FormControl.ErrorMessage>
                    )}
                    {showTimePicker && (
                      <DateTimePicker
                        mode="time"
                        value={time || new Date()}
                        onChange={handleTimeChange}
                        display="default"
                      />
                    )}
                  </FormControl>
                </>
              )}
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <ButtonNativeBase.Group space={2}>
              <ButtonNativeBase
                variant="ghost"
                colorScheme="blueGray"
                onPress={onClose}
              >
                Cancelar
              </ButtonNativeBase>
              {isEditing ? (
                <Button title="Editar" onPress={() => updateRevisao()} />
              ) : (
                <Button title="Cadastrar" onPress={onSubmit} />
              )}
            </ButtonNativeBase.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default ModalAgendamento;
