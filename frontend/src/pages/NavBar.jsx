import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Home, Info, Mail, LogIn } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll to add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: Home, showOnDesktop: false },
    { path: '/pages/about', label: 'About', icon: Info, showOnDesktop: true },
    { path: '/pages/contact', label: 'Contact', icon: Mail, showOnDesktop: true },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer flex-shrink-0 z-50"
              onClick={() => handleNavClick('/')}
            >
              <img
                src="/logo.png"
                alt="NextGen Logo"
                className="h-10 sm:h-14 md:h-16 lg:h-20 w-auto object-contain transition-all hover:scale-105"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
              {navLinks
                .filter((link) => link.showOnDesktop)
                .map((link) => (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`relative px-4 py-2 font-medium text-sm lg:text-base transition-all duration-300 ${
                      isActivePath(link.path)
                        ? 'text-green-600'
                        : 'text-gray-700 hover:text-green-500'
                    }`}
                  >
                    {link.label}
                    {isActivePath(link.path) && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-full" />
                    )}
                  </button>
                ))}

              {/* Desktop Login Button */}
              <button
                onClick={() => handleNavClick('/tenant-login')}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-4 lg:px-6 py-2 lg:py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 text-sm lg:text-base"
              >
                <LogIn size={18} className="hidden lg:block" />
                <span>Login</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors z-50"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer - Slide from Right */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-72 sm:w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <img
              src="/logo.png"
              alt="NextGen Logo"
              className="h-12 sm:h-14 w-auto object-contain"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} className="text-gray-700" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 ${
                      isActivePath(link.path)
                        ? 'bg-green-50 text-green-600 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-base">{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Login Button */}
            <button
              onClick={() => handleNavClick('/tenant-login')}
              className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <LogIn size={20} />
              <span>Login to Account</span>
            </button>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border border-green-100">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                Need Help?
              </h3>
              <p className="text-xs text-gray-600 mb-3">
                Contact us for any queries or support
              </p>
              <button
                onClick={() => handleNavClick('/pages/contact')}
                className="w-full px-4 py-2 bg-white hover:bg-gray-50 text-green-600 font-medium rounded-lg transition-colors text-sm border border-green-200"
              >
                Contact Support
              </button>
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">
                © 2025 NextGen Hostels
              </p>
              <p className="text-xs text-gray-400">
                Your home away from home
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;