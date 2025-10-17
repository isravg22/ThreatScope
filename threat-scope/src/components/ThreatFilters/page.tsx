'use client';

import { ThreatFilters, ThreatType, ThreatSeverity, ThreatStatus } from '@/lib/api/types';

interface ThreatFiltersProps {
  filters: ThreatFilters;
  onFilterChange: (filters: ThreatFilters) => void;
}

export default function ThreatFiltersComponent({ filters, onFilterChange }: ThreatFiltersProps) {
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      type: e.target.value ? (e.target.value as ThreatType) : undefined,
    });
  };

  const handleSeverityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      severity: e.target.value ? (e.target.value as ThreatSeverity) : undefined,
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      status: e.target.value ? (e.target.value as ThreatStatus) : undefined,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      search: e.target.value || undefined,
    });
  };

  const selectStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s',
    backgroundColor: '#fff',
    color: '#374151'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s',
    backgroundColor: '#fff',
    color: '#374151'
  };

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '24px' }}>
      <h3 style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)', fontWeight: '600', marginBottom: '20px', color: '#111827' }}>Filtros</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
            Buscar
          </label>
          <input
            type="text"
            value={filters.search || ''}
            onChange={handleSearchChange}
            placeholder="Título o descripción..."
            style={inputStyle}
            onFocus={(e) => e.currentTarget.style.borderColor = '#2563eb'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
          />
        </div>

        
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
            Tipo
          </label>
          <select
            value={filters.type || ''}
            onChange={handleTypeChange}
            style={selectStyle}
            onFocus={(e) => e.currentTarget.style.borderColor = '#2563eb'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
          >
            <option value="">Todos</option>
            <option value="malware">Malware</option>
            <option value="phishing">Phishing</option>
            <option value="ransomware">Ransomware</option>
            <option value="ddos">DDoS</option>
            <option value="data_breach">Filtración de Datos</option>
            <option value="zero_day">Zero Day</option>
            <option value="apt">APT</option>
            <option value="other">Otro</option>
          </select>
        </div>

        
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
            Severidad
          </label>
          <select
            value={filters.severity || ''}
            onChange={handleSeverityChange}
            style={selectStyle}
            onFocus={(e) => e.currentTarget.style.borderColor = '#2563eb'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
          >
            <option value="">Todas</option>
            <option value="critical">Crítico</option>
            <option value="high">Alto</option>
            <option value="medium">Medio</option>
            <option value="low">Bajo</option>
          </select>
        </div>

        
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
            Estado
          </label>
          <select
            value={filters.status || ''}
            onChange={handleStatusChange}
            style={selectStyle}
            onFocus={(e) => e.currentTarget.style.borderColor = '#2563eb'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
          >
            <option value="">Todos</option>
            <option value="active">Activo</option>
            <option value="mitigated">Mitigado</option>
            <option value="resolved">Resuelto</option>
          </select>
        </div>
      </div>
    </div>
  );
}
