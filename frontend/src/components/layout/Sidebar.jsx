import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  ChevronDown,
  Sparkles,
  Server
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // Determine current tab from URL path
  let currentTab = 'overview';
  if (path.startsWith('/games')) currentTab = 'games';
  else if (path.startsWith('/players')) currentTab = 'players';
  else if (path.startsWith('/analytics')) currentTab = 'analytics';
  else if (path.startsWith('/revenue') || path.startsWith('/global-ops')) currentTab = 'global_ops';
  else if (path.startsWith('/executive')) currentTab = 'executive';
  else if (path.startsWith('/mission-control')) currentTab = 'mission_control';
  else if (path.startsWith('/design-system')) currentTab = 'design_system';
  else if (path.startsWith('/dashboard') || path.startsWith('/overview')) currentTab = 'overview';
  else currentTab = activeTab || 'overview';

  const isDashboardGroup = ['overview', 'mission_control', 'executive', 'global_ops'].includes(currentTab);
  const [dashboardOpen, setDashboardOpen] = useState(true);

  // Keep dashboard group expanded when on a dashboard child view
  useEffect(() => {
    if (isDashboardGroup) {
      setDashboardOpen(true);
    }
  }, [isDashboardGroup]);

  const handleNav = (tabId, targetUrl) => {
    setActiveTab?.(tabId);
    navigate(targetUrl);
  };

  const navItemStyle = (isActive) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 14px',
    borderRadius: 10,
    border: 'none',
    background: isActive ? 'var(--primary-gradient)' : 'transparent',
    color: isActive ? '#ffffff' : 'var(--text-muted)',
    fontWeight: isActive ? 600 : 500,
    fontSize: '0.88rem',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: isActive ? 'var(--shadow-purple)' : 'none',
    position: 'relative'
  });

  return (
    <aside style={{
      width: 250,
      background: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      justifyContent: 'space-between',
      flexShrink: 0,
      transition: 'background 0.25s ease, border-color 0.25s ease',
      zIndex: 20
    }}>
      <div>
        {/* Brand Logo - Navigates to /dashboard */}
        <div 
          onClick={() => handleNav('overview', '/dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 8px', marginBottom: 32, cursor: 'pointer' }}
          title="MGMS Dashboard Home"
        >
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: 'var(--primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: 'var(--shadow-purple)',
            position: 'relative'
          }}>
            <Gamepad2 size={22} />
            <div style={{
              position: 'absolute',
              inset: -2,
              borderRadius: 14,
              border: '1px solid rgba(255, 255, 255, 0.25)',
              pointerEvents: 'none'
            }} />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-heading)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              MGMS
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Gaming Platform
            </div>
          </div>
        </div>

        {/* Navigation Section Title */}
        <div style={{ 
          fontSize: '0.68rem', 
          fontWeight: 700, 
          color: 'var(--text-dim)', 
          textTransform: 'uppercase', 
          letterSpacing: '0.08em',
          padding: '0 12px',
          marginBottom: 10
        }}>
          Operations
        </div>

        {/* Navigation Menu */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {/* Dashboard Item */}
          <div>
            <button
              type="button"
              onClick={() => {
                if (isDashboardGroup) {
                  setDashboardOpen(!dashboardOpen);
                } else {
                  handleNav('overview', '/dashboard');
                }
              }}
              style={navItemStyle(isDashboardGroup && !dashboardOpen)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </div>
              <ChevronDown 
                size={15} 
                style={{ 
                  transform: dashboardOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  opacity: 0.8
                }} 
              />
            </button>

            {/* Dashboard Subviews */}
            {dashboardOpen && (
              <div style={{ 
                paddingLeft: 22, 
                marginLeft: 12,
                marginTop: 6, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 3,
                borderLeft: '1px solid var(--border-color)'
              }}>
                {[
                  { id: 'overview', label: 'System Overview', path: '/dashboard' },
                  { id: 'mission_control', label: 'Mission Control', path: '/mission-control' },
                  { id: 'executive', label: 'Executive Overview', path: '/executive' },
                  { id: 'global_ops', label: 'Global Operations', path: '/global-ops' }
                ].map((sub) => {
                  const isCurrent = currentTab === sub.id;
                  return (
                    <button
                      type="button"
                      key={sub.id}
                      onClick={() => handleNav(sub.id, sub.path)}
                      style={{
                        border: 'none',
                        background: isCurrent ? 'var(--primary-light)' : 'transparent',
                        textAlign: 'left',
                        padding: '6px 12px',
                        borderRadius: 8,
                        fontSize: '0.8rem',
                        fontWeight: isCurrent ? 700 : 500,
                        color: isCurrent ? 'var(--primary)' : 'var(--text-muted)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                      }}
                    >
                      <span style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: isCurrent ? 'var(--primary)' : 'var(--text-dim)',
                        transition: 'all 0.15s ease'
                      }} />
                      <span>{sub.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Games */}
          <button
            type="button"
            onClick={() => handleNav('games', '/games')}
            style={navItemStyle(currentTab === 'games')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Layers size={18} />
              <span>Games</span>
            </div>
          </button>

          {/* Players */}
          <button
            type="button"
            onClick={() => handleNav('players', '/players')}
            style={navItemStyle(currentTab === 'players')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Users size={18} />
              <span>Players</span>
            </div>
          </button>

          {/* Analytics */}
          <button
            type="button"
            onClick={() => handleNav('analytics', '/analytics')}
            style={navItemStyle(currentTab === 'analytics')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <BarChart3 size={18} />
              <span>Analytics</span>
            </div>
          </button>

          {/* Revenue */}
          <button
            type="button"
            onClick={() => handleNav('global_ops', '/global-ops')}
            style={navItemStyle(currentTab === 'global_ops' && path === '/global-ops')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <DollarSign size={18} />
              <span>Revenue</span>
            </div>
          </button>

          {/* Design System */}
          <button
            type="button"
            onClick={() => handleNav('design_system', '/design-system')}
            style={navItemStyle(currentTab === 'design_system')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Palette size={18} />
              <span>Design System</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Bottom Area: Server Status Pill & Logout */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Live Cluster Card */}
        <div style={{
          padding: '12px 14px',
          borderRadius: 12,
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-heading)' }}>
              Ecosystem Status
            </span>
            <span className="live-dot" />
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Latency: 18ms</span>
            <span style={{ color: 'var(--success-text)', fontWeight: 600 }}>99.98% UP</span>
          </div>
        </div>

        {/* Logout button at bottom */}
        <button
          onClick={onLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 14px',
            border: '1px solid transparent',
            borderRadius: 10,
            background: 'transparent',
            color: 'var(--text-muted)',
            fontSize: '0.86rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--danger-light)';
            e.currentTarget.style.color = 'var(--danger-text)';
            e.currentTarget.style.borderColor = 'var(--danger-border)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.borderColor = 'transparent';
          }}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
