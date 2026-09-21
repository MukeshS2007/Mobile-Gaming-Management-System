import React, { useState } from 'react';
import { 
  History, 
  Plus, 
  Radio, 
  Shield, 
  CheckCircle2, 
  Server, 
  ArrowUpRight, 
  Download, 
  X, 
  Clock, 
  Activity, 
  Zap, 
  Flame, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { exportToCSV } from '../utils/csvExport';
import { useAuth } from '../context/AuthContext';

const INITIAL_HISTORY = [
  { id: 'HIST-901', event: 'Global Cluster Failover Test', target: 'US-East & EU-West', status: 'Passed', timestamp: '2026-09-11 11:42:10', admin: 'Mukesh S' },
  { id: 'HIST-900', event: 'Patch v2.4.1 Hotfix Deployment', target: 'Cyber Strike: Neon City', status: 'Success', timestamp: '2026-09-11 10:15:00', admin: 'Mukesh S' },
  { id: 'HIST-899', event: '2x XP Live Ops Campaign Scheduled', target: 'Global Servers', status: 'Active', timestamp: '2026-09-11 08:30:22', admin: 'LiveOps Lead' },
  { id: 'HIST-898', event: 'PostgreSQL Connection Pool Auto-Scaled', target: 'RDS Primary Node', status: 'Completed', timestamp: '2026-09-11 06:12:45', admin: 'System Daemon' },
  { id: 'HIST-897', event: 'Anti-Cheat Heuristic Definitions Update', target: 'EAC Daemon Engine', status: 'Verified', timestamp: '2026-09-10 23:55:18', admin: 'Security Ops' }
];

export default function ExecutiveOverview({ searchQuery = '' }) {
  const { addToast } = useAuth();
  const [historyList, setHistoryList] = useState(INITIAL_HISTORY);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [activeEvents, setActiveEvents] = useState([
    { id: 1, name: 'Double XP Weekend', region: 'Global', duration: '48h', status: 'Active' },
    { id: 2, name: 'Cyber Arena Tournament', region: 'EU West', duration: '6h', status: 'Queued' }
  ]);

  // Form state for triggering live event
  const [newEvent, setNewEvent] = useState({
    name: 'Flash Gem Sale (+50% Bonus)',
    region: 'Global',
    duration: '12 Hours',
    game: 'All MGMS Titles'
  });

  // Export Executive Metrics + Audit History to CSV
  const handleExportExecutiveReport = () => {
    const reportData = [
      { Metric: 'Active Players (Live)', Value: '84,392', Change: '+12.4%', Status: 'Optimal' },
      { Metric: 'Total Revenue (24h)', Value: '$12,840.00', Change: '+5.2%', Status: 'Optimal' },
      { Metric: 'Conversion Rate', Value: '3.8%', Change: '+0.8%', Status: 'Healthy' },
      { Metric: 'Server Uptime', Value: '99.99%', Change: '0.00%', Status: 'Optimal' },
      { Metric: 'US East Server Health', Value: '24ms', Change: 'Stable', Status: 'Healthy' },
      { Metric: 'EU West Server Health', Value: '42ms', Change: 'Stable', Status: 'Healthy' },
      { Metric: 'Asia Pacific Server Health', Value: '124ms', Change: 'Load Spike', Status: 'Heavy' },
      { Metric: 'Anti-Cheat Engine', Value: 'Active', Change: '0 Anomalies', Status: 'Optimal' }
    ];

    const today = new Date().toISOString().split('T')[0];
    exportToCSV(reportData, `mgms_executive_overview_${today}.csv`);
    addToast && addToast('Executive Overview Report exported to CSV', 'success');
  };

  // Export Audit History to CSV
  const handleExportAuditHistory = () => {
    const today = new Date().toISOString().split('T')[0];
    exportToCSV(historyList, `mgms_audit_history_${today}.csv`);
    addToast && addToast('Audit history exported to CSV', 'success');
  };

  // Dispatch Live Event
  const handleDispatchLiveEvent = (e) => {
    e.preventDefault();
    const eventRecord = {
      id: Date.now(),
      name: newEvent.name,
      region: newEvent.region,
      duration: newEvent.duration,
      status: 'Active'
    };
    setActiveEvents((prev) => [eventRecord, ...prev]);

    // Add to audit history
    const auditRecord = {
      id: `HIST-${Math.floor(1000 + Math.random() * 9000)}`,
      event: `Live Event Dispatched: ${newEvent.name}`,
      target: `${newEvent.region} (${newEvent.duration})`,
      status: 'Active',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      admin: 'Mukesh S'
    };
    setHistoryList((prev) => [auditRecord, ...prev]);

    setShowEventModal(false);
    addToast && addToast(`Live Event "${newEvent.name}" triggered successfully!`, 'success');
  };

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
            ENTERPRISE GOVERNANCE
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: 4, letterSpacing: '-0.03em' }}>
            Executive Overview
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Real-time operations, operational audit trails, and live event triggers for MGMS Ecosystem.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* History Button */}
          <button 
            type="button"
            onClick={() => setShowHistoryModal(true)}
            className="btn btn-secondary btn-sm" 
            style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}
            title="View Operational & Audit History"
          >
            <History size={15} />
            <span>History</span>
          </button>

          {/* Export Report Button */}
          <button
            type="button"
            onClick={handleExportExecutiveReport}
            className="btn btn-secondary btn-sm"
            style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}
            title="Export Report as CSV"
          >
            <Download size={15} />
            <span>Export Report</span>
          </button>

          {/* Trigger Live Event Button */}
          <button 
            type="button"
            onClick={() => setShowEventModal(true)}
            className="btn btn-primary btn-sm" 
            style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}
            title="Trigger Instant Live Event"
          >
            <Plus size={16} />
            <span>Trigger Live Event</span>
          </button>
        </div>
      </div>

      {/* 4 Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Players (Live)</span>
            <span style={{ fontSize: '0.74rem', color: 'var(--success-text)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowUpRight size={13} /> +12.4%
            </span>
          </div>
          <div style={{ fontSize: '1.95rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit' }}>84,392</div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Revenue (24h)</span>
            <span style={{ fontSize: '0.74rem', color: 'var(--success-text)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowUpRight size={13} /> +5.2%
            </span>
          </div>
          <div style={{ fontSize: '1.95rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit' }}>$12,840.00</div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600 }}>Conversion Rate</span>
            <span style={{ fontSize: '0.74rem', color: 'var(--success-text)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowUpRight size={13} /> +0.8%
            </span>
          </div>
          <div style={{ fontSize: '1.95rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit' }}>3.8%</div>
        </div>

        <div className="mgms-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600 }}>Server Uptime</span>
            <span className="badge badge-green" style={{ fontSize: '0.68rem' }}>Optimal</span>
          </div>
          <div style={{ fontSize: '1.95rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit' }}>99.99%</div>
        </div>
      </div>

      {/* Center Row: Retention Trends & Global Server Health */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, marginBottom: 28 }}>
        <div className="mgms-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 2 }}>User Retention Trends</h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Daily Active vs Monthly Active user growth curve</div>
            </div>
            <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>Live Telemetry</span>
          </div>
          <div style={{ height: 190, width: '100%' }}>
            <svg viewBox="0 0 800 160" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="retentionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--success)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--success)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M 0 120 Q 200 90, 400 95 T 800 40 L 800 160 L 0 160 Z" fill="url(#retentionGrad)" />
              <path d="M 0 120 Q 200 90, 400 95 T 800 40" fill="none" stroke="var(--success)" strokeWidth="2.5" />
            </svg>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="mgms-card" style={{ padding: 20 }}>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Server size={16} color="var(--primary)" /> 
              <span>Global Server Health</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-body)' }}>US East (24ms)</span> 
                <span className="badge badge-green">Healthy</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-body)' }}>EU West (42ms)</span> 
                <span className="badge badge-green">Healthy</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-body)' }}>Asia Pacific (124ms)</span> 
                <span className="badge badge-amber">Heavy</span>
              </div>
            </div>
          </div>

          <div className="mgms-card" style={{ padding: 20 }}>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Shield size={16} color="var(--success)" /> 
              <span>Live Ops Security</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Anti-cheat systems are ACTIVE across all regions. No significant anomalies detected in the last 6 hours.
            </div>
          </div>
        </div>
      </div>

      {/* Active Live Ops Events Banner */}
      <div className="mgms-card" style={{ padding: 22, borderLeft: '4px solid var(--primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Radio size={18} color="var(--primary)" />
            <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-heading)' }}>
              Active Live Ops Campaigns ({activeEvents.length})
            </h4>
          </div>
          <button
            type="button"
            onClick={() => setShowEventModal(true)}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
          >
            + New Campaign
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
          {activeEvents.map((evt) => (
            <div 
              key={evt.id}
              style={{
                padding: '12px 14px',
                borderRadius: 10,
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-heading)' }}>{evt.name}</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Region: {evt.region} · Duration: {evt.duration}</div>
              </div>
              <span className={`badge ${evt.status === 'Active' ? 'badge-green' : 'badge-purple'}`} style={{ fontSize: '0.68rem' }}>
                {evt.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* HISTORY MODAL */}
      {showHistoryModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.72)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: 20
        }}>
          <div 
            className="mgms-card" 
            style={{
              width: '100%',
              maxWidth: 720,
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              padding: 28,
              boxShadow: 'var(--shadow-xl)',
              background: 'var(--bg-surface)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <History size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-heading)' }}>Operational Audit History</h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Recent system milestones, deployments and cluster health logs</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  type="button"
                  onClick={handleExportAuditHistory}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                >
                  <Download size={13} />
                  <span>Export CSV</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowHistoryModal(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div style={{ overflowY: 'auto', flex: 1, paddingRight: 4 }}>
              <table className="mgms-table" style={{ width: '100%', fontSize: '0.82rem' }}>
                <thead>
                  <tr>
                    <th>Log ID</th>
                    <th>Action / Event</th>
                    <th>Target Scope</th>
                    <th>Timestamp</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {historyList.map((row) => (
                    <tr key={row.id}>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-dim)' }}>{row.id}</td>
                      <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{row.event}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{row.target}</td>
                      <td style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{row.timestamp}</td>
                      <td>
                        <span className={`badge ${row.status === 'Passed' || row.status === 'Success' || row.status === 'Verified' || row.status === 'Completed' ? 'badge-green' : 'badge-purple'}`} style={{ fontSize: '0.68rem' }}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="btn btn-secondary btn-sm"
              >
                Close History
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TRIGGER LIVE EVENT MODAL */}
      {showEventModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.72)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: 20
        }}>
          <div 
            className="mgms-card" 
            style={{
              width: '100%',
              maxWidth: 540,
              padding: 28,
              boxShadow: 'var(--shadow-xl)',
              background: 'var(--bg-surface)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <Zap size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-heading)' }}>Trigger Live Event</h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Broadcast real-time gaming campaigns to player sessions</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowEventModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleDispatchLiveEvent} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: 6 }}>
                  Event Type / Name
                </label>
                <select
                  className="form-input"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                  style={{ width: '100%', background: 'var(--bg-subtle)', borderRadius: 8 }}
                >
                  <option value="Double XP Weekend Boost">Double XP Weekend Boost (Progression 2x)</option>
                  <option value="Cyber Arena Global Championship">Cyber Arena Global Championship (Tournament)</option>
                  <option value="Flash Gem Sale (+50% Bonus)">Flash Gem Sale (+50% Bonus In-App Purchase)</option>
                  <option value="World Boss Raid: Frost Wyrm">World Boss Raid: Frost Wyrm (Co-op PVE)</option>
                  <option value="Scheduled Maintenance Warning">Scheduled Maintenance Warning (Notice 30m)</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: 6 }}>
                    Target Region
                  </label>
                  <select
                    className="form-input"
                    value={newEvent.region}
                    onChange={(e) => setNewEvent({ ...newEvent, region: e.target.value })}
                    style={{ width: '100%', background: 'var(--bg-subtle)', borderRadius: 8 }}
                  >
                    <option value="Global">Global (All Regions)</option>
                    <option value="US East">US East (Virginia)</option>
                    <option value="EU West">EU West (Frankfurt)</option>
                    <option value="Asia Pacific">Asia Pacific (Tokyo)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: 6 }}>
                    Duration
                  </label>
                  <select
                    className="form-input"
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent({ ...newEvent, duration: e.target.value })}
                    style={{ width: '100%', background: 'var(--bg-subtle)', borderRadius: 8 }}
                  >
                    <option value="2 Hours">2 Hours</option>
                    <option value="6 Hours">6 Hours</option>
                    <option value="12 Hours">12 Hours</option>
                    <option value="24 Hours">24 Hours</option>
                    <option value="48 Hours (Weekend)">48 Hours (Weekend)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: 6 }}>
                  Target Portfolio
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={newEvent.game}
                  onChange={(e) => setNewEvent({ ...newEvent, game: e.target.value })}
                  style={{ width: '100%', background: 'var(--bg-subtle)', borderRadius: 8 }}
                />
              </div>

              <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  style={{ padding: '8px 18px', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <Flame size={14} />
                  <span>Dispatch Event Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
