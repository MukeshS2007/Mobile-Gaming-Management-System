import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { exportToCSV } from '../utils/csvExport';
import { Download, Plus, Filter, Eye, Edit3, MoreHorizontal, Trophy, TrendingUp, Radio, X, Check, Search } from 'lucide-react';

const CATEGORY_META = {
  RPG: { color: 'rgba(99, 102, 241, 0.15)', textColor: '#818cf8', icon: '🤖' },
  Strategy: { color: 'rgba(14, 165, 233, 0.15)', textColor: '#38bdf8', icon: '🛡️' },
  Simulation: { color: 'rgba(168, 85, 247, 0.15)', textColor: '#c084fc', icon: '🚀' },
  Adventure: { color: 'rgba(16, 185, 129, 0.15)', textColor: '#34d399', icon: '⚔️' },
  Racing: { color: 'rgba(245, 158, 11, 0.15)', textColor: '#fbbf24', icon: '🏎️' },
  Action: { color: 'rgba(239, 68, 68, 0.15)', textColor: '#f87171', icon: '⚡' }
};

const DEFAULT_GAMES = [
  {
    id: 'g1',
    title: 'Cyber Strike: Neon City',
    version: 'v2.4.1',
    category: 'RPG',
    categoryColor: 'rgba(99, 102, 241, 0.15)',
    categoryTextColor: '#818cf8',
    installBase: '1.2M',
    revenue: '$45,200',
    status: 'Live',
    icon: '🤖'
  },
  {
    id: 'g2',
    title: 'Shadow Realm Tactics',
    version: 'v1.0.9',
    category: 'Strategy',
    categoryColor: 'rgba(14, 165, 233, 0.15)',
    categoryTextColor: '#38bdf8',
    installBase: '850K',
    revenue: '$12,800',
    status: 'Maintenance',
    icon: '🛡️'
  },
  {
    id: 'g3',
    title: 'Star Voyager: Infinity',
    version: 'v3.1.0',
    category: 'Simulation',
    categoryColor: 'rgba(168, 85, 247, 0.15)',
    categoryTextColor: '#c084fc',
    installBase: '2.4M',
    revenue: '$102,500',
    status: 'Live',
    icon: '🚀'
  },
  {
    id: 'g4',
    title: 'Pixel Quest: Dungeons',
    version: 'v0.8.5',
    category: 'Adventure',
    categoryColor: 'rgba(16, 185, 129, 0.15)',
    categoryTextColor: '#34d399',
    installBase: '450K',
    revenue: '$4,100',
    status: 'Beta',
    icon: '⚔️'
  },
  {
    id: 'g5',
    title: 'Velocity Racer X',
    version: 'v4.2.0',
    category: 'Racing',
    categoryColor: 'rgba(245, 158, 11, 0.15)',
    categoryTextColor: '#fbbf24',
    installBase: '3.1M',
    revenue: '$89,000',
    status: 'Live',
    icon: '🏎️'
  }
];

export default function GamesPortfolio({ searchQuery = '', setSearchQuery, onClearSearch }) {
  const { games, refreshGames, activeGame, setActiveGame, addToast } = useAuth();
  const [filter, setFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newGame, setNewGame] = useState({
    gameName: '',
    gameType: 'RPG',
    description: '',
    version: '1.0.0',
    buildNumber: 1,
    status: 'LIVE',
    configuration: '{"maxLevel":100}',
    minimumAge: 12
  });

  // Map live games from backend API
  const displayGames = (games && games.length > 0)
    ? games.map((g, idx) => {
        const meta = CATEGORY_META[g.gameType] || { color: 'var(--bg-subtle)', textColor: 'var(--text-muted)', icon: '🎮' };
        const statusMap = {
          LIVE: 'Live',
          MAINTENANCE: 'Maintenance',
          DEVELOPMENT: 'Beta',
          SOFT_LAUNCH: 'Beta'
        };
        return {
          id: g.id || `g-backend-${idx}`,
          title: g.gameName,
          version: `v${g.version || '1.0.0'}`,
          category: g.gameType || 'Action',
          categoryColor: meta.color,
          categoryTextColor: meta.textColor,
          installBase: `${((idx + 1) * 340).toLocaleString()}K`,
          revenue: `$${((idx + 1) * 14200).toLocaleString()}`,
          status: statusMap[g.status] || 'Live',
          icon: meta.icon
        };
      })
    : DEFAULT_GAMES;

  const filteredGames = displayGames.filter((g) => {
    const matchesFilter = filter === 'all' || g.status.toLowerCase() === filter.toLowerCase();
    const q = (searchQuery || '').trim().toLowerCase();
    const matchesSearch = !q ||
      g.title.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q) ||
      g.version.toLowerCase().includes(q) ||
      g.status.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const handleCreateGame = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await api.games.create(newGame);
      await refreshGames();
      addToast(`Game "${newGame.gameName}" registered successfully!`, 'success');
      setShowAddModal(false);
      setNewGame({
        gameName: '',
        gameType: 'RPG',
        description: '',
        version: '1.0.0',
        buildNumber: 1,
        status: 'LIVE',
        configuration: '{"maxLevel":100}',
        minimumAge: 12
      });
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setCreating(false);
    }
  };

  const handleExportGamesCSV = () => {
    const listToExport = filteredGames.length > 0 ? filteredGames : displayGames;
    const rows = listToExport.map(g => ({
      'Game ID': g.id,
      'Title': g.title,
      'Category': g.category,
      'Version': g.version,
      'Install Base': g.installBase,
      '24h Revenue': g.revenue,
      'Status': g.status
    }));

    const dateStr = new Date().toISOString().slice(0, 10);
    const success = exportToCSV(`mgms_games_catalogue_${dateStr}.csv`, rows);
    if (success && addToast) {
      addToast(`Downloaded ${rows.length} games as CSV file!`, 'success');
    }
  };

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: 4, letterSpacing: '-0.03em' }}>
            Game Portfolio
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Manage and monitor live-ops for your entire gaming suite ({displayGames.length} titles registered in PostgreSQL).
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button 
            className="btn btn-secondary btn-sm" 
            style={{ padding: '8px 14px' }} 
            onClick={handleExportGamesCSV}
            title="Download CSV report of games"
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>
          <button className="btn btn-primary btn-sm" style={{ padding: '8px 16px' }} onClick={() => setShowAddModal(true)}>
            <Plus size={16} />
            <span>+ Add New Game</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {['All Games', 'Live', 'Maintenance', 'Beta'].map((tab) => {
            const key = tab.toLowerCase();
            const isActive = (key === 'all games' && filter === 'all') || filter === key;
            return (
              <button
                key={tab}
                onClick={() => setFilter(key === 'all games' ? 'all' : key)}
                className={`pill-tab ${isActive ? 'active' : ''}`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
            Connected to Spring Boot API: <strong style={{ color: 'var(--success-text)' }}>● UP</strong>
          </span>
        </div>
      </div>

      {/* Game Table Card */}
      <div className="mgms-card" style={{ padding: 24, marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-heading)' }}>Catalogue</h3>
            <span className="badge badge-secondary" style={{ fontSize: '0.72rem' }}>{filteredGames.length} Games</span>
            {searchQuery && (
              <span className="badge badge-purple" style={{ fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                Filtered: "{searchQuery}"
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: 260 }}>
              <Search 
                size={14} 
                style={{ 
                  position: 'absolute', 
                  left: 12, 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: 'var(--text-dim)' 
                }} 
              />
              <input
                type="text"
                placeholder="Search games by title, genre..."
                className="form-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                style={{ 
                  paddingLeft: 34, 
                  paddingRight: searchQuery ? 30 : 12, 
                  height: 34, 
                  fontSize: '0.82rem',
                  background: 'var(--bg-subtle)'
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery && setSearchQuery('')}
                  style={{ 
                    position: 'absolute', 
                    right: 8, 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    background: 'none', 
                    border: 'none', 
                    color: 'var(--text-dim)', 
                    cursor: 'pointer',
                    padding: 2,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {searchQuery && onClearSearch && (
              <button 
                onClick={onClearSearch}
                className="btn btn-secondary btn-sm"
                style={{ padding: '6px 12px', fontSize: '0.76rem' }}
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        <div className="table-container">
          <table className="mgms-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}><input type="checkbox" /></th>
                <th>GAME INFORMATION</th>
                <th>CATEGORY</th>
                <th>INSTALL BASE</th>
                <th>REVENUE (24H)</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredGames.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--text-muted)' }}>
                    No games found matching "{searchQuery}"
                    {onClearSearch && (
                      <div style={{ marginTop: 12 }}>
                        <button onClick={onClearSearch} className="btn btn-secondary btn-sm">
                          Clear search
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                filteredGames.map((g) => (
                <tr key={g.id}>
                  <td><input type="checkbox" /></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem'
                      }}>
                        {g.icon}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-heading)' }}>{g.title}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>{g.version}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: 999,
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      background: g.categoryColor,
                      color: g.categoryTextColor,
                      border: '1px solid var(--border-color)'
                    }}>
                      {g.category}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{g.installBase}</td>
                  <td style={{ fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'Outfit' }}>{g.revenue}</td>
                  <td>
                    <span className={`badge ${
                      g.status === 'Live' ? 'badge-green' :
                      g.status === 'Maintenance' ? 'badge-amber' : 'badge-purple'
                    }`}>
                      {g.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 8, color: 'var(--text-muted)' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><Eye size={16} /></button>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><Edit3 size={16} /></button>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><MoreHorizontal size={16} /></button>
                    </div>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>Showing 1-5 of {filteredGames.length} games</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ cursor: 'pointer', color: 'var(--text-dim)' }}>&lt;</span>
            <span style={{ padding: '2px 8px', background: 'var(--primary-gradient)', color: 'white', borderRadius: 6, fontWeight: 700 }}>1</span>
            <span style={{ padding: '2px 8px', cursor: 'pointer' }}>2</span>
            <span style={{ padding: '2px 8px', cursor: 'pointer' }}>3</span>
            <span>...</span>
            <span style={{ padding: '2px 8px', cursor: 'pointer' }}>5</span>
            <span style={{ cursor: 'pointer', color: 'var(--text-dim)' }}>&gt;</span>
          </div>
        </div>
      </div>

      {/* Bottom Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        <div className="mgms-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-glow)' }}>
            <Trophy size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOP PERFORMING</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-heading)' }}>Cyber Strike</div>
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--success-light)', color: 'var(--success-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--success-border)' }}>
            <TrendingUp size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>AVG. GROWTH</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-heading)' }}>+12.4% MoM</div>
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--info-light)', color: 'var(--info-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--info-border)' }}>
            <Radio size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>ACTIVE CAMPAIGNS</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-heading)' }}>8 Live Ops</div>
          </div>
        </div>
      </div>

      {/* Add New Game Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" style={{ maxWidth: 520 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-heading)' }}>Register New Game</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateGame} style={{ padding: '20px 24px' }}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                  GAME TITLE
                </label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={newGame.gameName}
                  onChange={(e) => setNewGame({ ...newGame, gameName: e.target.value })}
                  placeholder="e.g. Apex Rivals: Warzone"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                    CATEGORY
                  </label>
                  <select
                    className="form-input"
                    value={newGame.gameType}
                    onChange={(e) => setNewGame({ ...newGame, gameType: e.target.value })}
                  >
                    <option value="RPG">RPG</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Racing">Racing</option>
                    <option value="Action">Action</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                    STATUS
                  </label>
                  <select
                    className="form-input"
                    value={newGame.status}
                    onChange={(e) => setNewGame({ ...newGame, status: e.target.value })}
                  >
                    <option value="LIVE">LIVE</option>
                    <option value="DEVELOPMENT">DEVELOPMENT</option>
                    <option value="MAINTENANCE">MAINTENANCE</option>
                    <option value="SOFT_LAUNCH">SOFT LAUNCH</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                    VERSION
                  </label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={newGame.version}
                    onChange={(e) => setNewGame({ ...newGame, version: e.target.value })}
                    placeholder="1.0.0"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                    MINIMUM AGE
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="18"
                    className="form-input"
                    value={newGame.minimumAge}
                    onChange={(e) => setNewGame({ ...newGame, minimumAge: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                  DESCRIPTION
                </label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={newGame.description}
                  onChange={(e) => setNewGame({ ...newGame, description: e.target.value })}
                  placeholder="Overview of gameplay mechanics, setting, and multiplayer features..."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="btn btn-primary btn-sm"
                >
                  {creating ? 'Saving to Database...' : 'Register Game'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
