import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { LineChart, DollarSign, Users, Gamepad2, Clock, Sparkles, FileText, Send, CheckCircle } from 'lucide-react';

export default function AnalyticsView() {
  const { activeGame, addToast } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [playerAnalytics, setPlayerAnalytics] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Custom Report Request State
  const [reportMetric, setReportMetric] = useState('DAU_MAU_RATIO');
  const [reportTimeframe, setReportTimeframe] = useState('LAST_30_DAYS');
  const [reportResult, setReportResult] = useState(null);
  const [requesting, setRequesting] = useState(false);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const dash = await api.analytics.dashboard();
      setDashboardData(dash);

      if (activeGame) {
        const pStats = await api.analytics.playerStats(activeGame.id).catch(() => null);
        setPlayerAnalytics(pStats);

        const rev = await api.analytics.revenue(activeGame.id).catch(() => null);
        setRevenueData(rev);
      }
    } catch (err) {
      console.warn('Analytics load error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [activeGame]);

  const handleCustomReport = async (e) => {
    e.preventDefault();
    setRequesting(true);
    try {
      const res = await api.analytics.customReport({
        gameId: activeGame?.id || 'ALL_GAMES',
        metric: reportMetric,
        timeframe: reportTimeframe,
        requestedBy: 'Analytics Studio'
      });
      setReportResult(res);
      addToast('Custom telemetry query queued successfully!', 'success');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div style={{ padding: '28px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span className="badge badge-cyan">TELEMETRY & INTELLIGENCE</span>
          <span className="badge badge-purple">{activeGame?.gameName || 'Platform Wide'}</span>
        </div>
        <h2 style={{ fontSize: '1.8rem' }}>Executive KPI & Game Analytics</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          Aggregated telemetry, player retention patterns, engagement metrics, and monetization breakdown.
        </p>
      </div>

      {/* Global Dashboard Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 32 }}>
        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', fontWeight: 700 }}>TITLES IN ECOSYSTEM</span>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(0, 242, 254, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <Gamepad2 size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'Outfit' }}>
            {dashboardData?.games ?? 0}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--success)', marginTop: 4 }}>
            ● Active game servers
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', fontWeight: 700 }}>REGISTERED PLAYERS</span>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(138, 43, 226, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C084FC' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'Outfit' }}>
            {dashboardData?.players ?? 0}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: 4 }}>
            Player profiles tracked
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', fontWeight: 700 }}>IAP TRANSACTIONS</span>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warning)' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'Outfit' }}>
            {dashboardData?.purchases ?? 0}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: 4 }}>
            Total processed orders
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', fontWeight: 700 }}>COMPLETED REVENUE</span>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--success)' }}>
            ${revenueData?.completedRevenue ? Number(revenueData.completedRevenue).toFixed(2) : '0.00'}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--success)', marginTop: 4 }}>
            For: {activeGame?.gameName || 'Active Game'}
          </div>
        </div>
      </div>

      {/* Deep-Dive Game Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, marginBottom: 32 }}>
        {/* Game Specific Metrics */}
        <div className="glass-panel" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <LineChart size={18} color="var(--primary)" />
            <span>Title Retention & Engagement: {activeGame?.gameName || 'Select a Game'}</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ padding: 16, background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>ENROLLED PLAYERS</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', margin: '4px 0' }}>
                {playerAnalytics?.players ?? 0}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Unique installations</div>
            </div>

            <div style={{ padding: 16, background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>AVERAGE PLAYER LEVEL</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#C084FC', margin: '4px 0' }}>
                {playerAnalytics?.averageLevel ? playerAnalytics.averageLevel.toFixed(1) : '1.0'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Progression maturity</div>
            </div>

            <div style={{ padding: 16, background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>TOTAL HOURS PLAYED</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--warning)', margin: '4px 0' }}>
                {playerAnalytics?.totalPlaySeconds ? (playerAnalytics.totalPlaySeconds / 3600).toFixed(1) : '0.0'} hrs
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Aggregated session time</div>
            </div>

            <div style={{ padding: 16, background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>AVG REVENUE PER USER (ARPU)</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--success)', margin: '4px 0' }}>
                ${playerAnalytics?.players && revenueData?.completedRevenue 
                  ? (Number(revenueData.completedRevenue) / playerAnalytics.players).toFixed(2) 
                  : '0.00'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Monetization efficiency</div>
            </div>
          </div>
        </div>

        {/* Custom Report Builder */}
        <div className="glass-panel" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <FileText size={18} color="var(--warning)" />
            <span>Generate Custom Analytics Report</span>
          </h3>

          <form onSubmit={handleCustomReport}>
            <div className="form-group">
              <label className="form-label">Telemetry Metric Spec</label>
              <select
                className="form-select"
                value={reportMetric}
                onChange={(e) => setReportMetric(e.target.value)}
              >
                <option value="DAU_MAU_RATIO">DAU / MAU Stickiness Ratio</option>
                <option value="COHORT_D7_D30_RETENTION">D7 & D30 Cohort Retention</option>
                <option value="WHALE_CONVERSION_FUNNEL">IAP Payer Conversion Funnel</option>
                <option value="CRASH_FREE_SESSIONS_RATE">Client Stability & Crash-Free Rate</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Sampling Timeframe</label>
              <select
                className="form-select"
                value={reportTimeframe}
                onChange={(e) => setReportTimeframe(e.target.value)}
              >
                <option value="LAST_24_HOURS">Past 24 Hours (Realtime)</option>
                <option value="LAST_7_DAYS">Past 7 Days</option>
                <option value="LAST_30_DAYS">Past 30 Days (Rolling Month)</option>
                <option value="CURRENT_QUARTER">Fiscal Quarter to Date</option>
              </select>
            </div>

            <button type="submit" disabled={requesting} className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: 8 }}>
              <Sparkles size={14} />
              <span>{requesting ? 'Queuing OLAP Job...' : 'Queue Analytics Report'}</span>
            </button>
          </form>

          {reportResult && (
            <div style={{ marginTop: 16, padding: 12, borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--success)', fontSize: '0.8rem', fontWeight: 600 }}>
                <CheckCircle size={14} />
                <span>Report Job ID Status: {reportResult.status}</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: 4 }}>
                Metric: <code>{reportResult.specification?.metric}</code>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
