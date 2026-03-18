import api from './api';

export const questionsService = {
  async getActive() {
    const { data } = await api.get('/questions');
    return data;
  },
};
