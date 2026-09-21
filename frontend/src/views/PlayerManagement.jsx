import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { exportToCSV } from '../utils/csvExport';
import AddPlayerModal from '../components/modals/AddPlayerModal';
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
  ArrowDownRight,
  X
} from 'lucide-react';

const INITIAL_PLAYERS = [
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

export default function PlayerManagement({ onSelectPlayer, searchQuery = '', setSearchQuery, onClearSearch }) {
  const { addToast } = useAuth();
  const [filterPill, setFilterPill] = useState('all');
  const [playersList, setPlayersList] = useState(INITIAL_PLAYERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playerToEdit, setPlayerToEdit] = useState(null);

  const activeSearch = (searchQuery || '').trim().toLowerCase();

  const filtered = playersList.filter((p) => {
    const matchSearch = !activeSearch || 
      p.name.toLowerCase().includes(activeSearch) || 
      p.email.toLowerCase().includes(activeSearch) || 
      p.id.toLowerCase().includes(activeSearch) ||
      p.region.toLowerCase().includes(activeSearch);
    if (!matchSearch) return false;
    if (filterPill === 'whales') return parseFloat(p.ltv.replace('$', '').replace(/,/g, '')) > 500;
    if (filterPill === 'suspicious') return p.status === 'banned';
    if (filterPill === 'vip') return p.level >= 50;
    return true;
  });

  const handleOpenAdd = () => {
    setPlayerToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (player) => {
    setPlayerToEdit(player);
    setIsModalOpen(true);
  };

  const handleSavePlayer = (playerData, isEditing) => {
    if (isEditing) {
      setPlayersList((prev) => prev.map((p) => p.id === playerData.id ? playerData : p));
      addToast(`Updated profile for ${playerData.name}`, 'success');
    } else {
      setPlayersList((prev) => [playerData, ...prev]);
      addToast(`Player ${playerData.name} registered successfully!`, 'success');
    }
  };

  const handleToggleBan = (player) => {
    const isBanning = player.status !== 'banned';
    setPlayersList((prev) =>
      prev.map((p) =>
        p.id === player.id
          ? { ...p, status: isBanning ? 'banned' : 'offline' }
          : p
      )
    );
    addToast(
      isBanning ? `Enforcement applied: ${player.name} banned` : `Enforcement lifted: ${player.name} restored`,
      isBanning ? 'warning' : 'success'
    );
  };

  const handleExportPlayersCSV = () => {
    const listToExport = filtered.length > 0 ? filtered : playersList;
    const rows = listToExport.map(p => ({
      'Player ID': p.id,
      'Full Name': p.name,
      'Email Address': p.email,
      'Online Status': p.status,
      'Player Level': p.level,
      'Region': p.region,
      'Gems Balance': p.balance,
      'Lifetime Value (LTV)': p.ltv
    }));

    const dateStr = new Date().toISOString().slice(0, 10);
    const success = exportToCSV(`mgms_players_${dateStr}.csv`, rows);
    if (success && addToast) {
      addToast(`Downloaded ${rows.length} players as CSV file!`, 'success');
    }
  };

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: 4, letterSpacing: '-0.03em' }}>
            Player Management
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Monitor, manage, and engage with your global player base.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button 
            className="btn btn-secondary btn-sm" 
            style={{ padding: '8px 14px' }}
            onClick={handleExportPlayersCSV}
            title="Download CSV report of players"
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>
          <button 
            className="btn btn-primary btn-sm" 
            style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6 }} 
            onClick={handleOpenAdd}
          >
            <UserPlus size={16} />
            <span>+ Add Player</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL REGISTERED</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--success-text)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowUpRight size={13} /> +12%
            </span>
          </div>
          <div style={{ fontSize: '1.95rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit' }}>1.2M</div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>CONCURRENT USERS</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--success-text)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowUpRight size={13} /> +5.4%
            </span>
          </div>
          <div style={{ fontSize: '1.95rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit' }}>45,802</div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>NEW TODAY</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--success-text)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowUpRight size={13} /> +0.8%
            </span>
          </div>
          <div style={{ fontSize: '1.95rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit' }}>2,144</div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>AVG. RETENTION</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--danger-text)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowDownRight size={13} /> -2.1%
            </span>
          </div>
          <div style={{ fontSize: '1.95rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit' }}>68.2%</div>
        </div>
      </div>

      {/* Filter Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ position: 'relative', width: 360 }}>
          <input
            type="text"
            className="form-input"
            placeholder="Filter by name, ID, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            style={{ paddingLeft: 40, paddingRight: searchQuery ? 34 : 12, fontSize: '0.84rem' }}
          />
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onClearSearch ? onClearSearch() : setSearchQuery && setSearchQuery('')}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: 2
              }}
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--text-muted)' }}>
                    No players found matching "{searchQuery}"
                    <div style={{ marginTop: 12 }}>
                      <button 
                        onClick={() => onClearSearch ? onClearSearch() : setSearchQuery && setSearchQuery('')} 
                        className="btn btn-secondary btn-sm"
                      >
                        Clear search
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((player) => (
                <tr key={player.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img src={player.avatar} alt={player.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }} />
                      <div>
                        <div 
                          style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-heading)', cursor: 'pointer', transition: 'color 0.15s ease' }}
                          onClick={() => onSelectPlayer(player)}
                          title="Click to view detailed profile"
                          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-heading)'}
                        >
                          {player.name}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                          <code style={{ color: 'var(--text-muted)' }}>{player.id}</code> • {player.email}
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
                  <td style={{ color: 'var(--text-body)' }}>{player.region}</td>
                  <td>
                    <b style={{ color: 'var(--primary)', fontFamily: 'Outfit' }}>💎 {player.balance}</b>
                  </td>
                  <td style={{ fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'Outfit' }}>{player.ltv}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 8 }}>
                      <button 
                        onClick={() => onSelectPlayer(player)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}
                        title="Inspect Player Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleOpenEdit(player)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                        title="Edit Player Profile"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        onClick={() => handleToggleBan(player)}
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          cursor: 'pointer', 
                          color: player.status === 'banned' ? 'var(--success-text)' : 'var(--danger-text)' 
                        }}
                        title={player.status === 'banned' ? "Reinstate Player" : "Ban / Suspend Player"}
                      >
                        <Ban size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>Showing 1-{filtered.length} of {playersList.length + 1239} players</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ cursor: 'pointer', color: 'var(--text-dim)' }}>&lt; Previous</span>
            <span style={{ padding: '2px 8px', background: 'var(--primary-gradient)', color: 'white', borderRadius: 4, fontWeight: 700 }}>1</span>
            <span style={{ padding: '2px 8px', cursor: 'pointer' }}>2</span>
            <span style={{ padding: '2px 8px', cursor: 'pointer' }}>3</span>
            <span>...</span>
            <span style={{ padding: '2px 8px', cursor: 'pointer' }}>40</span>
            <span style={{ cursor: 'pointer', color: 'var(--text-dim)' }}>Next &gt;</span>
          </div>
        </div>
      </div>

      {/* Bottom Info Banners */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="mgms-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-glow)' }}>
            <ShieldAlert size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-heading)' }}>Moderation Queue</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
              There are 14 pending reports from the community. Review flagged player behaviors.
            </div>
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--success-light)', color: 'var(--success-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--success-border)' }}>
            <Radio size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-heading)' }}>Global Announcement</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
              Reach all 45,802 online players with a system-wide broadcast message.
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Player Modal */}
      <AddPlayerModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setPlayerToEdit(null);
        }}
        onSave={handleSavePlayer}
        playerToEdit={playerToEdit}
      />
    </div>
  );
}
