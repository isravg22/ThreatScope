'use client';

import { Alert } from '@/lib/api/types';
import Link from 'next/link';

interface AlertCardProps {
  alert: Alert;
}

export default function AlertCard({ alert }: AlertCardProps) {
  // Colores por prioridad
  const priorityConfig = {
    critical: { bg: '#fef2f2', border: '#ef4444', text: '#dc2626', label: 'CRÍTICA' },
    high: { bg: '#fff7ed', border: '#f97316', text: '#ea580c', label: 'ALTA' },
    medium: { bg: '#fef9c3', border: '#eab308', text: '#ca8a04', label: 'MEDIA' },
    low: { bg: '#f0f9ff', border: '#3b82f6', text: '#2563eb', label: 'BAJA' },
  };

  // Colores por estado
  const statusConfig = {
    pending: { bg: '#fef2f2', text: '#dc2626', label: '⏳ Pendiente' },
    acknowledged: { bg: '#fff7ed', text: '#ea580c', label: '👀 Reconocida' },
    in_progress: { bg: '#fef9c3', text: '#ca8a04', label: '⚙️ En Progreso' },
    resolved: { bg: '#f0fdf4', text: '#16a34a', label: '✅ Resuelta' },
  };

  const priority = priorityConfig[alert.priority as keyof typeof priorityConfig] || priorityConfig.medium;
  const status = statusConfig[alert.status as keyof typeof statusConfig] || statusConfig.pending;

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        border: `3px solid ${priority.border}`,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <span
          style={{
            padding: '4px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '600',
            backgroundColor: priority.bg,
            color: priority.text,
            border: `1px solid ${priority.border}`,
          }}
        >
          🚨 {priority.label}
        </span>
        <span
          style={{
            padding: '4px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '500',
            backgroundColor: status.bg,
            color: status.text,
          }}
        >
          {status.label}
        </span>
      </div>

      <h3
        style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '10px',
          lineHeight: '1.4',
        }}
      >
        {alert.title}
      </h3>

      <p
        style={{
          fontSize: '14px',
          color: '#6b7280',
          lineHeight: '1.6',
          marginBottom: '16px',
        }}
      >
        {alert.message}
      </p>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '12px' }}>
        {alert.threat && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '16px' }}>⚠️</span>
            <span style={{ fontSize: '13px', color: '#4b5563' }}>
              <strong>Amenaza:</strong> {alert.threat.title}
            </span>
          </div>
        )}
        
        {alert.assignedTo && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '16px' }}>👤</span>
            <span style={{ fontSize: '13px', color: '#4b5563' }}>
              <strong>Asignado a:</strong> {alert.assignedTo.name}
            </span>
          </div>
        )}
      </div>

      <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '12px' }}>
        📅 {new Date(alert.createdAt).toLocaleString('es-ES', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>

      {alert.threat && (
        <Link
          href="/Events"
          style={{
            display: 'inline-block',
            marginTop: '12px',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: '500',
            color: '#667eea',
            textDecoration: 'none',
            border: '1px solid #667eea',
            borderRadius: '6px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#667eea';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#667eea';
          }}
        >
          Ver amenaza relacionada →
        </Link>
      )}
    </div>
  );
}
