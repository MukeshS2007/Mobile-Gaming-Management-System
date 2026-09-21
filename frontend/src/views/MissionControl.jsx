import React from 'react';
import { useAuth } from '../context/AuthContext';
import { exportToCSV } from '../utils/csvExport';
import { Download, RefreshCw, Users, DollarSign, Activity, Radio, ArrowUpRight, Zap, Flame, Sparkles } from 'lucide-react';

export default function MissionControl() {
  const { addToast } = useAuth();

  const handleExportTelemetry = () => {
    const rows = [
      { Metric: 'Global Active Players', Value: '152,483', Trend: '+8.4%', Status: 'Operational' },
      { Metric: 'Active Game Sessions', Value: '42,109', Trend: '+14.2%', Status: 'Optimal' },
      { Metric: 'Server Ping Latency', Value: '18ms', Trend: '-2.1%', Status: 'Healthy' },
      { Metric: 'Live Ops Events Active', Value: '12', Trend: '+3', Status: 'Active' }
    ];

    const dateStr = new Date().toISOString().slice(0, 10);
    const success = exportToCSV(`mgms_mission_control_telemetry_${dateStr}.csv`, rows);
    if (success && addToast) {
      addToast('Downloaded live telemetry report as CSV file!', 'success');
    }
  };

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: 4, letterSpacing: '-0.03em' }}>
            Mission Control
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Real-time overview of your gaming ecosystem operations.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button 
            className="btn btn-secondary btn-sm" 
            style={{ padding: '8px 14px' }}
            onClick={handleExportTelemetry}
            title="Download telemetry report as CSV"
          >
            <Download size={15} />
            <span>Export Data</span>
          </button>
          <button className="btn btn-primary btn-sm" style={{ padding: '8px 16px' }}>
            <Zap size={15} />
            <span>Live Update</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Global Active Players</div>
          <div style={{ fontSize: '1.95rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit', marginTop: 4 }}>
            152,483
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--success-text)', fontWeight: 600, marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="live-dot" /> Ingress Stream Active
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Daily Revenue</div>
          <div style={{ fontSize: '1.95rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit', marginTop: 4 }}>
            $42,910.00
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--success-text)', fontWeight: 600, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
            <ArrowUpRight size={13} /> +6.4% vs Yesterday
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Retention Rate (D30)</div>
          <div style={{ fontSize: '1.95rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit', marginTop: 4 }}>
            34.2%
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--primary)', fontWeight: 600, marginTop: 4 }}>
            Top Decile Tier
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Server Reliability</div>
          <div style={{ fontSize: '1.95rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit', marginTop: 4 }}>
            99.98%
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--success-text)', fontWeight: 600, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span className="live-dot" /> Zero Critical Incidents
          </div>
        </div>
      </div>

      {/* Audience Growth Chart */}
      <div className="mgms-card" style={{ padding: '26px 30px', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-heading)' }}>Audience Growth</h3>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Daily vs Monthly Active User trends over the last 30 days</div>
          </div>
          <div style={{ display: 'flex', gap: 14, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }} /> DAU
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-cyan)' }} /> MAU
            </span>
          </div>
        </div>

        <div style={{ height: 220, width: '100%' }}>
          <svg viewBox="0 0 800 180" style={{ width: '100%', height: '100%' }}>
            <path d="M 0 140 Q 200 100, 400 110 T 800 50 L 800 180 L 0 180 Z" fill="rgba(6, 182, 212, 0.18)" />
            <path d="M 0 140 Q 200 100, 400 110 T 800 50" fill="none" stroke="var(--accent-cyan)" strokeWidth="2.5" />
            <path d="M 0 160 Q 200 130, 400 135 T 800 80 L 800 180 L 0 180 Z" fill="rgba(99, 102, 241, 0.25)" />
            <path d="M 0 160 Q 200 130, 400 135 T 800 80" fill="none" stroke="var(--primary)" strokeWidth="3" />
          </svg>
        </div>
      </div>

      {/* Whale Watch & Campaign Performance */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Whale Watch */}
        <div className="mgms-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)' }}>Whale Watch</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Highest value transactions in the last hour</div>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>View All &gt;</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { name: 'Alex Rivers', game: 'Star Vanguard', amount: '$499.99', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop' },
              { name: 'Sarah Chen', game: 'Neon Drift', amount: '$199.50', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop' },
              { name: 'Marcus Volt', game: 'Dungeon Siege', amount: '$89.00', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=60&h=60&fit=crop' },
              { name: 'Elena Thorne', game: 'Star Vanguard', amount: '$350.00', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop' }
            ].map((w, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src={w.avatar} alt={w.name} style={{ width: 34, height: 34, borderRadius: 10, objectFit: 'cover', border: '1px solid var(--border-color)' }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--text-heading)' }}>{w.name}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{w.game}</div>
                  </div>
                </div>
                <div style={{ fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'Outfit', fontSize: '1rem' }}>{w.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Performance */}
        <div className="mgms-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 4 }}>Campaign Performance</h3>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 18 }}>Live in-game events and community challenges</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { name: 'Summer Solstice Raid', participating: '12.4k Active', duration: '4h 30m' },
              { name: 'Neon City Grand Prix', participating: '31.2k Active', duration: '12h 15m' },
              { name: 'Cyber Week Sale', participating: '71.4k Active', duration: '2d' }
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'var(--bg-subtle)', borderRadius: 10, border: '1px solid var(--border-color)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-heading)' }}>{c.name}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--success-text)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, fontWeight: 600 }}>
                    <span className="live-dot" />
                    {c.participating}
                  </div>
                </div>
                <span className="badge badge-secondary" style={{ fontSize: '0.74rem' }}>{c.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
