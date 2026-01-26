import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tenantAPI } from '../services/api';
import { Key, LogIn, ArrowLeft } from 'lucide-react';

const TenantLogin = () => {
  const [passkey, setPasskey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await tenantAPI.login(passkey);
      if (response.data.success) {
        localStorage.setItem('tenantPasskey', passkey);
        localStorage.setItem('tenantData', JSON.stringify(response.data.tenant));
        navigate('/tenant-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid passkey. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      padding: '2rem'
    }}>
      <div style={{ 
        background: 'white',
        borderRadius: '16px',
        padding: '3rem',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
      }}>
        <button 
          onClick={() => navigate('/')}
          style={{ 
            background: 'transparent',
            border: 'none',
            color: '#6c757d',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.95rem',
            padding: 0
          }}
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            width: '70px',
            height: '70px',
            background: '#1a1a1a',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: 'white'
          }}>
            <Key size={32} />
          </div>
          <h2 style={{ marginBottom: '0.5rem' }}>Tenant Portal</h2>
          <p style={{ color: '#6c757d' }}>Enter your passkey to access your account</p>
        </div>

        {error && (
          <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="passkey">Passkey</label>
            <input
              type="text"
              id="passkey"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value.toUpperCase())}
              placeholder="Enter your passkey (e.g., HST-XXXXXXXX)"
              required
              style={{ fontFamily: 'monospace', fontSize: '1rem' }}
            />
            <small style={{ color: '#6c757d', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block' }}>
              Your passkey was provided by the hostel administration
            </small>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
            style={{ 
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              justifyContent: 'center'
            }}
          >
            <LogIn size={20} />
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ 
          marginTop: '2rem',
          padding: '1.5rem',
          background: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <p style={{ fontSize: '0.9rem', color: '#6c757d', marginBottom: '0.75rem' }}>
            <strong>Note:</strong>
          </p>
          <ul style={{ 
            fontSize: '0.85rem',
            color: '#6c757d',
            paddingLeft: '1.25rem',
            margin: 0
          }}>
            <li>Your passkey is unique to you</li>
            <li>Do not share your passkey with anyone</li>
            <li>Contact administration if you lost your passkey</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TenantLogin;