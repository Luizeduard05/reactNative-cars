import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon, IconButton, NativeBaseProvider } from "native-base";
import { Entypo } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

import Cadastrar from "./src/pages/Cadastrar";
import Login from "./src/pages/Login/index";
import TelaPrincipal from "./src/pages/TelaPrincipal";
import AgendamentoContextProvider from "./src/context/agendamento-context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AgendamentoContextProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Cadastro"
              component={Cadastrar}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="TelaPrincipal"
              component={TelaPrincipal}
              options={({ navigation }) => ({
                title: "",
                headerStyle: {
                  backgroundColor: "#0E7490",
                },
                headerTintColor: "#FFF",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                headerBackVisible: false,
                headerRight: () => (
                  <IconButton onPress={
                    async () => { // Limpando informações de login do usuario
                      await SecureStore.deleteItemAsync('email');
                      await SecureStore.deleteItemAsync('senha');
                      await SecureStore.deleteItemAsync('token');
                      navigation.navigate('Login');
                    }
                  }
                    icon={<Icon as={Entypo} name="log-out" />}
                    _icon={{ color: "muted.50", size: "md", }}
                  />
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </AgendamentoContextProvider >
  );
}
