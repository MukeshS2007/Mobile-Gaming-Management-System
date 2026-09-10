import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, 
  Send, 
  Key, 
  Ban, 
  Globe, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  History, 
  AlertCircle,
  FileText,
  LogOut
} from 'lucide-react';

export default function PlayerDetails({ player, onBack }) {
  const { addToast } = useAuth();
  const [banned, setBanned] = useState(false);

  const activePlayer = player || {
    name: 'AlexPierce.eth',
    email: 'alex.p@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop',
    country: 'United States (NA-West)',
    memberSince: 'June 2022'
  };

  const handleBanToggle = () => {
    setBanned(!banned);
    addToast(`Player ${banned ? 'unbanned' : 'banned'} successfully`, 'info');
  };

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Back button */}
      <button 
        onClick={onBack}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'none',
          border: 'none',
          fontSize: '0.84rem',
          color: '#6366f1',
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: 18
        }}
      >
        <ArrowLeft size={16} /> Back to Player Management
      </button>

      {/* Profile Header Banner Card */}
      <div className="mgms-card" style={{ padding: 28, marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <img
              src={activePlayer.avatar}
              alt={activePlayer.name}
              style={{ width: 68, height: 68, borderRadius: '50%', objectFit: 'cover', border: '3px solid #e2e8f0' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>{activePlayer.name}</h1>
                <span className="badge badge-amber" style={{ fontSize: '0.72rem' }}>VIP GOLD</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: 4, display: 'flex', gap: 14 }}>
                <span>Member since {activePlayer.memberSince || 'June 2022'}</span>
                <span>•</span>
                <span>{activePlayer.country || 'United States (NA-West)'}</span>
                <span>•</span>
                <span>{activePlayer.email}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-secondary btn-sm" onClick={() => addToast('Message sent to player inbox', 'success')}>
              <Send size={14} /> <span>Send Message</span>
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => addToast('PIN reset token dispatched', 'info')}>
              <Key size={14} /> <span>Reset PIN</span>
            </button>
            <button 
              className={`btn btn-sm ${banned ? 'btn-secondary' : 'btn-danger'}`} 
              onClick={handleBanToggle}
            >
              <Ban size={14} /> <span>{banned ? 'Unban User' : 'Ban User'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
        <div className="mgms-card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>
            <span>CURRENT BALANCE</span>
            <span style={{ color: '#10b981' }}>+2.4%</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit', marginTop: 4 }}>
            12,450 Gems
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>
            <span>LIFETIME SPEND</span>
            <span style={{ color: '#10b981' }}>+2.4%</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit', marginTop: 4 }}>
            $1,420.50
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>
            <span>AVG. SESSION</span>
            <span style={{ color: '#10b981' }}>+2.4%</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit', marginTop: 4 }}>
            4h 12m
          </div>
        </div>

        <div className="mgms-card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>
            <span>PLAYER LEVEL</span>
            <span style={{ color: '#10b981' }}>+2.4%</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit', marginTop: 4 }}>
            Level 84
          </div>
        </div>
      </div>

      {/* 3 Column Details Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1.2fr', gap: 24 }}>
        {/* Left Col: Social Presence & Last Session */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Social Presence */}
          <div className="mgms-card" style={{ padding: 22 }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>Social Presence</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.84rem' }}>
              <div>
                <div style={{ color: '#6366f1', fontWeight: 600 }}>@vortex_gaming</div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Twitter / X</div>
              </div>
              <div>
                <div style={{ color: '#0f172a', fontWeight: 600 }}>alex-pierce</div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>GitHub Profile</div>
              </div>
              <div>
                <div style={{ color: '#0f172a', fontWeight: 600 }}>vortex.world</div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Personal Site</div>
              </div>
            </div>
          </div>

          {/* Last Session */}
          <div className="mgms-card" style={{ padding: 22 }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>Last Session</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Logon:</span>
                <span style={{ fontWeight: 600 }}>2024-10-25 09:44</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>IP Address:</span>
                <code>192.168.1.42</code>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Device:</span>
                <span style={{ fontWeight: 600 }}>iPhone 15 Pro Max</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Game Version:</span>
                <code>v2.4.1-stable</code>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Col: Progress Timeline & Recent Transactions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Progress Timeline */}
          <div className="mgms-card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a' }}>Progress Timeline</h3>
              <span style={{ fontSize: '0.76rem', color: '#6366f1', fontWeight: 600, cursor: 'pointer' }}>View All History</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>🏆 Reached Mythic League</span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>2 hours ago</span>
                </div>
                <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: 2 }}>
                  Successfully promoted to the top 1% of competitive players globally after a win streak of 12 matches.
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>💳 Purchased 'Dragon Slayer' Bundle</span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Yesterday</span>
                </div>
                <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: 2 }}>
                  Completed transaction for the limited-edition cosmetic pack. Total gems deducted: 2,500.
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>🎖️ Achievement Unlocked: 'Old Guard'</span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Oct 20, 2024</span>
                </div>
                <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: 2 }}>
                  Awarded for maintaining an active subscription for 12 consecutive months without interruption.
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="mgms-card" style={{ padding: 22 }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>Recent Transactions</h3>
            <div className="table-container">
              <table className="mgms-table">
                <thead>
                  <tr>
                    <th>TXN ID</th>
                    <th>ITEM</th>
                    <th>AMOUNT</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'TXN-8821', item: 'Dragon Slayer Pack', amount: '$49.99', status: 'Completed' },
                    { id: 'TXN-8790', item: '5,000 Gem Bundle', amount: '$19.99', status: 'Completed' },
                    { id: 'TXN-8655', item: 'Monthly Battle Pass', amount: '$9.99', status: 'Refunded' },
                    { id: 'TXN-8541', item: 'Starter Shield Skin', amount: '$4.99', status: 'Completed' }
                  ].map((t) => (
                    <tr key={t.id}>
                      <td><code>{t.id}</code></td>
                      <td style={{ fontWeight: 600 }}>{t.item}</td>
                      <td><b>{t.amount}</b></td>
                      <td>
                        <span className={`badge ${t.status === 'Completed' ? 'badge-green' : 'badge-red'}`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: Moderation Log & System Access */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Moderation Log */}
          <div className="mgms-card" style={{ padding: 22 }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>Moderation Log</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.8rem' }}>
              <div style={{ padding: 10, background: '#f8fafc', borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span style={{ color: '#d97706' }}>Chat Warning</span>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>2 weeks ago</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: 2 }}>
                  Player was flagged for minor toxicity in public lobby. Admin 'Sarah' issued a formal warning.
                </div>
              </div>

              <div style={{ padding: 10, background: '#f8fafc', borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span style={{ color: '#0f172a' }}>Investigation</span>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>1 month ago</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: 2 }}>
                  Potential match-fixing report. Evidence inconclusive after log review.
                </div>
              </div>

              <button className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: 6 }} onClick={() => addToast('Add Moderation Note modal', 'info')}>
                + Add Moderation Note
              </button>
            </div>
          </div>

          {/* System Access */}
          <div className="mgms-card" style={{ padding: 22 }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>System Access</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.82rem', marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Account Status:</span>
                <span className="badge badge-green">Active</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Email Verified:</span>
                <span style={{ fontWeight: 600, color: '#10b981' }}>Yes</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>MFA Enabled:</span>
                <span style={{ fontWeight: 600, color: '#ef4444' }}>No</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={() => addToast('Downloaded raw JSON payload', 'info')}>
                <FileText size={14} /> <span>View Raw JSON Data</span>
              </button>
              <button className="btn btn-secondary btn-sm" style={{ width: '100%', color: '#ef4444' }} onClick={() => addToast('Session revoked', 'warning')}>
                <LogOut size={14} /> <span>Force Logout Session</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
