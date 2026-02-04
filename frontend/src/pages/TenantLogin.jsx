import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tenantAPI, ownerAPI } from '../services/api';
import { Key, ArrowLeft, Home, ShieldCheck } from 'lucide-react';

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
      // Check if input is a phone number for owner login
      if (/^[0-9]{10}$/.test(passkey)) {
        console.log('[OWNER LOGIN] Phone number detected:', passkey);
        
        // Try owner phone login
        if (passkey === '7989578208' || passkey === '7995959645') {
          console.log('[OWNER LOGIN] Valid phone number, logging in as owner');
          const response = await ownerAPI.loginWithPhone(passkey);
          
          if (response.data.success) {
            console.log('[OWNER LOGIN] Success, token:', response.data.token);
            localStorage.setItem('ownerToken', response.data.token);
            localStorage.setItem('ownerData', JSON.stringify(response.data.owner));
            navigate('/owner-dashboard');
            return;
          }
        }
      }
      
      // Otherwise try tenant login
      console.log('[TENANT LOGIN] Attempting tenant login with passkey');
      const response = await tenantAPI.login(passkey);
      
      if (response.data.success) {
        console.log('[TENANT LOGIN] Success');
        localStorage.setItem('tenantPasskey', passkey);
        localStorage.setItem('tenantData', JSON.stringify(response.data.tenant));
        navigate('/tenant-dashboard');
      }
    } catch (err) {
      console.error('[LOGIN] Error:', err);
      setError(err.response?.data?.message || 'Invalid passkey or phone number');
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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '500px',
        height: '500px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        filter: 'blur(100px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        filter: 'blur(100px)'
      }} />
      
      <div style={{ 
        background: 'white',
        borderRadius: '24px',
        padding: '3rem',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 25px 80px rgba(0,0,0,0.2)',
        position: 'relative',
        zIndex: 1
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
            padding: 0,
            transition: 'color 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#1a1a1a'}
          onMouseOut={(e) => e.currentTarget.style.color = '#6c757d'}
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: 'white',
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
          }}>
            <Home size={36} />
          </div>
          <h2 style={{ marginBottom: '0.5rem', fontSize: '2rem', fontWeight: 700 }}>Welcome Back</h2>
          <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>Enter your passkey or phone number to continue</p>
        </div>

        {error && (
          <div style={{ 
            background: '#fee',
            border: '1px solid #fcc',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.5rem',
            color: '#c33',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: '#1a1a1a'
            }}>
              <Key size={16} />
              Passkey or Phone Number
            </label>
            <input
              type="text"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              placeholder="Enter HST-XXXXXXXX "
              required
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                borderRadius: '12px',
                border: '2px solid #e1e8ed',
                fontSize: '0.95rem',
                transition: 'all 0.3s',
                outline: 'none',
                fontFamily: 'monospace',
                letterSpacing: '0.5px'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
            />
            <p style={{ fontSize: '0.85rem', color: '#6c757d', marginTop: '0.5rem' }}>
              Tenants: Use your HST passkey | Owners: Use phone (7989578208 or 7995959645)
            </p>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)',
              opacity: loading ? 0.7 : 1
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(102, 126, 234, 0.5)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(102, 126, 234, 0.4)';
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ 
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <ShieldCheck size={18} className="text-gray-600" />
            <p style={{ fontSize: '0.9rem', color: '#6c757d', fontWeight: 600, margin: 0 }}>
              Secure Login
            </p>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#6c757d', margin: 0 }}>
            Your data is encrypted and protected
          </p>
        </div>
      </div>
    </div>
  );
};

export default TenantLogin;