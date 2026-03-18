import api from './api';

export const categoriesService = {
  async getAll() {
    const { data } = await api.get('/categories');
    return data;
  },

  async getOne(id: string) {
    const { data } = await api.get(`/categories/${id}`);
    return data;
  },
};
