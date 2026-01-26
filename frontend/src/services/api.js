import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Tenant API
export const tenantAPI = {
  login: (passkey) => 
    axios.post(`${API_URL}/tenant/login`, { passkey }),
  
  getAnnouncements: (passkey) => 
    axios.get(`${API_URL}/tenant/announcements`, {
      headers: { passkey }
    }),
  
  submitComplaint: (passkey, data) => 
    axios.post(`${API_URL}/tenant/complaints`, data, {
      headers: { passkey }
    }),
  
  getComplaints: (passkey) => 
    axios.get(`${API_URL}/tenant/complaints`, {
      headers: { passkey }
    }),
  
  getVacantRooms: (passkey) => 
    axios.get(`${API_URL}/tenant/rooms/vacant`, {
      headers: { passkey }
    }),
  
  makePayment: (passkey, data) => 
    axios.post(`${API_URL}/tenant/payments`, data, {
      headers: { passkey }
    }),
  
  getPayments: (passkey) => 
    axios.get(`${API_URL}/tenant/payments`, {
      headers: { passkey }
    }),
  
  submitLeaveRequest: (passkey, data) => 
    axios.post(`${API_URL}/tenant/leave-requests`, data, {
      headers: { passkey }
    }),
  
  getLeaveRequests: (passkey) => 
    axios.get(`${API_URL}/tenant/leave-requests`, {
      headers: { passkey }
    }),
  
  getMenu: (passkey) => 
    axios.get(`${API_URL}/tenant/menu`, {
      headers: { passkey }
    })
};

// Owner API
export const ownerAPI = {
  login: (credentials) => 
    axios.post(`${API_URL}/owner/login`, credentials),
  
  getDashboardStats: (token, location) => 
    axios.get(`${API_URL}/owner/dashboard/stats`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { location }
    }),
  
  // Announcements
  createAnnouncement: (token, data) => 
    axios.post(`${API_URL}/owner/announcements`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  getAnnouncements: (token, location) => 
    axios.get(`${API_URL}/owner/announcements`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { location }
    }),
  
  updateAnnouncement: (token, id, data) => 
    axios.put(`${API_URL}/owner/announcements/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  deleteAnnouncement: (token, id) => 
    axios.delete(`${API_URL}/owner/announcements/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  // Complaints
  getComplaints: (token, location, status) => 
    axios.get(`${API_URL}/owner/complaints`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { location, status }
    }),
  
  updateComplaint: (token, id, data) => 
    axios.put(`${API_URL}/owner/complaints/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  // Tenants
  createTenant: (token, data) => 
    axios.post(`${API_URL}/owner/tenants`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  getTenants: (token, location) => 
    axios.get(`${API_URL}/owner/tenants`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { location }
    }),
  
  updateTenant: (token, id, data) => 
    axios.put(`${API_URL}/owner/tenants/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  // Payments
  getPayments: (token, location, month, year) => 
    axios.get(`${API_URL}/owner/payments`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { location, month, year }
    }),
  
  // Leave Requests
  getLeaveRequests: (token, location, status) => 
    axios.get(`${API_URL}/owner/leave-requests`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { location, status }
    }),
  
  updateLeaveRequest: (token, id, data) => 
    axios.put(`${API_URL}/owner/leave-requests/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  // Menu
  saveMenu: (token, data) => 
    axios.post(`${API_URL}/owner/menu`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  getMenu: (token, location) => 
    axios.get(`${API_URL}/owner/menu`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { location }
    }),
  
  // Rooms
  createRoom: (token, data) => 
    axios.post(`${API_URL}/owner/rooms`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  getRooms: (token, location) => 
    axios.get(`${API_URL}/owner/rooms`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { location }
    }),
  
  updateRoom: (token, id, data) => 
    axios.put(`${API_URL}/owner/rooms/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
};