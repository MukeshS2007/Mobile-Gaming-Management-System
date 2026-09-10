import React from 'react';
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
  Star
} from 'lucide-react';

export default function LandingPage({ onGoLogin, onGoApp }) {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#1e293b' }}>
      {/* Top Navigation */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #f1f5f9',
        padding: '16px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 1380,
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={onGoApp}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: '#6366f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
            }}>
              <Gamepad2 size={22} />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              MGMS
            </span>
          </div>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: '0.88rem', fontWeight: 500, color: '#64748b' }}>
            <span style={{ cursor: 'pointer', hover: { color: '#0f172a' } }}>Solutions</span>
            <span style={{ cursor: 'pointer' }}>Platform</span>
            <span style={{ cursor: 'pointer' }}>Pricing</span>
            <span style={{ cursor: 'pointer' }}>Community</span>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button 
            onClick={onGoLogin}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.88rem',
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer',
              padding: '8px 16px'
            }}
          >
            Sign In
          </button>
          <button 
            onClick={onGoApp}
            className="btn btn-primary"
            style={{ borderRadius: 'var(--radius-full)', padding: '9px 20px' }}
          >
            <span>Open Console</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '70px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <h1 style={{
            fontSize: '3.6rem',
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            marginBottom: 20
          }}>
            Power Your Mobile Game Operations <span style={{ color: '#6366f1' }}>At Scale</span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: '#64748b',
            lineHeight: 1.65,
            maxWidth: 720,
            margin: '0 auto 36px auto'
          }}>
            The only all-in-one management suite designed for high-performance mobile games. Manage players, analyze real-time economy, track and orchestrate global live events from a single, high-fidelity dashboard.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 44 }}>
            <button 
              onClick={onGoApp} 
              className="btn btn-primary" 
              style={{ padding: '14px 28px', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}
            >
              Get Started Free
            </button>
            <button 
              onClick={onGoApp} 
              className="btn btn-secondary" 
              style={{ padding: '14px 28px', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}
            >
              View Demo
            </button>
          </div>

          {/* Social Proof */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontSize: '0.85rem', color: '#64748b' }}>
            <div style={{ display: 'flex', marginLeft: 8 }}>
              {['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
                'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=60&h=60&fit=crop',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop'].map((src, i) => (
                <img 
                  key={i} 
                  src={src} 
                  alt="avatar" 
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: '2px solid white',
                    marginLeft: i > 0 ? -8 : 0,
                    objectFit: 'crop'
                  }} 
                />
              ))}
            </div>
            <span><b>300+ AAA game studios</b> worldwide powering 50+ global mobile titles</span>
          </div>
        </div>

        {/* Hero Preview Card */}
        <div style={{
          marginTop: 60,
          background: '#ffffff',
          borderRadius: 24,
          padding: 24,
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)',
          position: 'relative'
        }}>
          <div style={{
            background: '#f8fafc',
            borderRadius: 16,
            padding: 36,
            border: '1px solid #e2e8f0',
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div>
              <span className="badge badge-purple" style={{ marginBottom: 12 }}>SYSTEM TELEMETRY ENGINE</span>
              <h3 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: 8 }}>Vanguard Mobile Ops Hub</h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', maxWidth: 460 }}>
                Synchronized across Google Play, Apple App Store, and Direct backend servers with sub-100ms telemetry ingress.
              </p>
            </div>

            <div style={{
              background: '#ffffff',
              padding: '16px 24px',
              borderRadius: 16,
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>CONCURRENT ACTIVE PLAYERS</div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#6366f1', fontFamily: 'Outfit' }}>12.8M</div>
              <div style={{ fontSize: '0.74rem', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <Activity size={12} /> Live Across 84 Regions
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid: Enterprise Tools for Elite Game Studios */}
      <section style={{ background: '#f8fafc', padding: '90px 24px', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>
              Enterprise Tools for Elite Game Studios
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: 640, margin: '0 auto' }}>
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
                <div key={i} className="mgms-card" style={{ padding: 28, background: '#ffffff' }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#eef2ff',
                    color: '#6366f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 18
                  }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section style={{ padding: '60px 24px', background: '#ffffff' }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '2.6rem', fontWeight: 800, color: '#6366f1', fontFamily: 'Outfit' }}>450M+</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>TOTAL PLAYERS MANAGED</div>
          </div>
          <div>
            <div style={{ fontSize: '2.6rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit' }}>$2.4B</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>TRANSACTIONS PROCESSED</div>
          </div>
          <div>
            <div style={{ fontSize: '2.6rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit' }}>1,200+</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>GAME TITLES SUPPORTED</div>
          </div>
          <div>
            <div style={{ fontSize: '2.6rem', fontWeight: 800, color: '#10b981', fontFamily: 'Outfit' }}>99.99%</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>GLOBAL SERVER UPTIME</div>
          </div>
        </div>
      </section>

      {/* Virtual Economy Section */}
      <section style={{ padding: '80px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div className="mgms-card" style={{ padding: 32, background: '#ffffff', borderRadius: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span className="badge badge-purple">LIVE ECONOMY SIMULATOR</span>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Realtime Synced</span>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Outfit', color: '#059669', marginBottom: 4 }}>
              $142,890.00
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: 24 }}>Daily Gross Volume (+14.2% vs 7D Avg)</div>
            
            {/* Bars simulation */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
              {[40, 65, 55, 80, 70, 95, 85, 100, 90, 110].map((h, i) => (
                <div key={i} style={{ flex: 1, background: '#e0e7ff', height: `${h}%`, borderRadius: '4px 4px 0 0', position: 'relative' }}>
                  <div style={{ width: '100%', height: `${Math.min(100, h * 0.7)}%`, background: '#6366f1', borderRadius: '4px 4px 0 0' }} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="badge badge-purple" style={{ marginBottom: 12 }}>MONETIZATION ENGINE</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
              Master Your Game's Virtual Economy
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: 24 }}>
              Avoid hyperinflation and predict revenue spikes with our economy simulation tools. Model different drop rates, IAP price points, and seasonal rewards before you push them live.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                'Automated anomaly alerts for currency duplication',
                'A/B testing for In-App Purchase pricing tiers',
                'Direct export to financial reporting tools',
                'Predictive ARPU modeling using Machine Learning'
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.92rem', color: '#334155' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner: Purple Gradient */}
      <section style={{ maxWidth: 1200, margin: '80px auto', padding: '0 24px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)',
          borderRadius: 24,
          padding: '60px 40px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.4)'
        }}>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 800, color: 'white', marginBottom: 14 }}>
            Ready to Take Your Game to the Next Level?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.85)', maxWidth: 580, margin: '0 auto 32px auto' }}>
            Join the top studios managing the future of mobile entertainment. Start your 14-day full-access trial today. No credit card required.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
            <button onClick={onGoApp} style={{
              background: '#ffffff',
              color: '#4f46e5',
              padding: '12px 28px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer'
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
              border: '1px solid rgba(255, 255, 255, 0.3)',
              cursor: 'pointer'
            }}>
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '60px 40px 40px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <Gamepad2 size={18} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>MGMS</span>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#64748b', maxWidth: 300, lineHeight: 1.6 }}>
              The next generation of mobile game operations. High-fidelity analytics, live ops management, and virtual economy governance.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a', marginBottom: 14, textTransform: 'uppercase' }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.84rem', color: '#64748b' }}>
              <span>Live Ops Engine</span>
              <span>Virtual Economy</span>
              <span>Player CRM</span>
              <span>SDK Downloads</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a', marginBottom: 14, textTransform: 'uppercase' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.84rem', color: '#64748b' }}>
              <span>About Us</span>
              <span>Customers</span>
              <span>Careers</span>
              <span>Legal & Privacy</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a', marginBottom: 14, textTransform: 'uppercase' }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.84rem', color: '#64748b' }}>
              <span>Documentation</span>
              <span>API Reference</span>
              <span>System Status</span>
              <span>Support Portal</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 24, textAlign: 'center', fontSize: '0.78rem', color: '#94a3b8' }}>
          © 2026 Mobile Gaming Management System (MGMS) Enterprise. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
