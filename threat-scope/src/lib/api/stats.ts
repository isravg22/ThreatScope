
import { apiClient } from './client';
import { DashboardStats } from './types';

export const statsService = {
  async getDashboard(): Promise<DashboardStats> {
    return apiClient.get<DashboardStats>('/stats/dashboard');
  },

  async getThreatsByType(): Promise<{ type: string; count: number }[]> {
    return apiClient.get('/stats/threats/by-type');
  },
  
  async getThreatsBySeverity(): Promise<{ severity: string; count: number }[]> {
    return apiClient.get('/stats/threats/by-severity');
  },

  async getThreatsBySource(): Promise<{ source: string; count: number }[]> {
    return apiClient.get('/stats/threats/by-source');
  },

  async getAlertsByPriority(): Promise<{ priority: string; count: number }[]> {
    return apiClient.get('/stats/alerts/by-priority');
  },

  async getAlertsByStatus(): Promise<{ status: string; count: number }[]> {
    return apiClient.get('/stats/alerts/by-status');
  },

  async getRecentActivity(): Promise<{
    threats: unknown[];
    alerts: unknown[];
  }> {
    return apiClient.get('/stats/recent-activity');
  },
};
