'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { Alert } from '@/lib/api/types';
import { alertsService } from '@/lib/api/alerts';
import Header from '../Components/Header/page';
import AlertCard from '../Components/AlertCard/page';

export default function MyAlertsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    fetchMyAlerts();
  }, [isAuthenticated, user, router]);

  const fetchMyAlerts = async () => {
    try {
      setLoading(true);
      setError('');
      
      
      const allAlerts = await alertsService.getAll();
      
      
      const myAlerts = allAlerts.filter(
        (alert) => alert.assignedToId === user?.id
      );
      
      setAlerts(myAlerts);
    } catch (err) {
      setError('Error al cargar las alertas. Intenta de nuevo.');
      console.error('Error fetching alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />

      <main style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            padding: '40px',
            marginBottom: '32px',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '12px' }}>
            🔔 Mis Alertas Asignadas
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>
            Alertas de seguridad asignadas a {user?.name}
          </p>
        </div>

       
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>
              {alerts.length}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
              Total Asignadas
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444' }}>
              {alerts.filter((a) => a.status === 'pending').length}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
              Pendientes
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f97316' }}>
              {alerts.filter((a) => a.priority === 'critical').length}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
              Críticas
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#16a34a' }}>
              {alerts.filter((a) => a.status === 'resolved').length}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
              Resueltas
            </div>
          </div>
        </div>

        
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                border: '4px solid #e5e7eb',
                borderTop: '4px solid #667eea',
                borderRadius: '50%',
                margin: '0 auto',
                animation: 'spin 1s linear infinite',
              }}
            />
            <p style={{ marginTop: '20px', color: '#6b7280' }}>Cargando alertas...</p>
          </div>
        )}

        
        {error && !loading && (
          <div
            style={{
              backgroundColor: '#fee2e2',
              border: '1px solid #fecaca',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <p style={{ color: '#dc2626', marginBottom: '12px' }}>⚠️ {error}</p>
            <button
              onClick={fetchMyAlerts}
              style={{
                padding: '10px 24px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Reintentar
            </button>
          </div>
        )}

        
        {!loading && !error && alerts.length === 0 && (
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '60px 20px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📭</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
              No tienes alertas asignadas
            </h3>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Cuando se te asignen alertas de seguridad, aparecerán aquí.
            </p>
          </div>
        )}

        
        {!loading && !error && alerts.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '24px',
            }}
          >
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
