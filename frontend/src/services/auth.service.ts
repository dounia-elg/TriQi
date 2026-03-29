import api from './api';
import { User } from '@/types/auth.types';

export type UpdateProfilePayload = {
  firstName?: string;
  lastName?: string;
  educationLevel?: string;
  ageRange?: string;
  city?: string;
  goal?: string;
  language?: string;
};

export const authService = {
  async login(credentials: any) {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },

  async register(userData: any) {
    const { data } = await api.post('/auth/register', userData);
    return data;
  },

  async getProfile(userId: string) {
    const { data } = await api.get(`/auth/profile/${userId}`);
    return data;
  },

  async updateProfile(payload: UpdateProfilePayload) {
    const { data } = await api.patch<User>('/auth/profile', payload);
    return data;
  },
};
