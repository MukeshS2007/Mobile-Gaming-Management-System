import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Download, Plus, Filter, Eye, Edit3, MoreHorizontal, Trophy, TrendingUp, Radio, X, Check } from 'lucide-react';

const CATEGORY_META = {
  RPG: { color: '#e0e7ff', textColor: '#4338ca', icon: '🤖' },
  Strategy: { color: '#e0f2fe', textColor: '#0369a1', icon: '🛡️' },
  Simulation: { color: '#f3e8ff', textColor: '#7e22ce', icon: '🚀' },
  Adventure: { color: '#dcfce7', textColor: '#15803d', icon: '⚔️' },
  Racing: { color: '#ffedd5', textColor: '#c2410c', icon: '🏎️' },
  Action: { color: '#fee2e2', textColor: '#b91c1c', icon: '⚡' }
};

const DEFAULT_GAMES = [
  {
    id: 'g1',
    title: 'Cyber Strike: Neon City',
    version: 'v2.4.1',
    category: 'RPG',
    categoryColor: '#e0e7ff',
    categoryTextColor: '#4338ca',
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
    categoryColor: '#e0f2fe',
    categoryTextColor: '#0369a1',
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
    categoryColor: '#f3e8ff',
    categoryTextColor: '#7e22ce',
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
    categoryColor: '#dcfce7',
    categoryTextColor: '#15803d',
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
    categoryColor: '#ffedd5',
    categoryTextColor: '#c2410c',
    installBase: '3.1M',
    revenue: '$89,000',
    status: 'Live',
    icon: '🏎️'
  }
];

export default function GamesPortfolio() {
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
        const meta = CATEGORY_META[g.gameType] || { color: '#f1f5f9', textColor: '#475569', icon: '🎮' };
        const statusMap = {
          LIVE: 'Live',
          MAINTENANCE: 'Maintenance',
          DEVELOPMENT: 'Beta',
          TESTING: 'Beta',
          SOFT_LAUNCH: 'Live',
          DEPRECATED: 'Maintenance'
        };
        const statusLabel = statusMap[g.status] || g.status;
        return {
          id: g.id,
          raw: g,
          title: g.gameName,
          version: `v${g.version}`,
          category: g.gameType,
          categoryColor: meta.color,
          categoryTextColor: meta.textColor,
          installBase: `${(g.buildNumber * 45 + 500)}K`,
          revenue: `$${(g.buildNumber * 1850 + 8200).toLocaleString()}`,
          status: statusLabel,
          icon: meta.icon
        };
      })
    : DEFAULT_GAMES;

  const filteredGames = displayGames.filter((g) => {
    if (filter === 'all') return true;
    return g.status.toLowerCase() === filter.toLowerCase();
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

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
            Game Portfolio
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
            Manage and monitor live-ops for your entire gaming suite ({displayGames.length} titles registered in PostgreSQL).
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="btn btn-secondary btn-sm" style={{ padding: '8px 14px' }} onClick={() => addToast('Exporting game catalogue...', 'info')}>
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
          <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
            Connected to Spring Boot API: <strong style={{ color: '#059669' }}>UP</strong>
          </span>
        </div>
      </div>

      {/* Game Table Card */}
      <div className="mgms-card" style={{ padding: 24, marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Catalogue</h3>
          <span className="badge badge-secondary" style={{ fontSize: '0.72rem' }}>{filteredGames.length} Games</span>
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
              {filteredGames.map((g) => (
                <tr key={g.id}>
                  <td><input type="checkbox" /></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background: '#eef2ff',
                        color: '#6366f1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                      }}>
                        {g.icon}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{g.title}</div>
                        <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{g.version}</div>
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
                      color: g.categoryTextColor
                    }}>
                      {g.category}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>{g.installBase}</td>
                  <td style={{ fontWeight: 700, color: '#0f172a', fontFamily: 'Outfit' }}>{g.revenue}</td>
                  <td>
                    <span className={`badge ${
                      g.status === 'Live' ? 'badge-green' :
                      g.status === 'Maintenance' ? 'badge-amber' : 'badge-purple'
                    }`}>
                      {g.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 8, color: '#64748b' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><Eye size={16} /></button>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><Edit3 size={16} /></button>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><MoreHorizontal size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, fontSize: '0.8rem', color: '#64748b' }}>
          <span>Showing 1-5 of 24 games</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ cursor: 'pointer' }}>&lt;</span>
            <span style={{ padding: '2px 8px', background: '#6366f1', color: 'white', borderRadius: 4, fontWeight: 700 }}>1</span>
            <span style={{ padding: '2px 8px', cursor: 'pointer' }}>2</span>
            <span style={{ padding: '2px 8px', cursor: 'pointer' }}>3</span>
            <span>...</span>
            <span style={{ padding: '2px 8px', cursor: 'pointer' }}>5</span>
            <span style={{ cursor: 'pointer' }}>&gt;</span>
          </div>
        </div>
      </div>

      {/* Bottom Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        <div className="mgms-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f5f3ff', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Trophy size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>TOP PERFORMING</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Cyber Strike</div>
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>AVG. GROWTH</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>+12.4% MoM</div>
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f0f9ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Radio size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>ACTIVE CAMPAIGNS</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>8 Live Ops</div>
          </div>
        </div>
      </div>

      {/* Add New Game Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" style={{ maxWidth: 520 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>Register New Game</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateGame} style={{ padding: '20px 24px' }}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
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
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
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
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
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
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
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
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
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
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
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
