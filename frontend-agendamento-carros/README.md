# Revisão de Carros
Aplicação desenvolvida com React Native e Spring Boot, tem como objetivo gerenciar revisões e serviços de carros, onde é possivel o usuário realizar seu cadastro e após login, agendar uma revisão, ver todas as suas revisões cadastradas, alterar o modelo do carro e o tipo de serviço, excluir uma revisão, marcar uma revisão como concluída e fazer o download do histórico de revisões.
## 📱 Começando
Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.
### :clipboard: Pré-requisitos
Para conseguir seguir este README e rodar o projeto você pode precisar dos seguintes itens:
- Git para clonar o projeto e acessar as branches. Você pode instalar [aqui](https://git-scm.com/downloads);
- Node para podermos rodar `expo` e `npm`. Você pode instala-lo [aqui](https://nodejs.org/en/);
- Um celular Android ou iOS com o aplicativo Expo instalado, ou então algum simulador Android ou iOS no computador;
### :wrench: Instalação
Uma série de exemplos passo-a-passo que informam o que você deve executar para ter um ambiente de desenvolvimento em execução.
1. Clone o repositório:
```
   git clone https://github.ibm.com/kellysouza/frontend-agendamento-carros.git
```
2. Navegue até o diretório do projeto:
```
    cd frontend-agendamento-carros/mobile
```
3. Instale as dependências:
```
    npm install
```
## 📱 Rodando a aplicação
1. Inicie a API Spring Boot seguindo as instruções do link:
```
 https://github.ibm.com/caroline-dmp/backend-agendamento-carros/blob/develop/README.md
```
2. Para obter seu ipv4, digite em seu cmd:
```
ipconfig
```
`o resultado será algo parecido com  IPv4 Address. . . . . . . . . . . : 192.186.1.40`
 
3. Navegue até o diretório frontend-agendamento-carros/mobile/src/services/api/api.js e substiua o valor pelo seu ipv4
```
const api = axios.create({
  //endereço ipv4 da maquina: porta da API
  baseURL: "http://{seuipv4aqui}:8080",
});
```
4. Execute no terminal o seguinte comando para executar a aplicação
```
npx expo start
```
5. Escaneie o QR code para abrir o projeto em um dispositivo móvel com o aplicativo Expo Go ou inicialize em um emulador mobile. 

## :hammer_and_wrench: Principais Ferramentas
* [React Native](https://reactnative.dev/) - Biblioteca web usada
* [Expo](https://docs.expo.dev/) - Ferramenta de construção de projetos frontend mobile
* [Axios](https://axios-http.com/docs/intro) - Biblioteca usada para auxiliar nas requisições feitas para a API
* [Datetimepicker](https://www.npmjs.com/package/@react-native-community/datetimepicker) - Biblioteca usada para exibir calendário e relógio
* [Native Base](https://nativebase.io/) - Usado para gerar componentes de forma rápida e simples

## 🤝 Colaboradores

| Colaboradores                | Github                               |
| :----------:                 | :----------:                         |
| Caroline de Marchi Petherson | https://github.ibm.com/caroline-dmp  |
| Ellen Ulrick                 | https://github.ibm.com/Ellenulrick   |
| Kelly Souza                  | https://github.ibm.com/kellysouza    |
| Luiz Eduardo                 | https://github.ibm.com/Luiz-Eduardo1 |
| Nicole Zaplana               | https://github.ibm.com/Nicole-Zaplana|

