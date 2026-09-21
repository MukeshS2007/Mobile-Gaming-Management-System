import React from 'react';
import { Users, DollarSign, Activity, Calendar, Radio, Plus, ArrowUpRight } from 'lucide-react';

export default function GlobalOperations() {
  return (
    <div style={{ padding: '32px 40px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            MANAGEMENT CONSOLE
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: 4, letterSpacing: '-0.03em' }}>
            Global Operations Dashboard
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Welcome back, Chief. Everything looks stable across regions.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: 'var(--text-muted)', background: 'var(--bg-subtle)', padding: '6px 14px', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <Calendar size={15} color="var(--primary)" />
          <span>July 13, 2026</span>
        </div>
      </div>

      {/* 3 Large KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 28 }}>
        <div className="mgms-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-glow)' }}>
              <Users size={20} />
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--success-text)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowUpRight size={13} /> +12.5%
            </span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Global Active Players</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit', marginTop: 4 }}>
            2,482,194
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--success-light)', color: 'var(--success-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--success-border)' }}>
              <DollarSign size={20} />
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--success-text)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowUpRight size={13} /> +4.2%
            </span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Revenue (24h)</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit', marginTop: 4 }}>
            $1.24M
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-glow)' }}>
              <Activity size={20} />
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--success-text)', fontWeight: 700 }}>-8.1%</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Average Server Latency</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit', marginTop: 4 }}>
            42ms
          </div>
        </div>
      </div>

      {/* User Growth Trends Chart */}
      <div className="mgms-card" style={{ padding: 28, marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-heading)' }}>User Growth Trends</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>DAU/MAU performance across global clusters</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="badge badge-purple">7 Days</span>
            <span className="badge badge-secondary">30 Days</span>
          </div>
        </div>

        <div style={{ height: 200, width: '100%' }}>
          <svg viewBox="0 0 800 160" style={{ width: '100%', height: '100%' }}>
            <path d="M 0 130 Q 200 90, 400 100 T 800 40 L 800 160 L 0 160 Z" fill="rgba(6, 182, 212, 0.15)" />
            <path d="M 0 130 Q 200 90, 400 100 T 800 40" fill="none" stroke="var(--accent-cyan)" strokeWidth="2.5" />
            <path d="M 0 150 Q 200 120, 400 125 T 800 70 L 800 160 L 0 160 Z" fill="rgba(99, 102, 241, 0.25)" />
            <path d="M 0 150 Q 200 120, 400 125 T 800 70" fill="none" stroke="var(--primary)" strokeWidth="3" />
          </svg>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
        {/* Recent High-Value Purchases */}
        <div className="mgms-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 2 }}>Recent High-Value Purchases</h3>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 16 }}>Latest financial events exceeding $10.00 threshold</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { player: 'Alex "Nova" Chen', item: 'Celestial Dragon Pack (Limited Edition)', amount: '$99.99', status: 'Completed' },
              { player: 'Sarah Knight', item: '10,000 Gems + Bonus Crystals', amount: '$49.50', status: 'Completed' },
              { player: 'Marcus "Void" J.', item: 'Season Pass: Frost Rebirth', amount: '$14.99', status: 'Pending' },
              { player: 'Elena Soroka', item: 'Artifact Upgrade Stones x50', amount: '$129.00', status: 'Completed' },
              { player: 'David Low', item: 'Daily Stamina Bundle (30 Days)', amount: '$9.99', status: 'Flagged' }
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid var(--border-subtle)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--text-heading)' }}>{row.player}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{row.item}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.94rem', color: 'var(--text-heading)', fontFamily: 'Outfit' }}>{row.amount}</div>
                  <span className={`badge ${row.status === 'Completed' ? 'badge-green' : row.status === 'Pending' ? 'badge-amber' : 'badge-red'}`} style={{ fontSize: '0.65rem' }}>
                    {row.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Operations */}
        <div className="mgms-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)' }}>
              <Radio size={16} color="var(--primary)" /> 
              <span>Live Operations</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { name: 'Frost Wyrm Raid', desc: 'Active world boss encounter', time: '04:12:00' },
              { name: 'Guild War Season 4', desc: 'Cross-server tournament', time: '01:05:20' },
              { name: 'Summer Gacha Fest', desc: '2x SSR pull rate active', time: '12:45:00' },
              { name: 'Double XP Weekend', desc: 'Global player progression boost', time: '21:10:45' }
            ].map((ev, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'var(--bg-subtle)', borderRadius: 10, border: '1px solid var(--border-color)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--text-heading)' }}>{ev.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{ev.desc}</div>
                </div>
                <span className="badge badge-secondary" style={{ fontSize: '0.72rem' }}>{ev.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
