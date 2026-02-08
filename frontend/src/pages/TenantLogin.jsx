import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tenantAPI, ownerAPI } from '../services/api';
import { Home, Lock, ArrowLeft } from 'lucide-react';

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
        if (passkey === '7989578208' || passkey === '7995959645') {
          const response = await ownerAPI.loginWithPhone(passkey);
          
          if (response.success) {
            localStorage.setItem('ownerToken', response.token);
            localStorage.setItem('ownerData', JSON.stringify(response.owner));
            navigate('/owner-dashboard');
            return;
          }
        }
      }
      
      // Otherwise try tenant login
      const response = await tenantAPI.login(passkey);
      
      if (!response || !response.data) {
        throw new Error('Invalid response from server');
      }

      const { success, tenant } = response.data;
      
      if (success && tenant) {
        localStorage.setItem('tenantPasskey', passkey);
        localStorage.setItem('tenantData', JSON.stringify(tenant));
        navigate('/tenant-dashboard');
      } else {
        setError('Login failed. Please check your passkey.');
      }
    } catch (err) {
      console.error('[LOGIN] Error:', err);
      
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message || 'An error occurred';
        
        if (status === 401) {
          setError('Invalid passkey. Please check and try again.');
        } else if (status === 400) {
          setError(message);
        } else if (status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(message);
        }
      } else if (err.request) {
        setError('Cannot connect to server. Please check your connection.');
      } else {
        setError(err.message || 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side - Image & Info (Hidden on mobile, visible on desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-teal-500 to-green-600 items-center justify-center p-12">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/build.png"
            alt="NextGen Building"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-lg">
          <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center mb-6 border-4 border-white/30">
            <Home size={48} className="text-white" />
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold mb-4">Welcome to NextGen!</h1>
          <p className="text-lg xl:text-xl text-white/90 leading-relaxed">
            Your perfect home away from home. Experience comfortable living with modern amenities.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Home size={32} className="sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-sm sm:text-base text-gray-600">Sign in to access your account</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <h2 className="text-3xl xl:text-4xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600">Enter your passkey to access your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 sm:p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-red-700 text-xs sm:text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Passkey
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value.trim())}
                  placeholder="Enter HST-XXXXXXXX"
                  required
                  disabled={loading}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base border-2 border-gray-300 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <p className="mt-2 text-xs sm:text-sm text-gray-500">
                Your passkey was provided during registration
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !passkey}
              className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  <span className="text-sm sm:text-base">Signing in...</span>
                </span>
              ) : (
                <span className="text-sm sm:text-base">Sign In</span>
              )}
            </button>
          </form>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm sm:text-base transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>
          </div>

          

          {/* Security Badge */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-xl text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-xs sm:text-sm text-gray-700 font-semibold">
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