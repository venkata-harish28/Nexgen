import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ownerAPI } from '../services/api';
import { 
  LogOut, BarChart3, Bell, AlertCircle, Users, 
  Home, CreditCard, DoorOpen, Utensils, Plus,
  Edit, Trash2, Check, X
} from 'lucide-react';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [owner, setOwner] = useState(null);
  const [stats, setStats] = useState(null);
  const [data, setData] = useState({
    announcements: [],
    complaints: [],
    tenants: [],
    payments: [],
    leaveRequests: [],
    menu: [],
    rooms: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('ownerToken');
  const locations = ['all', 'Location A', 'Location B', 'Location C'];

  useEffect(() => {
    const ownerData = JSON.parse(localStorage.getItem('ownerData'));
    if (!token || !ownerData) {
      navigate('/owner-login');
      return;
    }
    setOwner(ownerData);
    loadData();
  }, [navigate, token, selectedLocation]);

  const loadData = async () => {
    try {
      const location = selectedLocation === 'all' ? undefined : selectedLocation;
      
      const [statsRes, announcements, complaints, tenants, payments, leaveRequests, menu, rooms] = await Promise.all([
        ownerAPI.getDashboardStats(token, location),
        ownerAPI.getAnnouncements(token, location),
        ownerAPI.getComplaints(token, location),
        ownerAPI.getTenants(token, location),
        ownerAPI.getPayments(token, location),
        ownerAPI.getLeaveRequests(token, location),
        ownerAPI.getMenu(token, location),
        ownerAPI.getRooms(token, location)
      ]);

      setStats(statsRes.data);
      setData({
        announcements: announcements.data,
        complaints: complaints.data,
        tenants: tenants.data,
        payments: payments.data,
        leaveRequests: leaveRequests.data,
        menu: menu.data,
        rooms: rooms.data
      });
    } catch (error) {
      console.error('Error loading data:', error);
      if (error.response?.status === 401) {
        navigate('/owner-login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ownerToken');
    localStorage.removeItem('ownerData');
    navigate('/owner-login');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'complaints', label: 'Complaints', icon: AlertCircle },
    { id: 'tenants', label: 'Tenants', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'leave-requests', label: 'Leave Requests', icon: DoorOpen },
    { id: 'rooms', label: 'Rooms', icon: Home },
    { id: 'menu', label: 'Menu', icon: Utensils }
  ];

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        color: 'white',
        padding: '1.5rem 2rem'
      }}>
        <div className="container" style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h2 style={{ marginBottom: '0.25rem', color: 'white' }}>Owner Dashboard</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', margin: 0 }}>
              Welcome back, {owner?.name}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              {locations.map(location => (
                <option key={location} value={location} style={{ color: '#1a1a1a' }}>
                  {location === 'all' ? 'All Locations' : location}
                </option>
              ))}
            </select>
            <button 
              className="btn"
              onClick={handleLogout}
              style={{ 
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ 
        background: 'white',
        borderBottom: '1px solid #e1e8ed',
        overflowX: 'auto'
      }}>
        <div className="container" style={{ 
          display: 'flex',
          gap: '0.5rem',
          padding: '0 2rem'
        }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '1rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: activeTab === tab.id ? '#1a1a1a' : '#6c757d',
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  borderBottom: activeTab === tab.id ? '3px solid #1a1a1a' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ padding: '2rem' }}>
        {activeTab === 'dashboard' && <DashboardTab stats={stats} />}
        {activeTab === 'announcements' && <AnnouncementsTab data={data.announcements} token={token} selectedLocation={selectedLocation} onUpdate={loadData} />}
        {activeTab === 'complaints' && <ComplaintsTab data={data.complaints} token={token} onUpdate={loadData} />}
        {activeTab === 'tenants' && <TenantsTab data={data.tenants} token={token} selectedLocation={selectedLocation} onUpdate={loadData} />}
        {activeTab === 'payments' && <PaymentsTab data={data.payments} />}
        {activeTab === 'leave-requests' && <LeaveRequestsTab data={data.leaveRequests} token={token} onUpdate={loadData} />}
        {activeTab === 'rooms' && <RoomsTab data={data.rooms} token={token} selectedLocation={selectedLocation} onUpdate={loadData} />}
        {activeTab === 'menu' && <MenuTab data={data.menu} token={token} selectedLocation={selectedLocation} onUpdate={loadData} />}
      </div>
    </div>
  );
};

// Dashboard Stats Component
const DashboardTab = ({ stats }) => (
  <div>
    <h3 style={{ marginBottom: '2rem' }}>Overview</h3>
    <div className="grid grid-4">
      <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
        <Users size={40} style={{ color: '#3498db', marginBottom: '1rem' }} />
        <h2 style={{ marginBottom: '0.5rem' }}>{stats?.totalTenants || 0}</h2>
        <p style={{ color: '#6c757d', margin: 0 }}>Total Tenants</p>
      </div>
      <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
        <Home size={40} style={{ color: '#27ae60', marginBottom: '1rem' }} />
        <h2 style={{ marginBottom: '0.5rem' }}>{stats?.vacantRooms || 0}</h2>
        <p style={{ color: '#6c757d', margin: 0 }}>Vacant Rooms</p>
      </div>
      <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
        <AlertCircle size={40} style={{ color: '#f39c12', marginBottom: '1rem' }} />
        <h2 style={{ marginBottom: '0.5rem' }}>{stats?.pendingComplaints || 0}</h2>
        <p style={{ color: '#6c757d', margin: 0 }}>Pending Complaints</p>
      </div>
      <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
        <CreditCard size={40} style={{ color: '#e74c3c', marginBottom: '1rem' }} />
        <h2 style={{ marginBottom: '0.5rem' }}>₹{stats?.monthlyRevenue || 0}</h2>
        <p style={{ color: '#6c757d', margin: 0 }}>Monthly Revenue</p>
      </div>
    </div>

    <div className="grid grid-2" style={{ marginTop: '2rem' }}>
      <div className="card">
        <h4 style={{ marginBottom: '1.5rem' }}>Room Occupancy</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              {stats?.occupiedRooms || 0}/{stats?.totalRooms || 0}
            </p>
            <p style={{ color: '#6c757d', margin: 0 }}>Occupied Rooms</p>
          </div>
          <div style={{ 
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: `conic-gradient(#1a1a1a ${(stats?.occupiedRooms / stats?.totalRooms * 100) || 0}%, #e1e8ed 0)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 700
            }}>
              {Math.round((stats?.occupiedRooms / stats?.totalRooms * 100) || 0)}%
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <h4 style={{ marginBottom: '1.5rem' }}>Recent Activity</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#fff3cd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertCircle size={20} style={{ color: '#856404' }} />
            </div>
            <div>
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                {stats?.pendingComplaints || 0} Pending Complaints
              </p>
              <p style={{ fontSize: '0.85rem', color: '#6c757d', margin: 0 }}>
                Need attention
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#d1ecf1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <DoorOpen size={20} style={{ color: '#0c5460' }} />
            </div>
            <div>
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                {stats?.pendingLeaveRequests || 0} Leave Requests
              </p>
              <p style={{ fontSize: '0.85rem', color: '#6c757d', margin: 0 }}>
                Awaiting approval
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Announcements Tab Component
const AnnouncementsTab = ({ data, token, selectedLocation, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    location: selectedLocation === 'all' ? 'Location A' : selectedLocation,
    priority: 'medium'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await ownerAPI.updateAnnouncement(token, editingId, formData);
      } else {
        await ownerAPI.createAnnouncement(token, formData);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: '', content: '', location: selectedLocation === 'all' ? 'Location A' : selectedLocation, priority: 'medium' });
      onUpdate();
    } catch (error) {
      console.error('Error saving announcement:', error);
    }
  };

  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title,
      content: announcement.content,
      location: announcement.location,
      priority: announcement.priority
    });
    setEditingId(announcement._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await ownerAPI.deleteAnnouncement(token, id);
        onUpdate();
      } catch (error) {
        console.error('Error deleting announcement:', error);
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0 }}>Announcements</h3>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ title: '', content: '', location: selectedLocation === 'all' ? 'Location A' : selectedLocation, priority: 'medium' });
          }}
        >
          <Plus size={18} />
          {showForm ? 'Cancel' : 'New Announcement'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h4 style={{ marginBottom: '1.5rem' }}>
            {editingId ? 'Edit Announcement' : 'Create Announcement'}
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Location</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              >
                <option value="Location A">Location A</option>
                <option value="Location B">Location B</option>
                <option value="Location C">Location C</option>
              </select>
            </div>
            <div className="input-group">
              <label>Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="input-group">
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter announcement title"
                required
              />
            </div>
            <div className="input-group">
              <label>Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter announcement content"
                rows="4"
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              {editingId ? 'Update' : 'Create'} Announcement
            </button>
          </form>
        </div>
      )}

      {data.length === 0 ? (
        <div className="empty-state">
          <Bell size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
          <h3>No Announcements</h3>
          <p>Create your first announcement</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {data.map(announcement => (
            <div key={announcement._id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ marginBottom: '0.5rem' }}>{announcement.title}</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <span className={`badge badge-${announcement.priority}`}>
                      {announcement.priority}
                    </span>
                    <span className="badge" style={{ background: '#e1e8ed', color: '#6c757d' }}>
                      {announcement.location}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => handleEdit(announcement)}
                    style={{ 
                      background: 'transparent',
                      border: 'none',
                      padding: '0.5rem',
                      cursor: 'pointer',
                      color: '#3498db'
                    }}
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(announcement._id)}
                    style={{ 
                      background: 'transparent',
                      border: 'none',
                      padding: '0.5rem',
                      cursor: 'pointer',
                      color: '#e74c3c'
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
                {announcement.content}
              </p>
              <small style={{ color: '#6c757d' }}>
                Posted on {new Date(announcement.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Complaints Tab Component
const ComplaintsTab = ({ data, token, onUpdate }) => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const handleUpdateStatus = async (id, status, adminResponse) => {
    try {
      await ownerAPI.updateComplaint(token, id, { status, adminResponse });
      setSelectedComplaint(null);
      onUpdate();
    } catch (error) {
      console.error('Error updating complaint:', error);
    }
  };

  return (
    <div>
      <h3 style={{ marginBottom: '1.5rem' }}>Complaints Management</h3>
      {data.length === 0 ? (
        <div className="empty-state">
          <AlertCircle size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
          <h3>No Complaints</h3>
          <p>No complaints have been submitted</p>
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Tenant</th>
                <th>Room</th>
                <th>Location</th>
                <th>Category</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(complaint => (
                <tr key={complaint._id}>
                  <td>{complaint.tenantName}</td>
                  <td>{complaint.roomNumber}</td>
                  <td>{complaint.location}</td>
                  <td style={{ textTransform: 'capitalize' }}>{complaint.category}</td>
                  <td>{complaint.subject}</td>
                  <td>
                    <span className={`badge badge-${complaint.status}`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => setSelectedComplaint(complaint)}
                      className="btn btn-secondary"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedComplaint && (
        <ComplaintModal 
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          onUpdate={handleUpdateStatus}
        />
      )}
    </div>
  );
};

// Complaint Modal Component
const ComplaintModal = ({ complaint, onClose, onUpdate }) => {
  const [status, setStatus] = useState(complaint.status);
  const [adminResponse, setAdminResponse] = useState(complaint.adminResponse || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(complaint._id, status, adminResponse);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0 }}>Complaint Details</h3>
          <button 
            onClick={onClose}
            style={{ 
              background: 'transparent',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              color: '#6c757d'
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Tenant:</strong> {complaint.tenantName}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Room:</strong> {complaint.roomNumber} ({complaint.location})
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Category:</strong> {complaint.category}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Subject:</strong> {complaint.subject}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Description:</strong>
            <p style={{ marginTop: '0.5rem', color: '#6c757d' }}>
              {complaint.description}
            </p>
          </div>
          <div>
            <strong>Submitted:</strong> {new Date(complaint.createdAt).toLocaleString()}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div className="input-group">
            <label>Admin Response</label>
            <textarea
              value={adminResponse}
              onChange={(e) => setAdminResponse(e.target.value)}
              placeholder="Enter your response to the tenant"
              rows="4"
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-success">
              <Check size={18} />
              Update
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Tenants Tab Component
const TenantsTab = ({ data, token, selectedLocation, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roomNumber: '',
    location: selectedLocation === 'all' ? 'Location A' : selectedLocation,
    rentAmount: ''
  });
  const [newPasskey, setNewPasskey] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ownerAPI.createTenant(token, formData);
      setNewPasskey(response.data.passkey);
      onUpdate();
    } catch (error) {
      console.error('Error creating tenant:', error);
    }
  };

  const closeModal = () => {
    setShowForm(false);
    setNewPasskey('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      roomNumber: '',
      location: selectedLocation === 'all' ? 'Location A' : selectedLocation,
      rentAmount: ''
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0 }}>Tenants</h3>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          Add Tenant
        </button>
      </div>

      {data.length === 0 ? (
        <div className="empty-state">
          <Users size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
          <h3>No Tenants</h3>
          <p>Add your first tenant</p>
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Room</th>
                <th>Location</th>
                <th>Rent</th>
                <th>Join Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map(tenant => (
                <tr key={tenant._id}>
                  <td>{tenant.name}</td>
                  <td>{tenant.email}</td>
                  <td>{tenant.phone}</td>
                  <td>{tenant.roomNumber}</td>
                  <td>{tenant.location}</td>
                  <td>₹{tenant.rentAmount}</td>
                  <td>{new Date(tenant.joinDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${tenant.isActive ? 'badge-completed' : 'badge-pending'}`}>
                      {tenant.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>Add New Tenant</h3>
              <button 
                onClick={closeModal}
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  color: '#6c757d'
                }}
              >
                <X size={24} />
              </button>
            </div>

            {newPasskey ? (
              <div>
                <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
                  Tenant created successfully!
                </div>
                <div style={{ 
                  background: '#f8f9fa',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem'
                }}>
                  <p style={{ fontWeight: 600, marginBottom: '1rem' }}>
                    Tenant Passkey:
                  </p>
                  <div style={{
                    background: 'white',
                    padding: '1rem',
                    borderRadius: '6px',
                    border: '2px dashed #1a1a1a',
                    fontFamily: 'monospace',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    fontWeight: 700,
                    letterSpacing: '2px'
                  }}>
                    {newPasskey}
                  </div>
                  <p style={{ color: '#6c757d', fontSize: '0.9rem', marginTop: '1rem', marginBottom: 0 }}>
                    Please save this passkey and provide it to the tenant. It cannot be recovered later.
                  </p>
                </div>
                <button 
                  onClick={closeModal}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-2">
                  <div className="input-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter email"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-2">
                  <div className="input-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Room Number</label>
                    <input
                      type="text"
                      value={formData.roomNumber}
                      onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                      placeholder="Enter room number"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-2">
                  <div className="input-group">
                    <label>Location</label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    >
                      <option value="Location A">Location A</option>
                      <option value="Location B">Location B</option>
                      <option value="Location C">Location C</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Monthly Rent</label>
                    <input
                      type="number"
                      value={formData.rentAmount}
                      onChange={(e) => setFormData({ ...formData, rentAmount: e.target.value })}
                      placeholder="Enter rent amount"
                      required
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="btn btn-success" style={{ flex: 1 }}>
                    Create Tenant
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Payments Tab Component
const PaymentsTab = ({ data }) => (
  <div>
    <h3 style={{ marginBottom: '1.5rem' }}>Payment Records</h3>
    {data.length === 0 ? (
      <div className="empty-state">
        <CreditCard size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
        <h3>No Payments</h3>
        <p>No payments have been recorded</p>
      </div>
    ) : (
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Tenant</th>
              <th>Room</th>
              <th>Location</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Month/Year</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map(payment => (
              <tr key={payment._id}>
                <td>{payment.tenantName}</td>
                <td>{payment.roomNumber}</td>
                <td>{payment.location}</td>
                <td>₹{payment.amount}</td>
                <td style={{ textTransform: 'capitalize' }}>{payment.paymentMethod}</td>
                <td>{payment.paymentMonth} {payment.paymentYear}</td>
                <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                <td>
                  <span className={`badge badge-${payment.status}`}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

// Leave Requests Tab Component
const LeaveRequestsTab = ({ data, token, onUpdate }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleUpdate = async (id, status, adminNotes, refundAmount) => {
    try {
      await ownerAPI.updateLeaveRequest(token, id, { status, adminNotes, refundAmount });
      setSelectedRequest(null);
      onUpdate();
    } catch (error) {
      console.error('Error updating leave request:', error);
    }
  };

  return (
    <div>
      <h3 style={{ marginBottom: '1.5rem' }}>Leave Requests</h3>
      {data.length === 0 ? (
        <div className="empty-state">
          <DoorOpen size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
          <h3>No Leave Requests</h3>
          <p>No leave requests have been submitted</p>
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Tenant</th>
                <th>Room</th>
                <th>Location</th>
                <th>Leave Date</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(request => (
                <tr key={request._id}>
                  <td>{request.tenantName}</td>
                  <td>{request.roomNumber}</td>
                  <td>{request.location}</td>
                  <td>{new Date(request.leaveDate).toLocaleDateString()}</td>
                  <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge badge-${request.status}`}>
                      {request.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedRequest(request)}
                      className="btn btn-secondary"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedRequest && (
        <LeaveRequestModal 
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

// Leave Request Modal Component
const LeaveRequestModal = ({ request, onClose, onUpdate }) => {
  const [status, setStatus] = useState(request.status);
  const [adminNotes, setAdminNotes] = useState(request.adminNotes || '');
  const [refundAmount, setRefundAmount] = useState(request.refundAmount || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(request._id, status, adminNotes, parseFloat(refundAmount));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0 }}>Leave Request Details</h3>
          <button 
            onClick={onClose}
            style={{ 
              background: 'transparent',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              color: '#6c757d'
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Tenant:</strong> {request.tenantName}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Room:</strong> {request.roomNumber} ({request.location})
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Expected Leave Date:</strong> {new Date(request.leaveDate).toLocaleDateString()}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Reason:</strong>
            <p style={{ marginTop: '0.5rem', color: '#6c757d' }}>
              {request.reason}
            </p>
          </div>
          <div>
            <strong>Submitted:</strong> {new Date(request.requestDate).toLocaleString()}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          {status === 'approved' && (
            <div className="input-group">
              <label>Refund Amount</label>
              <input
                type="number"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                placeholder="Enter refund amount"
                min="0"
              />
            </div>
          )}
          <div className="input-group">
            <label>Admin Notes</label>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Enter any notes for the tenant"
              rows="4"
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-success">
              <Check size={18} />
              Update
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Rooms Tab Component
const RoomsTab = ({ data, token, selectedLocation, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    roomNumber: '',
    location: selectedLocation === 'all' ? 'Location A' : selectedLocation,
    capacity: 1,
    rentAmount: '',
    floor: 1,
    amenities: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const roomData = {
        ...formData,
        amenities: formData.amenities.split(',').map(a => a.trim()).filter(Boolean)
      };
      await ownerAPI.createRoom(token, roomData);
      setShowForm(false);
      setFormData({
        roomNumber: '',
        location: selectedLocation === 'all' ? 'Location A' : selectedLocation,
        capacity: 1,
        rentAmount: '',
        floor: 1,
        amenities: ''
      });
      onUpdate();
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0 }}>Rooms</h3>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          {showForm ? 'Cancel' : 'Add Room'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h4 style={{ marginBottom: '1.5rem' }}>Add New Room</h4>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-2">
              <div className="input-group">
                <label>Room Number</label>
                <input
                  type="text"
                  value={formData.roomNumber}
                  onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                  placeholder="Enter room number"
                  required
                />
              </div>
              <div className="input-group">
                <label>Location</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                >
                  <option value="Location A">Location A</option>
                  <option value="Location B">Location B</option>
                  <option value="Location C">Location C</option>
                </select>
              </div>
            </div>
            <div className="grid grid-2">
              <div className="input-group">
                <label>Capacity</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  placeholder="Number of persons"
                  min="1"
                  required
                />
              </div>
              <div className="input-group">
                <label>Floor</label>
                <input
                  type="number"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: parseInt(e.target.value) })}
                  placeholder="Floor number"
                  min="0"
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label>Monthly Rent</label>
              <input
                type="number"
                value={formData.rentAmount}
                onChange={(e) => setFormData({ ...formData, rentAmount: e.target.value })}
                placeholder="Enter rent amount"
                required
              />
            </div>
            <div className="input-group">
              <label>Amenities (comma-separated)</label>
              <input
                type="text"
                value={formData.amenities}
                onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                placeholder="e.g., WiFi, AC, Attached Bathroom"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Add Room
            </button>
          </form>
        </div>
      )}

      {data.length === 0 ? (
        <div className="empty-state">
          <Home size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
          <h3>No Rooms</h3>
          <p>Add your first room</p>
        </div>
      ) : (
        <div className="grid grid-3">
          {data.map(room => (
            <div key={room._id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h4 style={{ margin: 0 }}>Room {room.roomNumber}</h4>
                <span className={`badge ${room.isVacant ? 'badge-completed' : 'badge-pending'}`}>
                  {room.isVacant ? 'Vacant' : 'Occupied'}
                </span>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.9rem', color: '#6c757d', margin: '0.25rem 0' }}>
                  <strong>Location:</strong> {room.location}
                </p>
                <p style={{ fontSize: '0.9rem', color: '#6c757d', margin: '0.25rem 0' }}>
                  <strong>Floor:</strong> {room.floor}
                </p>
                <p style={{ fontSize: '0.9rem', color: '#6c757d', margin: '0.25rem 0' }}>
                  <strong>Capacity:</strong> {room.capacity} persons
                </p>
                <p style={{ fontSize: '0.9rem', color: '#6c757d', margin: '0.25rem 0' }}>
                  <strong>Occupancy:</strong> {room.currentOccupancy}/{room.capacity}
                </p>
                <p style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0.75rem 0' }}>
                  ₹{room.rentAmount}/month
                </p>
              </div>
              {room.amenities && room.amenities.length > 0 && (
                <div style={{ paddingTop: '1rem', borderTop: '1px solid #e1e8ed' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Amenities:
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {room.amenities.map((amenity, index) => (
                      <span key={index} style={{ 
                        fontSize: '0.8rem',
                        padding: '0.25rem 0.75rem',
                        background: '#f8f9fa',
                        borderRadius: '12px',
                        color: '#6c757d'
                      }}>
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Menu Tab Component
const MenuTab = ({ data, token, selectedLocation, onUpdate }) => {
  const [editingDay, setEditingDay] = useState(null);
  const [formData, setFormData] = useState({
    location: selectedLocation === 'all' ? 'Location A' : selectedLocation,
    day: 'Monday',
    breakfast: '',
    lunch: '',
    snacks: '',
    dinner: ''
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleEdit = (menu) => {
    setFormData({
      location: menu.location,
      day: menu.day,
      breakfast: menu.breakfast,
      lunch: menu.lunch,
      snacks: menu.snacks,
      dinner: menu.dinner
    });
    setEditingDay(menu.day);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ownerAPI.saveMenu(token, formData);
      setEditingDay(null);
      setFormData({
        location: selectedLocation === 'all' ? 'Location A' : selectedLocation,
        day: 'Monday',
        breakfast: '',
        lunch: '',
        snacks: '',
        dinner: ''
      });
      onUpdate();
    } catch (error) {
      console.error('Error saving menu:', error);
    }
  };

  const sortedMenu = [...data].sort((a, b) => days.indexOf(a.day) - days.indexOf(b.day));

  return (
    <div>
      <h3 style={{ marginBottom: '1.5rem' }}>Food Menu Management</h3>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h4 style={{ marginBottom: '1.5rem' }}>
          {editingDay ? `Edit Menu for ${editingDay}` : 'Add/Edit Menu'}
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-2">
            <div className="input-group">
              <label>Location</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              >
                <option value="Location A">Location A</option>
                <option value="Location B">Location B</option>
                <option value="Location C">Location C</option>
              </select>
            </div>
            <div className="input-group">
              <label>Day</label>
              <select
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                required
              >
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="input-group">
            <label>Breakfast</label>
            <input
              type="text"
              value={formData.breakfast}
              onChange={(e) => setFormData({ ...formData, breakfast: e.target.value })}
              placeholder="Enter breakfast menu"
            />
          </div>
          <div className="input-group">
            <label>Lunch</label>
            <input
              type="text"
              value={formData.lunch}
              onChange={(e) => setFormData({ ...formData, lunch: e.target.value })}
              placeholder="Enter lunch menu"
            />
          </div>
          <div className="input-group">
            <label>Snacks</label>
            <input
              type="text"
              value={formData.snacks}
              onChange={(e) => setFormData({ ...formData, snacks: e.target.value })}
              placeholder="Enter snacks menu"
            />
          </div>
          <div className="input-group">
            <label>Dinner</label>
            <input
              type="text"
              value={formData.dinner}
              onChange={(e) => setFormData({ ...formData, dinner: e.target.value })}
              placeholder="Enter dinner menu"
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-success">
              {editingDay ? 'Update' : 'Save'} Menu
            </button>
            {editingDay && (
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => {
                  setEditingDay(null);
                  setFormData({
                    location: selectedLocation === 'all' ? 'Location A' : selectedLocation,
                    day: 'Monday',
                    breakfast: '',
                    lunch: '',
                    snacks: '',
                    dinner: ''
                  });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {sortedMenu.length === 0 ? (
        <div className="empty-state">
          <Utensils size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
          <h3>No Menu Set</h3>
          <p>Set up your first weekly menu</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {sortedMenu.map(menu => (
            <div key={menu._id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid #e1e8ed' }}>
                <h4 style={{ margin: 0 }}>{menu.day}</h4>
                <button 
                  onClick={() => handleEdit(menu)}
                  style={{ 
                    background: 'transparent',
                    border: 'none',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    color: '#3498db'
                  }}
                >
                  <Edit size={18} />
                </button>
              </div>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {menu.breakfast && (
                  <div>
                    <p style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: '#6c757d', marginBottom: '0.5rem', letterSpacing: '1px' }}>
                      Breakfast
                    </p>
                    <p style={{ color: '#1a1a1a', margin: 0 }}>{menu.breakfast}</p>
                  </div>
                )}
                {menu.lunch && (
                  <div>
                    <p style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: '#6c757d', marginBottom: '0.5rem', letterSpacing: '1px' }}>
                      Lunch
                    </p>
                    <p style={{ color: '#1a1a1a', margin: 0 }}>{menu.lunch}</p>
                  </div>
                )}
                {menu.snacks && (
                  <div>
                    <p style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: '#6c757d', marginBottom: '0.5rem', letterSpacing: '1px' }}>
                      Snacks
                    </p>
                    <p style={{ color: '#1a1a1a', margin: 0 }}>{menu.snacks}</p>
                  </div>
                )}
                {menu.dinner && (
                  <div>
                    <p style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: '#6c757d', marginBottom: '0.5rem', letterSpacing: '1px' }}>
                      Dinner
                    </p>
                    <p style={{ color: '#1a1a1a', margin: 0 }}>{menu.dinner}</p>
                  </div>
                )}
              </div>
              <p style={{ fontSize: '0.85rem', color: '#6c757d', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e1e8ed', margin: 0 }}>
                Location: {menu.location}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;