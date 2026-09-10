import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Gamepad2, Play, Star, Shield, Plus, Sparkles, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

export default function GamesView({ onSelectTab, onOpenAuth }) {
  const { games, activeGame, setActiveGame, refreshGames, isAuthenticated, user, addToast, role } = useAuth();
  const [playerInfo, setPlayerInfo] = useState(null);
  const [loadingPlayer, setLoadingPlayer] = useState(false);
  const [seeding, setSeeding] = useState(false);

  // Load player progression for active game
  useEffect(() => {
    if (isAuthenticated && activeGame) {
      setLoadingPlayer(true);
      api.players.get(activeGame.id)
        .then((res) => setPlayerInfo(res))
        .catch(() => setPlayerInfo(null))
        .finally(() => setLoadingPlayer(false));
    }
  }, [isAuthenticated, activeGame]);

  const handleSeedDefaultGame = async () => {
    setSeeding(true);
    try {
      await api.games.create({
        gameName: 'Neon Vanguard: Cyber Protocol',
        gameType: 'Sci-Fi Action RPG',
        description: 'Fast-paced tactical cyber combat across futuristic megacities with live co-op battles and tournaments.',
        version: '1.2.0',
        buildNumber: 104,
        status: 'LIVE',
        configuration: JSON.stringify({ maxLevel: 100, seasons: 4, dynamicPvp: true }),
        minimumAge: 13
      });
      await refreshGames();
      addToast('Game created and added to library!', 'success');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSeeding(false);
    }
  };

  const statusColors = {
    LIVE: 'badge-green',
    DEVELOPMENT: 'badge-purple',
    TESTING: 'badge-amber',
    SOFT_LAUNCH: 'badge-cyan',
    MAINTENANCE: 'badge-amber',
    DEPRECATED: 'badge-red'
  };

  // Virtual currency parser
  let currencies = { gems: 150, coins: 2400 };
  if (playerInfo?.virtualCurrency) {
    try {
      currencies = { ...currencies, ...JSON.parse(playerInfo.virtualCurrency) };
    } catch {}
  }

  return (
    <div style={{ padding: '28px', maxWidth: 1280, margin: '0 auto' }}>
      {/* Header Banner */}
      <div 
        className="glass-panel pulse-glow" 
        style={{
          padding: '32px 36px',
          marginBottom: 32,
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(20, 30, 48, 0.9) 0%, rgba(10, 13, 20, 0.95) 100%)',
          borderColor: 'rgba(0, 242, 254, 0.25)'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 680 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span className="badge badge-cyan">NEXUS ENTERTAINMENT SUITE</span>
            <span className="badge badge-green">SERVERS OPERATIONAL</span>
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: 12, lineHeight: 1.15 }}>
            Mobile Gaming Universe & Operational Control
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', marginBottom: 24, lineHeight: 1.6 }}>
            Explore active mobile titles, track real-time progression, participate in live events, and manage ecosystem telemetries through our low-latency management engine.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {activeGame && (
              <button 
                className="btn btn-primary"
                onClick={() => onSelectTab('session_sim')}
              >
                <Play size={18} fill="currentColor" />
                <span>Launch Session Simulator</span>
              </button>
            )}
            <button 
              className="btn btn-secondary"
              onClick={() => onSelectTab('leaderboards')}
            >
              <Star size={18} color="var(--warning)" />
              <span>Inspect Leaderboards</span>
            </button>
          </div>
        </div>

        {/* Decorative Grid Pattern Overlay */}
        <div style={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 320,
          height: 320,
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* Active Game Player Progression HUD */}
      {isAuthenticated && activeGame && playerInfo && (
        <div 
          className="glass-panel" 
          style={{
            padding: '20px 28px',
            marginBottom: 32,
            background: 'rgba(18, 24, 38, 0.85)',
            borderLeft: '4px solid var(--primary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                ACTIVE PROFILE FOR:
              </span>
              <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{activeGame.gameName}</span>
              <span className="badge badge-purple">Level {playerInfo.playerLevel || 1}</span>
              <span className="badge badge-cyan">{playerInfo.playerSegment || 'CORE_PLAYER'}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--text-dim)', marginRight: 6 }}>💎 GEMS:</span>
                <b style={{ color: '#00F2FE' }}>{currencies.gems || 0}</b>
              </div>
              <div style={{ fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--text-dim)', marginRight: 6 }}>🪙 COINS:</span>
                <b style={{ color: '#F59E0B' }}>{currencies.coins || 0}</b>
              </div>
              <div style={{ fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--text-dim)', marginRight: 6 }}>⏱ PLAYTIME:</span>
                <b>{Math.round((playerInfo.totalPlayTime || 0) / 60)} min</b>
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: 4, color: 'var(--text-muted)' }}>
              <span>Experience Points: <b>{playerInfo.experiencePoints || 0} XP</b></span>
              <span>Next Level: <b>{((playerInfo.playerLevel || 1) * 1000)} XP</b></span>
            </div>
            <div style={{ width: '100%', height: 8, background: 'rgba(255, 255, 255, 0.08)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${Math.min(100, ((playerInfo.experiencePoints % 1000) / 1000) * 100)}%`,
                background: 'var(--primary-gradient)',
                borderRadius: 999,
                transition: 'width 0.4s ease'
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Games Catalog Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: '1.4rem' }}>Available Titles ({games.length})</h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            Select a game to participate in tournaments, in-app events, and live sessions.
          </p>
        </div>

        {['GAME_DEVELOPER', 'ADMIN'].includes(role) && (
          <button 
            className="btn btn-secondary btn-sm"
            onClick={handleSeedDefaultGame}
            disabled={seeding}
          >
            <Plus size={16} />
            <span>{seeding ? 'Creating...' : 'Create Sample Game'}</span>
          </button>
        )}
      </div>

      {/* Games Grid */}
      {games.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Gamepad2 size={48} color="var(--primary)" style={{ opacity: 0.6, marginBottom: 16 }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>No Games Registered Yet</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: 450, margin: '0 auto 20px auto' }}>
            Get started by initializing a game record in the backend database.
          </p>
          <button className="btn btn-primary" onClick={handleSeedDefaultGame} disabled={seeding}>
            <Sparkles size={18} />
            <span>{seeding ? 'Generating...' : 'Seed Sample Mobile Game'}</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
          {games.map((g) => {
            const isSelected = activeGame?.id === g.id;
            return (
              <div
                key={g.id}
                className={`glass-panel glass-panel-hover ${isSelected ? 'pulse-glow' : ''}`}
                style={{
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderColor: isSelected ? 'var(--primary)' : 'var(--border-subtle)',
                  background: isSelected 
                    ? 'linear-gradient(180deg, rgba(0, 242, 254, 0.08) 0%, rgba(18, 24, 38, 0.95) 100%)' 
                    : 'var(--bg-glass)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <span className={`badge ${statusColors[g.status] || 'badge-cyan'}`}>
                      {g.status}
                    </span>
                    <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>
                      {g.gameType}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.24rem', marginBottom: 8, color: isSelected ? 'var(--primary)' : 'var(--text-main)' }}>
                    {g.gameName}
                  </h3>

                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 18 }}>
                    {g.description || 'Action-packed mobile title optimized for high-refresh devices.'}
                  </p>
                </div>

                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(0, 0, 0, 0.25)',
                    marginBottom: 16,
                    fontSize: '0.78rem',
                    color: 'var(--text-dim)'
                  }}>
                    <div>v{g.version} (Build #{g.buildNumber})</div>
                    <div>Age: {g.minimumAge ? `${g.minimumAge}+` : 'All Ages'}</div>
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1 }}
                      onClick={() => {
                        setActiveGame(g);
                        addToast(`Active game set to: ${g.gameName}`, 'info');
                      }}
                    >
                      {isSelected ? <CheckCircle2 size={16} /> : <Gamepad2 size={16} />}
                      <span>{isSelected ? 'Selected' : 'Select Game'}</span>
                    </button>

                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setActiveGame(g);
                        onSelectTab('session_sim');
                      }}
                      title="Play Session"
                    >
                      <Play size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
