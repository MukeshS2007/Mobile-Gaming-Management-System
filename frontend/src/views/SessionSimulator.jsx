import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Play, Square, RefreshCw, Zap, Award, Smartphone, Clock, Flame, History, CheckCircle } from 'lucide-react';

export default function SessionSimulator({ onOpenAuth }) {
  const { activeGame, isAuthenticated, addToast } = useAuth();

  const [deviceType, setDeviceType] = useState('Android Phone');
  const [deviceOs, setDeviceOs] = useState('Android 16');
  const [appVersion, setAppVersion] = useState('1.2.0');

  const [activeSession, setActiveSession] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [actions, setActions] = useState(0);
  const [score, setScore] = useState(0);
  const [levels, setLevels] = useState(0);

  const [sessionsHistory, setSessionsHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const timerRef = useRef(null);

  // Load session history for active game
  const fetchHistory = async () => {
    if (!isAuthenticated || !activeGame) return;
    setLoadingHistory(true);
    try {
      // First ensure player profile exists
      await api.players.get(activeGame.id).catch(() => null);
      const list = await api.sessions.history(activeGame.id);
      setSessionsHistory(list || []);
    } catch (err) {
      console.warn('Session history load note:', err.message);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [isAuthenticated, activeGame]);

  // Session elapsed timer ticker
  useEffect(() => {
    if (activeSession) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeSession]);

  const handleStartSession = async () => {
    if (!isAuthenticated) {
      onOpenAuth();
      return;
    }
    if (!activeGame) {
      addToast('Please select an active game first', 'warning');
      return;
    }

    try {
      // Ensure player enrollment
      await api.players.get(activeGame.id);

      const res = await api.sessions.start({
        gameId: activeGame.id,
        deviceType,
        deviceOs,
        appVersion
      });
      setActiveSession(res);
      setElapsedSeconds(0);
      setActions(0);
      setScore(0);
      setLevels(0);
      addToast('Session started! Telemetry connection active.', 'success');
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleSyncUpdate = async (newActions, newScore, newLevels) => {
    if (!activeSession) return;
    setSyncing(true);
    try {
      await api.sessions.update(activeSession.id, {
        actionsPerformed: newActions,
        scoreAchieved: newScore,
        levelsCompleted: newLevels
      });
    } catch (err) {
      console.warn('Telemetry update failed:', err.message);
    } finally {
      setSyncing(false);
    }
  };

  const handleAddActions = (delta) => {
    const next = actions + delta;
    setActions(next);
    handleSyncUpdate(next, score, levels);
  };

  const handleAddScore = (delta) => {
    const next = score + delta;
    setScore(next);
    handleSyncUpdate(actions, next, levels);
  };

  const handleAddLevel = () => {
    const next = levels + 1;
    setLevels(next);
    handleSyncUpdate(actions, score, next);
    addToast('Level Complete! Synced with progression backend', 'info');
  };

  const handleEndSession = async () => {
    if (!activeSession) return;
    try {
      // Send final state update first
      await api.sessions.update(activeSession.id, {
        actionsPerformed: actions,
        scoreAchieved: score,
        levelsCompleted: levels
      });
      // Terminate session
      const ended = await api.sessions.end(activeSession.id);
      addToast(`Session completed! Duration: ${ended.durationSeconds || elapsedSeconds}s, Score: ${score}`, 'success');
      setActiveSession(null);
      await fetchHistory();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ padding: '28px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span className="badge badge-cyan">TELEMETRY SIMULATOR</span>
          <span className="badge badge-purple">{activeGame?.gameName || 'No Game Selected'}</span>
        </div>
        <h2 style={{ fontSize: '1.8rem' }}>Live Gameplay & Session Telemetry</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          Emulate mobile client telemetry packets, in-game actions, score checkpoints, and play duration tracking.
        </p>
      </div>

      {/* Simulator HUD Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: activeSession ? '1fr' : '1fr 1fr', gap: 24, marginBottom: 32 }}>
        {!activeSession ? (
          <>
            {/* Device & Environment Setup */}
            <div className="glass-panel" style={{ padding: 24 }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Smartphone size={18} color="var(--primary)" />
                <span>Simulated Client Hardware</span>
              </h3>

              <div className="form-group">
                <label className="form-label">Device Type</label>
                <select
                  className="form-select"
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                >
                  <option value="Android Phone">Android Phone (Snapdragon 8 Gen 3)</option>
                  <option value="iPhone 16 Pro">iPhone 16 Pro (A18 Pro)</option>
                  <option value="iPad Pro M4">iPad Pro 13-inch (M4)</option>
                  <option value="Samsung Galaxy Tab S10">Samsung Galaxy Tab S10+</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Operating System</label>
                  <input
                    type="text"
                    className="form-input"
                    value={deviceOs}
                    onChange={(e) => setDeviceOs(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">App Client Build</label>
                  <input
                    type="text"
                    className="form-input"
                    value={appVersion}
                    onChange={(e) => setAppVersion(e.target.value)}
                  />
                </div>
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 8 }}
                onClick={handleStartSession}
              >
                <Play size={18} fill="currentColor" />
                <span>Start Telemetry Session</span>
              </button>
            </div>

            {/* Quick Session Overview Card */}
            <div className="glass-panel" style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: 10 }}>Session Tracking Protocol</h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
                Starting a session invokes <code>POST /sessions/start</code>, auto-enrolling your user in <code>{activeGame?.gameName || 'the game'}</code>, incrementing total play counters, and initializing heartbeat counters.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ padding: 12, borderRadius: 'var(--radius-md)', background: 'rgba(0,0,0,0.3)', flex: 1 }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>TOTAL SESSIONS LOGGED</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>{sessionsHistory.length}</div>
                </div>
                <div style={{ padding: 12, borderRadius: 'var(--radius-md)', background: 'rgba(0,0,0,0.3)', flex: 1 }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>STATUS</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--warning)' }}>IDLE</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Active Live Session Ticker HUD */
          <div 
            className="glass-panel pulse-glow" 
            style={{
              padding: 32,
              background: 'linear-gradient(135deg, rgba(16, 24, 40, 0.95) 0%, rgba(10, 14, 24, 0.98) 100%)',
              borderColor: 'var(--primary)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="badge badge-red" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                  <Flame size={14} /> LIVE SESSION IN PROGRESS
                </span>
                <span style={{ fontSize: '0.86rem', color: 'var(--text-dim)' }}>
                  UUID: <code>{activeSession.id.substring(0, 13)}...</code>
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {syncing && <span style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>Syncing telemetry...</span>}
                <button className="btn btn-danger" onClick={handleEndSession}>
                  <Square size={16} fill="currentColor" />
                  <span>End Session & Save</span>
                </button>
              </div>
            </div>

            {/* Live Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
              <div style={{ padding: 18, background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--text-dim)', fontSize: '0.75rem', marginBottom: 4 }}>
                  <Clock size={14} /> ELAPSED TIME
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'JetBrains Mono', color: 'var(--primary)' }}>
                  {formatTimer(elapsedSeconds)}
                </div>
              </div>

              <div style={{ padding: 18, background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--text-dim)', fontSize: '0.75rem', marginBottom: 4 }}>
                  <Zap size={14} /> ACTIONS
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'Outfit', color: '#A78BFA' }}>
                  {actions}
                </div>
              </div>

              <div style={{ padding: 18, background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--text-dim)', fontSize: '0.75rem', marginBottom: 4 }}>
                  <Flame size={14} /> SCORE
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--warning)' }}>
                  {score.toLocaleString()}
                </div>
              </div>

              <div style={{ padding: 18, background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--text-dim)', fontSize: '0.75rem', marginBottom: 4 }}>
                  <Award size={14} /> LEVELS BEATEN
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--success)' }}>
                  {levels}
                </div>
              </div>
            </div>

            {/* Simulator Action Injector Buttons */}
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Simulate Player Actions (Triggers <code>PUT /sessions/{'{id}'}/update</code>)
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => handleAddActions(1)}>
                  +1 Action (Jump/Fire)
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => handleAddActions(10)}>
                  +10 Combo Actions
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => handleAddScore(250)}>
                  +250 Points
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => handleAddScore(1000)}>
                  +1,000 Points
                </button>
                <button className="btn btn-secondary btn-sm" onClick={handleAddLevel} style={{ borderColor: 'var(--success)' }}>
                  <Award size={14} color="var(--success)" />
                  <span>+1 Complete Level</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Session History Table */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <History size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '1.1rem' }}>Past Telemetry Sessions ({sessionsHistory.length})</h3>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={fetchHistory} disabled={loadingHistory}>
            <RefreshCw size={14} className={loadingHistory ? 'spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>

        {sessionsHistory.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 12px', color: 'var(--text-dim)' }}>
            <Clock size={32} style={{ opacity: 0.5, marginBottom: 8 }} />
            <p>No telemetry sessions logged yet for this game.</p>
            <p style={{ fontSize: '0.78rem' }}>Start a session above to record your first game run!</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="cyber-table">
              <thead>
                <tr>
                  <th>Session ID</th>
                  <th>Device / OS</th>
                  <th>Duration</th>
                  <th>Actions</th>
                  <th>Score</th>
                  <th>Levels</th>
                  <th>Started At</th>
                </tr>
              </thead>
              <tbody>
                {sessionsHistory.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <code style={{ color: 'var(--primary)' }}>{s.id.substring(0, 8)}</code>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600 }}>{s.deviceType || 'Mobile'}</span>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{s.deviceOs} (v{s.appVersion})</div>
                    </td>
                    <td>
                      <b>{s.durationSeconds ? `${s.durationSeconds}s` : 'Active'}</b>
                    </td>
                    <td>{s.actionsPerformed}</td>
                    <td>
                      <span style={{ color: 'var(--warning)', fontWeight: 700 }}>
                        {s.scoreAchieved?.toLocaleString() || 0}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-green">Lv +{s.levelsCompleted}</span>
                    </td>
                    <td style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      {new Date(s.sessionStart).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
