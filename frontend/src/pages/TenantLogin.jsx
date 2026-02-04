import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tenantAPI, ownerAPI } from '../services/api';

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
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-white/95 z-10"></div>
        <img 
          src="/build.png"
          alt="NextGen Building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center p-12">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-teal-500/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 border-4 border-teal-500">
                <svg className="w-16 h-16 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Welcome to NextGen!</h1>
            <p className="text-lg text-gray-700 max-w-md mx-auto leading-relaxed">
              Your perfect home away from home. Experience comfortable living with modern amenities and a vibrant community.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome to NextGen!</h2>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 hidden lg:block">Sign In</h2>
            <p className="text-gray-600">
              Enter your passkey to access your account
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Passkey Form */}
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              
              <input
                type="text"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter HST-XXXXXXXX "
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
              />
              
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-teal-500 hover:text-teal-600 font-medium text-sm"
            >
              ← Back to Home
            </button>
          </div>

          {/* Security Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-sm text-gray-600 font-semibold">
                Secure Login
              </p>
            </div>
            <p className="text-xs text-gray-500">
              Your data is encrypted and protected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantLogin;