import api from './api';

export const roadmapsService = {
  async generate(durationMonths: number) {
    const { data } = await api.post('/roadmaps/generate', { durationMonths });
    return data;
  },

  async getMyRoadmap() {
    const { data } = await api.get('/roadmaps/my');
    return data;
  },

  async updateTaskStatus(taskId: string, status: 'PENDING' | 'DONE') {
    const { data } = await api.patch(`/roadmaps/tasks/${taskId}`, { status });
    return data;
  },
};
