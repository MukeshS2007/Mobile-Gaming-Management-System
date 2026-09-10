import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Gamepad2, ShieldCheck, ArrowRight, Lock, Mail } from 'lucide-react';

export default function LoginView({ onBackToLanding, onGoRegister, onLoginSuccess }) {
  const { login, addToast } = useAuth();
  const [email, setEmail] = useState('admin');
  const [password, setPassword] = useState('StrongPass#2026');
  const [persistSession, setPersistSession] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      onLoginSuccess?.();
    } catch (err) {
      // toast shown in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px'
    }}>
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: 28, cursor: 'pointer' }} onClick={onBackToLanding}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: '#6366f1',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 8px 20px rgba(99, 102, 241, 0.35)',
          marginBottom: 12
        }}>
          <Gamepad2 size={28} />
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
          Enterprise Access
        </h1>
        <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
          Management Portal for Mobile Gaming Operations
        </p>
      </div>

      {/* Main Login Card */}
      <div className="mgms-card" style={{
        maxWidth: 440,
        width: '100%',
        padding: '36px 32px',
        background: '#ffffff',
        borderRadius: 20,
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 20px 25px -5px rgba(0,0,0,0.02)'
      }}>
        {/* Social SSO Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ fontSize: '0.84rem', padding: '10px 12px' }}
            onClick={() => addToast('Google Workspace SSO simulated', 'info')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            style={{ fontSize: '0.84rem', padding: '10px 12px' }}
            onClick={() => addToast('Microsoft Entra ID SSO simulated', 'info')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#F25022" d="M1 1h10v10H1z"/>
              <path fill="#7FBA00" d="M13 1h10v10H13z"/>
              <path fill="#00A4EF" d="M1 13h10v10H1z"/>
              <path fill="#FFB900" d="M13 13h10v10H13z"/>
            </svg>
            <span>Microsoft</span>
          </button>
        </div>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.06em',
          margin: '22px 0'
        }}>
          <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
          <span style={{ padding: '0 12px' }}>OR CONTINUE WITH EMAIL</span>
          <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#475569', marginBottom: 6, letterSpacing: '0.04em' }}>
              BUSINESS EMAIL
            </label>
            <input
              type="text"
              required
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@studio-name.com"
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#475569', letterSpacing: '0.04em' }}>
                PASSWORD
              </label>
              <span 
                onClick={onGoRegister} 
                style={{ fontSize: '0.74rem', color: '#6366f1', fontWeight: 600, cursor: 'pointer' }}
              >
                Forgot Key?
              </span>
            </div>
            <input
              type="password"
              required
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
            />
          </div>

          {/* Persist checkbox */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#475569', marginBottom: 22, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={persistSession}
              onChange={(e) => setPersistSession(e.target.checked)}
              style={{ accentColor: '#6366f1', width: 16, height: 16 }}
            />
            <span>Persist session for 30 days</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px 18px', fontSize: '0.95rem' }}
          >
            <span>{loading ? 'Authenticating System...' : 'Authenticate System'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Enterprise Security Active box */}
        <div style={{
          marginTop: 24,
          padding: '14px 16px',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start'
        }}>
          <ShieldCheck size={20} color="#6366f1" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>Enterprise Security Active</div>
            <div style={{ fontSize: '0.74rem', color: '#64748b', lineHeight: 1.45, marginTop: 2 }}>
              This portal uses JWT-based multi-layered authentication. Unauthorized access attempts are monitored and logged.
            </div>
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div style={{ marginTop: 24, fontSize: '0.84rem', color: '#64748b' }}>
        Don't have an enterprise account?{' '}
        <span onClick={onGoRegister} style={{ color: '#6366f1', fontWeight: 600, cursor: 'pointer' }}>
          Request Access / Register
        </span>
      </div>

      {/* Technical footer note */}
      <div style={{
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        fontSize: '0.74rem',
        color: '#94a3b8'
      }}>
        <span>Platform Status</span>
        <span>•</span>
        <span>Documentation</span>
        <span>•</span>
        <span>Contact Dev-Ops</span>
        <span style={{ marginLeft: 16, fontFamily: 'monospace' }}>MGMS v2.4.0-STABLE | ID: SMD-9281-AUTH</span>
      </div>
    </div>
  );
}
