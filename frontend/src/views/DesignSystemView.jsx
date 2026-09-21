import React from 'react';
import { Gamepad2, CheckCircle2, AlertTriangle, AlertCircle, Info, ArrowRight, Sun, Moon, Sparkles, Activity } from 'lucide-react';

export default function DesignSystemView({ theme, toggleTheme }) {
  return (
    <div style={{ padding: '32px 40px', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: 4, letterSpacing: '-0.03em' }}>
            MGMS Enterprise Design System
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            High-fidelity UI components, tokens, and cybernetic layouts for state-of-the-art mobile gaming operations.
          </p>
        </div>

        {toggleTheme && (
          <button
            onClick={toggleTheme}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px' }}
          >
            {theme === 'dark' ? <Sun size={16} color="#f59e0b" /> : <Moon size={16} color="#6366f1" />}
            <span>Toggle {theme === 'dark' ? 'Light' : 'Cyber Dark'} Theme</span>
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* Colors */}
        <div className="mgms-card" style={{ padding: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Sparkles size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-heading)' }}>Theme Palette & Accents</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
            {[
              { name: 'Primary Violet', hex: '#6366F1' },
              { name: 'Electric Purple', hex: '#8B5CF6' },
              { name: 'Cyber Cyan', hex: '#06B6D4' },
              { name: 'Emerald Pulse', hex: '#10B981' },
              { name: 'Warning Amber', hex: '#F59E0B' },
              { name: 'Plasma Rose', hex: '#EF4444' }
            ].map((c) => (
              <div key={c.name} style={{ background: 'var(--bg-subtle)', padding: 12, borderRadius: 12, border: '1px solid var(--border-color)' }}>
                <div style={{ height: 60, borderRadius: 8, background: c.hex, marginBottom: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
                <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--text-heading)' }}>{c.name}</div>
                <code style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{c.hex}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons & Badges */}
        <div className="mgms-card" style={{ padding: 26 }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 16 }}>Interactive Components</h3>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 24 }}>
            <button className="btn btn-primary">Primary Action</button>
            <button className="btn btn-secondary">Secondary Action</button>
            <button className="btn btn-danger">Critical Action</button>
            <button className="btn btn-primary btn-sm">Small Primary</button>
            <button className="btn btn-secondary btn-sm">Small Secondary</button>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="badge badge-green">
              <span className="live-dot" /> LIVE CLUSTER
            </span>
            <span className="badge badge-amber">MAINTENANCE</span>
            <span className="badge badge-red">RESTRICTED</span>
            <span className="badge badge-purple">BETA TESTER</span>
            <span className="badge badge-secondary">ARCHIVED</span>
            <span className="pill-tab active">Active Pill</span>
            <span className="pill-tab">Inactive Pill</span>
          </div>
        </div>

        {/* Telemetry & Cards Preview */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div className="mgms-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-heading)' }}>Live Telemetry Pulse</div>
              <span className="live-pulse" style={{ fontSize: '0.74rem', color: 'var(--success-text)', fontWeight: 600 }}>
                <span className="live-dot" /> Sub-second Ingress
              </span>
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit' }}>
              99.98%
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Zero packet drops detected across North America & Europe cluster nodes.
            </p>
          </div>

          <div className="mgms-card" style={{ padding: 24 }}>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 14 }}>Form Controls</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                type="text"
                className="form-input"
                defaultValue="Vanguard Operations Terminal"
                placeholder="Interactive text field..."
              />
              <select className="form-select" defaultValue="optimal">
                <option value="optimal">High Performance Mode (GPU-Accelerated)</option>
                <option value="eco">Balanced Power Optimization</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
