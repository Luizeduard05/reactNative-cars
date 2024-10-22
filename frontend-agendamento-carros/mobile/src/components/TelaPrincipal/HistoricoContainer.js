import { Text, VStack, ScrollView, Box, FlatList, Spinner } from "native-base";
import { Button } from "../UI/Button";
import HistoricoItem from "./HistoricoItem";
import { AgendamentoContext } from "../../context/agendamento-context";
import { useEffect, useContext, useState } from "react";
import { Alert } from "react-native";
import { getRevisoes, downloadHistorico } from "../../services/api/api";

import { Buffer } from "buffer"; //biblioteca para converter os dados para base64
import * as FileSystem from "expo-file-system"; //biblioteca para realizar o download do histórico
import * as IntentLauncher from "expo-intent-launcher"; //biblioteca para abrir o arquivo baixado

export default function HistoricoContainer() {
  const agendamentosCtx = useContext(AgendamentoContext);
  const [isLoading, setIsLoading] = useState(false);

  function renderHistoricoItem(itemData) {
    // Função para renderizar componente historico item
    return <HistoricoItem {...itemData.item} />;
  }

  useEffect(() => {
    // Chamando a função na inicialização do component
    const selectAgendamento = async () => {
      // Requisiçao na API para buscar os agendamentos
      try {
        setIsLoading(true);
        const response = await getRevisoes(`/api/agendamentos`);
        // console.log(response.data)
        if (response.data) {
          setIsLoading(false);
          agendamentosCtx.setAgendamentos(response.data);
        } else {
          console.log("Erro", "Erro interno");
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    selectAgendamento();
  }, []);

  const download = async () => {
    // Função para realizar download de agendamentos
    const fileUri = FileSystem.documentDirectory + "agendamentos_usuario.xlsx";
    try {
      const response = await downloadHistorico("api/downloadAgendamentos");

      // Verifica se a resposta contém dados
      if (!response.data) {
        throw new Error("Dados não encontrados na resposta.");
      }

      // Converte os dados do ArrayBuffer para Base64
      const base64data = Buffer.from(response.data).toString("base64");

      // Salva o arquivo no FileSystem
      await FileSystem.writeAsStringAsync(fileUri, base64data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Exibe um alert com a opção de abrir o arquivo baixado
      Alert.alert("Download concluído", `Arquivo salvo em: ${fileUri}`, [
        {
          text: "Abrir Arquivo",
          onPress: () => openFile(fileUri),
        },
        { text: "OK" },
      ]);
    } catch (error) {
      console.error("Erro ao baixar o arquivo:", error);
      Alert.alert("Erro", "Não foi possível baixar o arquivo.");
    }
  };

  const openFile = async (fileUri) => {
    try {
      const cUri = await FileSystem.getContentUriAsync(fileUri);
      console.log(cUri);
      await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        // Abre o arquivo no Excel usando o IntentLauncher
        data: cUri,
        flags: 1,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
    } catch (error) {
      console.error("Erro ao abrir o arquivo:", error);
      Alert.alert("Erro", "Não foi possível abrir o arquivo.");
    }
  };

  return (
    <>
      <Text ml={5} mt={6} mb={2} fontSize="md">
        Histórico de revisões:
      </Text>
      <ScrollView
        px={4}
        _contentContainerStyle={{
          bg: "white",
          w: "100%",
        }}
        style={{ backgroundColor: "white" }}
        height={400}
      >
        <VStack>
          {isLoading ? (
            <Spinner size={35} />
          ) : agendamentosCtx.agendamentos.length > 0 ? (
            <>
              <FlatList
                data={agendamentosCtx.agendamentos}
                renderItem={renderHistoricoItem}
                keyExtractor={(item) =>
                  item && item.id ? item.id : "fallback-key"
                }
                scrollEnabled={false}
              />
              <Button
                mt={2}
                title="Download do histórico"
                bg="green.600"
                onPress={download}
              />
            </>
          ) : (
            <Box
              bg="primary.600"
              p={4}
              rounded="md"
              _text={{
                fontSize: "md",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Não há revisões cadastradas
            </Box>
          )}
        </VStack>
      </ScrollView>
    </>
  );
}
