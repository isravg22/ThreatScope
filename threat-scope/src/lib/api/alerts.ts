import { apiClient } from './client';
import { Alert, AlertFilters } from './types';

export const alertsService = {
  async getAll(filters?: AlertFilters): Promise<Alert[]> {
    const params = new URLSearchParams();
    
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.status) params.append('status', filters.status);

    const query = params.toString();
    const endpoint = query ? `/alerts?${query}` : '/alerts';
    
    return apiClient.get<Alert[]>(endpoint);
  },

  async getPending(): Promise<Alert[]> {
    return apiClient.get<Alert[]>('/alerts/pending');
  },

  async getById(id: string): Promise<Alert> {
    return apiClient.get<Alert>(`/alerts/${id}`);
  },

  async acknowledge(id: string, token: string): Promise<Alert> {
    return apiClient.post<Alert>(`/alerts/${id}/acknowledge`, {}, token);
  },

  async resolve(id: string, token: string): Promise<Alert> {
    return apiClient.post<Alert>(`/alerts/${id}/resolve`, {}, token);
  },

  async create(data: Partial<Alert>, token: string): Promise<Alert> {
    return apiClient.post<Alert>('/alerts', data, token);
  },
};
