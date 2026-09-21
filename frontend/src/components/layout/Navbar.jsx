import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Search, 
  Bell, 
  User, 
  LogOut, 
  ExternalLink, 
  Sun, 
  Moon, 
  Activity, 
  CheckCircle2, 
  Command,
  X,
  ArrowRight,
  Gamepad2,
  Users as UsersIcon,
  LayoutDashboard,
  BarChart3,
  Layers,
  Sparkles
} from 'lucide-react';

const SEARCH_TARGETS = [
  // Views / Pages
  { type: 'view', title: 'Game Portfolio', path: '/games', tab: 'games', desc: 'Manage gaming titles & live operations', icon: '🎮' },
  { type: 'view', title: 'Player Management', path: '/players', tab: 'players', desc: 'Players, VIPs & moderation', icon: '👥' },
  { type: 'view', title: 'System Overview', path: '/dashboard', tab: 'overview', desc: 'Live operational KPIs & transactions', icon: '📊' },
  { type: 'view', title: 'Analytics Dashboard', path: '/analytics', tab: 'analytics', desc: 'Retention cohorts & telemetry', icon: '📈' },
  { type: 'view', title: 'Mission Control', path: '/mission-control', tab: 'mission_control', desc: 'High concurrency & latency ops', icon: '🚀' },
  { type: 'view', title: 'Executive Overview', path: '/executive', tab: 'executive', desc: 'Financial ARR & audit history', icon: '🏛️' },
  { type: 'view', title: 'Global Operations', path: '/global-ops', tab: 'global_ops', desc: 'Regional server nodes & infrastructure', icon: '🌐' },
  { type: 'view', title: 'Design System', path: '/design-system', tab: 'design_system', desc: 'Theme tokens and UI components', icon: '🎨' },

  // Games
  { type: 'game', title: 'Cyber Strike: Neon City', path: '/games', tab: 'games', desc: 'RPG · Live Ops · v2.4.1', icon: '🤖' },
  { type: 'game', title: 'Shadow Realm Tactics', path: '/games', tab: 'games', desc: 'Strategy · Maintenance · v1.0.9', icon: '🛡️' },
  { type: 'game', title: 'Star Voyager: Infinity', path: '/games', tab: 'games', desc: 'Simulation · Live · v3.1.0', icon: '🚀' },
  { type: 'game', title: 'Pixel Quest: Dungeons', path: '/games', tab: 'games', desc: 'Adventure · Beta · v0.8.5', icon: '⚔️' },
  { type: 'game', title: 'Velocity Racer X', path: '/games', tab: 'games', desc: 'Racing · Live · v4.2.0', icon: '🏎️' },

  // Players
  { type: 'player', title: 'Alex Rivera', path: '/players', tab: 'players', desc: 'Level 42 · North America · Active', icon: '👤' },
  { type: 'player', title: 'Sarah Chen', path: '/players', tab: 'players', desc: 'Level 78 · Cyber Arena VIP', icon: '👤' },
  { type: 'player', title: 'Marcus Vogt', path: '/players', tab: 'players', desc: 'Level 23 · Europe Player', icon: '👤' },
  { type: 'player', title: 'Elena Rodriguez', path: '/players', tab: 'players', desc: 'Level 56 · Madrid, Spain', icon: '👤' },
  { type: 'player', title: 'Ivan Drago', path: '/players', tab: 'players', desc: 'Level 99 · Banned account', icon: '👤' }
];

export default function Navbar({ 
  onOpenNotifications, 
  onGoLanding, 
  onOpenProfile, 
  onOpenAuth,
  onLogout,
  theme, 
  toggleTheme,
  searchQuery = '',
  setSearchQuery,
  activeTab,
  setActiveTab
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, logout, login, setRole, addToast } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const profileContainerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setShowSearchDropdown(true);
      } else if (e.key === 'Escape') {
        setShowSearchDropdown(false);
        setShowProfileMenu(false);
        searchInputRef.current?.blur();
      }
    };

    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
      if (profileContainerRef.current && !profileContainerRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const q = (searchQuery || '').trim().toLowerCase();
  const filteredSuggestions = q 
    ? SEARCH_TARGETS.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.desc.toLowerCase().includes(q) ||
        t.type.toLowerCase().includes(q)
      ).slice(0, 6)
    : [];

  const handleSelectSuggestion = (item) => {
    if (item.path) {
      navigate(item.path);
    } else if (setActiveTab) {
      setActiveTab(item.tab);
    }
    if (item.type === 'game') {
      navigate('/games');
      setSearchQuery && setSearchQuery(item.title);
    } else if (item.type === 'player') {
      navigate('/players');
      setSearchQuery && setSearchQuery(item.title);
    }
    setShowSearchDropdown(false);
  };

  return (
    <header style={{
      height: 68,
      background: 'var(--bg-navbar)',
      backdropFilter: 'var(--backdrop-blur)',
      WebkitBackdropFilter: 'var(--backdrop-blur)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      position: 'sticky',
      top: 0,
      zIndex: 30,
      transition: 'background 0.25s ease, border-color 0.25s ease'
    }}>
      {/* Search Bar with live search connection and hotkey badge */}
      <div ref={searchContainerRef} style={{ position: 'relative', width: 440 }}>
        <Search 
          size={16} 
          style={{ 
            position: 'absolute', 
            left: 14, 
            top: '50%', 
            transform: 'translateY(-50%)', 
            color: 'var(--text-dim)' 
          }} 
        />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search games, players, transactions..."
          className="form-input"
          value={searchQuery}
          onFocus={() => setShowSearchDropdown(true)}
          onChange={(e) => {
            setSearchQuery && setSearchQuery(e.target.value);
            setShowSearchDropdown(true);
          }}
          style={{
            paddingLeft: 40,
            paddingRight: searchQuery ? 40 : 74,
            fontSize: '0.84rem',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: 10,
            color: 'var(--text-heading)'
          }}
        />
        {searchQuery ? (
          <button
            type="button"
            onClick={() => {
              setSearchQuery && setSearchQuery('');
              setShowSearchDropdown(false);
            }}
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 6,
              width: 22,
              height: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: 0
            }}
            title="Clear search"
          >
            <X size={13} />
          </button>
        ) : (
          <div style={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            padding: '2px 6px',
            borderRadius: 4,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            fontSize: '0.7rem',
            color: 'var(--text-dim)',
            fontWeight: 600,
            pointerEvents: 'none'
          }}>
            <span>Ctrl</span>
            <span>K</span>
          </div>
        )}

        {/* Live Search Suggestions Dropdown */}
        {showSearchDropdown && q.length > 0 && (
          <div 
            className="mgms-card"
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              right: 0,
              zIndex: 100,
              padding: 10,
              boxShadow: 'var(--shadow-xl)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 12,
              maxHeight: 380,
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px 8px', borderBottom: '1px solid var(--border-subtle)', marginBottom: 6 }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Search Results ({filteredSuggestions.length})
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                Press <kbd style={{ padding: '1px 4px', background: 'var(--bg-card)', borderRadius: 3, border: '1px solid var(--border-color)' }}>ESC</kbd> to close
              </span>
            </div>

            {filteredSuggestions.length === 0 ? (
              <div style={{ padding: '16px 12px', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                No direct matches for "{searchQuery}". 
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 4 }}>
                  Filtering active view <strong style={{ color: 'var(--primary)' }}>{activeTab}</strong>
                </div>
              </div>
            ) : (
              filteredSuggestions.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectSuggestion(item)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                    marginBottom: 2
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-light)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem'
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-heading)' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className={`badge ${item.type === 'game' ? 'badge-purple' : item.type === 'player' ? 'badge-blue' : 'badge-secondary'}`} style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                      {item.type}
                    </span>
                    <ArrowRight size={13} color="var(--text-dim)" />
                  </div>
                </div>
              ))
            )}

            <div style={{ 
              marginTop: 6, 
              paddingTop: 6, 
              borderTop: '1px solid var(--border-subtle)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '6px 8px 2px',
              fontSize: '0.72rem',
              color: 'var(--text-dim)'
            }}>
              <span>Active view: <strong style={{ color: 'var(--text-heading)' }}>{location.pathname || activeTab}</strong></span>
              <button 
                type="button" 
                onClick={() => { setSearchQuery && setSearchQuery(''); setShowSearchDropdown(false); }}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600 }}
              >
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {/* System Telemetry Status Pill */}
        <div 
          className="live-pulse" 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '5px 12px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            fontSize: '0.74rem',
            fontWeight: 600,
            color: 'var(--success-text)'
          }}
        >
          <span className="live-dot" />
          <span>API Connected</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            border: '1px solid var(--border-color)',
            background: 'var(--bg-subtle)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Cyber Dark Mode'}
        >
          {theme === 'dark' ? (
            <Sun size={17} style={{ color: '#f59e0b' }} />
          ) : (
            <Moon size={17} style={{ color: '#6366f1' }} />
          )}
        </button>

        {/* Landing Page Preview Link */}
        <button
          onClick={onGoLanding}
          className="btn btn-secondary btn-sm"
          style={{ 
            fontSize: '0.78rem', 
            padding: '6px 14px',
            borderRadius: 8
          }}
          title="View Public Landing Page"
        >
          <ExternalLink size={13} />
          <span>Landing Page</span>
        </button>

        {/* Notifications Icon */}
        <button
          onClick={onOpenNotifications}
          style={{
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            width: 36,
            height: 36,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            transition: 'all 0.2s ease'
          }}
          title="View Notifications"
        >
          <Bell size={17} />
          <span style={{
            position: 'absolute',
            top: 7,
            right: 7,
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--primary)',
            boxShadow: '0 0 8px var(--primary)'
          }} />
        </button>

        {/* User Profile Pill */}
        <div ref={profileContainerRef} style={{ position: 'relative' }}>
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              cursor: 'pointer',
              padding: '4px 10px',
              borderRadius: 10,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-subtle)',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--text-heading)' }}>
                {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Mukesh S'}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 500 }}>
                {user?.role || (role && role !== 'GUEST' ? role : 'PLAYER')}
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.22) 0%, rgba(168, 85, 247, 0.28) 100%)',
                  border: '2px solid var(--primary)',
                  boxShadow: '0 0 10px rgba(99, 102, 241, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)'
                }}
                title="User Profile"
              >
                <User size={19} strokeWidth={2.2} />
              </div>
              <span style={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'var(--success)',
                border: '2px solid var(--bg-surface)'
              }} />
            </div>
          </div>

          {showProfileMenu && (
            <div
              className="mgms-card"
              style={{
                position: 'absolute',
                top: '118%',
                right: 0,
                width: 240,
                padding: 10,
                zIndex: 100,
                boxShadow: 'var(--shadow-lg), var(--card-glow)',
                background: 'var(--bg-surface)'
              }}
            >
              <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-subtle)', marginBottom: 6 }}>
                <div style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--text-heading)' }}>
                  {user ? (user.username || `${user.firstName || 'Mukesh'} ${user.lastName || 'S'}`) : 'Mukesh S'}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  Role: <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{user ? (user.role || role) : 'PLAYER'}</span>
                </div>
              </div>

              {user ? (
                <>
                  <div
                    onClick={() => {
                      setShowProfileMenu(false);
                      onOpenProfile && onOpenProfile();
                    }}
                    style={{
                      padding: '9px 12px',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      color: 'var(--text-body)',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-light)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <User size={15} color="var(--primary)" /> 
                    <span>Account Settings</span>
                  </div>

                  <div
                    onClick={() => {
                      setShowProfileMenu(false);
                      if (onLogout) {
                        onLogout();
                      } else {
                        logout();
                        onGoLanding && onGoLanding();
                      }
                    }}
                    style={{
                      padding: '9px 12px',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      color: 'var(--danger-text)',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--danger-light)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <LogOut size={15} color="var(--danger)" /> 
                    <span>Sign Out</span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={() => {
                      setShowProfileMenu(false);
                      if (onOpenAuth) onOpenAuth();
                      else if (onOpenProfile) onOpenProfile();
                    }}
                    style={{
                      padding: '9px 12px',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      color: 'var(--primary)',
                      fontWeight: 600,
                      background: 'var(--primary-light)',
                      marginBottom: 6
                    }}
                  >
                    <User size={15} color="var(--primary)" /> 
                    <span>Sign In to Account</span>
                  </div>

                  <div
                    onClick={async () => {
                      setShowProfileMenu(false);
                      try {
                        await login('Mukesh', 'Mukesh@2026');
                      } catch {
                        setRole('PLAYER');
                        addToast && addToast('Restored session as Mukesh S (PLAYER)', 'success');
                      }
                    }}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: 'var(--text-heading)',
                      background: 'var(--bg-subtle)'
                    }}
                  >
                    <span>⚡ Switch to Mukesh S</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
