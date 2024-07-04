import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.2:3333",
});

api.interceptors.request.use(
  (config) => {
    console.log("DADOS ENVIADOS -> ", config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("DADOS RECEBIDOS -> ", response);

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };
