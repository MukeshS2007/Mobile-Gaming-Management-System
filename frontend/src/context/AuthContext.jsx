import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, setTokens, getStoredTokens } from '../services/api';

const AuthContext = createContext(null);

export const ROLES = [
  'PLAYER',
  'GAME_DEVELOPER',
  'LIVE_OPS_MANAGER',
  'COMMUNITY_MANAGER',
  'DATA_ANALYST',
  'ADMIN',
  'QA_TESTER',
  'GUEST'
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('GUEST');
  const [loading, setLoading] = useState(true);
  const [activeGame, setActiveGame] = useState(null);
  const [games, setGames] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch current user profile if token is present
  const refreshProfile = useCallback(async () => {
    const { accessToken } = getStoredTokens();
    if (!accessToken) {
      setUser(null);
      setRole('GUEST');
      setLoading(false);
      return;
    }
    try {
      const profile = await api.users.profile();
      setUser(profile);
      setRole(profile.role || 'PLAYER');
    } catch (err) {
      console.warn('Failed to load profile:', err.message);
      // If unauthorized, clear tokens
      if (err.status === 401) {
        setTokens(null, null);
        setUser(null);
        setRole('GUEST');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch games list
  const refreshGames = useCallback(async () => {
    try {
      const list = await api.games.list();
      setGames(list || []);
      if (list && list.length > 0 && !activeGame) {
        setActiveGame(list[0]);
      }
    } catch (err) {
      console.warn('Could not fetch games:', err.message);
    }
  }, [activeGame]);

  // Fetch notifications
  const refreshNotifications = useCallback(async () => {
    if (!user) return;
    try {
      const list = await api.notifications.mine();
      setNotifications(list || []);
    } catch (err) {
      console.warn('Could not fetch notifications:', err.message);
    }
  }, [user]);

  useEffect(() => {
    refreshProfile();
    refreshGames();
  }, [refreshProfile, refreshGames]);

  useEffect(() => {
    if (user) {
      refreshNotifications();
      const interval = setInterval(refreshNotifications, 15000);
      return () => clearInterval(interval);
    }
  }, [user, refreshNotifications]);

  const login = async (credential, password) => {
    try {
      const res = await api.auth.login({ credential, password, deviceInfo: navigator.userAgent });
      setTokens(res.accessToken, res.refreshToken);
      setRole(res.role);
      await refreshProfile();
      await refreshGames();
      addToast(`Welcome back! Logged in as ${res.role}`, 'success');
      return res;
    } catch (err) {
      addToast(err.message, 'error');
      throw err;
    }
  };

  const register = async (payload) => {
    try {
      const res = await api.auth.register(payload);
      setTokens(res.accessToken, res.refreshToken);
      setRole(res.role || 'PLAYER');
      await refreshProfile();
      await refreshGames();
      addToast('Registration successful! Account created.', 'success');
      return res;
    } catch (err) {
      addToast(err.message, 'error');
      throw err;
    }
  };

  const logout = async () => {
    const { refreshToken } = getStoredTokens();
    if (refreshToken) {
      try {
        await api.auth.logout(refreshToken);
      } catch (err) {
        console.warn('Logout error:', err.message);
      }
    }
    setTokens(null, null);
    setUser(null);
    setRole('GUEST');
    addToast('Logged out securely', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        setRole, // allowed for local sandbox/role testing if needed
        isAuthenticated: !!user,
        loading,
        activeGame,
        setActiveGame,
        games,
        refreshGames,
        notifications,
        refreshNotifications,
        toasts,
        addToast,
        removeToast,
        login,
        register,
        logout,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
