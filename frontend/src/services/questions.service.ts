import api from './api';

export const questionsService = {
  async getActive() {
    const { data } = await api.get('/questions');
    return data;
  },

  async getAllAdmin() {
    const { data } = await api.get('/questions/admin');
    return data;
  },

  async getOne(id: string) {
    const { data } = await api.get(`/questions/${id}`);
    return data;
  },

  async create(questionData: any) {
    const { data } = await api.post('/questions', questionData);
    return data;
  },

  async update(id: string, questionData: any) {
    const { data } = await api.patch(`/questions/${id}`, questionData);
    return data;
  },

  async delete(id: string) {
    const { data } = await api.delete(`/questions/${id}`);
    return data;
  }
};
