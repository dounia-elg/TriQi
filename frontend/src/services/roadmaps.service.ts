import api from './api';

export const roadmapsService = {
  // ----- User Functions -----
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

  // ----- Admin Template Functions -----
  async getTemplates() {
    const { data } = await api.get('/roadmap-templates');
    return data;
  },

  async getTemplate(id: string) {
    const { data } = await api.get(`/roadmap-templates/${id}`);
    return data;
  },

  async createTemplate(templateData: any) {
    const { data } = await api.post('/roadmap-templates', templateData);
    return data;
  },

  async updateTemplate(id: string, templateData: any) {
    const { data } = await api.patch(`/roadmap-templates/${id}`, templateData);
    return data;
  },

  async deleteTemplate(id: string) {
    const { data } = await api.delete(`/roadmap-templates/${id}`);
    return data;
  }
};
