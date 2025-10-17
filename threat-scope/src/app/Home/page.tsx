'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { statsService } from '@/lib/api/stats';
import { DashboardStats } from '@/lib/api/types';

export default function Home() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            setLoading(true);
            const data = await statsService.getDashboard();
            setStats(data);
        } catch (error) {
            console.error('Error cargando estadísticas:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div style={{ backgroundColor: '#ffff', margin: '50px', borderRadius: '10px', boxSizing: 'border-box', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', padding: '20px', boxSizing: 'border-box' }}>
                    <div style={{ padding: '20px', flex: '1', minWidth: '300px', boxSizing: 'border-box' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw,40px)', margin: '0 0 20px 0', wordWrap: 'break-word' }}>Portal de Inteligencia de Ciberamenazas</h2>
                        <p style={{ fontSize: 'clamp(1.5rem, 3vw,15px)', fontWeight: 'lighter', margin: '0 0 20px 0' }}>ThreatScope analiza y visualiza amenazas en tiempo real.</p>
                        
                        {!loading && stats && (
                            <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                                <div style={{ padding: '10px 15px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0369a1' }}>{stats.totalThreats}</div>
                                    <div style={{ fontSize: '12px', color: '#0c4a6e' }}>Amenazas detectadas</div>
                                </div>
                                <div style={{ padding: '10px 15px', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
                                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626' }}>{stats.activeThreats}</div>
                                    <div style={{ fontSize: '12px', color: '#7f1d1d' }}>Amenazas activas</div>
                                </div>
                                <div style={{ padding: '10px 15px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#16a34a' }}>{stats.activeSources}</div>
                                    <div style={{ fontSize: '12px', color: '#14532d' }}>Fuentes activas</div>
                                </div>
                            </div>
                        )}

                        <Link href="/Events">
                            <button style={{ background: 'linear-gradient(to bottom, #1e55fbff, #5882ffff)', color: 'white', padding: '7px 15px', borderRadius: '5px', fontSize: '20px', border: 'none', cursor: 'pointer' }}>
                                Comenzar
                            </button>
                        </Link>
                    </div>
                    <div style={{
                        flex: '0 0 auto',
                        maxWidth: '300px',
                        width: '100%'
                    }}>
                        <Image src="/logo.svg" alt="Ciberseguridad" width={400} height={400} style={{ width: '100%', height: 'auto', maxWidth: '400px' }} />
                    </div>
                </div>
            </div>

            <div style={{ backgroundColor: '#ffff', margin: '50px', borderRadius: '10px', boxSizing: 'border-box', overflow: 'hidden', padding: '20px'}}>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw,50px)', margin: '0 0 30px 0', wordWrap: 'break-word' }}>Dashboards de amenazas</h2>
                <div style={{display:'flex', justifyContent:'space-around', gap:'20px', boxSizing:'border-box', flexWrap:'wrap'}}>
                    
                    <Link href="/Events" style={{textDecoration:'none', color:'inherit'}}>
                        <div style={{border:'1px solid  #6f6f6fff', borderRadius:'8px', padding:'30px 40px', minWidth:'200px', flex:'1', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', backgroundColor:'#fafafa', transition:'all 0.3s ease', cursor:'pointer'}}>
                            <h3 style={{margin:'0', fontSize:'1.25rem', fontWeight:'600', color:'#333'}}>Eventos</h3>
                            <Image src="/eventos.svg" alt="Eventos" width={120} height={120} />
                            {!loading && stats && (
                                <div style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#dbeafe', borderRadius: '5px' }}>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e40af' }}>
                                        {stats.totalThreats}
                                    </span>
                                    <span style={{ fontSize: '12px', color: '#1e3a8a', marginLeft: '5px' }}>
                                        total
                                    </span>
                                </div>
                            )}
                        </div>
                    </Link>
                    
                    <Link href="/threat-types" style={{textDecoration:'none', color:'inherit'}}>
                        <div style={{border:'1px solid  #6f6f6fff', borderRadius:'8px', padding:'30px 40px', minWidth:'200px', flex:'1', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', backgroundColor:'#fafafa', transition:'all 0.3s ease', cursor:'pointer'}}>
                            <h3 style={{margin:'0', fontSize:'1.25rem', fontWeight:'600', color:'#333'}}>Tipos de amenazas</h3>
                            <Image src="/amenazas.svg" alt="Tipos de amenazas" width={120} height={120}  />
                            {!loading && stats && (
                                <div style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#fce7f3', borderRadius: '5px' }}>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#be123c' }}>
                                        {stats.activeThreats}
                                    </span>
                                    <span style={{ fontSize: '12px', color: '#881337', marginLeft: '5px' }}>
                                        activas
                                    </span>
                                </div>
                            )}
                        </div>
                    </Link>
                    
                    <Link href="/sources" style={{textDecoration:'none', color:'inherit'}}>
                        <div style={{border:'1px solid #6f6f6fff', borderRadius:'8px', padding:'30px 40px', minWidth:'200px', flex:'1', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', backgroundColor:'#fafafa', transition:'all 0.3s ease', cursor:'pointer'}}>
                            <h3 style={{margin:'0', fontSize:'1.25rem', fontWeight:'600', color:'#333'}}>Fuentes</h3>
                            <Image src="/fuentes.svg" alt="Fuentes" width={120} height={120}  />
                            {!loading && stats && (
                                <div style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#dcfce7', borderRadius: '5px' }}>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#15803d' }}>
                                        {stats.activeSources}
                                    </span>
                                    <span style={{ fontSize: '12px', color: '#14532d', marginLeft: '5px' }}>
                                        activas
                                    </span>
                                </div>
                            )}
                        </div>
                    </Link>
                </div>
            </div>

            <div style={{ backgroundColor: '#ffff', margin: '50px', borderRadius: '10px', boxSizing: 'border-box', overflow: 'hidden', padding: '20px' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw,50px)', margin: '0 0 20px 0', wordWrap: 'break-word' }}>Características principales</h2>
                <p style={{ marginBottom: '20px' }}>ThreatScope ofrece un análisis detallado de las amenazas cibernéticas, con funciones de monitoreo y alertas de tiempo real</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
                        <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔍</div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>Análisis en Tiempo Real</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280' }}>Monitoreo continuo de amenazas emergentes</p>
                    </div>
                    
                    <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
                        <div style={{ fontSize: '32px', marginBottom: '10px' }}>📊</div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>Visualización Intuitiva</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280' }}>Gráficas y dashboards fáciles de entender</p>
                    </div>
                    
                    <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
                        <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔔</div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>Alertas Inteligentes</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280' }}>Notificaciones prioritarias de amenazas críticas</p>
                    </div>
                </div>

                <Link href="/Events">
                    <button style={{ background: 'linear-gradient(to bottom, #1e55fbff, #5882ffff)', color: 'white', padding: '7px 15px', borderRadius: '5px', fontSize: '20px', border: 'none', cursor: 'pointer' }}>
                        Conocer más
                    </button>
                </Link>
            </div>
        </div>
    );
}
