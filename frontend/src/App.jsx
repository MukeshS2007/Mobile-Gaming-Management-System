import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Components & Layout
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Views matching 10 Pages of PDF
import LandingPage from './views/LandingPage';
import LoginView from './views/LoginView';
import SystemOverview from './views/SystemOverview';
import MissionControl from './views/MissionControl';
import ExecutiveOverview from './views/ExecutiveOverview';
import GlobalOperations from './views/GlobalOperations';
import GamesPortfolio from './views/GamesPortfolio';
import PlayerManagement from './views/PlayerManagement';
import PlayerDetails from './views/PlayerDetails';
import AnalyticsDashboard from './views/AnalyticsDashboard';
import DesignSystemView from './views/DesignSystemView';

// Modals
import NotificationsModal from './components/modals/NotificationsModal';
import ProfileModal from './components/modals/ProfileModal';
import AuthModal from './components/modals/AuthModal';

import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

function PortalLayout({
  children,
  theme,
  toggleTheme,
  searchQuery,
  setSearchQuery,
  onOpenNotifications,
  onOpenProfile,
  onOpenAuth
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <div 
      data-theme={theme} 
      className="bg-ambient-mesh"
      style={{ display: 'flex', height: '100vh', background: 'var(--bg-app)', color: 'var(--text-body)', overflow: 'hidden' }}
    >
      {/* Left Navigation Sidebar */}
      <Sidebar
        activeTab={location.pathname}
        onLogout={() => {
          logout();
          navigate('/login');
        }}
      />

      {/* Main Column */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
        {/* Top Navbar */}
        <Navbar
          onOpenNotifications={onOpenNotifications}
          onOpenProfile={onOpenProfile}
          onOpenAuth={onOpenAuth}
          onGoLanding={() => navigate('/')}
          onLogout={() => {
            logout();
            navigate('/login');
          }}
          theme={theme}
          toggleTheme={toggleTheme}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Scrollable Page Body */}
        <main style={{ flex: 1, overflowY: 'auto', background: 'transparent' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

function PlayerDetailsWrapper({ selectedPlayer }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const player = selectedPlayer || {
    id: id || 'PLR-8821',
    name: "Alex 'Cipher' Vance",
    email: 'alex.vance@gaming.net',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop',
    country: 'United States (NA-West)',
    memberSince: 'June 2022'
  };

  return <PlayerDetails player={player} onBack={() => navigate('/players')} />;
}

export default function App() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, toasts, removeToast } = useAuth();

  // Theme State (Default Cyber Dark with smooth toggle)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('mgms_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mgms_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <Routes>
        {/* Page 1: Landing Page */}
        <Route
          path="/"
          element={
            <div data-theme={theme} className="bg-ambient-mesh" style={{ minHeight: '100vh', background: 'var(--bg-app)' }}>
              <LandingPage 
                onGoLogin={() => navigate('/login')} 
                onGoRegister={() => setShowAuthModal(true)}
                onGoApp={() => navigate('/dashboard')} 
                theme={theme}
                toggleTheme={toggleTheme}
              />
            </div>
          }
        />
        <Route path="/landing" element={<Navigate to="/" replace />} />

        {/* Page 2: Login View */}
        <Route
          path="/login"
          element={
            <div data-theme={theme} className="bg-ambient-mesh" style={{ minHeight: '100vh', background: 'var(--bg-app)' }}>
              <LoginView 
                onBackToLanding={() => navigate('/')} 
                onGoRegister={() => setShowAuthModal(true)} 
                onLoginSuccess={() => navigate('/dashboard')}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            </div>
          }
        />

        {/* Pages 3 to 10: Platform Dashboard & Operations */}
        <Route
          path="/*"
          element={
            <PortalLayout
              theme={theme}
              toggleTheme={toggleTheme}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onOpenNotifications={() => setShowNotifications(true)}
              onOpenProfile={() => setShowProfile(true)}
              onOpenAuth={() => setShowAuthModal(true)}
            >
              <Routes>
                {/* Page 3: System Overview (Default Dashboard) */}
                <Route 
                  path="/dashboard" 
                  element={
                    <SystemOverview 
                      searchQuery={searchQuery} 
                      setSearchQuery={setSearchQuery} 
                      onClearSearch={() => setSearchQuery('')} 
                    />
                  } 
                />
                <Route path="/overview" element={<Navigate to="/dashboard" replace />} />

                {/* Page 4: Mission Control */}
                <Route path="/mission-control" element={<MissionControl searchQuery={searchQuery} />} />

                {/* Page 5: Executive Overview */}
                <Route path="/executive" element={<ExecutiveOverview searchQuery={searchQuery} />} />

                {/* Page 6: Global Operations / Revenue */}
                <Route path="/global-ops" element={<GlobalOperations searchQuery={searchQuery} />} />
                <Route path="/revenue" element={<Navigate to="/global-ops" replace />} />

                {/* Page 7: Games Portfolio */}
                <Route 
                  path="/games" 
                  element={
                    <GamesPortfolio 
                      searchQuery={searchQuery} 
                      setSearchQuery={setSearchQuery} 
                      onClearSearch={() => setSearchQuery('')} 
                    />
                  } 
                />

                {/* Page 8: Player Management */}
                <Route 
                  path="/players" 
                  element={
                    <PlayerManagement
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      onClearSearch={() => setSearchQuery('')}
                      onSelectPlayer={(player) => {
                        setSelectedPlayer(player);
                        navigate(`/players/${player.id || 'details'}`);
                      }}
                    />
                  } 
                />

                {/* Page 9: Player Details */}
                <Route 
                  path="/players/:id" 
                  element={<PlayerDetailsWrapper selectedPlayer={selectedPlayer} />} 
                />

                {/* Page 10: Analytics Dashboard */}
                <Route path="/analytics" element={<AnalyticsDashboard searchQuery={searchQuery} />} />

                {/* Design System */}
                <Route path="/design-system" element={<DesignSystemView theme={theme} toggleTheme={toggleTheme} />} />

                {/* Fallback to Dashboard */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </PortalLayout>
          }
        />
      </Routes>

      {/* Global Modals */}
      <NotificationsModal isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onSuccess={() => {
          setShowAuthModal(false);
          navigate('/dashboard');
        }}
      />

      {/* Global Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}

function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          {t.type === 'success' && <CheckCircle2 size={16} color="var(--success)" />}
          {t.type === 'error' && <AlertCircle size={16} color="var(--danger)" />}
          {t.type === 'info' && <Info size={16} color="var(--primary)" />}
          <span style={{ flex: 1, fontSize: '0.82rem', color: 'var(--text-heading)' }}>{t.message}</span>
          <button
            onClick={() => removeToast(t.id)}
            style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: 2 }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
