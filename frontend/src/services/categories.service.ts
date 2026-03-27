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

  async create(categoryData: { name: string; description?: string }) {
    const { data } = await api.post('/categories', categoryData);
    return data;
  },

  async update(id: string, categoryData: { name: string; description?: string }) {
    const { data } = await api.patch(`/categories/${id}`, categoryData);
    return data;
  },

  async delete(id: string) {
    const { data } = await api.delete(`/categories/${id}`);
    return data;
  }
};
