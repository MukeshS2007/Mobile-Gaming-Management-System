import React from 'react';
import { History, Plus, Radio, Shield, CheckCircle2, Server, ArrowUpRight } from 'lucide-react';

export default function ExecutiveOverview() {
  return (
    <div style={{ padding: '32px 40px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
            Executive Overview
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
            Real-time operation metrics for MGMS Enterprise Ecosystem.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="btn btn-secondary btn-sm" style={{ padding: '8px 14px' }}>
            <History size={15} />
            <span>History</span>
          </button>
          <button className="btn btn-primary btn-sm" style={{ padding: '8px 16px' }}>
            <Plus size={16} />
            <span>Trigger Live Event</span>
          </button>
        </div>
      </div>

      {/* 4 Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600 }}>Active Players (Live)</span>
            <span style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 700 }}>+12.4%</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit' }}>84,392</div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600 }}>Total Revenue (24h)</span>
            <span style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 700 }}>+5.2%</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit' }}>$12,840.00</div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600 }}>Conversion Rate</span>
            <span style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 700 }}>+0.8%</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit' }}>3.8%</div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600 }}>Server Uptime</span>
            <span className="badge badge-green" style={{ fontSize: '0.68rem' }}>Optimal</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit' }}>99.99%</div>
        </div>
      </div>

      {/* Center Row: Retention Trends & Global Server Health */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, marginBottom: 28 }}>
        <div className="mgms-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>User Retention Trends</h3>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 16 }}>Daily Active vs Monthly Active user growth</div>
          <div style={{ height: 190, width: '100%' }}>
            <svg viewBox="0 0 800 160" style={{ width: '100%', height: '100%' }}>
              <path d="M 0 120 Q 200 90, 400 95 T 800 40 L 800 160 L 0 160 Z" fill="rgba(16, 185, 129, 0.15)" />
              <path d="M 0 120 Q 200 90, 400 95 T 800 40" fill="none" stroke="#10b981" strokeWidth="2.5" />
            </svg>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="mgms-card" style={{ padding: 20 }}>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Server size={16} color="#6366f1" /> Global Server Health
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>US East (24ms)</span> <span className="badge badge-green">Healthy</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>EU West (42ms)</span> <span className="badge badge-green">Healthy</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Asia Pacific (124ms)</span> <span className="badge badge-amber">Heavy</span>
              </div>
            </div>
          </div>

          <div className="mgms-card" style={{ padding: 20 }}>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Shield size={16} color="#10b981" /> Live Ops Security
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Anti-cheat systems are ACTIVE across all regions. No significant anomalies detected in last 6 hours.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
