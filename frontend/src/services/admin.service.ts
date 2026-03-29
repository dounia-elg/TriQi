import api from './api';

export type AdminDashboardStats = {
  totalUsers: number;
  activeQuestions: number;
  definedDomains: number;
  eliteInstitutions: number;
};

export const adminService = {
  async getDashboardStats(): Promise<AdminDashboardStats> {
    const { data } = await api.get<AdminDashboardStats>('/admin/stats');
    return data;
  },
};
