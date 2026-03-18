import api from './api';
import { User } from '@/types/auth.types';

export const authService = {
  async login(credentials: any) {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },

  async register(userData: any) {
    const { data } = await api.post('/auth/register', userData);
    return data;
  },
};
