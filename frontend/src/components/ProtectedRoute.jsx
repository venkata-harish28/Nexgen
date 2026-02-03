import React from 'react';
import { Navigate } from 'react-router-dom';

// Protected Route for Owner Dashboard
export const OwnerProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('ownerToken');
  const ownerData = localStorage.getItem('ownerData');
  
  console.log('[OWNER PROTECTED ROUTE] Checking authentication');
  console.log('[OWNER PROTECTED ROUTE] Token exists:', !!token);
  console.log('[OWNER PROTECTED ROUTE] Data exists:', !!ownerData);

  if (!token || !ownerData) {
    console.log('[OWNER PROTECTED ROUTE] Not authenticated, redirecting to login');
    return <Navigate to="/owner-login" replace />;
  }

  console.log('[OWNER PROTECTED ROUTE] Authenticated, rendering dashboard');
  return children;
};

// Protected Route for Tenant Dashboard
export const TenantProtectedRoute = ({ children }) => {
  const passkey = localStorage.getItem('tenantPasskey');
  const tenantData = localStorage.getItem('tenantData');
  
  console.log('[TENANT PROTECTED ROUTE] Checking authentication');
  console.log('[TENANT PROTECTED ROUTE] Passkey exists:', !!passkey);
  console.log('[TENANT PROTECTED ROUTE] Data exists:', !!tenantData);

  if (!passkey || !tenantData) {
    console.log('[TENANT PROTECTED ROUTE] Not authenticated, redirecting to login');
    return <Navigate to="/tenant-login" replace />;
  }

  console.log('[TENANT PROTECTED ROUTE] Authenticated, rendering dashboard');
  return children;
};