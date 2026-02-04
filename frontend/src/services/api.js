import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ============= TENANT API =============
export const tenantAPI = {
  // Login
  login: (passkey) => 
    api.post('/tenant/login', { passkey }),

  // Get announcements
  getAnnouncements: (passkey) =>
    api.get('/tenant/announcements', {
      headers: { passkey }
    }),

  // Get complaints
  getComplaints: (passkey) =>
    api.get('/tenant/complaints', {
      headers: { passkey }
    }),

  // Submit complaint
  submitComplaint: (passkey, data) =>
    api.post('/tenant/complaints', data, {
      headers: { passkey }
    }),

  // Get vacant rooms - FIXED: Use tenant's location from localStorage
  getVacantRooms: (passkey) => {
    const tenantData = JSON.parse(localStorage.getItem('tenantData') || '{}');
    const location = tenantData.location || 'Location A';
    return api.get('/tenant/rooms/vacant', {
      params: { location }
    });
  },

  // Get payments
  getPayments: (passkey) =>
    api.get('/tenant/payments', {
      headers: { passkey }
    }),

  // Make payment
  makePayment: (passkey, data) =>
    api.post('/tenant/payments', data, {
      headers: { passkey }
    }),

  // Get leave requests
  getLeaveRequests: (passkey) =>
    api.get('/tenant/leave-requests', {
      headers: { passkey }
    }),

  // Submit leave request
  submitLeaveRequest: (passkey, data) =>
    api.post('/tenant/leave-requests', data, {
      headers: { passkey }
    }),

  // Get menu - FIXED: Get menu for tenant's location
  getMenu: (passkey) => {
    const tenantData = JSON.parse(localStorage.getItem('tenantData') || '{}');
    const location = tenantData.location;
    return api.get('/tenant/menu', {
      headers: { passkey },
      params: location ? { location } : {}
    });
  }
};

// ============= OWNER API =============
export const ownerAPI = {
  // Login
  login: (credentials) =>
    api.post('/owner/login', credentials),

  // Login with phone - NEW
  loginWithPhone: (phone) =>
    api.post('/owner/login-phone', { phone }),

  // Register
  register: (data) =>
    api.post('/owner/register', data),

  // Dashboard stats
  getDashboardStats: (token, location) =>
    api.get('/owner/dashboard/stats', {
      headers: { Authorization: `Bearer ${token}` },
      params: location ? { location } : {}
    }),

  // Announcements
  getAnnouncements: (token, location) =>
    api.get('/owner/announcements', {
      headers: { Authorization: `Bearer ${token}` },
      params: location ? { location } : {}
    }),

  createAnnouncement: (token, data) =>
    api.post('/owner/announcements', data, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  updateAnnouncement: (token, id, data) =>
    api.put(`/owner/announcements/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  deleteAnnouncement: (token, id) =>
    api.delete(`/owner/announcements/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  // Complaints
  getComplaints: (token, location, status) =>
    api.get('/owner/complaints', {
      headers: { Authorization: `Bearer ${token}` },
      params: { location, status }
    }),

  updateComplaint: (token, id, data) =>
    api.put(`/owner/complaints/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  // Tenants
  getTenants: (token, location) =>
    api.get('/owner/tenants', {
      headers: { Authorization: `Bearer ${token}` },
      params: location ? { location } : {}
    }),

  createTenant: (token, data) =>
    api.post('/owner/tenants', data, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  updateTenant: (token, id, data) =>
    api.put(`/owner/tenants/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  deleteTenant: (token, id) =>
    api.delete(`/owner/tenants/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  // Payments
  getPayments: (token, location, month, year) =>
    api.get('/owner/payments', {
      headers: { Authorization: `Bearer ${token}` },
      params: { location, month, year }
    }),

  // Leave Requests
  getLeaveRequests: (token, location, status) =>
    api.get('/owner/leave-requests', {
      headers: { Authorization: `Bearer ${token}` },
      params: { location, status }
    }),

  updateLeaveRequest: (token, id, data) =>
    api.put(`/owner/leave-requests/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  // Menu
  getMenu: (token, location) =>
    api.get('/owner/menu', {
      headers: { Authorization: `Bearer ${token}` },
      params: location ? { location } : {}
    }),

  saveMenu: (token, data) =>
    api.post('/owner/menu', data, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  // Rooms
  getRooms: (token, location) =>
    api.get('/owner/rooms', {
      headers: { Authorization: `Bearer ${token}` },
      params: location ? { location } : {}
    }),

  createRoom: (token, data) =>
    api.post('/owner/rooms', data, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  updateRoom: (token, id, data) =>
    api.put(`/owner/rooms/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  deleteRoom: (token, id) =>
    api.delete(`/owner/rooms/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
};

export default api;