'use client';

import { useState, useEffect } from 'react';
import Header from "../Components/Header/page";
import SourceCard from "../Components/SourceCard/page";
import { sourcesService } from '@/lib/api/sources';
import { statsService } from '@/lib/api/stats';
import { Source } from '@/lib/api/types';

export default function Sources() {
  const [sources, setSources] = useState<Source[]>([]);
  const [threatsBySource, setThreatsBySource] = useState<{ source: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterActive, setFilterActive] = useState<boolean | null>(null);

  useEffect(() => {
    loadData();
  }, [filterActive]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [allSources, threatsStats] = await Promise.all([
        filterActive === true 
          ? sourcesService.getActive() 
          : sourcesService.getAll(),
        statsService.getThreatsBySource(),
      ]);

      setSources(allSources);
      setThreatsBySource(threatsStats as { source: string; count: number }[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar fuentes');
      console.error('Error cargando fuentes:', err);
    } finally {
      setLoading(false);
    }
  };

  const activeSources = sources.filter(s => s.status === 'active').length;
  const inactiveSources = sources.length - activeSources;

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px' }}>
        
        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', marginBottom: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', color: '#111827', margin: '0 0 10px 0' }}>
            Fuentes de Inteligencia
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: '#6b7280', margin: '0' }}>
            Gestiona las fuentes de información de amenazas
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
                  onClick={loadData}
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '30px' }}>
              <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', borderLeft: '4px solid #3b82f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', margin: '0 0 8px 0' }}>Total de Fuentes</p>
                    <p style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', color: '#111827', margin: '0' }}>{sources.length}</p>
                  </div>
                  <svg style={{ width: '48px', height: '48px', color: '#3b82f6' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
              </div>

              <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', borderLeft: '4px solid #10b981' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', margin: '0 0 8px 0' }}>Fuentes Activas</p>
                    <p style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', color: '#111827', margin: '0' }}>{activeSources}</p>
                  </div>
                  <svg style={{ width: '48px', height: '48px', color: '#10b981' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', borderLeft: '4px solid #6b7280' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', margin: '0 0 8px 0' }}>Fuentes Inactivas</p>
                    <p style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', color: '#111827', margin: '0' }}>{inactiveSources}</p>
                  </div>
                  <svg style={{ width: '48px', height: '48px', color: '#6b7280' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
              </div>
            </div>

            {threatsBySource.length > 0 && (
              <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '30px' }}>
                <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 'bold', color: '#111827', margin: '0 0 20px 0' }}>
                  Amenazas Detectadas por Fuente
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {threatsBySource.map((stat) => {
                    const total = threatsBySource.reduce((sum, s) => sum + s.count, 0);
                    const percentage = total > 0 ? ((stat.count / total) * 100).toFixed(1) : '0';
                    
                    return (
                      <div key={stat.source} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '192px', fontWeight: '600', color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {stat.source}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '24px' }}>
                            <div
                              style={{ 
                                backgroundColor: '#3b82f6',
                                height: '24px', 
                                borderRadius: '9999px', 
                                transition: 'width 0.5s',
                                width: `${percentage}%`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                paddingRight: '8px'
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
            )}

            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setFilterActive(null)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  border: filterActive === null ? 'none' : '1px solid #d1d5db',
                  backgroundColor: filterActive === null ? '#2563eb' : '#fff',
                  color: filterActive === null ? '#fff' : '#374151'
                }}
                onMouseEnter={(e) => {
                  if (filterActive !== null) e.currentTarget.style.backgroundColor = '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  if (filterActive !== null) e.currentTarget.style.backgroundColor = '#fff';
                }}
              >
                Todas ({sources.length})
              </button>
              <button
                onClick={() => setFilterActive(true)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  border: filterActive === true ? 'none' : '1px solid #d1d5db',
                  backgroundColor: filterActive === true ? '#10b981' : '#fff',
                  color: filterActive === true ? '#fff' : '#374151'
                }}
                onMouseEnter={(e) => {
                  if (filterActive !== true) e.currentTarget.style.backgroundColor = '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  if (filterActive !== true) e.currentTarget.style.backgroundColor = '#fff';
                }}
              >
                Activas ({activeSources})
              </button>
              <button
                onClick={() => setFilterActive(false)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  border: filterActive === false ? 'none' : '1px solid #d1d5db',
                  backgroundColor: filterActive === false ? '#6b7280' : '#fff',
                  color: filterActive === false ? '#fff' : '#374151'
                }}
                onMouseEnter={(e) => {
                  if (filterActive !== false) e.currentTarget.style.backgroundColor = '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  if (filterActive !== false) e.currentTarget.style.backgroundColor = '#fff';
                }}
              >
                Inactivas ({inactiveSources})
              </button>
            </div>

            {sources.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {sources.map((source) => (
                  <SourceCard key={source.id} source={source} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <svg
                  style={{ margin: '0 auto 16px', width: '48px', height: '48px', color: '#9ca3af' }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                  />
                </svg>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 8px 0' }}>
                  No hay fuentes
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>
                  No se encontraron fuentes con los filtros aplicados
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}