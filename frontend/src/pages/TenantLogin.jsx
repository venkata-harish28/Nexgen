import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tenantAPI } from '../services/api';
import { Key, LogIn, ArrowLeft, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';

const TenantLogin = () => {
  const [passkey, setPasskey] = useState('');
  const [role, setRole] = useState('tenant'); // 'tenant' or 'owner'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (role === 'owner') {
        // ✅ OWNER LOGIN - Check phone number
        if (passkey === '7989578208' || passkey === '7995959645') {
          console.log('[OWNER LOGIN] Valid phone number, creating session');
          
          // Store mock owner data to prevent redirect
          const mockOwnerData = {
            id: 'owner-quick-access',
            name: 'Owner',
            email: 'owner@hostel.com',
            username: 'owner'
          };
          
          // Clear any existing data first
          localStorage.removeItem('tenantPasskey');
          localStorage.removeItem('tenantData');
          
          // Set owner data
          localStorage.setItem('role', 'owner');
          localStorage.setItem('ownerToken', 'mock-token-' + passkey);
          localStorage.setItem('ownerData', JSON.stringify(mockOwnerData));
          
          console.log('[OWNER LOGIN] Session created, redirecting to dashboard');
          console.log('[OWNER LOGIN] Token:', localStorage.getItem('ownerToken'));
          console.log('[OWNER LOGIN] Data:', localStorage.getItem('ownerData'));
          
          // Use replace to prevent back button issues
          navigate('/owner-dashboard', { replace: true });
          setLoading(false);
          return;
        } else {
          setError('Invalid owner phone number. Please use the correct number.');
          setLoading(false);
          return;
        }
      }

      // ✅ TENANT LOGIN
      console.log('[TENANT LOGIN] Attempting login with passkey');
      const response = await tenantAPI.login(passkey);
      
      if (response.data.success) {
        console.log('[TENANT LOGIN] Success, creating session');
        
        // Clear any existing owner data
        localStorage.removeItem('ownerToken');
        localStorage.removeItem('ownerData');
        
        // Set tenant data
        localStorage.setItem('role', 'tenant');
        localStorage.setItem('tenantPasskey', passkey);
        localStorage.setItem('tenantData', JSON.stringify(response.data.tenant));
        
        console.log('[TENANT LOGIN] Session created, redirecting to dashboard');
        navigate('/tenant-dashboard', { replace: true });
      }
    } catch (err) {
      console.error('[LOGIN ERROR]:', err);
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
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
      background: role === 'owner' 
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background 0.5s ease'
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

        {/* Role Selector */}
        <div style={{ 
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          padding: '0.5rem',
          background: '#f8f9fa',
          borderRadius: '12px'
        }}>
          <button
            type="button"
            onClick={() => {
              setRole('tenant');
              setPasskey('');
              setError('');
            }}
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: '8px',
              border: 'none',
              background: role === 'tenant' 
                ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                : 'transparent',
              color: role === 'tenant' ? 'white' : '#6c757d',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <Key size={18} />
            Tenant
          </button>
          <button
            type="button"
            onClick={() => {
              setRole('owner');
              setPasskey('');
              setError('');
            }}
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: '8px',
              border: 'none',
              background: role === 'owner' 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'transparent',
              color: role === 'owner' ? 'white' : '#6c757d',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <ShieldCheck size={18} />
            Owner
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            width: '80px',
            height: '80px',
            background: role === 'owner'
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: 'white',
            boxShadow: role === 'owner'
              ? '0 8px 24px rgba(102, 126, 234, 0.4)'
              : '0 8px 24px rgba(79, 172, 254, 0.4)',
            position: 'relative',
            transition: 'all 0.5s ease'
          }}>
            {role === 'owner' ? <ShieldCheck size={36} /> : <Key size={36} />}
            {role === 'tenant' && (
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
            )}
          </div>
          <h2 style={{ marginBottom: '0.5rem', fontSize: '2rem', fontWeight: 700 }}>
            {role === 'owner' ? 'Owner Portal' : 'Tenant Portal'}
          </h2>
          <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>
            {role === 'owner' 
              ? 'Enter your phone number to access dashboard'
              : 'Enter your passkey to access your account'
            }
          </p>
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
              {role === 'owner' ? <ShieldCheck size={16} /> : <Key size={16} />}
              {role === 'owner' ? 'Phone Number' : 'Passkey'}
            </label>
            <input
              type="text"
              value={passkey}
              onChange={(e) => setPasskey(role === 'tenant' ? e.target.value.toUpperCase() : e.target.value)}
              placeholder={role === 'owner' ? '7989578208 or 7995959645' : 'HST-XXXXXXXX'}
              required
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                borderRadius: '12px',
                border: '2px solid #e1e8ed',
                fontSize: '1rem',
                fontFamily: role === 'tenant' ? 'monospace' : 'inherit',
                fontWeight: 600,
                letterSpacing: role === 'tenant' ? '1px' : 'normal',
                transition: 'all 0.3s',
                outline: 'none',
                textAlign: 'center'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = role === 'owner' ? '#667eea' : '#4facfe';
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
              {role === 'owner' 
                ? 'Use your registered phone number'
                : 'Your unique passkey provided by hostel administration'
              }
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
              background: role === 'owner'
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: role === 'owner'
                ? '0 4px 16px rgba(102, 126, 234, 0.4)'
                : '0 4px 16px rgba(79, 172, 254, 0.4)',
              opacity: loading ? 0.7 : 1
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = role === 'owner'
                  ? '0 6px 24px rgba(102, 126, 234, 0.5)'
                  : '0 6px 24px rgba(79, 172, 254, 0.5)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = role === 'owner'
                ? '0 4px 16px rgba(102, 126, 234, 0.4)'
                : '0 4px 16px rgba(79, 172, 254, 0.4)';
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
          {role === 'owner' ? (
            <>
              <p style={{ fontSize: '0.9rem', color: '#6c757d', marginBottom: '0.75rem', fontWeight: 600 }}>
                Owner Access:
              </p>
              <ul style={{ 
                fontSize: '0.85rem',
                color: '#6c757d',
                paddingLeft: '1.25rem',
                margin: 0,
                lineHeight: 1.8
              }}>
                <li>Use registered phone number to login</li>
                <li>Access full dashboard and management tools</li>
                <li>Or use regular <button
                  onClick={() => navigate('/owner-login')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#667eea',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    padding: 0
                  }}
                >
                  username/password login
                </button></li>
              </ul>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantLogin;