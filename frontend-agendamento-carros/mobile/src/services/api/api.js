import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  //endereço ipv4 da maquina: porta da API
  baseURL: "http://192.168.1.69:8080",
});

api.interceptors.response.use(
  async (response) => {
    // Interceptor para capturar o token
    if (response.config.url === "/api/auth/login") {
      // console.log(response)
      const token = response.data.token;
      // console.log(`response:  ${token}`)
      await SecureStore.setItemAsync("token", token); //Salvando no SecureStore
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  // Interceptor para enviar o token nas requisições
  async (config) => {
    const token = await SecureStore.getItemAsync("token");
    // console.log(`request:  ${token}`)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const addCadastroUsuario = (url, data = {}) => {
  return api.post(url, data);
};

const realizarLogin = (url, data = {}) => {
  return api.post(url, data);
};

const addNovaRevisão = (url, data = {}) => {
  return api.post(url, data);
};

const getRevisoes = (url) => {
  return api.get(url);
};

const deleteRevisao = (url) => {
  return api.delete(url);
};

const editarRevisao = (url, data = {}) => {
  return api.put(url, data);
};

const revisaoConcluida = (url) => {
  return api.put(url);
};

const downloadHistorico = (url) => {
  return api.get(url, {
    headers: {
      "Content-Disposition": "attachment; filename=agendamentos_usuario.xlsx",
      "Content-Type": "application/octet-stream",
    },
    responseType: "arraybuffer",
  });
};

export default api;
export {
  addCadastroUsuario,
  realizarLogin,
  addNovaRevisão,
  getRevisoes,
  deleteRevisao,
  editarRevisao,
  revisaoConcluida,
  downloadHistorico,
};
