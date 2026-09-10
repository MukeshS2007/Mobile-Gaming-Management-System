import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, Bell, ChevronDown, User, LogOut, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenNotifications, onGoLanding, onOpenProfile }) {
  const { user, role, setRole, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header style={{
      height: 64,
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      position: 'sticky',
      top: 0,
      zIndex: 30
    }}>
      {/* Search Bar matching PDF */}
      <div style={{ position: 'relative', width: 380 }}>
        <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        <input
          type="text"
          placeholder="Search games, players, transactions..."
          className="form-input"
          style={{
            paddingLeft: 38,
            fontSize: '0.84rem',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: 8
          }}
        />
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        {/* Landing Page Preview Link */}
        <button
          onClick={onGoLanding}
          className="btn btn-secondary btn-sm"
          style={{ fontSize: '0.78rem', padding: '5px 12px' }}
          title="View Public Landing Page"
        >
          <ExternalLink size={13} />
          <span>Landing Page</span>
        </button>

        {/* Notifications Icon */}
        <button
          onClick={onOpenNotifications}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            padding: 6,
            borderRadius: '50%',
            position: 'relative'
          }}
        >
          <Bell size={18} />
          <span style={{
            position: 'absolute',
            top: 4,
            right: 4,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#6366f1'
          }} />
        </button>

        {/* User Profile Pill matching screenshot */}
        <div style={{ position: 'relative' }}>
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: 8
            }}
          >
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#0f172a' }}>
                {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Admin User'}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                Operations Manager
              </div>
            </div>

            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop"
              alt="Admin User"
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid #e2e8f0'
              }}
            />
          </div>

          {showProfileMenu && (
            <div
              className="mgms-card"
              style={{
                position: 'absolute',
                top: '115%',
                right: 0,
                width: 220,
                padding: 8,
                zIndex: 100,
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', marginBottom: 4 }}>
                <div style={{ fontWeight: 700, fontSize: '0.84rem' }}>{user?.username || 'admin'}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Role: {role}</div>
              </div>

              <div
                onClick={() => {
                  setShowProfileMenu(false);
                  onOpenProfile();
                }}
                style={{
                  padding: '8px 12px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: '#334155'
                }}
              >
                <User size={15} /> <span>Account Settings</span>
              </div>

              <div
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                }}
                style={{
                  padding: '8px 12px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: '#ef4444'
                }}
              >
                <LogOut size={15} /> <span>Sign Out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
