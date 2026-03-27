import api from './api';

export const institutionsService = {
  // ----- User Functions -----
  async getAll() {
    const { data } = await api.get('/institutions');
    return data;
  },

  async getRecommended(params: { domainIds?: string[]; country?: string; city?: string }) {
    const { data } = await api.get('/institutions/recommended', { params });
    return data;
  },

  // ----- Admin Functions -----
  async getOne(id: string) {
    const { data } = await api.get(`/institutions/${id}`);
    return data;
  },

  async create(institutionData: any) {
    const { data } = await api.post('/institutions', institutionData);
    return data;
  },

  async update(id: string, institutionData: any) {
    const { data } = await api.patch(`/institutions/${id}`, institutionData);
    return data;
  },

  async delete(id: string) {
    const { data } = await api.delete(`/institutions/${id}`);
    return data;
  }
};
