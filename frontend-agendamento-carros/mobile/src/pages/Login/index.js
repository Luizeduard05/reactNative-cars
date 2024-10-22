import {
  VStack,
  Heading,
  Center,
  Text,
  HStack,
  Icon,
  Link,
  Box,
  FormControl,
  Button as ButtonNativeBase,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "../../components/UI/Input";
import { Button } from "../../components/UI/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import { validaEmail, validaSenha } from "../../utils/InputValidation";
import { realizarLogin } from "../../services/api/api";
import { Alert } from "react-native";

import * as SecureStore from "expo-secure-store";

export default function Login() {
  const navigation = useNavigation();
  const [formData, setData] = useState({ email: "", senha: "" }); // capturar os dados dos inputs
  const [errors, setErrors] = useState({}); // fornecer mensagens de erro dos inputs
  const [touched, setTouched] = useState({}); // monitorar se o campo foi clicado pelo usuario
  const [isLoading, setIsLoading] = useState(false);

  const verifyUser = async () => {
    try {
      setIsLoading(true);
      const dadosLogin = {
        email: formData.email,
        senha: formData.senha,
      };
      await SecureStore.setItemAsync("email", dadosLogin.email); // Armazenando email no SecureStore
      await SecureStore.setItemAsync("senha", dadosLogin.senha); // Armazenando senha no SecureStore
      response = await realizarLogin("/api/auth/login", dadosLogin);
      setIsLoading(false);
      navigation.navigate("TelaPrincipal");
      clearFormulario();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "E-mail ou senha incorretos.");
      setIsLoading(false);
    }
  };

  const recuperarLogin = async () => {
    // Caso o usuario não tenha deslogado recuperar dados da conta
    const email = await SecureStore.getItemAsync("email");
    // console.log(`Dentro: ${email}`)
    if (email != "" && email != null) {
      const email = await SecureStore.getItemAsync("email"); // Recuperando email no SecureStore
      const senha = await SecureStore.getItemAsync("senha"); // Recuperando senha no SecureStore
      navigation.navigate("TelaPrincipal");
      const dadosLogin = {
        email: email,
        senha: senha,
      };
      return { dadosLogin };
    }
  };

  useEffect(() => {
    // Chamando função de recuperar login com a condicional do token
    recuperarLogin();
  }, []);

  const validate = () => {
    // aplicando validação nos campos
    const emailError = validaEmail(formData.email);
    const senhaError = validaSenha(formData.senha);
    setErrors({ email: emailError, senha: senhaError });
    return !(emailError || senhaError);
  };

  const inputChange = (field, value) => {
    // alterando informações de data toda vez que houver mudança no campo
    setData({ ...formData, [field]: value });
  };

  useEffect(() => {
    // monitorando toda vez que o campo for clicado atualizar
    const emailError = touched.email ? validaEmail(formData.email) : null;
    const senhaError = touched.senha ? validaSenha(formData.senha) : null;
    setErrors({ email: emailError, senha: senhaError });
  }, [touched, formData]);

  const clearFormulario = () => {
    setData({ email: "", senha: "" });
    setErrors({});
    setTouched({});
  };

  // Resetar formulário quando a tela de login receber foco
  useFocusEffect(
    useCallback(() => {
      clearFormulario(); // Limpa o formulário e a validação
    }, [])
  );

  const onSubmit = () => {
    setTouched({ email: true, senha: true });
    if (validate()) {
      verifyUser();
    }
  };
  const navegaCadastrar = () => {
    navigation.navigate("Cadastro");
  };
  return (
    <Center bgColor="cyan.700" flex={1}>
      <Center
        mx={10}
        px={4}
        bgColor="gray.200"
        style={{ borderRadius: 10 }}
        opacity={0.9}
      >
        <Box safeArea p="2" py="8" w="90%" maxW="290" justifyContent="center">
          <Center>
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{ color: "warmGray.50" }}
            >
              Bem Vindo!
            </Heading>
            <Heading
              mt="5"
              _dark={{ color: "warmGray.200" }}
              color="coolGray.600"
              fontWeight="medium"
              size="sm"
            >
              Acompanhe informações sobre seu veículo
            </Heading>
            <Heading
              mt="5"
              _dark={{ color: "warmGray.200" }}
              color="coolGray.600"
              fontWeight="medium"
              size="sm"
            >
              Realize login para prosseguir
            </Heading>
          </Center>
          <VStack space={3} mt="5">
            <FormControl isRequired isInvalid={!!errors.email}>
              <Input
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => inputChange("email", value)}
                onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              />
              {errors.email && (
                <FormControl.ErrorMessage>
                  {errors.email}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.senha}>
              <Input
                placeholder="Senha"
                value={formData.senha}
                type="password"
                onChangeText={(value) => inputChange("senha", value)}
                onBlur={() => setTouched((prev) => ({ ...prev, senha: true }))}
              />
              {errors.senha && (
                <FormControl.ErrorMessage>
                  {errors.senha}
                </FormControl.ErrorMessage>
              )}

              <HStack mt="6" justifyContent="center">
                <Text
                  mx={8}
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{ color: "warmGray.200" }}
                >
                  Não tem login?{" "}
                </Text>
                <Link
                  mx={8}
                  _text={{
                    color: "green.600",
                    fontWeight: "medium",
                    fontSize: "sm",
                  }}
                  onPress={navegaCadastrar}
                >
                  Cadastre-se
                </Link>
              </HStack>
            </FormControl>
            {isLoading ? (
              <ButtonNativeBase
                spinnerPlacement="end"
                isLoading
                isLoadingText="Carregando"
                _loading={{
                  bg: "green.600",
                  _text: {
                    color: "white",
                  },
                }}
                _spinner={{
                  color: "white",
                }}
              >
                Button
              </ButtonNativeBase>
            ) : (
              <Button
                onPress={onSubmit}
                title="Acessar"
                bg="green.600"
                mt={5}
                endIcon={
                  <Icon
                    as={Ionicons}
                    name="log-in-outline"
                    size="lg"
                    color="gray.50"
                  />
                }
              />
            )}
          </VStack>
        </Box>
      </Center>
    </Center>
  );
}
