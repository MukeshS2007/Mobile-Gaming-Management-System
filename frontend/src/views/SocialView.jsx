import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Users, UserPlus, Check, X, Shield, Trash2, Clock, UserCheck, MessageSquare } from 'lucide-react';

export default function SocialView({ onOpenAuth }) {
  const { activeGame, isAuthenticated, addToast } = useAuth();
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Request Form
  const [friendId, setFriendId] = useState('');
  const [connectionType, setConnectionType] = useState('FRIEND');
  const [sending, setSending] = useState(false);

  const fetchSocial = async () => {
    if (!isAuthenticated || !activeGame) return;
    setLoading(true);
    try {
      await api.players.get(activeGame.id).catch(() => null);
      const list = await api.players.getSocial(activeGame.id);
      setConnections(list || []);
    } catch (err) {
      console.warn('Social load error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocial();
  }, [isAuthenticated, activeGame]);

  const handleSendRequest = async (e) => {
    e.preventDefault();
    if (!friendId) {
      addToast('Please provide a valid Friend UUID', 'warning');
      return;
    }
    setSending(true);
    try {
      await api.social.connect(activeGame.id, {
        friendId,
        connectionType,
        status: 'PENDING'
      });
      addToast('Friend request sent!', 'success');
      setShowAddModal(false);
      setFriendId('');
      await fetchSocial();
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSending(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.social.updateStatus(id, status);
      addToast(`Connection marked as ${status}`, 'info');
      await fetchSocial();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleRemove = async (id) => {
    try {
      await api.social.remove(id);
      addToast('Connection removed', 'info');
      await fetchSocial();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  return (
    <div style={{ padding: '28px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span className="badge badge-cyan">COMMUNITY & SOCIAL</span>
            <span className="badge badge-purple">{activeGame?.gameName || 'Select Game'}</span>
          </div>
          <h2 style={{ fontSize: '1.8rem' }}>Friends & Squad Connections</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Form multiplayer squads, track friends' online sessions, and challenge rivals.
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>
          <UserPlus size={16} />
          <span>Add Friend / Squad Mate</span>
        </button>
      </div>

      {/* Connections List */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Users size={18} color="var(--primary)" />
          <span>Active Connections ({connections.length})</span>
        </h3>

        {connections.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 12px', color: 'var(--text-dim)' }}>
            <Users size={36} style={{ opacity: 0.5, marginBottom: 12 }} />
            <p>No social connections registered yet for this game.</p>
            <p style={{ fontSize: '0.78rem' }}>Send a connection request to team up!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {connections.map((c) => (
              <div
                key={c.id}
                className="glass-panel"
                style={{
                  padding: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(255, 255, 255, 0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'var(--accent-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700
                  }}>
                    {c.connectionType === 'CLAN_MATE' ? '⚔️' : '🎮'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                      ID: <code>{c.friendId.substring(0, 8)}...</code>
                    </div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                      <span className="badge badge-purple" style={{ fontSize: '0.62rem' }}>{c.connectionType}</span>
                      <span className={`badge ${
                        c.status === 'ACCEPTED' ? 'badge-green' : 
                        c.status === 'REJECTED' ? 'badge-red' : 'badge-amber'
                      }`} style={{ fontSize: '0.62rem' }}>
                        {c.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 6 }}>
                  {c.status === 'PENDING' && (
                    <button
                      onClick={() => handleUpdateStatus(c.id, 'ACCEPTED')}
                      className="btn btn-secondary btn-sm"
                      title="Accept Request"
                      style={{ padding: '6px', color: 'var(--success)' }}
                    >
                      <Check size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => handleRemove(c.id)}
                    className="btn btn-secondary btn-sm"
                    title="Remove Connection"
                    style={{ padding: '6px', color: '#ff6b6b' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Friend Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.15rem' }}>Send Connection Request</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSendRequest}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Friend Player UUID</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. 123e4567-e89b-12d3-a456-426614174000"
                    value={friendId}
                    onChange={(e) => setFriendId(e.target.value)}
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                    Enter any valid UUID or target player identifier.
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">Relation Type</label>
                  <select
                    className="form-select"
                    value={connectionType}
                    onChange={(e) => setConnectionType(e.target.value)}
                  >
                    <option value="FRIEND">🎮 Friend</option>
                    <option value="CLAN_MATE">⚔️ Clan / Guild Member</option>
                    <option value="RIVAL">🔥 Rival</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" disabled={sending} className="btn btn-primary btn-sm">
                  {sending ? 'Sending...' : 'Send Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
