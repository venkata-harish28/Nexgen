import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, ShieldCheck, Bell, CreditCard, Sparkles, ArrowRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      {/* Hero Section with Gradient */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '8rem 2rem',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          filter: 'blur(100px)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-5%',
          width: '400px',
          height: '400px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          filter: 'blur(100px)'
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255,255,255,0.2)',
            padding: '0.5rem 1.5rem',
            borderRadius: '50px',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)'
          }}>
            <Sparkles size={18} />
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Modern Hostel Management</span>
          </div>
          
          <h1 style={{ 
            fontSize: '4.5rem', 
            marginBottom: '1.5rem',
            color: 'white',
            fontWeight: 900,
            letterSpacing: '-3px',
            lineHeight: 1.1
          }}>
            Hostel Management
            <br />
            <span style={{ 
              background: 'linear-gradient(90deg, #ffd89b 0%, #19547b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Made Simple
            </span>
          </h1>
          
          <p style={{ 
            fontSize: '1.35rem', 
            maxWidth: '700px', 
            margin: '0 auto 3.5rem',
            opacity: 0.95,
            fontWeight: 300,
            lineHeight: 1.8
          }}>
            Streamline your hostel operations with our comprehensive management system. 
            Handle tenants, payments, complaints, and more with ease.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn"
              onClick={() => navigate('/tenant-login')}
              style={{ 
                background: 'white',
                color: '#667eea',
                padding: '1.25rem 3rem',
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 15px 50px rgba(0,0,0,0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.15)';
              }}
            >
              <Users size={22} />
              Tenant Portal
              <ArrowRight size={20} />
            </button>
            
            <button 
              className="btn"
              onClick={() => navigate('/owner-login')}
              style={{ 
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '2px solid white',
                padding: '1.25rem 3rem',
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '50px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#667eea';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <ShieldCheck size={22} />
              Owner Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '8rem 2rem', background: '#f8f9fa' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ 
              fontSize: '3rem',
              marginBottom: '1rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Everything You Need
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}>
              Powerful features to manage your hostel efficiently
            </p>
          </div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem'
          }}>
            {[
              {
                icon: Users,
                title: 'Tenant Management',
                description: 'Easily manage tenant information, room assignments, and generate unique access keys.',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              },
              {
                icon: ShieldCheck,
                title: 'Secure Access',
                description: 'Passkey-based authentication ensures only authorized tenants can access their data.',
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              },
              {
                icon: Building2,
                title: 'Multi-Location',
                description: 'Manage multiple hostel locations from a single, unified dashboard.',
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
              },
              {
                icon: Bell,
                title: 'Announcements',
                description: 'Keep tenants informed with instant announcements and notifications.',
                gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
              },
              {
                icon: CreditCard,
                title: 'Payment Tracking',
                description: 'Track all payments, generate receipts, and monitor revenue effortlessly.',
                gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
              },
              {
                icon: Sparkles,
                title: 'Smart Analytics',
                description: 'Get insights with comprehensive reports and dashboard analytics.',
                gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  style={{ 
                    background: 'white',
                    padding: '2.5rem',
                    borderRadius: '24px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.12)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
                  }}
                >
                  <div style={{ 
                    width: '70px', 
                    height: '70px', 
                    background: feature.gradient,
                    borderRadius: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    color: 'white',
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
                  }}>
                    <Icon size={32} />
                  </div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 700 }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#6c757d', lineHeight: 1.8, margin: 0 }}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ 
        padding: '8rem 2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-30%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          filter: 'blur(100px)'
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ 
            marginBottom: '1.5rem', 
            fontSize: '3rem',
            color: 'white',
            fontWeight: 800
          }}>
            Ready to Get Started?
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            Choose your portal to access the system and start managing efficiently
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn"
              onClick={() => navigate('/tenant-login')}
              style={{ 
                background: 'white',
                color: '#667eea',
                padding: '1.25rem 3rem',
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 50px rgba(0,0,0,0.25)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.2)';
              }}
            >
              Tenant Login
            </button>
            <button 
              className="btn"
              onClick={() => navigate('/owner-signup')}
              style={{ 
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '2px solid white',
                padding: '1.25rem 3rem',
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '50px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#667eea';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Owner Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        background: '#1a1a1a',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <Building2 size={40} style={{ marginBottom: '1rem', opacity: 0.8 }} />
        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>
          © 2025 Hostel Management System. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Home;