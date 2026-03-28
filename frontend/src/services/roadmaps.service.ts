import api from './api';

export type TaskStatus = 'PENDING' | 'DONE';

export interface RoadmapTask {
_id: string;
title: string;
description: string;
status: TaskStatus;
tip?: string;
}
export interface RoadmapWeek {
weekNumber: number;
theme: string;
tasks: RoadmapTask[];
}

export interface Roadmap {
_id: string;
userId: string;
resultId: string;
topDomains: string[];
durationMonths: 3 | 6;
weeks: RoadmapWeek[];
progressPercent: number;
isEnriched: boolean;
createdAt: string;
updatedAt: string;
}
export interface RoadmapStats {
hasRoadmap: boolean;
progressPercent: number;
totalTasks: number;
doneTasks: number;
pendingTasks: number;
totalWeeks: number;
durationMonths: number;
topDomains: string[];
}

export const roadmapsService = {
async generate(durationMonths: 3 | 6) {
const { data } = await api.post<Roadmap>('/roadmaps/generate', { durationMonths });
return data;
},
async getMyRoadmap() {
const { data } = await api.get<Roadmap | null>('/roadmaps/my');
return data;
},

async getStats() {
const { data } = await api.get<RoadmapStats>('/roadmaps/me/stats');
return data;
},

async updateTaskStatus(taskId: string, status: TaskStatus) {
const { data } = await api.patch<Roadmap>(`/roadmaps/tasks/${taskId}`, { status });
return data;
},

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
},
};