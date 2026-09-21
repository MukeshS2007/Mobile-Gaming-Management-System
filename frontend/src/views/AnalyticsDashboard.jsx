import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { exportToCSV } from '../utils/csvExport';
import { Download, Users, DollarSign, Clock, TrendingUp, Globe, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function AnalyticsDashboard() {
  const { addToast } = useAuth();
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

  const handleExportAnalytics = () => {
    const rows = [
      ...COHORTS.map(c => ({
        'Category': 'Retention Cohort',
        'Segment / Region': c.cohort,
        'D0': c.d0,
        'D1': c.d1,
        'D7': c.d7,
        'D14': c.d14,
        'D30': c.d30
      })),
      ...GEOGRAPHY.map(g => ({
        'Category': 'Geographic Breakdown',
        'Segment / Region': `${g.country} (${g.code})`,
        'D0 (Revenue)': g.revenue,
        'D1 (Change)': g.change,
        'D7 (Trend)': g.up ? 'Trending Up' : 'Trending Down',
        'D14': 'N/A',
        'D30': 'N/A'
      }))
    ];

    const dateStr = new Date().toISOString().slice(0, 10);
    const success = exportToCSV(`mgms_analytics_report_${range}_${dateStr}.csv`, rows);
    if (success && addToast) {
      addToast(`Downloaded analytics report (${range}) as CSV file!`, 'success');
    }
  };

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: 4, letterSpacing: '-0.03em' }}>
            Analytics Dashboard
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Deep-dive operational telemetry, cohort retention, and funnel health.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', background: 'var(--bg-subtle)', padding: 4, borderRadius: 10, border: '1px solid var(--border-color)', gap: 4 }}>
            {['24H', '7D', '30D', '90D'].map((t) => (
              <button
                key={t}
                onClick={() => setRange(t)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 6,
                  border: 'none',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  background: range === t ? 'var(--primary-gradient)' : 'transparent',
                  color: range === t ? 'white' : 'var(--text-muted)',
                  cursor: 'pointer',
                  boxShadow: range === t ? 'var(--shadow-purple)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <button 
            className="btn btn-primary btn-sm" 
            style={{ padding: '8px 16px' }}
            onClick={handleExportAnalytics}
            title="Download CSV analytics report"
          >
            <Download size={15} />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--success-light)', color: 'var(--success-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--success-border)' }}>
              <DollarSign size={18} />
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--success-text)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowUpRight size={13} /> +14.2%
            </span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Revenue</div>
          <div style={{ fontSize: '1.95rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit', marginTop: 2 }}>
            $1,245,600
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-glow)' }}>
              <Users size={18} />
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--success-text)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowUpRight size={13} /> +22.5%
            </span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Daily Active Users</div>
          <div style={{ fontSize: '1.95rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit', marginTop: 2 }}>
            155,204
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--info-light)', color: 'var(--info-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--info-border)' }}>
              <Clock size={18} />
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--danger-text)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowDownRight size={13} /> -2.4%
            </span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Avg. Session Duration</div>
          <div style={{ fontSize: '1.95rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit', marginTop: 2 }}>
            12m 45s
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--success-light)', color: 'var(--success-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--success-border)' }}>
              <TrendingUp size={18} />
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--success-text)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowUpRight size={13} /> +0.8%
            </span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Conversion Rate</div>
          <div style={{ fontSize: '1.95rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit', marginTop: 2 }}>
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
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)' }}>Revenue & DAU Trends</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Daily performance correlation for Oct 2024</div>
            </div>
            <div style={{ display: 'flex', gap: 14, fontSize: '0.78rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }} /> Revenue
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent-cyan)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-cyan)' }} /> DAU
              </span>
            </div>
          </div>

          <div style={{ height: 210, width: '100%' }}>
            <svg viewBox="0 0 800 170" style={{ width: '100%', height: '100%' }}>
              <path d="M 0 130 Q 150 90, 300 100 T 600 60 T 800 30 L 800 170 L 0 170 Z" fill="rgba(6, 182, 212, 0.15)" />
              <path d="M 0 130 Q 150 90, 300 100 T 600 60 T 800 30" fill="none" stroke="var(--accent-cyan)" strokeWidth="2.5" />
              <path d="M 0 150 Q 160 120, 320 125 T 620 90 T 800 70 L 800 170 L 0 170 Z" fill="rgba(99, 102, 241, 0.22)" />
              <path d="M 0 150 Q 160 120, 320 125 T 620 90 T 800 70" fill="none" stroke="var(--primary)" strokeWidth="3" />
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: 8 }}>
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
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 2 }}>Acquisition Funnel</h3>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 20 }}>Conversion flow from install to purchase</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { step: 'App Installs', pct: 100, color: 'var(--primary)' },
              { step: 'Tutorial Start', pct: 82, color: 'var(--info)' },
              { step: 'Tutorial Finish', pct: 64, color: 'var(--success)' },
              { step: 'First Purchase', pct: 14.7, color: 'var(--danger)' }
            ].map((f, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{f.step}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{f.pct}%</span>
                </div>
                <div style={{ height: 8, width: '100%', background: 'var(--bg-subtle)', borderRadius: 999, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <div style={{ height: '100%', width: `${f.pct}%`, background: f.color, borderRadius: 999 }} />
                </div>
              </div>
            ))}

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 14,
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.8rem'
            }}>
              <span style={{ color: 'var(--text-muted)' }}>Overall Drop-off</span>
              <span style={{ fontWeight: 800, color: 'var(--danger-text)' }}>85.3%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Retention Cohorts + Geographic Revenue */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
        {/* Retention Cohort Heatmap */}
        <div className="mgms-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 2 }}>Retention Cohort Analysis</h3>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 16 }}>User stickiness over 30 days period</div>

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
                    <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{c.cohort}</td>
                    <td style={{ background: 'rgba(99, 102, 241, 0.25)', color: '#818cf8', fontWeight: 700, textAlign: 'center', borderRadius: 4 }}>{c.d0}</td>
                    <td style={{ background: 'rgba(99, 102, 241, 0.20)', color: '#a5b4fc', textAlign: 'center', borderRadius: 4 }}>{c.d1}</td>
                    <td style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#c7d2fe', textAlign: 'center', borderRadius: 4 }}>{c.d7}</td>
                    <td style={{ background: 'rgba(99, 102, 241, 0.10)', color: '#e0e7ff', textAlign: 'center', borderRadius: 4 }}>{c.d14}</td>
                    <td style={{ background: 'rgba(99, 102, 241, 0.05)', color: '#eef2ff', textAlign: 'center', borderRadius: 4 }}>{c.d30}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Geographic Revenue */}
        <div className="mgms-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <Globe size={16} color="var(--primary)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)' }}>Geographic Revenue</h3>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 16 }}>Top performing regions this month</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {GEOGRAPHY.map((g) => (
              <div key={g.code} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, background: 'var(--bg-subtle)', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                    {g.code}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--text-heading)' }}>{g.country}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-heading)', fontFamily: 'Outfit' }}>{g.revenue}</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: g.up ? 'var(--success-text)' : 'var(--danger-text)' }}>
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
