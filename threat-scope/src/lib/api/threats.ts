
import { apiClient } from './client';
import { Threat, ThreatFilters } from './types';

export const threatsService = {
  async getAll(filters?: ThreatFilters): Promise<Threat[]> {
    const params = new URLSearchParams();
    
    if (filters?.type) params.append('type', filters.type);
    if (filters?.severity) params.append('severity', filters.severity);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);

    const query = params.toString();
    const endpoint = query ? `/threats?${query}` : '/threats';
    
    return apiClient.get<Threat[]>(endpoint);
  },

  async getById(id: string): Promise<Threat> {
    return apiClient.get<Threat>(`/threats/${id}`);
  },

  async getRecent(limit: number = 10): Promise<Threat[]> {
    return apiClient.get<Threat[]>(`/threats/recent?limit=${limit}`);
  },

  async getStatsByType(): Promise<{ type: string; count: number }[]> {
    return apiClient.get('/threats/stats/by-type');
  },

  async getStatsBySeverity(): Promise<{ severity: string; count: number }[]> {
    return apiClient.get('/threats/stats/by-severity');
  },

  async create(data: Partial<Threat>, token: string): Promise<Threat> {
    return apiClient.post<Threat>('/threats', data, token);
  },

  async update(id: string, data: Partial<Threat>, token: string): Promise<Threat> {
    return apiClient.patch<Threat>(`/threats/${id}`, data, token);
  },

  async delete(id: string, token: string): Promise<void> {
    return apiClient.delete(`/threats/${id}`, token);
  },
};
