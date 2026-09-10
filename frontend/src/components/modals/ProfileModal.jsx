import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { X, User, Download, Trash2, Shield, Save } from 'lucide-react';

export default function ProfileModal({ isOpen, onClose }) {
  const { user, refreshProfile, addToast, logout } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [country, setCountry] = useState(user?.country || 'IN');
  const [privacyConsent, setPrivacyConsent] = useState(user?.privacyConsent ?? true);
  const [marketingConsent, setMarketingConsent] = useState(user?.marketingConsent ?? false);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!isOpen || !user) return null;

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.users.updateProfile({
        firstName,
        lastName,
        country,
        privacyConsent,
        marketingConsent
      });
      await refreshProfile();
      addToast('Profile preferences updated', 'success');
      onClose();
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async () => {
    setExporting(true);
    try {
      const data = await api.users.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nexus-gdpr-export-${user.username}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      addToast('GDPR player archive exported successfully', 'success');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await api.users.deleteAccount();
      addToast('Your account data has been permanently erased as per GDPR rights', 'info');
      onClose();
      await logout();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <User size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.15rem' }}>Player Profile & Privacy</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleUpdate}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20, padding: 14 }} className="glass-panel">
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'white'
              }}>
                {user.username.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{user.username}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{user.email}</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--primary)', marginTop: 2 }}>Role: {user.role}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Country Code</label>
              <input
                type="text"
                maxLength={2}
                className="form-input"
                value={country}
                onChange={(e) => setCountry(e.target.value.toUpperCase())}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '16px 0' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.84rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={privacyConsent}
                  onChange={(e) => setPrivacyConsent(e.target.checked)}
                />
                <span>Privacy & Telemetry Consent Active</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.84rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                />
                <span>Marketing & Promotional Notifications Active</span>
              </label>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
              <Save size={16} />
              <span>{loading ? 'Saving Changes...' : 'Save Profile Changes'}</span>
            </button>
          </form>

          {/* GDPR / Privacy Compliance Actions */}
          <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Data Rights & GDPR Compliance
            </h4>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={handleExportData}
                disabled={exporting}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
              >
                <Download size={14} />
                <span>{exporting ? 'Exporting...' : 'Export My Data (JSON)'}</span>
              </button>

              {!confirmDelete ? (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="btn btn-danger btn-sm"
                >
                  <Trash2 size={14} />
                  <span>Erase Account</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="btn btn-danger btn-sm"
                  style={{ background: 'var(--danger)', color: 'white' }}
                >
                  Confirm Permanent Erasure
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
