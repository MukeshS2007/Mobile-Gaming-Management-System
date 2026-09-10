import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { X, Bell, Check, Clock, AlertCircle, Info } from 'lucide-react';

export default function NotificationsModal({ isOpen, onClose }) {
  const { notifications, refreshNotifications, addToast } = useAuth();

  if (!isOpen) return null;

  const handleMarkRead = async (id) => {
    try {
      await api.notifications.markRead(id);
      await refreshNotifications();
      addToast('Notification marked as read', 'info');
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: 500 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Bell size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '1.1rem' }}>In-Game Notifications</h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {notifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 12px', color: 'var(--text-dim)' }}>
              <Bell size={36} strokeWidth={1.5} style={{ marginBottom: 12, opacity: 0.5 }} />
              <p>No notifications right now.</p>
              <p style={{ fontSize: '0.78rem' }}>Check back during live operations broadcasts!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  style={{
                    padding: 12,
                    borderRadius: 'var(--radius-md)',
                    background: n.read ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 242, 254, 0.06)',
                    border: n.read ? '1px solid var(--border-subtle)' : '1px solid var(--border-active)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className={`badge ${n.priority === 'HIGH' ? 'badge-red' : 'badge-cyan'}`} style={{ fontSize: '0.65rem' }}>
                        {n.priority || 'NORMAL'}
                      </span>
                      <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{n.type}</span>
                    </div>
                    {!n.read && (
                      <button
                        onClick={() => handleMarkRead(n.id)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '2px 8px', fontSize: '0.72rem' }}
                      >
                        <Check size={12} /> Mark Read
                      </button>
                    )}
                  </div>
                  <p style={{ fontSize: '0.86rem', color: n.read ? 'var(--text-muted)' : 'var(--text-main)' }}>
                    {n.message}
                  </p>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={12} />
                    <span>{new Date(n.createdDate).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
