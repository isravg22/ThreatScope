
export enum ThreatType {
  MALWARE = 'malware',
  PHISHING = 'phishing',
  RANSOMWARE = 'ransomware',
  DDOS = 'ddos',
  DATA_BREACH = 'data_breach',
  ZERO_DAY = 'zero_day',
  APT = 'apt',
  OTHER = 'other',
}

export enum ThreatSeverity {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum ThreatStatus {
  ACTIVE = 'active',
  MITIGATED = 'mitigated',
  RESOLVED = 'resolved',
  INVESTIGATING = 'investigating',
}

export enum AlertPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  INFO = 'info',
}

export enum AlertStatus {
  PENDING = 'pending',
  ACKNOWLEDGED = 'acknowledged',
  INVESTIGATING = 'investigating',
  RESOLVED = 'resolved',
  DISMISSED = 'dismissed',
}

export enum SourceType {
  FEED = 'feed',
  API = 'api',
  MANUAL = 'manual',
  HONEYPOT = 'honeypot',
  SIEM = 'siem',
}

export interface Threat {
  id: string;
  title: string;
  description: string;
  type: ThreatType;
  severity: ThreatSeverity;
  status: ThreatStatus;
  indicators: string[];
  detectedAt: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
  source?: Source;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  priority: AlertPriority;
  status: AlertStatus;
  acknowledgedAt?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
  threat?: Threat;
  threatId?: string;
  assignedTo?: User;
  assignedToId?: string;
}

export interface Source {
  id: string;
  name: string;
  type: SourceType;
  url?: string;
  status: string;
  lastSync?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalThreats: number;
  activeThreats: number;
  totalAlerts: number;
  pendingAlerts: number;
  totalSources: number;
  activeSources: number;
}

export interface ThreatFilters {
  type?: ThreatType;
  severity?: ThreatSeverity;
  status?: ThreatStatus;
  search?: string;
}

export interface AlertFilters {
  priority?: AlertPriority;
  status?: AlertStatus;
}
