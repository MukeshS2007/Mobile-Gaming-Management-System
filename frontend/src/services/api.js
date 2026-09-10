// API client for Mobile Gaming Management System

const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

let authToken = localStorage.getItem('nexus_access_token') || null;
let refreshToken = localStorage.getItem('nexus_refresh_token') || null;

export const setTokens = (access, refresh) => {
  authToken = access;
  refreshToken = refresh;
  if (access) {
    localStorage.setItem('nexus_access_token', access);
  } else {
    localStorage.removeItem('nexus_access_token');
  }
  if (refresh) {
    localStorage.setItem('nexus_refresh_token', refresh);
  } else {
    localStorage.removeItem('nexus_refresh_token');
  }
};

export const getStoredTokens = () => ({
  accessToken: authToken,
  refreshToken: refreshToken
});

export async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const config = {
    ...options,
    headers
  };

  let response;
  try {
    response = await fetch(url, config);
  } catch (err) {
    throw new Error(`Network error connecting to ${url}. Make sure backend is running.`);
  }

  // Handle 401 Unauthorized token refresh
  if (response.status === 401 && refreshToken && !options._retry && !path.startsWith('/auth/')) {
    try {
      const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });
      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        setTokens(refreshData.accessToken, refreshData.refreshToken);
        // Retry original request with new token
        return request(path, { ...options, _retry: true });
      } else {
        setTokens(null, null);
      }
    } catch {
      setTokens(null, null);
    }
  }

  // 204 No Content
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type');
  let data = null;
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const errorMsg = (typeof data === 'object' && data?.error) 
      || (typeof data === 'object' && data?.message) 
      || `Request failed with status ${response.status}`;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  // Authentication
  auth: {
    register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
    login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
    refresh: (token) => request('/auth/refresh', { method: 'POST', body: JSON.stringify({ refreshToken: token }) }),
    logout: (token) => request('/auth/logout', { method: 'POST', body: JSON.stringify({ refreshToken: token }) }),
    passwordReset: (payload) => request('/auth/password-reset', { method: 'PUT', body: JSON.stringify(payload) })
  },

  // Users & GDPR
  users: {
    profile: () => request('/users/profile'),
    updateProfile: (data) => request('/users/profile', { method: 'PUT', body: JSON.stringify(data) }),
    exportData: () => request('/users/me/export'),
    deleteAccount: () => request('/users/me', { method: 'DELETE' })
  },

  // Games & Content
  games: {
    list: () => request('/games'),
    get: (id) => request(`/games/${id}`),
    create: (data) => request('/games', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/games/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    updateVersion: (id, data) => request(`/games/${id}/version`, { method: 'POST', body: JSON.stringify(data) }),
    analytics: (id) => request(`/games/${id}/analytics`),
    getContent: (gameId) => request(`/games/${gameId}/content`),
    addContent: (gameId, data) => request(`/games/${gameId}/content`, { method: 'POST', body: JSON.stringify(data) }),
    updateContent: (contentId, data) => request(`/games/content/${contentId}`, { method: 'PUT', body: JSON.stringify(data) })
  },

  // Players & Progression
  players: {
    get: (gameId) => request(`/players/${gameId}`),
    updateProgress: (gameId, data) => request(`/players/${gameId}/progress`, { method: 'PUT', body: JSON.stringify(data) }),
    getAchievements: (gameId) => request(`/players/${gameId}/achievements`),
    unlockAchievement: (gameId, achievementId) => request(`/players/${gameId}/achievements/${achievementId}/unlock`, { method: 'POST' }),
    getSocial: (gameId) => request(`/players/${gameId}/social`)
  },

  // Game Sessions
  sessions: {
    start: (data) => request('/sessions/start', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/sessions/${id}/update`, { method: 'PUT', body: JSON.stringify(data) }),
    end: (id) => request(`/sessions/${id}/end`, { method: 'POST' }),
    history: (gameId) => request(`/sessions/history?gameId=${gameId}`)
  },

  // Purchases / In-App Economy
  purchases: {
    initiate: (data) => request('/purchases/initiate', { method: 'POST', body: JSON.stringify(data) }),
    validate: (id) => request(`/purchases/validate?id=${id}`, { method: 'POST' }),
    history: (gameId) => request(`/purchases/history?gameId=${gameId}`),
    refund: (id) => request(`/purchases/refund?id=${id}`, { method: 'POST' })
  },

  // Live Events
  events: {
    active: () => request('/events/active'),
    create: (data) => request('/events', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    cancel: (id) => request(`/events/${id}`, { method: 'DELETE' })
  },

  // Notifications
  notifications: {
    mine: () => request('/notifications'),
    broadcast: (data) => request('/notifications/broadcast', { method: 'POST', body: JSON.stringify(data) }),
    markRead: (id) => request(`/notifications/${id}/read`, { method: 'PATCH' })
  },

  // Social Connections
  social: {
    connect: (gameId, data) => request(`/social?gameId=${gameId}`, { method: 'POST', body: JSON.stringify(data) }),
    updateStatus: (id, status) => request(`/social/${id}?status=${encodeURIComponent(status)}`, { method: 'PATCH' }),
    remove: (id) => request(`/social/${id}`, { method: 'DELETE' })
  },

  // Leaderboards
  leaderboards: {
    getByGame: (gameId) => request(`/leaderboards/${gameId}`),
    create: (data) => request('/leaderboards', { method: 'POST', body: JSON.stringify(data) })
  },

  // Achievements Master Catalog
  achievements: {
    list: (gameId) => request(`/games/${gameId}/achievements`),
    create: (gameId, data) => request(`/games/${gameId}/achievements`, { method: 'POST', body: JSON.stringify(data) })
  },

  // Analytics
  analytics: {
    dashboard: () => request('/analytics/dashboard'),
    playerStats: (gameId) => request(`/analytics/players/${gameId}`),
    revenue: (gameId) => request(`/analytics/revenue/${gameId}`),
    customReport: (spec) => request('/analytics/custom-report', { method: 'POST', body: JSON.stringify(spec) })
  },

  // Admin Governance
  admin: {
    users: () => request('/admin/users'),
    setRole: (userId, role) => request(`/admin/users/${userId}/role?role=${role}`, { method: 'PATCH' }),
    setBan: (userId, banned) => request(`/admin/users/${userId}/ban?banned=${banned}`, { method: 'PATCH' }),
    auditLogs: () => request('/admin/audit-logs')
  }
};
