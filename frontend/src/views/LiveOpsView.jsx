import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Radio, Calendar, Bell, Plus, Sparkles, AlertCircle, Trash2, Send, Clock } from 'lucide-react';

export default function LiveOpsView() {
  const { activeGame, addToast } = useAuth();
  const [activeEvents, setActiveEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Broadcast state
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastType, setBroadcastType] = useState('ANNOUNCEMENT');
  const [broadcastPriority, setBroadcastPriority] = useState('HIGH');
  const [broadcasting, setBroadcasting] = useState(false);

  // New Event Form State
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('DOUBLE_XP');
  const [startDate, setStartDate] = useState(new Date().toISOString().substring(0, 16));
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000 * 3).toISOString().substring(0, 16));
  const [eventConfig, setEventConfig] = useState('{"multiplier": 2.0}');
  const [creatingEvent, setCreatingEvent] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const list = await api.events.active();
      setActiveEvents(list || []);
    } catch (err) {
      console.warn('Events fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleBroadcast = async (e) => {
    e.preventDefault();
    if (!broadcastMsg.trim()) return;
    setBroadcasting(true);
    try {
      await api.notifications.broadcast({
        gameId: activeGame?.id || null,
        message: broadcastMsg,
        type: broadcastType,
        priority: broadcastPriority
      });
      addToast('Notification broadcast sent to all active users!', 'success');
      setBroadcastMsg('');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setBroadcasting(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!activeGame) {
      addToast('Please select an active game first', 'warning');
      return;
    }
    setCreatingEvent(true);
    try {
      await api.events.create({
        gameId: activeGame.id,
        eventName,
        eventType,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        configuration: eventConfig,
        active: true
      });
      addToast('Live Event created and activated!', 'success');
      setShowEventModal(false);
      setEventName('');
      await fetchEvents();
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setCreatingEvent(false);
    }
  };

  const handleCancelEvent = async (id) => {
    try {
      await api.events.cancel(id);
      addToast('Event cancelled and marked inactive', 'info');
      await fetchEvents();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleSeedDefaultEvent = async () => {
    if (!activeGame) return;
    setCreatingEvent(true);
    try {
      await api.events.create({
        gameId: activeGame.id,
        eventName: 'Weekend Blitz: Double XP & Rare Crate Surge',
        eventType: 'DOUBLE_XP_WEEKEND',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 86400000 * 3).toISOString(),
        configuration: JSON.stringify({ xpBonus: '200%', dropRateMultiplier: 1.5 }),
        active: true
      });
      addToast('Sample Live Event scheduled!', 'success');
      await fetchEvents();
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setCreatingEvent(false);
    }
  };

  return (
    <div style={{ padding: '28px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span className="badge badge-amber">OPERATIONS ENGINE</span>
            <span className="badge badge-cyan">{activeGame?.gameName || 'All Games'}</span>
          </div>
          <h2 style={{ fontSize: '1.8rem' }}>Live Ops & Push Broadcast Center</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Schedule real-time weekend campaigns, seasonal tournaments, and dispatch system-wide player announcements.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {activeEvents.length === 0 && activeGame && (
            <button className="btn btn-secondary btn-sm" onClick={handleSeedDefaultEvent} disabled={creatingEvent}>
              <Sparkles size={14} />
              <span>Schedule Sample Event</span>
            </button>
          )}
          <button className="btn btn-primary btn-sm" onClick={() => setShowEventModal(true)}>
            <Plus size={16} />
            <span>New Live Event</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, marginBottom: 32 }}>
        {/* Active Events List */}
        <div className="glass-panel" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Calendar size={18} color="var(--primary)" />
              <span>Active Scheduled Campaigns ({activeEvents.length})</span>
            </h3>
          </div>

          {activeEvents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 12px', color: 'var(--text-dim)' }}>
              <Radio size={32} style={{ opacity: 0.5, marginBottom: 8 }} />
              <p>No campaigns currently active.</p>
              <p style={{ fontSize: '0.78rem' }}>Schedule an event to engage players!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {activeEvents.map((e) => (
                <div
                  key={e.id}
                  className="glass-panel"
                  style={{
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    background: 'rgba(255, 255, 255, 0.02)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="badge badge-green">ACTIVE NOW</span>
                        <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{e.eventType}</span>
                      </div>
                      <h4 style={{ fontSize: '1.05rem', marginTop: 6 }}>{e.eventName}</h4>
                    </div>

                    <button
                      onClick={() => handleCancelEvent(e.id)}
                      className="btn btn-danger btn-sm"
                      style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                      title="End / Cancel Event"
                    >
                      <Trash2 size={12} /> Cancel
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                    <div>Starts: <b>{new Date(e.startDate).toLocaleDateString()}</b></div>
                    <div>Ends: <b>{new Date(e.endDate).toLocaleDateString()}</b></div>
                  </div>

                  {e.configuration && (
                    <code style={{ fontSize: '0.74rem', color: 'var(--primary)', background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: 4 }}>
                      {e.configuration}
                    </code>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dispatch Notification Broadcast Form */}
        <div className="glass-panel" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Radio size={18} color="var(--warning)" />
            <span>Broadcast Announcement to Players</span>
          </h3>

          <form onSubmit={handleBroadcast}>
            <div className="form-group">
              <label className="form-label">Notification Message</label>
              <textarea
                rows={4}
                required
                className="form-textarea"
                placeholder="Attention operatives: Server maintenance in 2 hours / 2x XP Surge active!"
                value={broadcastMsg}
                onChange={(e) => setBroadcastMsg(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={broadcastType}
                  onChange={(e) => setBroadcastType(e.target.value)}
                >
                  <option value="ANNOUNCEMENT">📢 Announcement</option>
                  <option value="SYSTEM_MAINTENANCE">⚙️ Maintenance Alert</option>
                  <option value="REWARD_DROP">🎁 Gift / Free Rewards</option>
                  <option value="TOURNAMENT">🏆 Tournament Invite</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  value={broadcastPriority}
                  onChange={(e) => setBroadcastPriority(e.target.value)}
                >
                  <option value="NORMAL">Normal Priority</option>
                  <option value="HIGH">High (Urgent Banner)</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={broadcasting} className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
              <Send size={16} />
              <span>{broadcasting ? 'Broadcasting...' : 'Send Broadcast to All Inboxes'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Schedule Event Modal */}
      {showEventModal && (
        <div className="modal-backdrop" onClick={() => setShowEventModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.15rem' }}>Schedule Live Event</h3>
              <button onClick={() => setShowEventModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}>
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateEvent}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Campaign Title</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Cyber Solstice Tournament"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Event Type</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="DOUBLE_XP, TOURNAMENT, DROP_SURGE"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="form-group">
                    <label className="form-label">Start Date & Time</label>
                    <input
                      type="datetime-local"
                      required
                      className="form-input"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">End Date & Time</label>
                    <input
                      type="datetime-local"
                      required
                      className="form-input"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Configuration Spec (JSON)</label>
                  <textarea
                    rows={2}
                    className="form-textarea"
                    value={eventConfig}
                    onChange={(e) => setEventConfig(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowEventModal(false)}>
                  Cancel
                </button>
                <button type="submit" disabled={creatingEvent} className="btn btn-primary btn-sm">
                  {creatingEvent ? 'Scheduling...' : 'Activate Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
