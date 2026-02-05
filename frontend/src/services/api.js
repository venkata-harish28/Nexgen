import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      // Handle authentication errors
      if (status === 401) {
        const code = data?.code;
        
        // Clear storage and redirect based on error code
        if (code === 'INVALID_TOKEN' || code === 'TOKEN_EXPIRED' || code === 'NO_TOKEN' || code === 'OWNER_NOT_FOUND') {
          localStorage.removeItem('ownerToken');
          localStorage.removeItem('ownerData');
          window.location.href = '/owner-login';
        } else if (code === 'INVALID_PASSKEY' || code === 'NO_PASSKEY') {
          localStorage.removeItem('tenantPasskey');
          localStorage.removeItem('tenantData');
          window.location.href = '/tenant-login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// ============= TENANT API =============
export const tenantAPI = {
  // Login - FIXED VERSION
  login: async (passkey) => {
    try {
      console.log('[API] Tenant login attempt with passkey:', passkey);
      const response = await api.post('/tenant/login', { passkey });
      console.log('[API] Login response:', response.data);
      return response;
    } catch (error) {
      console.error('[API] Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Get announcements
  getAnnouncements: async (passkey) => {
    try {
      console.log('📞 API: Fetching announcements with passkey:', passkey);
      const response = await api.get('/tenant/announcements', {
        headers: { passkey }
      });
      console.log('✅ API: Announcements received:', response.data.length);
      return response.data;
    } catch (error) {
      console.error('Get announcements error:', error);
      throw error;
    }
  },

  // Get complaints
  getComplaints: async (passkey) => {
    try {
      const response = await api.get('/tenant/complaints', {
        headers: { passkey }
      });
      return response.data;
    } catch (error) {
      console.error('Get complaints error:', error);
      throw error;
    }
  },

  // Submit complaint
  submitComplaint: async (passkey, data) => {
    try {
      const response = await api.post('/tenant/complaints', data, {
        headers: { passkey }
      });
      return response.data;
    } catch (error) {
      console.error('Submit complaint error:', error);
      throw error;
    }
  },

  // Get vacant rooms - FIXED: Use tenant's location from localStorage
  getVacantRooms: async (passkey) => {
    try {
      const tenantData = JSON.parse(localStorage.getItem('tenantData') || '{}');
      const location = tenantData.location || 'Gachibowli';
      console.log('[API] Fetching vacant rooms for location:', location);
      const response = await api.get('/tenant/rooms/vacant', {
        params: { location }
      });
      return response.data;
    } catch (error) {
      console.error('Get vacant rooms error:', error);
      throw error;
    }
  },

  // Get payments
  getPayments: async (passkey) => {
    try {
      const response = await api.get('/tenant/payments', {
        headers: { passkey }
      });
      return response.data;
    } catch (error) {
      console.error('Get payments error:', error);
      throw error;
    }
  },

  // Make payment
  makePayment: async (passkey, data) => {
    try {
      const response = await api.post('/tenant/payments', data, {
        headers: { passkey }
      });
      return response.data;
    } catch (error) {
      console.error('Make payment error:', error);
      throw error;
    }
  },

  // Get leave requests
  getLeaveRequests: async (passkey) => {
    try {
      const response = await api.get('/tenant/leave-requests', {
        headers: { passkey }
      });
      return response.data;
    } catch (error) {
      console.error('Get leave requests error:', error);
      throw error;
    }
  },

  // Submit leave request
  submitLeaveRequest: async (passkey, data) => {
    try {
      const response = await api.post('/tenant/leave-requests', data, {
        headers: { passkey }
      });
      return response.data;
    } catch (error) {
      console.error('Submit leave request error:', error);
      throw error;
    }
  },

  // Get menu
  getMenu: async (passkey) => {
    try {
      const tenantData = JSON.parse(localStorage.getItem('tenantData') || '{}');
      const location = tenantData.location;
      const response = await api.get('/tenant/menu', {
        headers: { passkey },
        params: location ? { location } : {}
      });
      return response.data;
    } catch (error) {
      console.error('Get menu error:', error);
      throw error;
    }
  }
};

// ============= OWNER API =============
export const ownerAPI = {
  // Login
  login: async (credentials) => {
    try {
      const response = await api.post('/owner/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Owner login error:', error);
      throw error;
    }
  },

  // Login with phone
  loginWithPhone: async (phone) => {
    try {
      const response = await api.post('/owner/login-phone', { phone });
      return response.data;
    } catch (error) {
      console.error('Owner phone login error:', error);
      throw error;
    }
  },

  // Register
  register: async (data) => {
    try {
      const response = await api.post('/owner/register', data);
      return response.data;
    } catch (error) {
      console.error('Owner register error:', error);
      throw error;
    }
  },

  // Dashboard stats
  getDashboardStats: async (token, location) => {
    try {
      const response = await api.get('/owner/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` },
        params: location ? { location } : {}
      });
      return response.data;
    } catch (error) {
      console.error('Get dashboard stats error:', error);
      throw error;
    }
  },

  // Announcements
  getAnnouncements: async (token, location) => {
    try {
      const response = await api.get('/owner/announcements', {
        headers: { Authorization: `Bearer ${token}` },
        params: location ? { location } : {}
      });
      return response.data;
    } catch (error) {
      console.error('Get announcements error:', error);
      throw error;
    }
  },

  createAnnouncement: async (token, data) => {
    try {
      const response = await api.post('/owner/announcements', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Create announcement error:', error);
      throw error;
    }
  },

  updateAnnouncement: async (token, id, data) => {
    try {
      const response = await api.put(`/owner/announcements/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Update announcement error:', error);
      throw error;
    }
  },

  deleteAnnouncement: async (token, id) => {
    try {
      const response = await api.delete(`/owner/announcements/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Delete announcement error:', error);
      throw error;
    }
  },

  // Complaints
  getComplaints: async (token, location, status) => {
    try {
      const response = await api.get('/owner/complaints', {
        headers: { Authorization: `Bearer ${token}` },
        params: { location, status }
      });
      return response.data;
    } catch (error) {
      console.error('Get complaints error:', error);
      throw error;
    }
  },

  updateComplaint: async (token, id, data) => {
    try {
      const response = await api.put(`/owner/complaints/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Update complaint error:', error);
      throw error;
    }
  },

  // Tenants
  getTenants: async (token, location) => {
    try {
      const response = await api.get('/owner/tenants', {
        headers: { Authorization: `Bearer ${token}` },
        params: location ? { location } : {}
      });
      return response.data;
    } catch (error) {
      console.error('Get tenants error:', error);
      throw error;
    }
  },

  createTenant: async (token, data) => {
    try {
      const response = await api.post('/owner/tenants', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Create tenant error:', error);
      throw error;
    }
  },

  updateTenant: async (token, id, data) => {
    try {
      const response = await api.put(`/owner/tenants/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Update tenant error:', error);
      throw error;
    }
  },

  deleteTenant: async (token, id) => {
    try {
      const response = await api.delete(`/owner/tenants/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Delete tenant error:', error);
      throw error;
    }
  },

  // Payments
  getPayments: async (token, location, month, year) => {
    try {
      const response = await api.get('/owner/payments', {
        headers: { Authorization: `Bearer ${token}` },
        params: { location, month, year }
      });
      return response.data;
    } catch (error) {
      console.error('Get payments error:', error);
      throw error;
    }
  },

  // Leave Requests
  getLeaveRequests: async (token, location, status) => {
    try {
      const response = await api.get('/owner/leave-requests', {
        headers: { Authorization: `Bearer ${token}` },
        params: { location, status }
      });
      return response.data;
    } catch (error) {
      console.error('Get leave requests error:', error);
      throw error;
    }
  },

  updateLeaveRequest: async (token, id, data) => {
    try {
      const response = await api.put(`/owner/leave-requests/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Update leave request error:', error);
      throw error;
    }
  },

  // Menu
  getMenu: async (token, location) => {
    try {
      const response = await api.get('/owner/menu', {
        headers: { Authorization: `Bearer ${token}` },
        params: location ? { location } : {}
      });
      return response.data;
    } catch (error) {
      console.error('Get menu error:', error);
      throw error;
    }
  },

  saveMenu: async (token, data) => {
    try {
      const response = await api.post('/owner/menu', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Save menu error:', error);
      throw error;
    }
  },

  // Rooms
  getRooms: async (token, location) => {
    try {
      const response = await api.get('/owner/rooms', {
        headers: { Authorization: `Bearer ${token}` },
        params: location ? { location } : {}
      });
      return response.data;
    } catch (error) {
      console.error('Get rooms error:', error);
      throw error;
    }
  },

  createRoom: async (token, data) => {
    try {
      const response = await api.post('/owner/rooms', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Create room error:', error);
      throw error;
    }
  },

  updateRoom: async (token, id, data) => {
    try {
      const response = await api.put(`/owner/rooms/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Update room error:', error);
      throw error;
    }
  },

  deleteRoom: async (token, id) => {
    try {
      const response = await api.delete(`/owner/rooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Delete room error:', error);
      throw error;
    }
  }
};

export default api;