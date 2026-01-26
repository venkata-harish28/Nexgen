import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tenantAPI } from '../services/api';
import { 
  LogOut, Bell, AlertCircle, Home, CreditCard, 
  FileText, Utensils, DoorOpen 
} from 'lucide-react';

const TenantDashboard = () => {
  const [activeTab, setActiveTab] = useState('announcements');
  const [tenant, setTenant] = useState(null);
  const [data, setData] = useState({
    announcements: [],
    complaints: [],
    rooms: [],
    payments: [],
    leaveRequests: [],
    menu: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const passkey = localStorage.getItem('tenantPasskey');

  useEffect(() => {
    const tenantData = JSON.parse(localStorage.getItem('tenantData'));
    if (!passkey || !tenantData) {
      navigate('/tenant-login');
      return;
    }
    setTenant(tenantData);
    loadData();
  }, [navigate, passkey]);

  const loadData = async () => {
    try {
      const [announcements, complaints, rooms, payments, leaveRequests, menu] = await Promise.all([
        tenantAPI.getAnnouncements(passkey),
        tenantAPI.getComplaints(passkey),
        tenantAPI.getVacantRooms(passkey),
        tenantAPI.getPayments(passkey),
        tenantAPI.getLeaveRequests(passkey),
        tenantAPI.getMenu(passkey)
      ]);

      setData({
        announcements: announcements.data,
        complaints: complaints.data,
        rooms: rooms.data,
        payments: payments.data,
        leaveRequests: leaveRequests.data,
        menu: menu.data
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tenantPasskey');
    localStorage.removeItem('tenantData');
    navigate('/tenant-login');
  };

  const tabs = [
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'complaints', label: 'Complaints', icon: AlertCircle },
    { id: 'rooms', label: 'Vacant Rooms', icon: Home },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'leave', label: 'Leave Requests', icon: DoorOpen },
    { id: 'menu', label: 'Food Menu', icon: Utensils }
  ];

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Header */}
      <div style={{ 
        background: 'white',
        borderBottom: '1px solid #e1e8ed',
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
            <h2 style={{ marginBottom: '0.25rem' }}>Welcome, {tenant?.name}</h2>
            <p style={{ color: '#6c757d', fontSize: '0.9rem', margin: 0 }}>
              Room {tenant?.roomNumber} • {tenant?.location}
            </p>
          </div>
          <button 
            className="btn btn-secondary"
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <LogOut size={18} />
            Logout
          </button>
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
        {activeTab === 'announcements' && <AnnouncementsTab data={data.announcements} />}
        {activeTab === 'complaints' && <ComplaintsTab data={data.complaints} passkey={passkey} onUpdate={loadData} />}
        {activeTab === 'rooms' && <RoomsTab data={data.rooms} />}
        {activeTab === 'payments' && <PaymentsTab data={data.payments} passkey={passkey} tenant={tenant} onUpdate={loadData} />}
        {activeTab === 'leave' && <LeaveTab data={data.leaveRequests} passkey={passkey} tenant={tenant} onUpdate={loadData} />}
        {activeTab === 'menu' && <MenuTab data={data.menu} />}
      </div>
    </div>
  );
};

// Announcements Tab Component
const AnnouncementsTab = ({ data }) => (
  <div>
    <h3 style={{ marginBottom: '1.5rem' }}>Recent Announcements</h3>
    {data.length === 0 ? (
      <div className="empty-state">
        <Bell size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
        <h3>No Announcements</h3>
        <p>There are no announcements at this time</p>
      </div>
    ) : (
      <div className="grid grid-2">
        {data.map(announcement => (
          <div key={announcement._id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h4 style={{ margin: 0 }}>{announcement.title}</h4>
              <span className={`badge badge-${announcement.priority}`}>
                {announcement.priority}
              </span>
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

// Complaints Tab Component
const ComplaintsTab = ({ data, passkey, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    category: 'other'
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await tenantAPI.submitComplaint(passkey, formData);
      setShowForm(false);
      setFormData({ subject: '', description: '', category: 'other' });
      onUpdate();
    } catch (error) {
      console.error('Error submitting complaint:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0 }}>My Complaints</h3>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'New Complaint'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h4 style={{ marginBottom: '1.5rem' }}>Submit a Complaint</h4>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="maintenance">Maintenance</option>
                <option value="cleanliness">Cleanliness</option>
                <option value="food">Food</option>
                <option value="noise">Noise</option>
                <option value="security">Security</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="input-group">
              <label>Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Brief description of the issue"
                required
              />
            </div>
            <div className="input-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide detailed information about your complaint"
                rows="4"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </form>
        </div>
      )}

      {data.length === 0 ? (
        <div className="empty-state">
          <FileText size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
          <h3>No Complaints</h3>
          <p>You haven't submitted any complaints yet</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {data.map(complaint => (
            <div key={complaint._id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h4 style={{ margin: 0 }}>{complaint.subject}</h4>
                <span className={`badge badge-${complaint.status}`}>
                  {complaint.status}
                </span>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#6c757d', marginBottom: '0.75rem' }}>
                <strong>Category:</strong> {complaint.category}
              </p>
              <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
                {complaint.description}
              </p>
              {complaint.adminResponse && (
                <div style={{ 
                  background: '#f8f9fa',
                  padding: '1rem',
                  borderRadius: '6px',
                  marginTop: '1rem'
                }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Admin Response:
                  </p>
                  <p style={{ fontSize: '0.9rem', color: '#6c757d', margin: 0 }}>
                    {complaint.adminResponse}
                  </p>
                </div>
              )}
              <small style={{ color: '#6c757d', display: 'block', marginTop: '1rem' }}>
                Submitted on {new Date(complaint.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Rooms Tab Component
const RoomsTab = ({ data }) => (
  <div>
    <h3 style={{ marginBottom: '1.5rem' }}>Available Rooms</h3>
    {data.length === 0 ? (
      <div className="empty-state">
        <Home size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
        <h3>No Vacant Rooms</h3>
        <p>There are no vacant rooms available at this time</p>
      </div>
    ) : (
      <div className="grid grid-3">
        {data.map(room => (
          <div key={room._id} className="card">
            <h4 style={{ marginBottom: '1rem' }}>Room {room.roomNumber}</h4>
            <div style={{ marginBottom: '0.75rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#6c757d', margin: '0.25rem 0' }}>
                <strong>Floor:</strong> {room.floor}
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6c757d', margin: '0.25rem 0' }}>
                <strong>Capacity:</strong> {room.capacity} persons
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6c757d', margin: '0.25rem 0' }}>
                <strong>Current Occupancy:</strong> {room.currentOccupancy}
              </p>
              <p style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0.75rem 0' }}>
                ₹{room.rentAmount}/month
              </p>
            </div>
            {room.amenities && room.amenities.length > 0 && (
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e1e8ed' }}>
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

// Payments Tab Component  
const PaymentsTab = ({ data, passkey, tenant, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: tenant?.rentAmount || 0,
    paymentMethod: 'cash',
    transactionId: '',
    paymentMonth: new Date().toLocaleString('default', { month: 'long' }),
    paymentYear: new Date().getFullYear()
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await tenantAPI.makePayment(passkey, formData);
      setShowForm(false);
      onUpdate();
    } catch (error) {
      console.error('Error making payment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0 }}>Payment History</h3>
        <button 
          className="btn btn-success"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Make Payment'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h4 style={{ marginBottom: '1.5rem' }}>Record Payment</h4>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Amount</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                placeholder="Enter amount"
                required
              />
            </div>
            <div className="input-group">
              <label>Payment Method</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                required
              >
                <option value="cash">Cash</option>
                <option value="online">Online Transfer</option>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
              </select>
            </div>
            <div className="input-group">
              <label>Transaction ID (if applicable)</label>
              <input
                type="text"
                value={formData.transactionId}
                onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                placeholder="Enter transaction ID"
              />
            </div>
            <div className="grid grid-2">
              <div className="input-group">
                <label>Month</label>
                <select
                  value={formData.paymentMonth}
                  onChange={(e) => setFormData({ ...formData, paymentMonth: e.target.value })}
                  required
                >
                  {['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Year</label>
                <input
                  type="number"
                  value={formData.paymentYear}
                  onChange={(e) => setFormData({ ...formData, paymentYear: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success" disabled={submitting}>
              {submitting ? 'Processing...' : 'Submit Payment'}
            </button>
          </form>
        </div>
      )}

      {data.length === 0 ? (
        <div className="empty-state">
          <CreditCard size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
          <h3>No Payments</h3>
          <p>You haven't made any payments yet</p>
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Month/Year</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Transaction ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map(payment => (
                <tr key={payment._id}>
                  <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                  <td>{payment.paymentMonth} {payment.paymentYear}</td>
                  <td>₹{payment.amount}</td>
                  <td style={{ textTransform: 'capitalize' }}>{payment.paymentMethod}</td>
                  <td>{payment.transactionId || '-'}</td>
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
};

// Leave Requests Tab Component
const LeaveTab = ({ data, passkey, tenant, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    leaveDate: '',
    reason: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await tenantAPI.submitLeaveRequest(passkey, formData);
      setShowForm(false);
      setFormData({ leaveDate: '', reason: '' });
      onUpdate();
    } catch (error) {
      console.error('Error submitting leave request:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0 }}>Leave Requests</h3>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Request Leave'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h4 style={{ marginBottom: '1.5rem' }}>Submit Leave Request</h4>
          <div className="alert alert-info" style={{ marginBottom: '1.5rem' }}>
            Please submit your leave request at least one month in advance to be eligible for a refund.
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Expected Leave Date</label>
              <input
                type="date"
                value={formData.leaveDate}
                onChange={(e) => setFormData({ ...formData, leaveDate: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <label>Reason</label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Please provide a reason for leaving"
                rows="4"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      )}

      {data.length === 0 ? (
        <div className="empty-state">
          <DoorOpen size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
          <h3>No Leave Requests</h3>
          <p>You haven't submitted any leave requests yet</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {data.map(request => (
            <div key={request._id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h4 style={{ margin: 0 }}>Leave Request</h4>
                <span className={`badge badge-${request.status}`}>
                  {request.status}
                </span>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#6c757d', marginBottom: '0.75rem' }}>
                <strong>Leave Date:</strong> {new Date(request.leaveDate).toLocaleDateString()}
              </p>
              <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
                <strong>Reason:</strong> {request.reason}
              </p>
              {request.refundAmount > 0 && (
                <p style={{ fontSize: '0.9rem', color: '#27ae60', fontWeight: 600, marginBottom: '0.75rem' }}>
                  Refund Amount: ₹{request.refundAmount}
                </p>
              )}
              {request.adminNotes && (
                <div style={{ 
                  background: '#f8f9fa',
                  padding: '1rem',
                  borderRadius: '6px',
                  marginTop: '1rem'
                }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Admin Notes:
                  </p>
                  <p style={{ fontSize: '0.9rem', color: '#6c757d', margin: 0 }}>
                    {request.adminNotes}
                  </p>
                </div>
              )}
              <small style={{ color: '#6c757d', display: 'block', marginTop: '1rem' }}>
                Requested on {new Date(request.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Menu Tab Component
const MenuTab = ({ data }) => {
  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const sortedMenu = [...data].sort((a, b) => daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day));

  return (
    <div>
      <h3 style={{ marginBottom: '1.5rem' }}>Weekly Food Menu</h3>
      {data.length === 0 ? (
        <div className="empty-state">
          <Utensils size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
          <h3>No Menu Available</h3>
          <p>The food menu hasn't been set yet</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {sortedMenu.map(menu => (
            <div key={menu._id} className="card">
              <h4 style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid #e1e8ed' }}>
                {menu.day}
              </h4>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TenantDashboard;