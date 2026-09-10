import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Trophy, Medal, Crown, Sparkles, Filter, Calendar, BarChart2 } from 'lucide-react';

export default function LeaderboardsView() {
  const { activeGame, role, addToast } = useAuth();
  const [leaderboards, setLeaderboards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const isDevOrOps = ['GAME_DEVELOPER', 'LIVE_OPS_MANAGER', 'ADMIN'].includes(role);

  const fetchBoards = async () => {
    if (!activeGame) return;
    setLoading(true);
    try {
      const list = await api.leaderboards.getByGame(activeGame.id);
      setLeaderboards(list || []);
      if (list && list.length > 0) {
        setSelectedBoard(list[0]);
      } else {
        setSelectedBoard(null);
      }
    } catch (err) {
      console.warn('Leaderboard error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, [activeGame]);

  const handleSeedLeaderboard = async () => {
    if (!activeGame) return;
    setSeeding(true);
    try {
      const sampleRankings = [
        { rank: 1, player: 'Phantom_Ace', score: 148500, level: 74, country: 'KR' },
        { rank: 2, player: 'VortexValkyrie', score: 132400, level: 68, country: 'US' },
        { rank: 3, player: 'CyberNinja_99', score: 119850, level: 62, country: 'JP' },
        { rank: 4, player: 'SolarisBlade', score: 98400, level: 55, country: 'DE' },
        { rank: 5, player: 'NeoStriker', score: 84120, level: 48, country: 'IN' },
        { rank: 6, player: 'AegisShield', score: 76500, level: 42, country: 'BR' },
        { rank: 7, player: 'ZeroHour', score: 65200, level: 39, country: 'FR' }
      ];

      await api.leaderboards.create({
        gameId: activeGame.id,
        leaderboardType: 'GLOBAL_COMPETITIVE_HIGH_SCORE',
        timeframe: 'SEASON_4',
        playerRankings: JSON.stringify(sampleRankings)
      });

      addToast('Leaderboard tier published!', 'success');
      await fetchBoards();
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSeeding(false);
    }
  };

  let rankingsList = [];
  if (selectedBoard?.playerRankings) {
    try {
      rankingsList = JSON.parse(selectedBoard.playerRankings);
    } catch {}
  }

  return (
    <div style={{ padding: '28px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span className="badge badge-amber">HALL OF FAME</span>
            <span className="badge badge-cyan">{activeGame?.gameName || 'Select Game'}</span>
          </div>
          <h2 style={{ fontSize: '1.8rem' }}>Global & Seasonal Leaderboards</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Live ranking tiers, high scores, and competitive season rankings.
          </p>
        </div>

        {isDevOrOps && (
          <button className="btn btn-primary btn-sm" onClick={handleSeedLeaderboard} disabled={seeding}>
            <Sparkles size={16} />
            <span>{seeding ? 'Publishing...' : 'Publish Ranking Tier'}</span>
          </button>
        )}
      </div>

      {leaderboards.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Trophy size={48} color="var(--warning)" style={{ opacity: 0.5, marginBottom: 16 }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>No Leaderboards Published</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: 450, margin: '0 auto 20px auto' }}>
            Rankings have not yet been posted for {activeGame?.gameName || 'this title'}.
          </p>
          {isDevOrOps && (
            <button className="btn btn-primary" onClick={handleSeedLeaderboard} disabled={seeding}>
              <Sparkles size={16} />
              <span>Seed Competitive Rankings</span>
            </button>
          )}
        </div>
      ) : (
        <div>
          {/* Board Selector Tabs */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, overflowX: 'auto', paddingBottom: 6 }}>
            {leaderboards.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBoard(b)}
                className={`btn btn-sm ${selectedBoard?.id === b.id ? 'btn-primary' : 'btn-secondary'}`}
              >
                <BarChart2 size={14} />
                <span>{b.leaderboardType} ({b.timeframe})</span>
              </button>
            ))}
          </div>

          {/* Top 3 Podium Cards */}
          {rankingsList.length >= 3 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
              {/* 2nd Place */}
              <div className="glass-panel" style={{ padding: 20, textAlign: 'center', borderColor: '#94A3B8' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>🥈</div>
                <div className="badge badge-secondary" style={{ marginBottom: 8 }}>#2 RUNNER UP</div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{rankingsList[1]?.player}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--primary)', fontFamily: 'Outfit', marginTop: 6 }}>
                  {rankingsList[1]?.score?.toLocaleString()} PTS
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginTop: 4 }}>Level {rankingsList[1]?.level} • {rankingsList[1]?.country}</div>
              </div>

              {/* 1st Place Champion */}
              <div className="glass-panel pulse-glow" style={{ padding: 24, textAlign: 'center', borderColor: 'var(--warning)', transform: 'translateY(-6px)' }}>
                <div style={{ fontSize: '2.4rem', marginBottom: 4 }}>👑</div>
                <div className="badge badge-amber" style={{ marginBottom: 8 }}>#1 GRAND CHAMPION</div>
                <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--warning)' }}>{rankingsList[0]?.player}</div>
                <div style={{ fontSize: '1.7rem', fontWeight: 900, color: 'var(--warning)', fontFamily: 'Outfit', marginTop: 6 }}>
                  {rankingsList[0]?.score?.toLocaleString()} PTS
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: 4 }}>Level {rankingsList[0]?.level} • {rankingsList[0]?.country}</div>
              </div>

              {/* 3rd Place */}
              <div className="glass-panel" style={{ padding: 20, textAlign: 'center', borderColor: '#B45309' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>🥉</div>
                <div className="badge badge-secondary" style={{ marginBottom: 8 }}>#3 BRONZE</div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{rankingsList[2]?.player}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--primary)', fontFamily: 'Outfit', marginTop: 6 }}>
                  {rankingsList[2]?.score?.toLocaleString()} PTS
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginTop: 4 }}>Level {rankingsList[2]?.level} • {rankingsList[2]?.country}</div>
              </div>
            </div>
          )}

          {/* Full Standings Table */}
          <div className="glass-panel" style={{ padding: 24 }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 16 }}>All Competitor Standings</h3>
            <div className="table-container">
              <table className="cyber-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Player Handle</th>
                    <th>Score</th>
                    <th>Player Level</th>
                    <th>Region</th>
                  </tr>
                </thead>
                <tbody>
                  {rankingsList.map((r) => (
                    <tr key={r.rank}>
                      <td>
                        <span style={{
                          fontWeight: 800,
                          color: r.rank === 1 ? 'var(--warning)' : r.rank === 2 ? '#94A3B8' : r.rank === 3 ? '#B45309' : 'var(--text-muted)'
                        }}>
                          #{r.rank}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{r.player}</td>
                      <td>
                        <b style={{ color: 'var(--primary)', fontFamily: 'Outfit' }}>{r.score?.toLocaleString()}</b>
                      </td>
                      <td>
                        <span className="badge badge-purple">Lv {r.level}</span>
                      </td>
                      <td style={{ color: 'var(--text-dim)' }}>{r.country}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
