import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Gamepad2,
  LayoutDashboard,
  Layers,
  Users,
  BarChart3,
  DollarSign,
  Palette,
  LogOut,
  ChevronDown
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, dashboardSubView, setDashboardSubView, onLogout }) {
  const isDashboardGroup = ['overview', 'mission_control', 'executive', 'global_ops'].includes(activeTab);

  return (
    <aside style={{
      width: 240,
      background: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      justifyContent: 'space-between',
      flexShrink: 0
    }}>
      <div>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px', marginBottom: 32 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: '#6366f1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
          }}>
            <Gamepad2 size={20} />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            MGMS
          </span>
        </div>

        {/* Navigation Menu */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {/* Dashboard Item */}
          <div>
            <button
              onClick={() => setActiveTab('overview')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 10,
                border: 'none',
                background: isDashboardGroup ? '#6366f1' : 'transparent',
                color: isDashboardGroup ? '#ffffff' : '#64748b',
                fontWeight: isDashboardGroup ? 600 : 500,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </div>
            </button>

            {/* Dashboard Subviews */}
            {isDashboardGroup && (
              <div style={{ paddingLeft: 34, marginTop: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  { id: 'overview', label: 'System Overview' },
                  { id: 'mission_control', label: 'Mission Control' },
                  { id: 'executive', label: 'Executive Overview' },
                  { id: 'global_ops', label: 'Global Operations' }
                ].map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    style={{
                      border: 'none',
                      background: 'none',
                      textAlign: 'left',
                      padding: '4px 8px',
                      borderRadius: 6,
                      fontSize: '0.8rem',
                      fontWeight: activeTab === sub.id ? 700 : 500,
                      color: activeTab === sub.id ? '#6366f1' : '#64748b',
                      cursor: 'pointer'
                    }}
                  >
                    • {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Games */}
          <button
            onClick={() => setActiveTab('games')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              borderRadius: 10,
              border: 'none',
              background: activeTab === 'games' ? '#6366f1' : 'transparent',
              color: activeTab === 'games' ? '#ffffff' : '#64748b',
              fontWeight: activeTab === 'games' ? 600 : 500,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Layers size={18} />
            <span>Games</span>
          </button>

          {/* Players */}
          <button
            onClick={() => setActiveTab('players')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              borderRadius: 10,
              border: 'none',
              background: activeTab === 'players' || activeTab === 'player_details' ? '#6366f1' : 'transparent',
              color: activeTab === 'players' || activeTab === 'player_details' ? '#ffffff' : '#64748b',
              fontWeight: activeTab === 'players' || activeTab === 'player_details' ? 600 : 500,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Users size={18} />
            <span>Players</span>
          </button>

          {/* Analytics */}
          <button
            onClick={() => setActiveTab('analytics')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              borderRadius: 10,
              border: 'none',
              background: activeTab === 'analytics' ? '#6366f1' : 'transparent',
              color: activeTab === 'analytics' ? '#ffffff' : '#64748b',
              fontWeight: activeTab === 'analytics' ? 600 : 500,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <BarChart3 size={18} />
            <span>Analytics</span>
          </button>

          {/* Revenue */}
          <button
            onClick={() => setActiveTab('global_ops')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              borderRadius: 10,
              border: 'none',
              background: activeTab === 'revenue' ? '#6366f1' : 'transparent',
              color: activeTab === 'revenue' ? '#ffffff' : '#64748b',
              fontWeight: activeTab === 'revenue' ? 600 : 500,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <DollarSign size={18} />
            <span>Revenue</span>
          </button>

          {/* Design System */}
          <button
            onClick={() => setActiveTab('design_system')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              borderRadius: 10,
              border: 'none',
              background: activeTab === 'design_system' ? '#6366f1' : 'transparent',
              color: activeTab === 'design_system' ? '#ffffff' : '#64748b',
              fontWeight: activeTab === 'design_system' ? 600 : 500,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Palette size={18} />
            <span>Design System</span>
          </button>
        </nav>
      </div>

      {/* Logout button at bottom */}
      <div>
        <button
          onClick={onLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 14px',
            border: 'none',
            background: 'transparent',
            color: '#64748b',
            fontSize: '0.86rem',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
