import api from './api';

export const institutionsService = {
  async getAll() {
    const { data } = await api.get('/institutions');
    return data;
  },

  async getRecommended(params: { domainIds?: string[]; country?: string; city?: string }) {
    const { data } = await api.get('/institutions/recommended', { params });
    return data;
  },
};
