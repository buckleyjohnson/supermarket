import { api } from '../app/axios';

export const register = (email: string, password: string) =>
    api.post('/auth/register', { email, password });

export const login = (email: string, password: string) =>
    api.post('/auth/login', { email, password });

export const account = () => api.get('/auth/account');
