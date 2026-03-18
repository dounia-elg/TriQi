import api from './api';

export const resultsService = {
  async submit(answers: any) {
    const { data } = await api.post('/results/submit', { answers });
    return data;
  },

  async getHistory() {
    const { data } = await api.get('/results/my');
    return data;
  },

  async getLatest() {
    const { data } = await api.get('/results/my/latest');
    return data;
  },
};
