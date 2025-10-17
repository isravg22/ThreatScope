'use client';

import { useState, useEffect } from 'react';
import Header from "../Components/Header/page";
import ThreatCard from "../Components/ThreatCard/page";
import ThreatFiltersComponent from "../Components/ThreatFilters/page";
import { threatsService } from '@/lib/api/threats';
import { Threat, ThreatFilters } from '@/lib/api/types';

export default function Events() {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ThreatFilters>({});

  useEffect(() => {
    loadThreats();
  }, [filters]);

  const loadThreats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await threatsService.getAll(filters);
      setThreats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar amenazas');
      console.error('Error cargando amenazas:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px' }}>
        
        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', marginBottom: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', color: '#111827', margin: '0 0 10px 0' }}>
            Eventos de Seguridad
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: '#6b7280', margin: '0' }}>
            Monitorea y gestiona las amenazas de ciberseguridad detectadas
          </p>
        </div>

        
        <ThreatFiltersComponent filters={filters} onFilterChange={setFilters} />

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
                  onClick={loadThreats}
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
            <div style={{ marginBottom: '20px', backgroundColor: '#fff', padding: '15px 20px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>
                <strong style={{ color: '#111827', fontSize: '18px' }}>{threats.length}</strong> {threats.length === 1 ? 'amenaza encontrada' : 'amenazas encontradas'}
              </p>
            </div>

            {threats.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {threats.map((threat) => (
                  <ThreatCard key={threat.id} threat={threat} />
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 8px 0' }}>
                  No hay amenazas
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>
                  No se encontraron amenazas con los filtros aplicados
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}