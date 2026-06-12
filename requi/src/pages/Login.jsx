import React, { useState } from 'react';
import { login } from '../services/api';




const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState(""); // Default email for easy preview
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
        await getCSRFToken();

        const response = await login({
            email,
            password,
        });

        // login success
    } catch (error) {
        console.error(error);
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const data = await login(email, password);

      onLoginSuccess(data.user);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Authentication failed."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', fontFamily: 'Inter, sans-serif' }}>
      {/* Left Column (Brand Presentation) */}
      <div style={{ width: '45%', backgroundColor: '#111827', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '80px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#16a34a', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', fontSize: '24px', marginRight: '16px', borderRadius: '4px' }}>N</div>
            <div>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>Naipunnya</div>
              <div style={{ color: '#9ca3af', fontSize: '14px' }}>Digital Requisition</div>
            </div>
          </div>
          <h1 style={{ color: 'white', fontSize: '48px', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '24px' }}>Streamline Your Institutional Requests</h1>
          <p style={{ color: '#9ca3af', fontSize: '18px', lineHeight: '1.6' }}>The centralized platform for faculty, departments, and clubs to request materials, funds, and approvals with real-time tracking.</p>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          <div>
            <div style={{ color: '#4ade80', fontSize: '24px', fontWeight: 'bold' }}>1,284</div>
            <div style={{ color: '#9ca3af', fontSize: '14px' }}>Total Requisitions</div>
          </div>
          <div>
            <div style={{ color: '#4ade80', fontSize: '24px', fontWeight: 'bold' }}>91.4%</div>
            <div style={{ color: '#9ca3af', fontSize: '14px' }}>Approval Rate</div>
          </div>
          <div>
            <div style={{ color: '#4ade80', fontSize: '24px', fontWeight: 'bold' }}>2.4d</div>
            <div style={{ color: '#9ca3af', fontSize: '14px' }}>Avg. Processing</div>
          </div>
        </div>
      </div>

      {/* Right Column (Form Panel) */}
      <div style={{ width: '55%', backgroundColor: '#f5f6fa', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '420px' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#111827' }}>Sign in to your account</h2>
          <p style={{ margin: '0 0 32px 0', color: '#6b7280', fontSize: '14px' }}>Enter your credentials to access the portal</p>

          {error && (
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', padding: '12px 16px', borderRadius: '8px', fontSize: '14px', marginBottom: '20px' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@naipunnya.edu"
                style={{ width: '100%', boxSizing: 'border-box', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }}
              />
              <span style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px', display: 'block' }}>
                💡 Try: admin@naipunnya.edu, staff@naipunnya.edu, management@naipunnya.edu
              </span>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#6b7280', userSelect: 'none' }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#4b5563', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ marginRight: '8px', width: '16px', height: '16px', accentColor: '#16a34a' }} />
                Remember me
              </label>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Please contact the IT helpdesk for password recovery.'); }} style={{ color: '#16a34a', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: '#111827',
                color: 'white',
                border: 'none',
                padding: '14px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'background-color 0.2s'
              }}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>

        <div style={{ position: 'absolute', bottom: '24px', color: '#9ca3af', fontSize: '13px', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '6px' }}>🔒</span> Protected by 2FA · System v2.4.0
        </div>
      </div>
    </div>
  );
};

export default Login;
