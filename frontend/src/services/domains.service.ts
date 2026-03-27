import api from './api';

export const domainsService = {
  async getAll() {
    const { data } = await api.get('/domains');
    return data;
  },

  async getOne(id: string) {
    const { data } = await api.get(`/domains/${id}`);
    return data;
  },

  async create(domainData: { name: string; description: string; categoryId: string; skills: string[]; isActive: boolean }) {
    const { data } = await api.post('/domains', domainData);
    return data;
  },

  async update(id: string, domainData: { name?: string; description?: string; categoryId?: string; skills?: string[]; isActive?: boolean }) {
    const { data } = await api.patch(`/domains/${id}`, domainData);
    return data;
  },

  async delete(id: string) {
    const { data } = await api.delete(`/domains/${id}`);
    return data;
  }
};
