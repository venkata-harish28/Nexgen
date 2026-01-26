import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserPlus, ArrowLeft, Mail, Lock, User, AlertCircle } from 'lucide-react';

const OwnerSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/owner/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/owner-login'), 2000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
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
      {/* Animated Background */}
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
        maxWidth: '550px',
        width: '100%',
        boxShadow: '0 25px 80px rgba(0,0,0,0.2)',
        position: 'relative',
        zIndex: 1
      }}>
        <button 
          onClick={() => navigate('/owner-login')}
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
          Back to Login
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
            <ShieldCheck size={36} />
          </div>
          <h2 style={{ marginBottom: '0.5rem', fontSize: '2rem', fontWeight: 700 }}>Create Owner Account</h2>
          <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>Register to manage your hostel properties</p>
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
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div style={{ 
            background: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.5rem',
            color: '#155724',
            textAlign: 'center'
          }}>
            ✓ Registration successful! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: '#1a1a1a'
            }}>
              <User size={16} />
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              required
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                borderRadius: '12px',
                border: '2px solid #e1e8ed',
                fontSize: '0.95rem',
                transition: 'all 0.3s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: '#1a1a1a'
            }}>
              <User size={16} />
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Choose a username"
              required
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                borderRadius: '12px',
                border: '2px solid #e1e8ed',
                fontSize: '0.95rem',
                transition: 'all 0.3s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: '#1a1a1a'
            }}>
              <Mail size={16} />
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                borderRadius: '12px',
                border: '2px solid #e1e8ed',
                fontSize: '0.95rem',
                transition: 'all 0.3s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: '#1a1a1a'
            }}>
              <Lock size={16} />
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Create a password (min. 6 characters)"
              required
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                borderRadius: '12px',
                border: '2px solid #e1e8ed',
                fontSize: '0.95rem',
                transition: 'all 0.3s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
            />
          </div>

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
              <Lock size={16} />
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Confirm your password"
              required
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                borderRadius: '12px',
                border: '2px solid #e1e8ed',
                fontSize: '0.95rem',
                transition: 'all 0.3s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
            />
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
            <UserPlus size={20} />
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ 
          marginTop: '2rem',
          textAlign: 'center',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: '12px'
        }}>
          <p style={{ fontSize: '0.9rem', color: '#6c757d', margin: 0 }}>
            Already have an account?{' '}
            <button
              onClick={() => navigate('/owner-login')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#667eea',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OwnerSignup;