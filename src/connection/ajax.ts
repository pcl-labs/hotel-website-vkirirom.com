import { BASE_API } from '@/constants/connection';
import axios from 'axios';
import store from '@/store';
import { getAuthHeaders } from '@/helpers';

const ajax = axios.create({
  baseURL: BASE_API,
  timeout: 20000
});

ajax.defaults.headers = {
  withCredentials: true,
  'Content-Type': 'application/json'
  // 'Accept-Language': 'en-US,en;q=0.5'
};

ajax.interceptors.request.use(
  config => {
    store.commit('loading/loading', true);
    config = addAuthHeaders(config);
    return config;
  },
  error => {
    store.commit('loading/loading', false);
    return Promise.reject(error);
  }
);
ajax.interceptors.response.use(
  response => {
    store.commit('loading/loading', false);
    return response;
  },
  error => {
    store.commit('loading/loading', false);
    return Promise.reject(error);
  }
);

export { ajax };

function addAuthHeaders(config) {
  const authHeaders = getAuthHeaders();
  if (authHeaders) {
    config.headers = { ...config.headers, ...authHeaders };
  }
  return config;
}
