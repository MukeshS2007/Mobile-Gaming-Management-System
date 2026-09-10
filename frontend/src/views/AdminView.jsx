import React, { useState, useEffect } from 'react';
import { useAuth, ROLES } from '../context/AuthContext';
import { api } from '../services/api';
import { ShieldAlert, Users, Search, RefreshCw, Ban, CheckCircle2, ShieldCheck, History } from 'lucide-react';

export default function AdminView() {
  const { addToast } = useAuth();
  const [users, setUsers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingAudit, setLoadingAudit] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSubTab, setActiveSubTab] = useState('users'); // 'users' | 'audit'

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const list = await api.admin.users();
      setUsers(list || []);
    } catch (err) {
      console.warn('Admin users error:', err.message);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchAudit = async () => {
    setLoadingAudit(true);
    try {
      const list = await api.admin.auditLogs();
      setAuditLogs(list || []);
    } catch (err) {
      console.warn('Audit logs error:', err.message);
    } finally {
      setLoadingAudit(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAudit();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.admin.setRole(userId, newRole);
      addToast(`Role updated to ${newRole}`, 'success');
      await fetchUsers();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleBanToggle = async (userId, currentBanned) => {
    const nextState = !currentBanned;
    try {
      await api.admin.setBan(userId, nextState);
      addToast(`User ${nextState ? 'banned' : 'unbanned'} successfully`, 'info');
      await fetchUsers();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    return (
      u.username?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term) ||
      u.role?.toLowerCase().includes(term)
    );
  });

  return (
    <div style={{ padding: '28px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span className="badge badge-red">ROOT PRIVILEGES</span>
            <span className="badge badge-cyan">GOVERNANCE & SECURITY</span>
          </div>
          <h2 style={{ fontSize: '1.8rem' }}>User Governance & Audit Logging</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Manage platform accounts, promote roles, enforce security bans, and review immutable audit records.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => setActiveSubTab('users')}
            className={`btn btn-sm ${activeSubTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Users size={14} />
            <span>Users ({users.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('audit')}
            className={`btn btn-sm ${activeSubTab === 'audit' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <History size={14} />
            <span>Audit Trail ({auditLogs.length})</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'users' ? (
        <div className="glass-panel" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            {/* Search Input */}
            <div style={{ position: 'relative', maxWidth: 360, width: '100%' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Search by handle, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: 36 }}
              />
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            </div>

            <button className="btn btn-secondary btn-sm" onClick={fetchUsers} disabled={loadingUsers}>
              <RefreshCw size={14} className={loadingUsers ? 'spin' : ''} />
              <span>Refresh Accounts</span>
            </button>
          </div>

          <div className="table-container">
            <table className="cyber-table">
              <thead>
                <tr>
                  <th>Player Handle</th>
                  <th>Contact Email</th>
                  <th>System Role</th>
                  <th>Account Status</th>
                  <th>Country</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: 32, color: 'var(--text-dim)' }}>
                      No accounts matched your query.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 30,
                            height: 30,
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.74rem'
                          }}>
                            {u.username?.substring(0, 2).toUpperCase() || 'PL'}
                          </div>
                          <div>
                            <span style={{ fontWeight: 600 }}>{u.username}</span>
                            {u.firstName && (
                              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                                {u.firstName} {u.lastName}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td style={{ fontSize: '0.84rem' }}>{u.email}</td>

                      {/* Live Role Dropdown */}
                      <td>
                        <select
                          className="form-select"
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          style={{ padding: '4px 8px', fontSize: '0.78rem', width: 'auto' }}
                        >
                          {ROLES.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </td>

                      <td>
                        <span className={`badge ${u.banned ? 'badge-red' : u.active ? 'badge-green' : 'badge-amber'}`}>
                          {u.banned ? 'BANNED' : u.active ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </td>

                      <td>{u.country || 'N/A'}</td>

                      <td style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        {new Date(u.createdDate).toLocaleDateString()}
                      </td>

                      <td>
                        <button
                          onClick={() => handleBanToggle(u.id, u.banned)}
                          className={`btn btn-sm ${u.banned ? 'btn-secondary' : 'btn-danger'}`}
                          style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                        >
                          {u.banned ? <CheckCircle2 size={12} /> : <Ban size={12} />}
                          <span>{u.banned ? 'Unban' : 'Ban'}</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Audit Trail Table */
        <div className="glass-panel" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <History size={18} color="var(--primary)" />
              <span>Immutable System Audit Trail ({auditLogs.length})</span>
            </h3>
            <button className="btn btn-secondary btn-sm" onClick={fetchAudit} disabled={loadingAudit}>
              <RefreshCw size={14} className={loadingAudit ? 'spin' : ''} />
              <span>Refresh Log</span>
            </button>
          </div>

          <div className="table-container">
            <table className="cyber-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Action</th>
                  <th>Entity Type</th>
                  <th>Entity ID</th>
                  <th>Operator UUID</th>
                  <th>Payload Detail</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: 32, color: 'var(--text-dim)' }}>
                      No audit entries recorded yet.
                    </td>
                  </tr>
                ) : (
                  auditLogs.map((a) => (
                    <tr key={a.id}>
                      <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {new Date(a.timestamp).toLocaleString()}
                      </td>
                      <td>
                        <span className="badge badge-purple">{a.action}</span>
                      </td>
                      <td>
                        <span className="badge badge-cyan">{a.entityType}</span>
                      </td>
                      <td>
                        <code style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                          {a.entityId ? a.entityId.substring(0, 10) : '-'}...
                        </code>
                      </td>
                      <td>
                        <code style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                          {a.userId ? a.userId.substring(0, 10) : 'SYSTEM'}...
                        </code>
                      </td>
                      <td style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                        {a.newValue || a.oldValue || '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
