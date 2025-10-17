'use client';

import Header from "../Components/Header/page";

export default function About() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px' }}>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          padding: '60px 40px', 
          borderRadius: '20px', 
          marginBottom: '40px', 
          boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-30%',
            right: '-5%',
            width: '400px',
            height: '400px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: '800', 
              color: '#ffffff', 
              margin: '0 0 16px 0',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
            }}>
              Acerca de ThreatScope
            </h1>
            <p style={{ 
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', 
              color: 'rgba(255, 255, 255, 0.95)', 
              margin: '0',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.6'
            }}>
              Plataforma avanzada de inteligencia de amenazas para la ciberseguridad moderna
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '30px' }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 }}>
                Nuestra Misión
              </h2>
            </div>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#4b5563', margin: 0 }}>
              ThreatScope nace con el objetivo de democratizar el acceso a herramientas avanzadas de 
              ciberseguridad. Creemos que todas las organizaciones, sin importar su tamaño, merecen 
              protección de primer nivel contra las amenazas digitales en constante evolución.
            </p>
          </div>

          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 }}>
                Lo Que Ofrecemos
              </h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {[
                {
                  icon: '🔍',
                  title: 'Monitoreo en Tiempo Real',
                  description: 'Detecta amenazas al instante con nuestro sistema de vigilancia continua.',
                  color: '#3b82f6'
                },
                {
                  icon: '📊',
                  title: 'Análisis Inteligente',
                  description: 'Convierte datos complejos en insights accionables con visualizaciones claras.',
                  color: '#8b5cf6'
                },
                {
                  icon: '🔗',
                  title: 'Integración Múltiple',
                  description: 'Conecta con feeds, APIs, SIEMs y honeypots para cobertura total.',
                  color: '#06b6d4'
                },
                {
                  icon: '🚨',
                  title: 'Alertas Inteligentes',
                  description: 'Sistema de priorización automática que filtra el ruido y destaca lo crítico.',
                  color: '#f59e0b'
                },
                {
                  icon: '🛡️',
                  title: 'Gestión Completa',
                  description: 'Desde la detección hasta la mitigación, gestiona todo el ciclo de amenazas.',
                  color: '#10b981'
                },
                {
                  icon: '📈',
                  title: 'Reportes Detallados',
                  description: 'Genera informes ejecutivos y técnicos con métricas clave de seguridad.',
                  color: '#ef4444'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  style={{
                    padding: '24px',
                    borderRadius: '12px',
                    backgroundColor: '#f9fafb',
                    border: '2px solid #e5e7eb',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = feature.color;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 12px 24px ${feature.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ fontSize: '40px', marginBottom: '16px' }}>
                    {feature.icon}
                  </div>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '700', 
                    color: '#111827', 
                    margin: '0 0 12px 0' 
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{ 
                    fontSize: '14px', 
                    lineHeight: '1.6', 
                    color: '#6b7280', 
                    margin: 0 
                  }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: '16px',
            padding: '50px 40px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            color: '#fff'
          }}>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: '700', 
              textAlign: 'center', 
              margin: '0 0 40px 0' 
            }}>
              ThreatScope en Números
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '30px' 
            }}>
              {[
                { number: '24/7', label: 'Monitoreo Continuo', icon: '⏰' },
                { number: '< 1s', label: 'Tiempo de Detección', icon: '⚡' },
                { number: '∞', label: 'Fuentes de Datos', icon: '🔗' }
              ].map((stat, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: 'center',
                    padding: '20px'
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>
                    {stat.icon}
                  </div>
                  <div style={{ 
                    fontSize: '48px', 
                    fontWeight: '800', 
                    marginBottom: '8px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {stat.number}
                  </div>
                  <div style={{ 
                    fontSize: '16px', 
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: '500'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
