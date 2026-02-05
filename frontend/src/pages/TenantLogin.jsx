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
          
          if (response.success) {
            console.log('[OWNER LOGIN] Success, token:', response.token);
            localStorage.setItem('ownerToken', response.token);
            localStorage.setItem('ownerData', JSON.stringify(response.owner));
            navigate('/owner-dashboard');
            return;
          }
        }
      }
      
      // Otherwise try tenant login
      console.log('[TENANT LOGIN] Attempting tenant login with passkey:', passkey);
      const response = await tenantAPI.login(passkey);
      
      // Check if response exists and has data
      if (!response || !response.data) {
        throw new Error('Invalid response from server');
      }

      const { success, tenant } = response.data;
      
      if (success && tenant) {
        console.log('[TENANT LOGIN] Success - Tenant:', tenant.name, 'Location:', tenant.location);
        localStorage.setItem('tenantPasskey', passkey);
        localStorage.setItem('tenantData', JSON.stringify(tenant));
        navigate('/tenant-dashboard');
      } else {
        setError('Login failed. Please check your passkey.');
      }
    } catch (err) {
      console.error('[LOGIN] Error:', err);
      
      // Handle different error types
      if (err.response) {
        // Server responded with error
        const status = err.response.status;
        const message = err.response.data?.message || 'An error occurred';
        
        if (status === 401) {
          setError('Invalid passkey . Please check and try again.');
        } else if (status === 400) {
          setError(message);
        } else if (status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(message);
        }
      } else if (err.request) {
        // Request made but no response
        setError('Cannot connect to server. Please check your connection and try again.');
      } else {
        // Other errors
        setError(err.message || 'An error occurred. Please try again.');
      }
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
                onChange={(e) => setPasskey(e.target.value.trim())}
                placeholder="Enter HST-XXXXXXXX"
                required
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <p className="mt-2 text-xs text-gray-500">
                Your passkey was provided during registration
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !passkey}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
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

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">
              📝 Test Credentials:
            </p>
            <p className="text-xs text-blue-700">
              Use passkey: <code className="bg-blue-100 px-2 py-1 rounded">HST-TEST1234</code>
            </p>
            <p className="text-xs text-blue-600 mt-2">
              (If you haven't created a test tenant yet, run: <code className="bg-blue-100 px-1 rounded">node seedTestTenant.js</code>)
            </p>
          </div>

          {/* Security Info */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
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