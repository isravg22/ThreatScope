
import { Source } from '@/lib/api/types';

interface SourceCardProps {
  source: Source;
}

export default function SourceCard({ source }: SourceCardProps) {
  
  const typeConfig: Record<string, { 
    label: string; 
    bgColor: string; 
    textColor: string;
    borderColor: string;
    icon: string;
  }> = {
    feed: { 
      label: 'Feed RSS', 
      bgColor: '#dbeafe', 
      textColor: '#1e40af',
      borderColor: '#3b82f6',
      icon: '📡'
    },
    api: { 
      label: 'API Externa', 
      bgColor: '#d1fae5', 
      textColor: '#065f46',
      borderColor: '#10b981',
      icon: '🔌'
    },
    manual: { 
      label: 'Entrada Manual', 
      bgColor: '#fef3c7', 
      textColor: '#92400e',
      borderColor: '#f59e0b',
      icon: '✍️'
    },
    honeypot: { 
      label: 'Honeypot', 
      bgColor: '#e9d5ff', 
      textColor: '#6b21a8',
      borderColor: '#a855f7',
      icon: '🍯'
    },
    siem: { 
      label: 'SIEM', 
      bgColor: '#e0e7ff', 
      textColor: '#3730a3',
      borderColor: '#6366f1',
      icon: '🛡️'
    },
  };

  const config = typeConfig[source.type] || typeConfig.manual;
  const isActive = source.status === 'active';

  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div style={{ 
      backgroundColor: '#fff', 
      borderRadius: '10px', 
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
      padding: '24px',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
    >
      
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        height: '4px', 
        backgroundColor: config.borderColor 
      }}></div>

      
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
        <div style={{ 
          fontSize: '32px', 
          lineHeight: '1',
          flexShrink: 0
        }}>
          {config.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#111827', 
            margin: '0 0 8px 0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {source.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ 
              padding: '4px 12px', 
              borderRadius: '9999px', 
              fontSize: '12px', 
              fontWeight: '600',
              backgroundColor: config.bgColor,
              color: config.textColor
            }}>
              {config.label}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                backgroundColor: isActive ? '#10b981' : '#9ca3af'
              }}></span>
              <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
                {isActive ? 'Activa' : 'Inactiva'}
              </span>
            </div>
          </div>
        </div>
      </div>

      
      {source.url && (
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
            URL de la fuente:
          </span>
          <div style={{ 
            backgroundColor: '#f9fafb', 
            borderRadius: '6px', 
            padding: '8px 12px',
            border: '1px solid #e5e7eb'
          }}>
            <code style={{ 
              fontSize: '12px', 
              color: '#6b7280', 
              wordBreak: 'break-all',
              fontFamily: 'monospace'
            }}>
              {source.url}
            </code>
          </div>
        </div>
      )}

      
      <div style={{ 
        paddingTop: '16px', 
        borderTop: '1px solid #f3f4f6',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>Creada:</span>
          <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600' }}>
            {formatDate(source.createdAt)}
          </span>
        </div>
        {source.lastSync && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>Última sync:</span>
            <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600' }}>
              {formatDate(source.lastSync)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
