import React, { useState } from 'react';
import { Download, Users, DollarSign, Clock, TrendingUp, Globe, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [range, setRange] = useState('30D');

  const COHORTS = [
    { cohort: 'Oct 01', d0: '100%', d1: '42%', d7: '18%', d14: '12%', d30: '8%' },
    { cohort: 'Oct 08', d0: '100%', d1: '45%', d7: '20%', d14: '14%', d30: '9%' },
    { cohort: 'Oct 15', d0: '100%', d1: '38%', d7: '15%', d14: '10%', d30: '7%' },
    { cohort: 'Oct 22', d0: '100%', d1: '48%', d7: '22%', d14: '16%', d30: '10%' },
    { cohort: 'Oct 29', d0: '100%', d1: '44%', d7: '19%', d14: '13%', d30: '8%' }
  ];

  const GEOGRAPHY = [
    { code: 'US', country: 'United States', revenue: '$240k', change: '+12%', up: true },
    { code: 'KR', country: 'South Korea', revenue: '$185k', change: '+8%', up: true },
    { code: 'DE', country: 'Germany', revenue: '$92k', change: '+15%', up: true },
    { code: 'JP', country: 'Japan', revenue: '$88k', change: '-2%', up: false },
    { code: 'UK', country: 'United Kingdom', revenue: '$74k', change: '+5%', up: true }
  ];

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
            Analytics Dashboard
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
            Comprehensive performance tracking and player insights.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', background: '#f1f5f9', padding: 3, borderRadius: 8 }}>
            {['Today', '7D', '30D', '90D'].map((t) => (
              <button
                key={t}
                onClick={() => setRange(t)}
                style={{
                  border: 'none',
                  background: range === t ? '#ffffff' : 'transparent',
                  padding: '5px 12px',
                  borderRadius: 6,
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: range === t ? '#0f172a' : '#64748b',
                  cursor: 'pointer',
                  boxShadow: range === t ? '0 1px 2px rgba(0,0,0,0.06)' : 'none'
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <button className="btn btn-primary btn-sm" style={{ padding: '8px 16px' }}>
            <Download size={15} />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={18} />
            </div>
            <span style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 700 }}>+14.2%</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Total Revenue</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit', marginTop: 2 }}>
            $1,245,600
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} />
            </div>
            <span style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 700 }}>+22.5%</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Daily Active Users</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit', marginTop: 2 }}>
            155,204
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: '#f0f9ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={18} />
            </div>
            <span style={{ fontSize: '0.74rem', color: '#ef4444', fontWeight: 700 }}>-2.4%</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Avg. Session Duration</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit', marginTop: 2 }}>
            12m 45s
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={18} />
            </div>
            <span style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 700 }}>+0.8%</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Conversion Rate</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit', marginTop: 2 }}>
            4.82%
          </div>
        </div>
      </div>

      {/* Middle Row: Revenue & DAU Trends + Acquisition Funnel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, marginBottom: 28 }}>
        {/* Revenue & DAU Trends */}
        <div className="mgms-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>Revenue & DAU Trends</h3>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Daily performance correlation for Oct 2024</div>
            </div>
            <div style={{ display: 'flex', gap: 14, fontSize: '0.78rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6366f1' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#6366f1' }} /> Revenue
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#06b6d4' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#06b6d4' }} /> DAU
              </span>
            </div>
          </div>

          <div style={{ height: 210, width: '100%' }}>
            <svg viewBox="0 0 800 170" style={{ width: '100%', height: '100%' }}>
              <path d="M 0 130 Q 150 90, 300 100 T 600 60 T 800 30 L 800 170 L 0 170 Z" fill="rgba(6, 182, 212, 0.12)" />
              <path d="M 0 130 Q 150 90, 300 100 T 600 60 T 800 30" fill="none" stroke="#06b6d4" strokeWidth="2.5" />
              <path d="M 0 150 Q 160 120, 320 125 T 620 90 T 800 70 L 800 170 L 0 170 Z" fill="rgba(99, 102, 241, 0.18)" />
              <path d="M 0 150 Q 160 120, 320 125 T 620 90 T 800 70" fill="none" stroke="#6366f1" strokeWidth="3" />
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginTop: 8 }}>
              <span>Oct 01</span>
              <span>Oct 05</span>
              <span>Oct 10</span>
              <span>Oct 15</span>
              <span>Oct 20</span>
              <span>Oct 25</span>
              <span>Oct 30</span>
            </div>
          </div>
        </div>

        {/* Acquisition Funnel */}
        <div className="mgms-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>Acquisition Funnel</h3>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: 20 }}>Conversion flow from install to purchase</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { step: 'App Installs', pct: 100, color: '#6366f1' },
              { step: 'Tutorial Start', pct: 82, color: '#0ea5e9' },
              { step: 'Tutorial Finish', pct: 64, color: '#10b981' },
              { step: 'First Purchase', pct: 14.7, color: '#ef4444' }
            ].map((f, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{f.step}</span>
                  <span style={{ color: '#64748b' }}>{f.pct}%</span>
                </div>
                <div style={{ height: 8, width: '100%', background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${f.pct}%`, background: f.color, borderRadius: 999 }} />
                </div>
              </div>
            ))}

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 12,
              borderTop: '1px solid #f1f5f9',
              fontSize: '0.8rem'
            }}>
              <span style={{ color: '#64748b' }}>Overall Drop-off</span>
              <span style={{ fontWeight: 800, color: '#ef4444' }}>85.3%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Retention Cohorts + Geographic Revenue */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
        {/* Retention Cohort Heatmap */}
        <div className="mgms-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>Retention Cohort Analysis</h3>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: 16 }}>User stickiness over 30 days period</div>

          <div className="table-container">
            <table className="mgms-table" style={{ fontSize: '0.8rem' }}>
              <thead>
                <tr>
                  <th>Cohort</th>
                  <th>Day 0</th>
                  <th>Day 1</th>
                  <th>Day 7</th>
                  <th>Day 14</th>
                  <th>Day 30</th>
                </tr>
              </thead>
              <tbody>
                {COHORTS.map((c, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{c.cohort}</td>
                    <td style={{ background: '#e0e7ff', color: '#4338ca', fontWeight: 700, textAlign: 'center' }}>{c.d0}</td>
                    <td style={{ background: '#ede9fe', color: '#6d28d9', textAlign: 'center' }}>{c.d1}</td>
                    <td style={{ background: '#f5f3ff', color: '#7c3aed', textAlign: 'center' }}>{c.d7}</td>
                    <td style={{ background: '#faf5ff', color: '#9333ea', textAlign: 'center' }}>{c.d14}</td>
                    <td style={{ background: '#fdf4ff', color: '#a855f7', textAlign: 'center' }}>{c.d30}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Geographic Revenue */}
        <div className="mgms-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <Globe size={16} color="#6366f1" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>Geographic Revenue</h3>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: 16 }}>Top performing regions this month</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {GEOGRAPHY.map((g) => (
              <div key={g.code} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>
                    {g.code}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: '0.86rem', color: '#0f172a' }}>{g.country}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>{g.revenue}</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: g.up ? '#10b981' : '#ef4444' }}>
                    {g.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: 20 }}>
            View Global Heatmap
          </button>
        </div>
      </div>
    </div>
  );
}
