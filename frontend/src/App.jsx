import React, { useState } from 'react';
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

export default function App() {
  const { user, isAuthenticated, logout, toasts, removeToast } = useAuth();

  // Active view state (defaults to Landing Page as first interface)
  const [activeView, setActiveView] = useState('landing'); // 'landing' | 'login' | 'overview' | 'mission_control' | 'executive' | 'global_ops' | 'games' | 'players' | 'player_details' | 'analytics' | 'design_system'
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Modals
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // If user chooses Landing Page (Page 1)
  if (activeView === 'landing') {
    return (
      <>
        <LandingPage 
          onGoLogin={() => setActiveView('login')} 
          onGoRegister={() => setShowAuthModal(true)}
          onGoApp={() => setActiveView('overview')} 
        />
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </>
    );
  }

  // If user chooses Login Page (Page 2)
  if (activeView === 'login') {
    return (
      <>
        <LoginView 
          onBackToLanding={() => setActiveView('landing')} 
          onGoRegister={() => setShowAuthModal(true)} 
          onLoginSuccess={() => setActiveView('overview')}
        />
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </>
    );
  }

  // Render Portal Views (Pages 3 to 10)
  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return <SystemOverview onSelectTab={setActiveView} />;
      case 'mission_control':
        return <MissionControl />;
      case 'executive':
        return <ExecutiveOverview />;
      case 'global_ops':
        return <GlobalOperations />;
      case 'games':
        return <GamesPortfolio />;
      case 'players':
        return (
          <PlayerManagement
            onSelectPlayer={(player) => {
              setSelectedPlayer(player);
              setActiveView('player_details');
            }}
          />
        );
      case 'player_details':
        return (
          <PlayerDetails
            player={selectedPlayer}
            onBack={() => setActiveView('players')}
          />
        );
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'design_system':
        return <DesignSystemView />;
      default:
        return <SystemOverview onSelectTab={setActiveView} />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg-app)', overflow: 'hidden' }}>
      {/* Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeView}
        setActiveTab={setActiveView}
        onLogout={() => {
          logout();
          setActiveView('landing');
        }}
      />

      {/* Main Column */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
        {/* Top Navbar */}
        <Navbar
          onOpenNotifications={() => setShowNotifications(true)}
          onOpenProfile={() => setShowProfile(true)}
          onGoLanding={() => setActiveView('landing')}
        />

        {/* Scrollable Page Body */}
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {renderContent()}
        </main>
      </div>

      {/* Modals */}
      <NotificationsModal isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
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
          <span style={{ flex: 1, fontSize: '0.82rem' }}>{t.message}</span>
          <button
            onClick={() => removeToast(t.id)}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 2 }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
