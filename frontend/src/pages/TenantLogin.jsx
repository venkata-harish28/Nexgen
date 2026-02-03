import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tenantAPI } from '../services/api';
import { Key, LogIn, ArrowLeft, AlertCircle, Sparkles } from 'lucide-react';

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
      // ✅ OWNER LOGIN - Check FIRST and set required tokens
      if (passkey === '7989578208' || passkey === '799595964') {
        // Store mock owner data to prevent redirect
        const mockOwnerData = {
          id: 'owner-quick-access',
          name: 'Owner',
          email: 'owner@hostel.com',
          username: 'owner'
        };
        
        localStorage.setItem('role', 'owner');
        localStorage.setItem('ownerToken', 'mock-token-' + passkey); // Add token
        localStorage.setItem('ownerData', JSON.stringify(mockOwnerData)); // Add owner data
        
        navigate('/owner-dashboard');
        setLoading(false);
        return;
      }

      // ✅ TENANT LOGIN - Only called if not owner phone number
      const response = await tenantAPI.login(passkey);
      if (response.data.success) {
        localStorage.setItem('role', 'tenant');
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
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
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
        background: 'rgba(255,255,255,0.15)',
        borderRadius: '50%',
        filter: 'blur(100px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'rgba(255,255,255,0.15)',
        borderRadius: '50%',
        filter: 'blur(100px)'
      }} />
      
      <div style={{ 
        background: 'white',
        borderRadius: '24px',
        padding: '3rem',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 25px 80px rgba(0,0,0,0.15)',
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
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: 'white',
            boxShadow: '0 8px 24px rgba(79, 172, 254, 0.4)',
            position: 'relative'
          }}>
            <Key size={36} />
            <div style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              width: '24px',
              height: '24px',
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid white'
            }}>
              <Sparkles size={12} />
            </div>
          </div>
          <h2 style={{ marginBottom: '0.5rem', fontSize: '2rem', fontWeight: 700 }}>Tenant Portal</h2>
          <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>Enter your passkey to access your account</p>
        </div>

        {error && (
          <div style={{ 
            background: '#fee',
            border: '1px solid #fcc',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: '#c33'
          }}>
            <AlertCircle size={20} />
            <span style={{ fontSize: '0.9rem' }}>{error}</span>
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
              Passkey
            </label>
            <input
              type="text"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value.toUpperCase())}
              placeholder="HST-XXXXXXXX"
              required
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                borderRadius: '12px',
                border: '2px solid #e1e8ed',
                fontSize: '1rem',
                fontFamily: 'monospace',
                fontWeight: 600,
                letterSpacing: '1px',
                transition: 'all 0.3s',
                outline: 'none',
                textAlign: 'center'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4facfe';
                e.target.style.background = '#f8f9fa';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e1e8ed';
                e.target.style.background = 'white';
              }}
            />
            <small style={{ 
              color: '#6c757d', 
              fontSize: '0.85rem', 
              marginTop: '0.5rem', 
              display: 'block',
              textAlign: 'center'
            }}>
              Your unique passkey provided by hostel administration
            </small>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 16px rgba(79, 172, 254, 0.4)',
              opacity: loading ? 0.7 : 1
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(79, 172, 254, 0.5)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(79, 172, 254, 0.4)';
            }}
          >
            <LogIn size={20} />
            {loading ? 'Logging in...' : 'Access Portal'}
          </button>
        </form>

        <div style={{ 
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: '12px'
        }}>
          <p style={{ fontSize: '0.9rem', color: '#6c757d', marginBottom: '0.75rem', fontWeight: 600 }}>
            Security Tips:
          </p>
          <ul style={{ 
            fontSize: '0.85rem',
            color: '#6c757d',
            paddingLeft: '1.25rem',
            margin: 0,
            lineHeight: 1.8
          }}>
            <li>Your passkey is unique and confidential</li>
            <li>Never share your passkey with anyone</li>
            <li>Contact administration if passkey is lost</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TenantLogin;