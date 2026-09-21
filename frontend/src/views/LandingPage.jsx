import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Gamepad2, 
  BarChart3, 
  Users, 
  Radio, 
  ShieldCheck, 
  Globe2, 
  Cpu, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Activity,
  Layers,
  Star,
  Sun,
  Moon,
  Zap
} from 'lucide-react';

export default function LandingPage({ onGoLogin, onGoRegister, onGoApp, theme, toggleTheme }) {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const handleLaunchApp = () => {
    if (onGoApp) onGoApp();
    else navigate('/dashboard');
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      handleLaunchApp();
    } else {
      if (onGoRegister) onGoRegister();
      else if (onGoLogin) onGoLogin();
      else navigate('/login');
    }
  };

  return (
    <div style={{ background: 'var(--bg-app)', minHeight: '100vh', color: 'var(--text-body)', transition: 'all 0.25s ease' }}>
      {/* Top Navigation */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'var(--bg-navbar)',
        backdropFilter: 'var(--backdrop-blur)',
        WebkitBackdropFilter: 'var(--backdrop-blur)',
        borderBottom: '1px solid var(--border-color)',
        padding: '16px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 1400,
        margin: '0 auto',
        transition: 'all 0.25s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={handleLaunchApp}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'var(--primary-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: 'var(--shadow-purple)'
            }}>
              <Gamepad2 size={22} />
            </div>
            <span style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-heading)', letterSpacing: '-0.03em' }}>
              MGMS
            </span>
          </div>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-muted)' }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.15s ease' }}>Solutions</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.15s ease' }}>Platform</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.15s ease' }}>Pricing</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.15s ease' }}>Community</span>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Theme Switcher in Landing Header */}
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-subtle)',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Cyber Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun size={17} style={{ color: '#f59e0b' }} />
              ) : (
                <Moon size={17} style={{ color: '#6366f1' }} />
              )}
            </button>
          )}

          {isAuthenticated ? (
            <button 
              onClick={handleLaunchApp}
              style={{
                background: 'var(--primary-light)',
                border: '1px solid var(--border-glow)',
                fontSize: '0.84rem',
                fontWeight: 700,
                color: 'var(--primary)',
                cursor: 'pointer',
                padding: '7px 14px',
                borderRadius: 8,
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
              title="Return to Dashboard Console"
            >
              <span>⚡ Console ({user?.username || 'Mukesh S'})</span>
            </button>
          ) : (
            <button 
              onClick={onGoLogin}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: 'var(--text-body)',
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: 8,
                transition: 'all 0.15s ease'
              }}
            >
              Sign In
            </button>
          )}

          <button 
            onClick={handleLaunchApp}
            className="btn btn-primary"
            style={{ borderRadius: 'var(--radius-full)', padding: '10px 22px' }}
          >
            <span>Open Console</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '70px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          {/* Glowing Pill Tag */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--primary-light)',
            border: '1px solid var(--border-glow)',
            color: 'var(--primary)',
            fontSize: '0.82rem',
            fontWeight: 700,
            marginBottom: 24,
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Sparkles size={15} />
            <span>Next-Gen Enterprise Gaming Platform 2026</span>
          </div>

          <h1 style={{
            fontSize: '3.6rem',
            fontWeight: 900,
            color: 'var(--text-heading)',
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            marginBottom: 22
          }}>
            Power Your Mobile Game Operations <span className="text-gradient">At Scale</span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-muted)',
            lineHeight: 1.65,
            maxWidth: 720,
            margin: '0 auto 36px auto'
          }}>
            The only all-in-one management suite designed for high-performance mobile games. Manage players, analyze real-time economy, track and orchestrate global live events from a single, high-fidelity dashboard.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 44 }}>
            <button 
              onClick={handleGetStarted} 
              className="btn btn-primary" 
              style={{ padding: '14px 30px', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}
            >
              {isAuthenticated ? 'Continue to Dashboard →' : 'Get Started Free'}
            </button>
            <button 
              onClick={handleLaunchApp} 
              className="btn btn-secondary" 
              style={{ padding: '14px 30px', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}
            >
              View Live Console
            </button>
          </div>

          {/* Social Proof */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', marginLeft: 8 }}>
              {['🤖', '🛡️', '🚀', '⚡'].map((badge, i) => (
                <div 
                  key={i} 
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    border: '2px solid var(--bg-card)',
                    marginLeft: i > 0 ? -10 : 0,
                    background: 'var(--bg-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.95rem',
                    boxShadow: 'var(--shadow-sm)'
                  }} 
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Preview Card */}
        <div 
          className="mgms-card"
          style={{
            marginTop: 60,
            borderRadius: 24,
            padding: 24,
            boxShadow: 'var(--shadow-lg), var(--card-glow)'
          }}
        >
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 16,
            padding: 36,
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            flexWrap: 'wrap',
            gap: 24
          }}>
            <div style={{ textAlign: 'left' }}>
              <span className="badge badge-purple" style={{ marginBottom: 12 }}>SYSTEM TELEMETRY ENGINE</span>
              <h3 style={{ fontSize: '2rem', color: 'var(--text-heading)', marginBottom: 8 }}>Vanguard Mobile Ops Hub</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: 480 }}>
                Synchronized across Google Play, Apple App Store, and Direct backend servers with sub-100ms telemetry ingress.
              </p>
            </div>

            <div 
              className="mgms-card"
              style={{
                background: 'var(--bg-card)',
                padding: '18px 28px',
                borderRadius: 16,
                textAlign: 'center',
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>CONCURRENT ACTIVE PLAYERS</div>
              <div style={{ fontSize: '2.6rem', fontWeight: 900, color: 'var(--primary)', fontFamily: 'Outfit' }}>12.8M</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--success-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontWeight: 600 }}>
                <span className="live-dot" /> Live Across 84 Regions
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid: Enterprise Tools for Elite Game Studios */}
      <section style={{ background: 'var(--bg-subtle)', padding: '90px 24px', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: 12 }}>
              Enterprise Tools for Elite Game Studios
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 640, margin: '0 auto' }}>
              Stop juggling multiple tools. MGMS provides everything needed to launch, monitor, and scale your game ecosystem in a unified professional suite.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              {
                icon: BarChart3,
                title: 'Real-time Analytics',
                desc: 'Monitor player behavior, economy health, and server performance live with sub-second ingestion. Export custom reports for deeper insights.'
              },
              {
                icon: Users,
                title: 'Player CRM & Support',
                desc: 'Segment your audience, manage bans, and provide high-fidelity support with a comprehensive 360-degree player profile viewer.'
              },
              {
                icon: Radio,
                title: 'Live Events Engine',
                desc: 'Schedule tournaments, battle passes, and limited-time offers with a global scheduling engine that requires zero code redeploys.'
              },
              {
                icon: ShieldCheck,
                title: 'Anti-Cheat & Security',
                desc: 'Protect your game economy from bad actors with AI-driven anomaly detection and robust server-side validation tools.'
              },
              {
                icon: Globe2,
                title: 'Global Localization',
                desc: 'Manage assets, text, and pricing across 40+ regions with automated currency conversion and region-tailored content delivery.'
              },
              {
                icon: Cpu,
                title: 'SDK Integration',
                desc: 'Lightweight SDKs for Unity, Unreal Engine, and C++ that integrate in under 15 minutes without bloating your binary footprint.'
              }
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="mgms-card" style={{ padding: 28 }}>
                  <div style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 18,
                    border: '1px solid var(--border-glow)'
                  }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-heading)', marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section style={{ padding: '70px 24px', background: 'var(--bg-app)' }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
          textAlign: 'center'
        }}>
          <div className="mgms-card" style={{ padding: '24px 16px' }}>
            <div style={{ fontSize: '2.6rem', fontWeight: 900, color: 'var(--primary)', fontFamily: 'Outfit' }}>450M+</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginTop: 4 }}>TOTAL PLAYERS MANAGED</div>
          </div>
          <div className="mgms-card" style={{ padding: '24px 16px' }}>
            <div style={{ fontSize: '2.6rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit' }}>$2.4B</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginTop: 4 }}>TRANSACTIONS PROCESSED</div>
          </div>
          <div className="mgms-card" style={{ padding: '24px 16px' }}>
            <div style={{ fontSize: '2.6rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Outfit' }}>1,200+</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginTop: 4 }}>GAME TITLES SUPPORTED</div>
          </div>
          <div className="mgms-card" style={{ padding: '24px 16px' }}>
            <div style={{ fontSize: '2.6rem', fontWeight: 900, color: 'var(--success-text)', fontFamily: 'Outfit' }}>99.99%</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginTop: 4 }}>GLOBAL SERVER UPTIME</div>
          </div>
        </div>
      </section>

      {/* Virtual Economy Section */}
      <section style={{ padding: '80px 24px', background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div className="mgms-card" style={{ padding: 32, borderRadius: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span className="badge badge-purple">LIVE ECONOMY SIMULATOR</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Realtime Synced</span>
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--success-text)', marginBottom: 4 }}>
              $142,890.00
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 24 }}>Daily Gross Volume (+14.2% vs 7D Avg)</div>
            
            {/* Bars simulation */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
              {[40, 65, 55, 80, 70, 95, 85, 100, 90, 110].map((h, i) => (
                <div key={i} style={{ flex: 1, background: 'var(--bg-subtle)', height: `${h}%`, borderRadius: '4px 4px 0 0', position: 'relative' }}>
                  <div style={{ width: '100%', height: `${Math.min(100, h * 0.7)}%`, background: 'var(--primary-gradient)', borderRadius: '4px 4px 0 0' }} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="badge badge-purple" style={{ marginBottom: 12 }}>MONETIZATION ENGINE</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: 16 }}>
              Master Your Game's Virtual Economy
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: 24 }}>
              Avoid hyperinflation and predict revenue spikes with our economy simulation tools. Model different drop rates, IAP price points, and seasonal rewards before you push them live.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                'Automated anomaly alerts for currency duplication',
                'A/B testing for In-App Purchase pricing tiers',
                'Direct export to financial reporting tools',
                'Predictive ARPU modeling using Machine Learning'
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.92rem', color: 'var(--text-body)' }}>
                  <CheckCircle2 size={18} color="var(--success)" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner: Vibrant Gradient */}
      <section style={{ maxWidth: 1200, margin: '80px auto', padding: '0 24px' }}>
        <div style={{
          background: 'var(--primary-gradient)',
          borderRadius: 24,
          padding: '60px 40px',
          textAlign: 'center',
          color: 'white',
          boxShadow: 'var(--shadow-purple)'
        }}>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 900, color: 'white', marginBottom: 14 }}>
            Ready to Take Your Game to the Next Level?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: 580, margin: '0 auto 32px auto' }}>
            Join the top studios managing the future of mobile entertainment. Start your 14-day full-access trial today. No credit card required.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
            <button onClick={onGoRegister || onGoLogin} style={{
              background: '#ffffff',
              color: '#4f46e5',
              padding: '12px 28px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)'
            }}>
              Start Free Trial
            </button>
            <button onClick={onGoApp} style={{
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              padding: '12px 28px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: '0.95rem',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              cursor: 'pointer'
            }}>
              Open Console
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '60px 40px 40px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <Gamepad2 size={18} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-heading)' }}>MGMS</span>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', maxWidth: 300, lineHeight: 1.6 }}>
              The next generation of mobile game operations. High-fidelity analytics, live ops management, and virtual economy governance.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 14, textTransform: 'uppercase' }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              <span>Live Ops Engine</span>
              <span>Virtual Economy</span>
              <span>Player CRM</span>
              <span>SDK Downloads</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 14, textTransform: 'uppercase' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              <span>About Us</span>
              <span>Customers</span>
              <span>Careers</span>
              <span>Legal & Privacy</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 14, textTransform: 'uppercase' }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              <span>Documentation</span>
              <span>API Reference</span>
              <span>System Status</span>
              <span>Support Portal</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 24, textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
          © 2026 Mobile Gaming Management System (MGMS) Enterprise. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
