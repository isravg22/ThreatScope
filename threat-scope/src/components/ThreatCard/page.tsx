import { Threat } from '@/lib/api/types';

interface ThreatCardProps {
  threat: Threat;
}

export default function ThreatCard({ threat }: ThreatCardProps) {
  
  const severityConfig = {
    critical: {
      border: '#ef4444',
      text: '#991b1b',
      bg: '#fee2e2',
      badgeBg: '#ef4444',
      badgeText: '#fff'
    },
    high: {
      border: '#f97316',
      text: '#9a3412',
      bg: '#fed7aa',
      badgeBg: '#f97316',
      badgeText: '#fff'
    },
    medium: {
      border: '#eab308',
      text: '#854d0e',
      bg: '#fef3c7',
      badgeBg: '#eab308',
      badgeText: '#fff'
    },
    low: {
      border: '#3b82f6',
      text: '#1e40af',
      bg: '#dbeafe',
      badgeBg: '#3b82f6',
      badgeText: '#fff'
    },
  };

  const statusConfig = {
    active: { color: '#ef4444', bg: '#fee2e2', label: 'Activo', icon: '⚠️' },
    investigating: { color: '#f59e0b', bg: '#fef3c7', label: 'Investigando', icon: '🔍' },
    mitigated: { color: '#10b981', bg: '#d1fae5', label: 'Mitigado', icon: '✅' },
    resolved: { color: '#6b7280', bg: '#f3f4f6', label: 'Resuelto', icon: '✔️' },
  };

  const typeConfig: Record<string, { label: string; icon: string }> = {
    malware: { label: 'Malware', icon: '🦠' },
    phishing: { label: 'Phishing', icon: '🎣' },
    ransomware: { label: 'Ransomware', icon: '🔒' },
    ddos: { label: 'DDoS', icon: '💥' },
    data_breach: { label: 'Filtración de Datos', icon: '📂' },
    zero_day: { label: 'Zero Day', icon: '⚡' },
    apt: { label: 'APT', icon: '🎯' },
    other: { label: 'Otro', icon: '❓' },
  };

  const severity = severityConfig[threat.severity] || severityConfig.medium;
  const status = statusConfig[threat.status] || statusConfig.active;
  const type = typeConfig[threat.type] || typeConfig.other;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
      e.currentTarget.style.transform = 'translateY(-4px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = '#e5e7eb';
    }}
    >
      <div style={{
        height: '4px',
      }}></div>

      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#111827',
            margin: '0 0 12px 0',
            lineHeight: '1.4',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {threat.title}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            <span style={{
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700',
              backgroundColor: severity.badgeBg,
              color: severity.badgeText,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {threat.severity}
            </span>
            <span style={{
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              {type.icon} {type.label}
            </span>
          </div>
        </div>

        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#6b7280',
          margin: '0 0 16px 0',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          flex: 1
        }}>
          {threat.description}
        </p>

        <div style={{
          padding: '12px',
          borderRadius: '10px',
          backgroundColor: status.bg,
          border: `1px solid ${status.color}30`,
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>{status.icon}</span>
            <div style={{ flex: 1 }}>
              <span style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Estado
              </span>
              <div style={{
                fontSize: '14px',
                fontWeight: '700',
                color: status.color,
                marginTop: '2px'
              }}>
                {status.label}
              </div>
            </div>
          </div>
        </div>

        {threat.indicators && threat.indicators.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              fontSize: '11px',
              fontWeight: '700',
              color: '#374151',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              🔍 Indicadores de Compromiso
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {threat.indicators.slice(0, 2).map((indicator, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: '#f9fafb',
                    color: '#374151',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    fontWeight: '600',
                    border: '1px solid #e5e7eb',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {indicator}
                </span>
              ))}
              {threat.indicators.length > 2 && (
                <span style={{
                  fontSize: '11px',
                  color: '#6b7280',
                  padding: '6px 10px',
                  fontWeight: '600',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '6px'
                }}>
                  +{threat.indicators.length - 2} más
                </span>
              )}
            </div>
          </div>
        )}

        <div style={{
          paddingTop: '16px',
          borderTop: '1px solid #f3f4f6',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '8px',
          fontSize: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#9ca3af', fontWeight: '500' }}>📅 Detectado:</span>
            <span style={{ color: '#374151', fontWeight: '700' }}>
              {formatDate(threat.detectedAt)}
            </span>
          </div>
          {threat.source && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#9ca3af', fontWeight: '500' }}>📡 Fuente:</span>
              <span style={{
                color: '#6366f1',
                fontWeight: '700',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {threat.source.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
