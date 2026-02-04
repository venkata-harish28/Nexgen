import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * LIGHTWEIGHT SOLUTION - Validates token/passkey format and expiry
 * For full backend validation, use ProtectedRoute_WithValidation.jsx instead
 */

// Helper function to check if token is expired
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= expiryTime;
  } catch (error) {
    return true; // If we can't parse, consider it expired
  }
};

// Helper function to validate passkey format
const isValidPasskey = (passkey) => {
  // Check if passkey follows the format: HST-XXXXXXXX
  return passkey && /^HST-[A-Z0-9]{8}$/.test(passkey);
};

/**
 * Protected route wrapper for tenant pages
 */
export const TenantProtectedRoute = ({ children }) => {
  const tenantPasskey = localStorage.getItem('tenantPasskey');
  const tenantData = localStorage.getItem('tenantData');

  // Check if credentials exist
  if (!tenantPasskey || !tenantData) {
    return <Navigate to="/tenant-login" replace />;
  }

  // Validate passkey format
  if (!isValidPasskey(tenantPasskey)) {
    console.warn('Invalid passkey format detected');
    localStorage.removeItem('tenantPasskey');
    localStorage.removeItem('tenantData');
    return <Navigate to="/tenant-login" replace />;
  }

  // Try to parse tenantData to ensure it's valid JSON
  try {
    JSON.parse(tenantData);
  } catch (error) {
    console.error('Invalid tenant data in localStorage');
    localStorage.removeItem('tenantPasskey');
    localStorage.removeItem('tenantData');
    return <Navigate to="/tenant-login" replace />;
  }

  return children;
};

/**
 * Protected route wrapper for owner pages
 */
export const OwnerProtectedRoute = ({ children }) => {
  const ownerToken = localStorage.getItem('ownerToken');
  const ownerData = localStorage.getItem('ownerData');

  // Check if credentials exist
  if (!ownerToken || !ownerData) {
    return <Navigate to="/owner-login" replace />;
  }

  // Check if token is expired
  if (isTokenExpired(ownerToken)) {
    console.warn('Token expired');
    localStorage.removeItem('ownerToken');
    localStorage.removeItem('ownerData');
    return <Navigate to="/owner-login" replace />;
  }

  // Try to parse ownerData to ensure it's valid JSON
  try {
    JSON.parse(ownerData);
  } catch (error) {
    console.error('Invalid owner data in localStorage');
    localStorage.removeItem('ownerToken');
    localStorage.removeItem('ownerData');
    return <Navigate to="/owner-login" replace />;
  }

  return children;
};

/**
 * Public route wrapper for login/signup pages
 */
export const PublicRoute = ({ children, userType = 'tenant' }) => {
  const tenantPasskey = localStorage.getItem('tenantPasskey');
  const tenantData = localStorage.getItem('tenantData');
  const ownerToken = localStorage.getItem('ownerToken');
  const ownerData = localStorage.getItem('ownerData');

  if (userType === 'tenant') {
    // Check if tenant is authenticated and passkey is valid
    if (tenantPasskey && tenantData && isValidPasskey(tenantPasskey)) {
      try {
        JSON.parse(tenantData);
        return <Navigate to="/tenant-dashboard" replace />;
      } catch (error) {
        // Invalid data, clear it
        localStorage.removeItem('tenantPasskey');
        localStorage.removeItem('tenantData');
      }
    }
  } else if (userType === 'owner') {
    // Check if owner is authenticated and token is not expired
    if (ownerToken && ownerData && !isTokenExpired(ownerToken)) {
      try {
        JSON.parse(ownerData);
        return <Navigate to="/owner-dashboard" replace />;
      } catch (error) {
        // Invalid data, clear it
        localStorage.removeItem('ownerToken');
        localStorage.removeItem('ownerData');
      }
    }
  }

  return children;
};