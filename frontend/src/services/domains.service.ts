import api from './api';

export const domainsService = {
  async getAll() {
    const { data } = await api.get('/domains');
    return data;
  },
};
