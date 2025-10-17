
import { apiClient } from './client';
import { Source } from './types';

export const sourcesService = {
  
  async getAll(): Promise<Source[]> {
    return apiClient.get<Source[]>('/sources');
  },

  
  async getActive(): Promise<Source[]> {
    return apiClient.get<Source[]>('/sources/active');
  },

  
  async getById(id: string): Promise<Source> {
    return apiClient.get<Source>(`/sources/${id}`);
  },

  
  async sync(id: string, token: string): Promise<Source> {
    return apiClient.post<Source>(`/sources/${id}/sync`, {}, token);
  },

  async create(data: Partial<Source>, token: string): Promise<Source> {
    return apiClient.post<Source>('/sources', data, token);
  },

  async update(id: string, data: Partial<Source>, token: string): Promise<Source> {
    return apiClient.patch<Source>(`/sources/${id}`, data, token);
  },

  async delete(id: string, token: string): Promise<void> {
    return apiClient.delete(`/sources/${id}`, token);
  },
};
