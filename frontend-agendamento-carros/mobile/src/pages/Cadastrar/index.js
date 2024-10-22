import {
  VStack,
  Heading,
  Center,
  Text,
  HStack,
  Link,
  Box,
  FormControl,
  Toast,
  Button as ButtonNativeBase,
} from "native-base";

import { Input } from "../../components/UI/Input";
import { Button } from "./../../components/UI/Button";

import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  validaEmail,
  validaNome,
  validaSenha,
  validaTelefone,
} from "../../utils/InputValidation";

import { addCadastroUsuario } from "../../services/api/api";

export default function Cadastrar() {
  const navigation = useNavigation(); // armazenando o useNavigation
  const [formData, setData] = useState({}); // capturar os dados dos inputs
  const [errors, setErrors] = useState({}); // fornecer mensagens de erro dos inputs
  const [touched, setTouched] = useState({}); // monitorar se o campo foi clicado pelo usuario
  const [isLoading, setIsLoading] = useState(false);

  const addNovoUsuario = async () => {
    try {
      setIsLoading(true);
      const novoCadastro = {
        nome: formData.nome,
        telefone: formData.telefone,
        email: formData.email,
        senha: formData.senha,
      };
      // console.log(novoCadastro)
      await addCadastroUsuario("/api/usuarios", novoCadastro);
      setIsLoading(false);
      if (validate()) {
        navegaLogin();
        Toast.show({
          description: "Usuário cadastrado com sucesso!",
          duration: 5000,
          placement: "top",
          bg: "success.400",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Toast.show({
        description: "Erro ao realizar cadastro! Tente novamente.",
        duration: 5000,
        placement: "top",
        bg: "error.500",
      });
    }
  };

  const validate = () => {
    const nomeError = validaNome(formData.nome);
    const telefoneError = validaTelefone(formData.telefone);
    const emailError = validaEmail(formData.email);
    const senhaError = validaSenha(formData.senha);

    setErrors({
      nome: nomeError,
      telefone: telefoneError,
      email: emailError,
      senha: senhaError,
    });
    return !(nomeError || telefoneError || emailError || senhaError);
  };

  const inputChange = (field, value) => {
    // alterando informações de data toda vez que houver mudança no campo
    setData({ ...formData, [field]: value });
  };

  useEffect(() => {
    // mudando mensagem de erro quando houver interação com o campo
    if (touched.nome || touched.telefone || touched.email || touched.senha) {
      const nomeError = validaNome(formData.nome);
      const telefoneError = validaTelefone(formData.telefone);
      const emailError = validaEmail(formData.email);
      const senhaError = validaSenha(formData.senha);
      setErrors({
        nome: nomeError,
        telefone: telefoneError,
        email: emailError,
        senha: senhaError,
      });
    }
  }, [
    formData.nome,
    formData.telefone,
    formData.email,
    formData.senha,
    touched,
  ]);

  const onSubmit = () => {
    setTouched({ nome: true, telefone: true, email: true, senha: true });
    addNovoUsuario();
  };

  const navegaLogin = () => {
    navigation.navigate("Login"); // realizando navegação atraves do navigation
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
              _dark={{
                color: "warmGray.50",
              }}
            >
              Realize seu cadastro
            </Heading>

            <Heading
              mt="5"
              _dark={{
                color: "warmGray.200",
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="sm"
            >
              Preencha todos os campos abaixo para concluir o cadastro
            </Heading>
          </Center>

          <VStack space={3} mt="5">
            <FormControl isRequired isInvalid={!!errors.nome}>
              <Input
                placeholder="Nome"
                value={formData.nome}
                onChangeText={(value) => inputChange("nome", value)}
                onBlur={() => setTouched((prev) => ({ ...prev, nome: true }))}
              />
              {errors.nome && (
                <FormControl.ErrorMessage>
                  {errors.nome}
                </FormControl.ErrorMessage>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.telefone}>
              <Input
                placeholder="Telefone"
                maxLength={11}
                value={formData.telefone}
                onChangeText={(value) => inputChange("telefone", value)}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, telefone: true }))
                }
              />
              {errors.telefone && (
                <FormControl.ErrorMessage>
                  {errors.telefone}
                </FormControl.ErrorMessage>
              )}
            </FormControl>

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
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  Já possui cadastro?{" "}
                </Text>
                <Link
                  mx={8}
                  _text={{
                    color: "green.600",
                    fontWeight: "medium",
                    fontSize: "sm",
                  }}
                  onPress={navegaLogin}
                >
                  Ir para Login
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
                title="Cadastrar"
                bg="green.600"
                mt={5}
              />
            )}
          </VStack>
        </Box>
      </Center>
    </Center>
  );
}
