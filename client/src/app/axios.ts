//client/src/app/axios.ts
import axios from 'axios';

export const api = axios.create();

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
