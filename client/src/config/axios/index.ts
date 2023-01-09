import axios, { AxiosRequestConfig } from 'axios';
import { BACKEND_URL } from './constants';

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    console.log('token: ', token?.slice(1, token.length - 1));
    if (token)
      config.headers!['Authorization'] =
        'Bearer ' + token?.slice(1, token.length - 1);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response.status === 401) {
//       await msalInstance.loginRedirect();
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
