import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Trophy, CheckCircle2, Lock, Plus, Sparkles, Star, Gift, ShieldAlert } from 'lucide-react';

export default function AchievementsView({ onOpenAuth }) {
  const { activeGame, isAuthenticated, addToast, role } = useAuth();
  const [catalog, setCatalog] = useState([]);
  const [earned, setEarned] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Achievement Form State
  const [achName, setAchName] = useState('');
  const [achDesc, setAchDesc] = useState('');
  const [achCond, setAchCond] = useState('');
  const [rewardType, setRewardType] = useState('GEMS');
  const [rewardValue, setRewardValue] = useState(50);
  const [saving, setSaving] = useState(false);

  const isDevOrAdmin = ['GAME_DEVELOPER', 'LIVE_OPS_MANAGER', 'ADMIN'].includes(role);

  const fetchAchievements = async () => {
    if (!activeGame) return;
    setLoading(true);
    try {
      const all = await api.achievements.list(activeGame.id);
      setCatalog(all || []);

      if (isAuthenticated) {
        await api.players.get(activeGame.id).catch(() => null);
        const playerEarned = await api.players.getAchievements(activeGame.id);
        setEarned(playerEarned || []);
      }
    } catch (err) {
      console.warn('Error loading achievements:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, [activeGame, isAuthenticated]);

  const handleUnlock = async (achievementId) => {
    if (!isAuthenticated) {
      onOpenAuth();
      return;
    }
    try {
      await api.players.get(activeGame.id);
      await api.players.unlockAchievement(activeGame.id, achievementId);
      addToast('Trophy unlocked! Rewards synced to player wallet.', 'success');
      await fetchAchievements();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleSeedDefaults = async () => {
    if (!activeGame) return;
    setSaving(true);
    try {
      const defaults = [
        { achievementName: 'First Blood', description: 'Win your first multiplayer battle', conditions: '{"kills": 1}', rewardType: 'XP', rewardValue: 250 },
        { achievementName: 'Cyber Sharpshooter', description: 'Score 50 headshots with plasma sniper', conditions: '{"headshots": 50}', rewardType: 'GEMS', rewardValue: 100 },
        { achievementName: 'Level 10 Vanguard', description: 'Reach player level 10', conditions: '{"level": 10}', rewardType: 'COINS', rewardValue: 2000 }
      ];
      for (const item of defaults) {
        await api.achievements.create(activeGame.id, item);
      }
      addToast('Default achievements initialized!', 'success');
      await fetchAchievements();
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleCreateAchievement = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.achievements.create(activeGame.id, {
        achievementName: achName,
        description: achDesc,
        conditions: achCond || '{"points": 100}',
        rewardType,
        rewardValue: Number(rewardValue)
      });
      addToast('Achievement created in game registry', 'success');
      setShowAddModal(false);
      setAchName('');
      setAchDesc('');
      setAchCond('');
      await fetchAchievements();
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const earnedMap = new Map();
  earned.forEach((e) => earnedMap.set(e.achievementId, e));

  return (
    <div style={{ padding: '28px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span className="badge badge-amber">TROPHY REGISTRY</span>
            <span className="badge badge-cyan">{activeGame?.gameName || 'Select Game'}</span>
          </div>
          <h2 style={{ fontSize: '1.8rem' }}>Achievements & Milestone Rewards</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Earn battle honours, unlock cosmetics, and redeem reward currency upon completing objectives.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {isDevOrAdmin && (
            <>
              {catalog.length === 0 && (
                <button className="btn btn-secondary btn-sm" onClick={handleSeedDefaults} disabled={saving}>
                  <Sparkles size={14} />
                  <span>Seed Default Trophies</span>
                </button>
              )}
              <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>
                <Plus size={16} />
                <span>New Achievement</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Catalog Cards Grid */}
      {catalog.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Trophy size={48} color="var(--warning)" style={{ opacity: 0.5, marginBottom: 16 }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>No Achievements Configured</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: 450, margin: '0 auto 20px auto' }}>
            There are currently no milestones set up for {activeGame?.gameName || 'this game'}.
          </p>
          {isDevOrAdmin && (
            <button className="btn btn-primary" onClick={handleSeedDefaults} disabled={saving}>
              <Sparkles size={16} />
              <span>Initialize Standard Achievements</span>
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {catalog.map((item) => {
            const playerProgress = earnedMap.get(item.id);
            const isUnlocked = !!playerProgress && playerProgress.progress >= 100;

            return (
              <div
                key={item.id}
                className={`glass-panel glass-panel-hover ${isUnlocked ? 'pulse-glow' : ''}`}
                style={{
                  padding: 22,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderColor: isUnlocked ? 'var(--warning)' : 'var(--border-subtle)',
                  background: isUnlocked 
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(18, 24, 38, 0.95) 100%)' 
                    : 'var(--bg-glass)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: 'var(--radius-md)',
                      background: isUnlocked ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isUnlocked ? 'var(--warning)' : 'var(--text-dim)'
                    }}>
                      <Trophy size={24} />
                    </div>

                    <span className={`badge ${isUnlocked ? 'badge-green' : 'badge-cyan'}`}>
                      {isUnlocked ? 'UNLOCKED' : 'IN PROGRESS'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.18rem', marginBottom: 6, color: isUnlocked ? 'var(--warning)' : 'var(--text-main)' }}>
                    {item.achievementName}
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 14 }}>
                    {item.description || 'Milestone achieved through competitive gameplay.'}
                  </p>
                </div>

                <div>
                  {/* Rewards Banner */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(0,0,0,0.3)',
                    marginBottom: 14,
                    fontSize: '0.78rem'
                  }}>
                    <span style={{ color: 'var(--text-dim)' }}>REWARD:</span>
                    <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                      +{item.rewardValue} {item.rewardType}
                    </span>
                  </div>

                  {isUnlocked ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--success)', fontSize: '0.8rem', fontWeight: 600 }}>
                      <CheckCircle2 size={16} />
                      <span>Unlocked {playerProgress?.unlockedDate ? new Date(playerProgress.unlockedDate).toLocaleDateString() : 'Just now'}</span>
                    </div>
                  ) : (
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%' }}
                      onClick={() => handleUnlock(item.id)}
                    >
                      <Sparkles size={14} />
                      <span>Simulate Milestone Unlock</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal to create achievement */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.15rem' }}>Add New Achievement</h3>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateAchievement}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Achievement Title</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Master of the Void"
                    value={achName}
                    onChange={(e) => setAchName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={2}
                    className="form-textarea"
                    placeholder="Explain how players can earn this badge..."
                    value={achDesc}
                    onChange={(e) => setAchDesc(e.target.value)}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="form-group">
                    <label className="form-label">Reward Type</label>
                    <select
                      className="form-select"
                      value={rewardType}
                      onChange={(e) => setRewardType(e.target.value)}
                    >
                      <option value="GEMS">💎 Gems</option>
                      <option value="COINS">🪙 Gold Coins</option>
                      <option value="XP">⚡ Experience Points</option>
                      <option value="SKIN">🎨 Rare Skin</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Reward Amount</label>
                    <input
                      type="number"
                      className="form-input"
                      value={rewardValue}
                      onChange={(e) => setRewardValue(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn btn-primary btn-sm">
                  {saving ? 'Registering...' : 'Save Achievement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
