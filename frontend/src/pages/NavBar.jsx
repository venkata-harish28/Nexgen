import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      style={{
        background: 'transparent',
        backdropFilter: 'blur(10px)',
        padding: '1rem 2rem',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderBottom: 'none'
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* 🔹 LOGO (Click → Home) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
          onMouseOver={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <img
            src="/logo.png"
            alt="NextGen Logo"
            style={{
              height: '80px',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* 🔹 NAV LINKS */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <button
            onClick={() => navigate('/pages/about')}
            style={navButtonStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = '#22c55e')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#ffffff')}
          >
            About
          </button>

          

          <button
            onClick={() => navigate('/pages/contact')}
            style={navButtonStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = '#22c55e')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#ffffff')}
          >
            Contact
          </button>
        </div>

        {/* 🔹 LOGIN BUTTON */}
        <button
          onClick={() => navigate('/tenant-login')}
          style={{
            background: '#22c55e',
            color: '#ffffff',
            border: '2px solid #22c55e',
            borderRadius: '50px',
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s',
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 20px rgba(34,197,94,0.35)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#16a34a';
            e.currentTarget.style.borderColor = '#16a34a';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#22c55e';
            e.currentTarget.style.borderColor = '#22c55e';
          }}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

/* 🔹 Shared nav button style */
const navButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#ffffff',
  fontWeight: 500,
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'color 0.3s',
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
};

export default Navbar;
