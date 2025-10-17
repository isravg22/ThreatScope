'use client';

import { useState } from 'react';
import Header from "../../components/Header/page";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
              Contacto
            </h1>
            <p style={{ 
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', 
              color: 'rgba(255, 255, 255, 0.95)', 
              margin: '0',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.6'
            }}>
              ¿Tienes preguntas? Estamos aquí para ayudarte
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {/* Formulario de contacto */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e5e7eb',
            gridColumn: 'span 2'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px'
              }}>
                ✉️
              </div>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: 0 }}>
                  Envíanos un Mensaje
                </h2>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0 0' }}>
                  Responderemos lo antes posible
                </p>
              </div>
            </div>

            {submitted ? (
              <div style={{
                padding: '40px',
                textAlign: 'center',
                backgroundColor: '#d1fae5',
                borderRadius: '12px',
                border: '2px solid #10b981'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#065f46', margin: '0 0 8px 0' }}>
                  ¡Mensaje Enviado!
                </h3>
                <p style={{ fontSize: '16px', color: '#047857', margin: 0 }}>
                  Gracias por contactarnos. Te responderemos pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gap: '24px' }}>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        border: '2px solid #e5e7eb',
                        outline: 'none',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                      placeholder="Tu nombre"
                    />
                  </div>

                  
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        border: '2px solid #e5e7eb',
                        outline: 'none',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Asunto *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        border: '2px solid #e5e7eb',
                        outline: 'none',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Mensaje *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        border: '2px solid #e5e7eb',
                        outline: 'none',
                        transition: 'all 0.3s',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                      placeholder="Cuéntanos más sobre tu consulta..."
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      padding: '16px 32px',
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#fff',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                    }}
                  >
                    Enviar Mensaje 📨
                  </button>
                </div>
              </form>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#667eea';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                marginBottom: '16px'
              }}>
                📧
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' }}>
                Email
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 12px 0' }}>
                Envíanos un correo electrónico
              </p>
              <a
                href="mailto:contacto@threatscope.com"
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#667eea',
                  textDecoration: 'none'
                }}
              >
                contacto@threatscope.com
              </a>
            </div>

            <div style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#10b981';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' }}>
                Soporte Técnico
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 12px 0' }}>
                Ayuda con problemas técnicos
              </p>
              <a
                href="mailto:soporte@threatscope.com"
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#10b981',
                  textDecoration: 'none'
                }}
              >
                soporte@threatscope.com
              </a>
            </div>

            <div style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 16px 0' }}>
                Síguenos
              </h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { icon: '🐦', name: 'Twitter', color: '#1DA1F2',url:'https://x.com/isravg22' },
                  { icon: '💼', name: 'LinkedIn', color: '#0A66C2', url:'https://www.linkedin.com/in/israel-valderrama-garc%C3%ADa-172674277/'},
                  { icon: '📱', name: 'GitHub', color: '#181717',url:'https://github.com/isravg22' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      backgroundColor: '#f3f4f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      border: '2px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = social.color;
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = `0 8px 20px ${social.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              color: '#fff'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏰</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 8px 0' }}>
                Horario de Atención
              </h3>
              <p style={{ fontSize: '14px', opacity: 0.9, margin: '0 0 16px 0' }}>
                Estamos disponibles:
              </p>
              <div style={{ fontSize: '14px', opacity: 0.8, lineHeight: '1.8' }}>
                <div>Lun - Vie: 9:00 - 18:00</div>
                <div>Sábados: 10:00 - 14:00</div>
                <div style={{ marginTop: '8px', fontWeight: '700', color: '#10b981' }}>
                  Soporte 24/7 para emergencias
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
