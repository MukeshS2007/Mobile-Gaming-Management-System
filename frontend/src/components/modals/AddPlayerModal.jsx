import React, { useState, useEffect } from 'react';
import { X, UserPlus, User, Mail, Globe, Award, Sparkles, Check } from 'lucide-react';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
];

const REGIONS = [
  'United States',
  'Japan',
  'Germany',
  'United Kingdom',
  'South Korea',
  'India',
  'Brazil',
  'Canada',
  'Spain',
  'Italy',
  'Australia',
  'France'
];

export default function AddPlayerModal({ isOpen, onClose, onSave, playerToEdit = null }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('United States');
  const [level, setLevel] = useState(1);
  const [balance, setBalance] = useState(2500);
  const [ltv, setLtv] = useState('0.00');
  const [status, setStatus] = useState('online');
  const [avatar, setAvatar] = useState(AVATAR_PRESETS[0]);
  const [customAvatar, setCustomAvatar] = useState('');
  const [showCustomAvatarInput, setShowCustomAvatarInput] = useState(false);

  useEffect(() => {
    if (playerToEdit) {
      setName(playerToEdit.name || '');
      setEmail(playerToEdit.email || '');
      setRegion(playerToEdit.region || 'United States');
      setLevel(playerToEdit.level || 1);
      const rawBalance = typeof playerToEdit.balance === 'string' 
        ? parseInt(playerToEdit.balance.replace(/,/g, ''), 10) || 0 
        : playerToEdit.balance || 0;
      setBalance(rawBalance);
      const rawLtv = typeof playerToEdit.ltv === 'string'
        ? playerToEdit.ltv.replace('$', '')
        : String(playerToEdit.ltv || '0.00');
      setLtv(rawLtv);
      setStatus(playerToEdit.status || 'online');
      setAvatar(playerToEdit.avatar || AVATAR_PRESETS[0]);
    } else {
      setName('');
      setEmail('');
      setRegion('United States');
      setLevel(1);
      setBalance(2500);
      setLtv('0.00');
      setStatus('online');
      setAvatar(AVATAR_PRESETS[Math.floor(Math.random() * AVATAR_PRESETS.length)]);
      setCustomAvatar('');
      setShowCustomAvatarInput(false);
    }
  }, [playerToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const formattedBalance = Number(balance).toLocaleString();
    const cleanLtv = ltv.startsWith('$') ? ltv : `$${parseFloat(ltv || 0).toFixed(2)}`;

    const playerData = {
      id: playerToEdit ? playerToEdit.id : `PLR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}@player.nexus`,
      avatar: showCustomAvatarInput && customAvatar.trim() ? customAvatar.trim() : avatar,
      status,
      level: Math.max(1, parseInt(level, 10) || 1),
      region,
      balance: formattedBalance,
      ltv: cleanLtv
    };

    onSave(playerData, !!playerToEdit);
    onClose();
  };

  const selectedAvatar = showCustomAvatarInput && customAvatar.trim() ? customAvatar.trim() : avatar;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: 560, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)'
            }}>
              <UserPlus size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-heading)', margin: 0 }}>
                {playerToEdit ? 'Edit Player Profile' : 'Add New Player'}
              </h2>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {playerToEdit ? 'Update account credentials and progression stats' : 'Register and provision a new gamer profile'}
              </div>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Live Preview Bar */}
        <div style={{ 
          padding: '14px 24px', 
          background: 'rgba(255, 255, 255, 0.02)', 
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img 
              src={selectedAvatar} 
              alt="Avatar preview" 
              style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }}
              onError={(e) => { e.target.src = AVATAR_PRESETS[0]; }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)' }}>
                {name || 'New Player Handle'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                <code>{playerToEdit?.id || 'PLR-AUTO'}</code> • {region}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className={`badge ${
              status === 'online' ? 'badge-green' :
              status === 'away' ? 'badge-amber' :
              status === 'banned' ? 'badge-red' : 'badge-secondary'
            }`}>
              ● {status}
            </span>
            <span className="badge badge-purple">Lv {level}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px 24px' }}>
          {/* Avatar Selector */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>
              PLAYER AVATAR PRESET
            </label>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              {AVATAR_PRESETS.map((pUrl, idx) => {
                const isSelected = !showCustomAvatarInput && avatar === pUrl;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setAvatar(pUrl);
                      setShowCustomAvatarInput(false);
                    }}
                    style={{
                      position: 'relative',
                      background: 'none',
                      border: isSelected ? '2px solid var(--primary)' : '2px solid transparent',
                      borderRadius: '50%',
                      padding: 2,
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 0 10px rgba(124, 58, 237, 0.4)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <img 
                      src={pUrl} 
                      alt={`Avatar ${idx + 1}`} 
                      style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', display: 'block' }} 
                    />
                    {isSelected && (
                      <div style={{
                        position: 'absolute',
                        bottom: -2,
                        right: -2,
                        background: 'var(--primary)',
                        color: 'white',
                        borderRadius: '50%',
                        width: 16,
                        height: 16,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Check size={10} />
                      </div>
                    )}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setShowCustomAvatarInput(!showCustomAvatarInput)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 20,
                  fontSize: '0.74rem',
                  border: showCustomAvatarInput ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                  background: showCustomAvatarInput ? 'var(--primary-light)' : 'transparent',
                  color: showCustomAvatarInput ? 'var(--primary)' : 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                Custom URL
              </button>
            </div>

            {showCustomAvatarInput && (
              <div style={{ marginTop: 10 }}>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://example.com/avatar.jpg"
                  value={customAvatar}
                  onChange={(e) => setCustomAvatar(e.target.value)}
                  style={{ fontSize: '0.82rem' }}
                />
              </div>
            )}
          </div>

          {/* Gamertag & Email Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                GAMERTAG / FULL NAME *
              </label>
              <input
                type="text"
                required
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Phoenix 'Blade' Lee"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                EMAIL ADDRESS *
              </label>
              <input
                type="email"
                required
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="phoenix.lee@gaming.net"
              />
            </div>
          </div>

          {/* Region & Status */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                REGION / COUNTRY
              </label>
              <select
                className="form-input"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                SESSION STATUS
              </label>
              <select
                className="form-input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="online">Online</option>
                <option value="away">Away</option>
                <option value="offline">Offline</option>
                <option value="banned">Banned / Suspended</option>
              </select>
            </div>
          </div>

          {/* Level, Gems, LTV Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                INITIAL LEVEL (1-100)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                className="form-input"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                GEMS BALANCE 💎
              </label>
              <input
                type="number"
                min="0"
                step="500"
                className="form-input"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                ESTIMATED LTV ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="form-input"
                value={ltv}
                onChange={(e) => setLtv(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 10, borderTop: '1px solid var(--border-color)' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClose}
              style={{ padding: '8px 18px' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Sparkles size={14} />
              <span>{playerToEdit ? 'Save Changes' : 'Create Player'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
