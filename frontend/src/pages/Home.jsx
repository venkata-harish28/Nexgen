import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, ShieldCheck } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        padding: '6rem 2rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container">
          <Building2 size={80} style={{ marginBottom: '2rem', opacity: 0.9 }} />
          <h1 style={{ 
            fontSize: '4rem', 
            marginBottom: '1.5rem',
            color: 'white',
            fontWeight: 900,
            letterSpacing: '-2px'
          }}>
            Hostel Management
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            maxWidth: '700px', 
            margin: '0 auto 3rem',
            opacity: 0.9,
            fontWeight: 300,
            lineHeight: 1.8
          }}>
            Streamline your hostel operations with our comprehensive management system. 
            Handle tenants, payments, complaints, and more with ease.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/tenant-login')}
              style={{ 
                background: 'white',
                color: '#1a1a1a',
                padding: '1rem 2.5rem',
                fontSize: '1.1rem'
              }}
            >
              <Users size={20} />
              Tenant Portal
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/owner-login')}
              style={{ 
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '1rem 2.5rem',
                fontSize: '1.1rem'
              }}
            >
              <ShieldCheck size={20} />
              Owner Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '6rem 2rem', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '4rem',
            fontSize: '2.5rem'
          }}>
            Everything You Need
          </h2>
          <div className="grid grid-3" style={{ gap: '3rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: '#1a1a1a',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white'
              }}>
                <Users size={36} />
              </div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Tenant Management</h3>
              <p style={{ color: '#6c757d', lineHeight: 1.8 }}>
                Easily manage tenant information, room assignments, and generate unique access keys.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: '#27ae60',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white'
              }}>
                <ShieldCheck size={36} />
              </div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Secure Access</h3>
              <p style={{ color: '#6c757d', lineHeight: 1.8 }}>
                Passkey-based authentication ensures only authorized tenants can access their data.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: '#3498db',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white'
              }}>
                <Building2 size={36} />
              </div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Multi-Location Support</h3>
              <p style={{ color: '#6c757d', lineHeight: 1.8 }}>
                Manage multiple hostel locations from a single, unified dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ 
        padding: '6rem 2rem',
        background: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ marginBottom: '1.5rem', fontSize: '2.5rem' }}>
            Ready to Get Started?
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#6c757d',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Choose your portal to access the system
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/tenant-login')}
              style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}
            >
              Tenant Login
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/owner-login')}
              style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}
            >
              Owner Login
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        background: '#1a1a1a',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>
          © 2025 Hostel Management System. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Home;