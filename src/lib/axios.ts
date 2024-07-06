import axios, { AxiosInstance } from 'axios'

import { AppError } from '@/utils/AppError'

type SignOut = () => void

interface APIInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: 'http://192.168.1.2:3333',
}) as APIInstanceProps

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message))
      } else {
        return Promise.reject(error)
      }
    },
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

// api.interceptors.request.use(
//   (config) => {
//     console.log("DADOS ENVIADOS -> ", config.data);
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     console.log("DADOS RECEBIDOS -> ", response);

//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export { api }
