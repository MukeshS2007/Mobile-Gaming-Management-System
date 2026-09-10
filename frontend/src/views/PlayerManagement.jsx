import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  UserCheck, 
  Activity, 
  TrendingUp, 
  Download, 
  UserPlus, 
  Search, 
  Eye, 
  Edit3, 
  Ban, 
  ShieldAlert, 
  Radio, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';

export default function PlayerManagement({ onSelectPlayer }) {
  const { addToast } = useAuth();
  const [filterPill, setFilterPill] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const PLAYERS = [
    {
      id: 'PLR-8821',
      name: "Alex 'Cipher' Vance",
      email: 'alex.vance@gaming.net',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop',
      status: 'online',
      level: 42,
      region: 'United States',
      balance: '12,540',
      ltv: '$149.99'
    },
    {
      id: 'PLR-2104',
      name: 'Sakura Tanaka',
      email: 's.tanaka@tokyo.jp',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop',
      status: 'away',
      level: 78,
      region: 'Japan',
      balance: '85,200',
      ltv: '$4,520.50'
    },
    {
      id: 'PLR-3312',
      name: 'Marcus Aurelius',
      email: 'm.aurelius@rome.it',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=60&h=60&fit=crop',
      status: 'offline',
      level: 15,
      region: 'Italy',
      balance: '450',
      ltv: '$0.00'
    },
    {
      id: 'PLR-7754',
      name: 'Elena Rodriguez',
      email: 'e.rodriguez@madrid.es',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop',
      status: 'online',
      level: 56,
      region: 'Spain',
      balance: '3,200',
      ltv: '$89.95'
    },
    {
      id: 'PLR-0091',
      name: 'Ivan Drago',
      email: 'i.drago@moscow.ru',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
      status: 'banned',
      level: 99,
      region: 'Russia',
      balance: '1,056,700',
      ltv: '$12,450.00'
    }
  ];

  const filtered = PLAYERS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.email.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchSearch) return false;
    if (filterPill === 'whales') return parseFloat(p.ltv.replace('$', '').replace(',', '')) > 500;
    if (filterPill === 'suspicious') return p.status === 'banned';
    if (filterPill === 'vip') return p.level >= 50;
    return true;
  });

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
            Player Management
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
            Monitor, manage, and engage with your global player base.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="btn btn-secondary btn-sm" style={{ padding: '8px 14px' }}>
            <Download size={15} />
            <span>Export CSV</span>
          </button>
          <button className="btn btn-primary btn-sm" style={{ padding: '8px 16px' }} onClick={() => addToast('Add Player dialog', 'info')}>
            <UserPlus size={16} />
            <span>+ Add Player</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>TOTAL REGISTERED</span>
            <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>+12%</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit' }}>1.2M</div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>CONCURRENT USERS</span>
            <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>+5.4%</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit' }}>45,802</div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>NEW TODAY</span>
            <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>+0.8%</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit' }}>2,144</div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>AVG. RETENTION</span>
            <span style={{ fontSize: '0.72rem', color: '#ef4444', fontWeight: 700 }}>-2.1%</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit' }}>68.2%</div>
        </div>
      </div>

      {/* Filter Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ position: 'relative', width: 340 }}>
          <input
            type="text"
            className="form-input"
            placeholder="Filter by name, ID, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: 36, fontSize: '0.84rem' }}
          />
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {['All Players', 'Whales', 'Active Trial', 'Suspicious', 'VIP'].map((p) => {
            const key = p.toLowerCase();
            const isActive = (key === 'all players' && filterPill === 'all') || filterPill === key;
            return (
              <button
                key={p}
                onClick={() => setFilterPill(key === 'all players' ? 'all' : key)}
                className={`pill-tab ${isActive ? 'active' : ''}`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* Players Table */}
      <div className="mgms-card" style={{ padding: 24, marginBottom: 28 }}>
        <div className="table-container">
          <table className="mgms-table">
            <thead>
              <tr>
                <th>PLAYER</th>
                <th>STATUS</th>
                <th>LEVEL</th>
                <th>REGION</th>
                <th>BALANCE (GEMS)</th>
                <th>LTV</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((player) => (
                <tr key={player.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img src={player.avatar} alt={player.name} style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div 
                          style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', cursor: 'pointer' }}
                          onClick={() => onSelectPlayer(player)}
                          title="Click to view detailed profile"
                        >
                          {player.name}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                          <code>{player.id}</code> • {player.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${
                      player.status === 'online' ? 'badge-green' :
                      player.status === 'away' ? 'badge-amber' :
                      player.status === 'banned' ? 'badge-red' : 'badge-secondary'
                    }`}>
                      ● {player.status}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-purple">Lv {player.level}</span>
                  </td>
                  <td style={{ color: '#475569' }}>{player.region}</td>
                  <td>
                    <b style={{ color: '#6366f1', fontFamily: 'Outfit' }}>💎 {player.balance}</b>
                  </td>
                  <td style={{ fontWeight: 700, color: '#0f172a', fontFamily: 'Outfit' }}>{player.ltv}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 8 }}>
                      <button 
                        onClick={() => onSelectPlayer(player)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1' }}
                        title="Inspect Player Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => addToast(`Editing ${player.name}`, 'info')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        onClick={() => addToast(`Toggled enforcement for ${player.name}`, 'warning')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}
                        title="Ban / Restrict User"
                      >
                        <Ban size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, fontSize: '0.8rem', color: '#64748b' }}>
          <span>Showing 1-5 of 1,244 players</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ cursor: 'pointer' }}>&lt; Previous</span>
            <span style={{ padding: '2px 8px', background: '#6366f1', color: 'white', borderRadius: 4, fontWeight: 700 }}>1</span>
            <span style={{ padding: '2px 8px', cursor: 'pointer' }}>2</span>
            <span style={{ padding: '2px 8px', cursor: 'pointer' }}>3</span>
            <span>...</span>
            <span style={{ padding: '2px 8px', cursor: 'pointer' }}>40</span>
            <span style={{ cursor: 'pointer' }}>Next &gt;</span>
          </div>
        </div>
      </div>

      {/* Bottom Info Banners */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="mgms-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldAlert size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>Moderation Queue</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 2 }}>
              There are 14 pending reports from the community. Review flagged player behaviors.
            </div>
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Radio size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>Global Announcement</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 2 }}>
              Reach all 45,802 online players with a system-wide broadcast message.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
