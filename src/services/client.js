import axios from 'axios';
import store from '../redux/store';
import { setMessage } from '../redux/actions';

const API =
  process.env.NODE_ENV === 'production'
    ? 'https://bardu-server.herokuapp.com/api'
    : 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API,
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
    const isLoginPage = window.location.pathname.includes('login');
    const isGettingSession =
      error?.response?.config?.method === 'get' &&
      error.response.config.url === '/users/auth';

    if ((isLoginPage && !isGettingSession) || !isLoginPage) {
      store.dispatch(setMessage(error?.response?.data?.message, 'danger'));

      setTimeout(() => {
        store.dispatch(setMessage('', 'success'));
      }, 5000);
    }
    return Promise.reject(error);
  },
);

export default client;
