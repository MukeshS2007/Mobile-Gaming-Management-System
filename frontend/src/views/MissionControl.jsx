import React from 'react';
import { Download, RefreshCw, Users, DollarSign, Activity, Radio, ArrowUpRight, Zap, Flame } from 'lucide-react';

export default function MissionControl() {
  return (
    <div style={{ padding: '32px 40px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
            Mission Control
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
            Real-time overview of your gaming ecosystem operations.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="btn btn-secondary btn-sm" style={{ padding: '8px 14px' }}>
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
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Global Active Players</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit', marginTop: 4 }}>
            152,483
          </div>
          <div style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 600, marginTop: 4 }}>
            ● Ingress Stream Active
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Total Daily Revenue</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit', marginTop: 4 }}>
            $42,910.00
          </div>
          <div style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 600, marginTop: 4 }}>
            +6.4% vs Yesterday
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Retention Rate (D30)</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit', marginTop: 4 }}>
            34.2%
          </div>
          <div style={{ fontSize: '0.74rem', color: '#6366f1', fontWeight: 600, marginTop: 4 }}>
            Top Decile Tier
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Server Reliability</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit', marginTop: 4 }}>
            99.98%
          </div>
          <div style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 600, marginTop: 4 }}>
            Zero Critical Incidents
          </div>
        </div>
      </div>

      {/* Audience Growth Chart */}
      <div className="mgms-card" style={{ padding: '26px 30px', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>Audience Growth</h3>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Daily vs Monthly Active User trends over the last 30 days</div>
          </div>
          <div style={{ display: 'flex', gap: 14, fontSize: '0.78rem', color: '#64748b' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#6366f1' }} /> DAU
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#06b6d4' }} /> MAU
            </span>
          </div>
        </div>

        <div style={{ height: 220, width: '100%' }}>
          <svg viewBox="0 0 800 180" style={{ width: '100%', height: '100%' }}>
            <path d="M 0 140 Q 200 100, 400 110 T 800 50 L 800 180 L 0 180 Z" fill="rgba(6, 182, 212, 0.15)" />
            <path d="M 0 140 Q 200 100, 400 110 T 800 50" fill="none" stroke="#06b6d4" strokeWidth="2.5" />
            <path d="M 0 160 Q 200 130, 400 135 T 800 80 L 800 180 L 0 180 Z" fill="rgba(99, 102, 241, 0.2)" />
            <path d="M 0 160 Q 200 130, 400 135 T 800 80" fill="none" stroke="#6366f1" strokeWidth="3" />
          </svg>
        </div>
      </div>

      {/* Whale Watch & Campaign Performance */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Whale Watch */}
        <div className="mgms-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>Whale Watch</h3>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Highest value transactions in the last hour</div>
            </div>
            <span style={{ fontSize: '0.78rem', color: '#6366f1', fontWeight: 600, cursor: 'pointer' }}>View All &gt;</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { name: 'Alex Rivers', game: 'Star Vanguard', amount: '$499.99', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop' },
              { name: 'Sarah Chen', game: 'Neon Drift', amount: '$199.50', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop' },
              { name: 'Marcus Volt', game: 'Dungeon Siege', amount: '$89.00', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=60&h=60&fit=crop' },
              { name: 'Elena Thorne', game: 'Star Vanguard', amount: '$350.00', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop' }
            ].map((w, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src={w.avatar} alt={w.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.86rem', color: '#0f172a' }}>{w.name}</div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{w.game}</div>
                  </div>
                </div>
                <div style={{ fontWeight: 700, color: '#0f172a', fontFamily: 'Outfit' }}>{w.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Performance */}
        <div className="mgms-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Campaign Performance</h3>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: 18 }}>Live in-game events and community challenges</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { name: 'Summer Solstice Raid', participating: '12.4k Active', duration: '4h 30m' },
              { name: 'Neon City Grand Prix', participating: '31.2k Active', duration: '12h 15m' },
              { name: 'Cyber Week Sale', participating: '71.4k Active', duration: '2d' }
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#f8fafc', borderRadius: 10 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#0f172a' }}>{c.name}</div>
                  <div style={{ fontSize: '0.74rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
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
