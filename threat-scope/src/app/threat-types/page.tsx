'use client';

import { useState, useEffect } from 'react';
import Header from "../../components/Header/page";
import ThreatTypeCard from "../../components/ThreatTypeCard/page";
import { statsService } from '@/lib/api/stats';

interface ThreatTypeStat {
  type: string;
  count: number;
}

interface SeverityStat {
  severity: string;
  count: number;
}

export default function ThreatTypes() {
  const [typeStats, setTypeStats] = useState<ThreatTypeStat[]>([]);
  const [severityStats, setSeverityStats] = useState<SeverityStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [types, severities] = await Promise.all([
        statsService.getThreatsByType(),
        statsService.getThreatsBySeverity(),
      ]);

      setTypeStats(types as ThreatTypeStat[]);
      setSeverityStats(severities as SeverityStat[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar estadísticas');
      console.error('Error cargando estadísticas:', err);
    } finally {
      setLoading(false);
    }
  };

  const totalThreats = typeStats.reduce((sum, stat) => sum + stat.count, 0);

  const severityTranslations: Record<string, string> = {
    critical: 'Crítico',
    high: 'Alto',
    medium: 'Medio',
    low: 'Bajo',
  };

  const severityColors: Record<string, string> = {
    critical: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-yellow-500',
    low: 'bg-blue-500',
  };

  return (
    <div style={{ minHeight: '100vh'}}>
      <Header />
      
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px' }}>
        
        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', marginBottom: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', color: '#111827', margin: '0 0 10px 0' }}>
            Tipos de Amenazas
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: '#6b7280', margin: '0' }}>
            Análisis detallado de amenazas por tipo y severidad
          </p>
        </div>

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 0' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              border: '3px solid #e5e7eb', 
              borderTopColor: '#2563eb',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
        )}

        {error && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '20px', marginBottom: '30px' }}>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flexShrink: 0 }}>
                <svg style={{ width: '24px', height: '24px', color: '#f87171' }} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#991b1b', margin: '0 0 8px 0' }}>Error</h3>
                <p style={{ fontSize: '14px', color: '#b91c1c', margin: '0 0 10px 0' }}>{error}</p>
                <button
                  onClick={loadStats}
                  style={{ fontSize: '14px', fontWeight: '600', color: '#991b1b', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Reintentar
                </button>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            <div style={{ background: 'linear-gradient(to right, #3b82f6, #2563eb)', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '40px', marginBottom: '30px', color: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                  <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 'bold', margin: '0 0 10px 0' }}>Total de Amenazas</h2>
                  <p style={{ color: '#bfdbfe', margin: '0', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>Amenazas detectadas en el sistema</p>
                </div>
                <div style={{ fontSize: 'clamp(3rem, 8vw, 4rem)', fontWeight: 'bold' }}>{totalThreats}</div>
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 'bold', color: '#111827', margin: '0 0 20px 0' }}>
                Distribución por Tipo
              </h2>
              
              {typeStats.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
                  {typeStats.map((stat) => (
                    <ThreatTypeCard
                      key={stat.type}
                      type={stat.type}
                      count={stat.count}
                      total={totalThreats}
                    />
                  ))}
                </div>
              ) : (
                <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                  No hay datos de tipos de amenazas
                </div>
              )}
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 'bold', color: '#111827', margin: '0 0 20px 0' }}>
                Distribución por Severidad
              </h2>
              
              {severityStats.length > 0 ? (
                <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {severityStats.map((stat) => {
                      const percentage = totalThreats > 0 
                        ? ((stat.count / totalThreats) * 100).toFixed(1) 
                        : '0';
                      
                      return (
                        <div key={stat.severity} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ width: '128px', fontWeight: '600', color: '#374151' }}>
                            {severityTranslations[stat.severity] || stat.severity}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '24px' }}>
                              <div
                                className={`${severityColors[stat.severity] || 'bg-gray-500'}`}
                                style={{ 
                                  height: '24px', 
                                  borderRadius: '9999px', 
                                  transition: 'width 0.5s',
                                  width: `${percentage}%`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'flex-end',
                                  paddingRight: '8px',
                                  backgroundColor: stat.severity === 'critical' ? '#ef4444' : 
                                                 stat.severity === 'high' ? '#f97316' : 
                                                 stat.severity === 'medium' ? '#eab308' : '#3b82f6'
                                }}
                              >
                                <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>
                                  {percentage}%
                                </span>
                              </div>
                            </div>
                          </div>
                          <div style={{ width: '64px', textAlign: 'right', fontWeight: 'bold', color: '#111827' }}>
                            {stat.count}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                  No hay datos de severidad
                </div>
              )}
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 'bold', color: '#111827', margin: '0 0 20px 0' }}>
                Vista General
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px' }}>
                {typeStats.map((stat) => {
                  const percentage = totalThreats > 0 
                    ? ((stat.count / totalThreats) * 100).toFixed(1) 
                    : '0';
                  
                  const typeLabels: Record<string, string> = {
                    malware: 'Malware',
                    phishing: 'Phishing',
                    ransomware: 'Ransomware',
                    ddos: 'DDoS',
                    data_breach: 'Filtración',
                    zero_day: 'Zero Day',
                    apt: 'APT',
                    other: 'Otro',
                  };

                  return (
                    <div key={stat.type} style={{ textAlign: 'center', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '10px', transition: 'all 0.3s', cursor: 'pointer' }}
                         onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'}
                         onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                    >
                      <div style={{ fontSize: 'clamp(2rem, 5vw, 2.6rem)', fontWeight: 'bold', color: '#2563eb', marginBottom: '8px' }}>
                        {percentage}%
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                        {typeLabels[stat.type] || stat.type}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        {stat.count} amenazas
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}