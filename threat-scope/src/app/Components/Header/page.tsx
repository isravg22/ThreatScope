'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import LoginModal from "../LoginModal/page";
import RegisterModal from "../RegisterModal/page";

export default function Header(){
    const { user, isAuthenticated, logout } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };

        if (showUserMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserMenu]);

    const handleLogout = () => {
        setShowUserMenu(false);
        logout();
    };

    return (
        <>
            <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#ffff',boxSizing:'border-box', position: 'relative'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Link href="/"  style={{display:'flex', alignItems:'center', textDecoration:'none', color:'inherit'}}>
                        <Image src="/logo.svg" alt="Logo" width={50} height={50} />
                        <h1 style={{margin:'0 10px', fontSize:'clamp(0.7rem, 1vw, 22px)', fontWeight:'bold'}}>ThreatScope</h1>
                    </Link>
                </div>            
                <ul style={{display:'flex', alignItems:'center', gap: '20px', listStyle: 'none', margin: 0, padding: 0}}>
                    <Link href="/" style={{fontSize:'clamp(0.5rem, 1vw, 20px)'}}>Inicio</Link>
                    <Link href="/about" style={{fontSize:'clamp(0.5rem, 1vw, 20px)'}}>Acerca de</Link>
                    <Link href="/contact" style={{fontSize:'clamp(0.5rem, 1vw, 20px)'}}>Contacto</Link>
                    
                    {!isAuthenticated ? (
                        <button
                            onClick={() => setShowLoginModal(true)}
                            style={{
                                padding: '8px 16px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize:'clamp(0.5rem, 1vw, 20px)',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            Login
                        </button>
                    ) : (
                        <div style={{ position: 'relative' }} ref={menuRef}>
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 12px',
                                    background: '#f3f4f6',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#e5e7eb';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                                }}
                            >
                                <span style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                }}>
                                    {user?.name?.charAt(0).toUpperCase()}
                                </span>
                                <span style={{ fontWeight: '500', color: '#374151' }}>{user?.name}</span>
                            </button>

                            {showUserMenu && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '100%',
                                        right: 0,
                                        marginTop: '8px',
                                        background: 'white',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                                        minWidth: '200px',
                                        zIndex: 1000,
                                    }}
                                >
                                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
                                        <p style={{ fontWeight: '600', color: '#111827', margin: 0, fontSize: '14px' }}>
                                            {user?.name}
                                        </p>
                                        <p style={{ color: '#6b7280', margin: '4px 0 0 0', fontSize: '12px' }}>
                                            {user?.email}
                                        </p>
                                        <span style={{
                                            display: 'inline-block',
                                            marginTop: '6px',
                                            padding: '2px 8px',
                                            fontSize: '11px',
                                            fontWeight: '500',
                                            color: '#667eea',
                                            backgroundColor: '#eef2ff',
                                            borderRadius: '4px',
                                        }}>
                                            {user?.role}
                                        </span>
                                    </div>
                                    <Link
                                        href="/my-alerts"
                                        onClick={() => setShowUserMenu(false)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '12px 16px',
                                            color: '#374151',
                                            textDecoration: 'none',
                                            fontSize: '14px',
                                            transition: 'background-color 0.2s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f9fafb';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        🔔 Mis Alertas
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        type="button"
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '12px 16px',
                                            color: '#dc2626',
                                            background: 'none',
                                            border: 'none',
                                            borderTop: '1px solid #e5e7eb',
                                            fontSize: '14px',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'background-color 0.2s',
                                            borderRadius: '0 0 8px 8px',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#fef2f2';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        🚪 Cerrar Sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </ul>
            </header>

            {/* Login Modal */}
            <LoginModal 
                isOpen={showLoginModal} 
                onClose={() => setShowLoginModal(false)}
                onRegisterClick={() => setShowRegisterModal(true)}
            />

            {/* Register Modal */}
            <RegisterModal
                isOpen={showRegisterModal}
                onClose={() => setShowRegisterModal(false)}
                onSuccess={() => {
                    setShowRegisterModal(false);
                    setShowLoginModal(true);
                }}
            />
        </>
    );
}