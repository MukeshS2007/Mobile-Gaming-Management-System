import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { exportToCSV } from '../utils/csvExport';
import { 
  Users, 
  DollarSign, 
  Clock, 
  Activity, 
  Filter, 
  Download, 
  Plus, 
  Radio, 
  Server, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  CheckCircle2,
  Clock3,
  Sparkles
} from 'lucide-react';

export default function SystemOverview({ onSelectTab, searchQuery = '', setSearchQuery, onClearSearch }) {
  const { user, role, activeGame, addToast } = useAuth();
  const [timeRange, setTimeRange] = useState('7d');

  const TRANSACTIONS = [
    {
      player: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop',
      game: 'Nebula Strike',
      amount: '$49.99',
      time: '2m ago',
      status: 'Completed'
    },
    {
      player: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop',
      game: 'Cyber Arena',
      amount: '$112.50',
      time: '15m ago',
      status: 'Pending'
    },
    {
      player: 'Marcus Vogt',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=60&h=60&fit=crop',
      game: 'Nebula Strike',
      amount: '$89.00',
      time: '1h ago',
      status: 'Completed'
    },
    {
      player: 'Elena Petrova',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop',
      game: 'Fantasy Realms',
      amount: '$199.99',
      time: '3h ago',
      status: 'Rejected'
    },
    {
      player: 'Jordan Smyth',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
      game: 'Cyber Arena',
      amount: '$20.00',
      time: '5h ago',
      status: 'Completed'
    }
  ];

  const handleExportData = () => {
    const q = (searchQuery || '').trim().toLowerCase();
    const records = q 
      ? TRANSACTIONS.filter(t => 
          t.player.toLowerCase().includes(q) || 
          t.game.toLowerCase().includes(q) || 
          t.status.toLowerCase().includes(q) ||
          t.amount.toLowerCase().includes(q)
        )
      : TRANSACTIONS;

    const rows = records.map(t => ({
      'Player Name': t.player,
      'Game Title': t.game,
      'Transaction Amount': t.amount,
      'Timestamp': t.time,
      'Payment Status': t.status
    }));

    const dateStr = new Date().toISOString().slice(0, 10);
    const success = exportToCSV(`mgms_system_overview_transactions_${dateStr}.csv`, rows);
    if (success && addToast) {
      addToast(`Downloaded ${rows.length} transactions as CSV file!`, 'success');
    }
  };

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Top Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 28,
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: 4, letterSpacing: '-0.03em' }}>
            System Overview
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Welcome back, {user?.firstName || 'Admin'}. Here's what's happening across your games today.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="btn btn-secondary btn-sm" style={{ padding: '8px 14px' }} onClick={() => addToast && addToast('Filtering applied to overview', 'info')}>
            <Filter size={15} />
            <span>Filters</span>
          </button>
          <button 
            className="btn btn-secondary btn-sm" 
            style={{ padding: '8px 14px' }}
            onClick={handleExportData}
            title="Download CSV report"
          >
            <Download size={15} />
            <span>Export Data</span>
          </button>
          <button 
            className="btn btn-primary btn-sm" 
            style={{ padding: '8px 16px' }}
            onClick={() => onSelectTab('games')}
          >
            <Plus size={16} />
            <span>Quick Launch</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
        {/* Active Players */}
        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ 
              width: 38, 
              height: 38, 
              borderRadius: 10, 
              background: 'var(--primary-light)', 
              color: 'var(--primary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '1px solid var(--border-glow)'
            }}>
              <Users size={18} />
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--success-text)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowUpRight size={14} /> +12.5%
            </span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Players</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit', marginTop: 2 }}>
            1,284,502
          </div>
        </div>

        {/* Daily Revenue */}
        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ 
              width: 38, 
              height: 38, 
              borderRadius: 10, 
              background: 'var(--success-light)', 
              color: 'var(--success-text)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '1px solid var(--success-border)'
            }}>
              <DollarSign size={18} />
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--success-text)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowUpRight size={14} /> +8.2%
            </span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Daily Revenue</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit', marginTop: 2 }}>
            $42,890.00
          </div>
        </div>

        {/* Avg Session Time */}
        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ 
              width: 38, 
              height: 38, 
              borderRadius: 10, 
              background: 'var(--info-light)', 
              color: 'var(--info-text)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '1px solid var(--info-border)'
            }}>
              <Clock size={18} />
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--danger-text)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowDownRight size={14} /> -2.4%
            </span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Avg. Session Time</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit', marginTop: 2 }}>
            24m 12s
          </div>
        </div>

        {/* Server Reliability */}
        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ 
              width: 38, 
              height: 38, 
              borderRadius: 10, 
              background: 'var(--primary-light)', 
              color: 'var(--primary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '1px solid var(--border-glow)'
            }}>
              <Activity size={18} />
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--success-text)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowUpRight size={14} /> +0.02%
            </span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Server Reliability</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit', marginTop: 2 }}>
            99.98%
          </div>
        </div>
      </div>

      {/* Main Chart: Engagement Trends */}
      <div className="mgms-card" style={{ padding: '26px 30px', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 2 }}>
              Engagement Trends
            </h3>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Daily vs Monthly Active Users across all platforms
            </div>
          </div>

          <div style={{ display: 'flex', background: 'var(--bg-subtle)', padding: 3, borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <button
              onClick={() => setTimeRange('7d')}
              style={{
                border: 'none',
                background: timeRange === '7d' ? 'var(--primary-gradient)' : 'transparent',
                padding: '5px 14px',
                borderRadius: 6,
                fontSize: '0.76rem',
                fontWeight: 600,
                color: timeRange === '7d' ? '#ffffff' : 'var(--text-muted)',
                cursor: 'pointer',
                boxShadow: timeRange === '7d' ? 'var(--shadow-purple)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              style={{
                border: 'none',
                background: timeRange === '30d' ? 'var(--primary-gradient)' : 'transparent',
                padding: '5px 14px',
                borderRadius: 6,
                fontSize: '0.76rem',
                fontWeight: 600,
                color: timeRange === '30d' ? '#ffffff' : 'var(--text-muted)',
                cursor: 'pointer',
                boxShadow: timeRange === '30d' ? 'var(--shadow-purple)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              30 Days
            </button>
          </div>
        </div>

        {/* SVG Area Chart */}
        <div style={{ height: 240, width: '100%', position: 'relative' }}>
          <svg viewBox="0 0 800 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="gradientActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="gradientLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1="40" x2="800" y2="40" stroke="var(--border-subtle)" strokeWidth="1" />
            <line x1="0" y1="90" x2="800" y2="90" stroke="var(--border-subtle)" strokeWidth="1" />
            <line x1="0" y1="140" x2="800" y2="140" stroke="var(--border-subtle)" strokeWidth="1" />
            <line x1="0" y1="190" x2="800" y2="190" stroke="var(--border-subtle)" strokeWidth="1" />

            {/* Area 1 */}
            <path
              d="M 0 140 Q 130 90, 260 110 T 520 80 T 800 40 L 800 190 L 0 190 Z"
              fill="url(#gradientLight)"
            />
            <path
              d="M 0 140 Q 130 90, 260 110 T 520 80 T 800 40"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2.5"
            />

            {/* Area 2 */}
            <path
              d="M 0 170 Q 140 130, 280 140 T 540 120 T 800 90 L 800 190 L 0 190 Z"
              fill="url(#gradientActive)"
            />
            <path
              d="M 0 170 Q 140 130, 280 140 T 540 120 T 800 90"
              fill="none"
              stroke="#6366f1"
              strokeWidth="3"
            />
          </svg>

          {/* X Axis labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: 12 }}>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </div>

      {/* Bottom Row: High-Value Transactions & Live Events / Infra */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
        {/* Left: High-Value Transactions */}
        <div className="mgms-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                High-Value Transactions
              </h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Latest $50+ purchases across all regions</div>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>
              View All &gt;
            </span>
          </div>

          <div className="table-container">
            {searchQuery && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px', background: 'var(--bg-subtle)', borderRadius: 8, marginBottom: 12, fontSize: '0.78rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Filtering transactions for: <strong style={{ color: 'var(--primary)' }}>"{searchQuery}"</strong></span>
                {onClearSearch && (
                  <button onClick={onClearSearch} className="btn btn-secondary btn-sm" style={{ padding: '2px 8px', fontSize: '0.72rem' }}>
                    Clear
                  </button>
                )}
              </div>
            )}
            <table className="mgms-table">
              <thead>
                <tr>
                  <th>PLAYER</th>
                  <th>GAME</th>
                  <th>AMOUNT</th>
                  <th>TIME</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const q = (searchQuery || '').trim().toLowerCase();
                  const filtered = TRANSACTIONS.filter((t) => {
                    if (!q) return true;
                    return t.player.toLowerCase().includes(q) ||
                           t.game.toLowerCase().includes(q) ||
                           t.amount.toLowerCase().includes(q) ||
                           t.status.toLowerCase().includes(q);
                  });

                  if (filtered.length === 0) {
                    return (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--text-muted)' }}>
                          No transactions matching "{searchQuery}"
                          {onClearSearch && (
                            <div style={{ marginTop: 8 }}>
                              <button onClick={onClearSearch} className="btn btn-secondary btn-sm">
                                Clear search
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  }

                  return filtered.map((t, idx) => (
                    <tr key={idx}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <img
                            src={t.avatar}
                            alt={t.player}
                            style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                          />
                          <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{t.player}</span>
                        </div>
                      </td>
                      <td style={{ color: 'var(--text-muted)' }}>{t.game}</td>
                      <td style={{ fontWeight: 700, color: 'var(--text-heading)' }}>{t.amount}</td>
                      <td style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>{t.time}</td>
                      <td>
                        <span className={`badge ${
                          t.status === 'Completed' ? 'badge-green' :
                          t.status === 'Pending' ? 'badge-amber' : 'badge-red'
                        }`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ));
                })()}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Live Events & Global Infrastructure */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Live Events Card */}
          <div className="mgms-card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                <Radio size={16} color="var(--primary)" />
                <span>Live Events</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--text-heading)' }}>Nebula Raid</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>24.5k participating</div>
                </div>
                <span className="badge badge-green">RUNNING</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--text-heading)' }}>Cyber Season 4</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>112k participating</div>
                </div>
                <span className="badge badge-purple">ACTIVE</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--text-heading)' }}>Weekend Blitz</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>12k participating</div>
                </div>
                <span className="badge badge-amber">ENDING SOON</span>
              </div>
            </div>
          </div>

          {/* Global Infrastructure Card */}
          <div className="mgms-card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 16 }}>
              <Server size={16} color="var(--primary)" />
              <span>Global Infrastructure</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>US-East (Virginia)</span>
                <span className="badge badge-green">Optimal</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>EU-West (Ireland)</span>
                <span className="badge badge-green">Optimal</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>AP-South (Tokyo)</span>
                <span className="badge badge-amber">Under Load</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
