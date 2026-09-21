import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { X, Lock, Mail, User, Calendar, Globe, AlertTriangle, CheckCircle } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const navigate = useNavigate();
  const { login, register, addToast } = useAuth();
  const [tab, setTab] = useState('login'); // 'login' | 'register' | 'reset'
  const [loading, setLoading] = useState(false);

  // Login Form
  const [loginCred, setLoginCred] = useState('');
  const [loginPass, setLoginPass] = useState('');

  // Register Form
  const [regUser, setRegUser] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regDob, setRegDob] = useState('2002-05-15');
  const [regCountry, setRegCountry] = useState('IN');
  const [regFirst, setRegFirst] = useState('');
  const [regLast, setRegLast] = useState('');
  const [parentalConsent, setParentalConsent] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);

  // Reset Form
  const [resetEmail, setResetEmail] = useState('');
  const [resetPass, setResetPass] = useState('');

  if (!isOpen) return null;

  // Calculate age from dateOfBirth
  const getAge = (dobString) => {
    if (!dobString) return 20;
    const dob = new Date(dobString);
    const diffMs = Date.now() - dob.getTime();
    const ageDate = new Date(diffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const isUnder13 = getAge(regDob) < 13;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginCred, loginPass);
      onClose();
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/dashboard');
      }
    } catch {
      // toast shown in context
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const usernameRegex = /^[A-Za-z0-9_]{3,20}$/;
    if (!usernameRegex.test(regUser)) {
      addToast('Username must be 3-20 characters (letters, numbers, or underscore)', 'error');
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(regPass)) {
      addToast('Password must be at least 8 characters and include uppercase, lowercase, a digit, and a special symbol (e.g. Mukesh@2026)', 'error');
      return;
    }
    if (!privacyConsent) {
      addToast('You must accept the Privacy Policy to create an account', 'error');
      return;
    }
    if (isUnder13 && !parentalConsent) {
      addToast('Under 13 players require verified parental consent', 'error');
      return;
    }
    setLoading(true);
    try {
      await register({
        username: regUser,
        email: regEmail,
        password: regPass,
        dateOfBirth: regDob,
        country: regCountry,
        parentalConsent: isUnder13 ? parentalConsent : false,
        privacyConsent,
        marketingConsent,
        firstName: regFirst,
        lastName: regLast
      });
      onClose();
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/dashboard');
      }
    } catch {
      // toast shown in context
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.auth.passwordReset({ email: resetEmail, newPassword: resetPass });
      addToast('Password has been successfully updated. You can now log in.', 'success');
      setTab('login');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => setTab('login')}
              className={`btn btn-sm ${tab === 'login' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('register')}
              className={`btn btn-sm ${tab === 'register' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Create Account
            </button>
            <button
              onClick={() => setTab('reset')}
              className={`btn btn-sm ${tab === 'reset' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Reset Pass
            </button>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {tab === 'login' && (
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 18 }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: 4 }}>Welcome to NEXUS</h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  Sign in with your player handle or email address.
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">Username or Email</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. player_one or admin"
                    value={loginCred}
                    onChange={(e) => setLoginCred(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  required
                  className="form-input"
                  placeholder="••••••••••••"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 14 }}
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>

              <div style={{ marginTop: 14, textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                Forgot password? Click <b>Reset Pass</b> above.
              </div>
            </form>
          )}

          {tab === 'register' && (
            <form onSubmit={handleRegister}>
              <div style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: 4 }}>Player Registration</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Create an account to join tournaments, track progression, and earn achievements.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="gamer_tag"
                    value={regUser}
                    onChange={(e) => setRegUser(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="gamer@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  required
                  className="form-input"
                  placeholder="Min 8 chars, 1 uppercase, 1 symbol, 1 digit"
                  value={regPass}
                  onChange={(e) => setRegPass(e.target.value)}
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  Policy: At least 8 chars, uppercase, lowercase, digit, and special symbol (e.g. StrongPass#2026).
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={regDob}
                    onChange={(e) => setRegDob(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Country (ISO)</label>
                  <input
                    type="text"
                    maxLength={2}
                    className="form-input"
                    placeholder="IN, US, UK..."
                    value={regCountry}
                    onChange={(e) => setRegCountry(e.target.value.toUpperCase())}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">First Name (Optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={regFirst}
                    onChange={(e) => setRegFirst(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name (Optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={regLast}
                    onChange={(e) => setRegLast(e.target.value)}
                  />
                </div>
              </div>

              {isUnder13 && (
                <div style={{
                  padding: 10,
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 12
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--warning)', fontSize: '0.82rem', fontWeight: 600 }}>
                    <AlertTriangle size={16} />
                    <span>COPPA Age Notice (Under 13)</span>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', marginTop: 6, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={parentalConsent}
                      onChange={(e) => setParentalConsent(e.target.checked)}
                    />
                    <span>I confirm I have parental / guardian consent to register.</span>
                  </label>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                  />
                  <span>I agree to the Privacy Policy & Data Terms (GDPR/COPPA)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  <input
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                  />
                  <span>Receive game news, live ops events & seasonal rewards</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                {loading ? 'Creating Account...' : 'Register Account'}
              </button>
            </form>
          )}

          {tab === 'reset' && (
            <form onSubmit={handleReset}>
              <div style={{ marginBottom: 18 }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: 4 }}>Reset Password</h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  Enter your registered email and choose a strong new password.
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">Registered Email</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  placeholder="player@example.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  required
                  className="form-input"
                  placeholder="StrongPass#2026"
                  value={resetPass}
                  onChange={(e) => setResetPass(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 14 }}
              >
                {loading ? 'Updating Password...' : 'Update Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
