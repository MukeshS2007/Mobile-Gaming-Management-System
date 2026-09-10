import React from 'react';
import { Gamepad2, CheckCircle2, AlertTriangle, AlertCircle, Info, ArrowRight } from 'lucide-react';

export default function DesignSystemView() {
  return (
    <div style={{ padding: '32px 40px', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
          MGMS Enterprise Design System
        </h1>
        <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
          Standardized UI components, tokens, and layouts for high-fidelity mobile gaming operations.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* Colors */}
        <div className="mgms-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Brand Colors</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
            {[
              { name: 'Primary Indigo', hex: '#6366F1' },
              { name: 'Purple Accent', hex: '#7C3AED' },
              { name: 'Success Emerald', hex: '#10B981' },
              { name: 'Warning Amber', hex: '#F59E0B' },
              { name: 'Danger Red', hex: '#EF4444' },
              { name: 'Dark Slate', hex: '#0F172A' }
            ].map((c) => (
              <div key={c.name}>
                <div style={{ height: 60, borderRadius: 10, background: c.hex, marginBottom: 8 }} />
                <div style={{ fontWeight: 600, fontSize: '0.82rem', color: '#0f172a' }}>{c.name}</div>
                <code style={{ fontSize: '0.74rem', color: '#64748b' }}>{c.hex}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons & Badges */}
        <div className="mgms-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Buttons & Badges</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
            <button className="btn btn-primary">Primary Button</button>
            <button className="btn btn-secondary">Secondary Button</button>
            <button className="btn btn-danger">Danger Button</button>
            <button className="btn btn-primary btn-sm">Small Primary</button>
            <button className="btn btn-secondary btn-sm">Small Secondary</button>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span className="badge badge-green">LIVE STATUS</span>
            <span className="badge badge-amber">MAINTENANCE</span>
            <span className="badge badge-red">BANNED</span>
            <span className="badge badge-purple">BETA TEST</span>
            <span className="badge badge-secondary">ARCHIVED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
