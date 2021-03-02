import axios from 'axios';
import { useAuth } from 'hooks';

const client = axios.create({
  baseURL: 'http://localhost:5000/api',
});

client.interceptors.request.use((config) => {
  config.headers['Authorization'] = localStorage.getItem('jwt');
  return config;
});

client.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    const Helper = () => {
      useAuth().reportError(error.response.data.message);
    };
    Helper();
    return Promise.reject(error);
  },
);

export default client;
