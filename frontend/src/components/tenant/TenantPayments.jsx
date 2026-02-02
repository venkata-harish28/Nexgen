import React, { useState } from 'react';
import { CreditCard, Smartphone, Building2, Wallet, CheckCircle, XCircle, Clock } from 'lucide-react';
import { tenantAPI } from '../../services/api';

const TenantPayments = ({ data, passkey, tenant, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1); // 1: Details, 2: Payment Method, 3: Processing
  const [formData, setFormData] = useState({
    amount: tenant?.rentAmount || 0,
    paymentMethod: '',
    transactionId: '',
    paymentMonth: new Date().toLocaleString('default', { month: 'long' }),
    paymentYear: new Date().getFullYear()
  });
  const [submitting, setSubmitting] = useState(false);

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI',
      icon: <Smartphone size={24} />,
      description: 'Pay using UPI apps',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 border-purple-300'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard size={24} />,
      description: 'Pay using your card',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 border-blue-300'
    },
    {
      id: 'online',
      name: 'Net Banking',
      icon: <Building2 size={24} />,
      description: 'Bank transfer',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 border-green-300'
    },
    {
      id: 'cash',
      name: 'Cash',
      icon: <Wallet size={24} />,
      description: 'Pay at reception',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50 border-amber-300'
    }
  ];

  const handlePaymentMethodSelect = (method) => {
    setFormData({ ...formData, paymentMethod: method });
    setPaymentStep(3);
    simulatePayment(method);
  };

  const simulatePayment = async (method) => {
    setSubmitting(true);
    
    // Simulate payment processing
    setTimeout(async () => {
      try {
        // Generate transaction ID
        const txnId = `TXN${Date.now()}${Math.random().toString(36).substring(7).toUpperCase()}`;
        
        const paymentData = {
          ...formData,
          paymentMethod: method,
          transactionId: txnId
        };
        
        await tenantAPI.makePayment(passkey, paymentData);
        
        setShowForm(false);
        setPaymentStep(1);
        setFormData({
          amount: tenant?.rentAmount || 0,
          paymentMethod: '',
          transactionId: '',
          paymentMonth: new Date().toLocaleString('default', { month: 'long' }),
          paymentYear: new Date().getFullYear()
        });
        onUpdate();
        
        alert(`Payment successful! Transaction ID: ${txnId}`);
      } catch (error) {
        console.error('Error making payment:', error);
        alert('Payment failed. Please try again.');
        setPaymentStep(2);
      } finally {
        setSubmitting(false);
      }
    }, 2000);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-emerald-500 text-white';
      case 'pending': return 'bg-amber-500 text-white';
      case 'failed': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle size={16} />;
      case 'pending': return <Clock size={16} />;
      case 'failed': return <XCircle size={16} />;
      default: return null;
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
              <CreditCard size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Payment History</h3>
              <p className="text-sm text-gray-600">Track and manage your payments</p>
            </div>
          </div>
          <button 
            className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold shadow-md"
            onClick={() => {
              setShowForm(!showForm);
              setPaymentStep(1);
            }}
          >
            {showForm ? 'Cancel' : '+ Make Payment'}
          </button>
        </div>
      </div>

      {/* Payment Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-green-200">
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${paymentStep >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${paymentStep >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  1
                </div>
                <span className="font-semibold">Details</span>
              </div>
              <div className={`w-16 h-1 ${paymentStep >= 2 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center gap-2 ${paymentStep >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${paymentStep >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  2
                </div>
                <span className="font-semibold">Payment</span>
              </div>
              <div className={`w-16 h-1 ${paymentStep >= 3 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center gap-2 ${paymentStep >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${paymentStep >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  3
                </div>
                <span className="font-semibold">Confirm</span>
              </div>
            </div>
          </div>

          {/* Step 1: Payment Details */}
          {paymentStep === 1 && (
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                      placeholder="Enter amount"
                      required
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg font-semibold"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Monthly rent: ₹{tenant?.rentAmount.toLocaleString('en-IN')}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Payment For Month <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.paymentMonth}
                    onChange={(e) => setFormData({ ...formData, paymentMonth: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {months.map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.paymentYear}
                    onChange={(e) => setFormData({ ...formData, paymentYear: parseInt(e.target.value) })}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setPaymentStep(2)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold shadow-md"
                >
                  Continue to Payment
                </button>
                <button 
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Choose Payment Method */}
          {paymentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Choose Payment Method</h4>
                <p className="text-gray-600">Select how you would like to pay</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map(method => (
                  <button
                    key={method.id}
                    onClick={() => handlePaymentMethodSelect(method.id)}
                    className={`p-6 border-2 rounded-xl hover:shadow-lg transition-all duration-200 text-left ${method.bgColor} hover:scale-105`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center text-white mb-4 shadow-md`}>
                      {method.icon}
                    </div>
                    <h5 className="text-lg font-bold text-gray-900 mb-1">{method.name}</h5>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setPaymentStep(1)}
                className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-semibold"
              >
                Back to Details
              </button>
            </div>
          )}

          {/* Step 3: Processing */}
          {paymentStep === 3 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <CreditCard size={40} className="text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment...</h4>
              <p className="text-gray-600 mb-6">Please wait while we process your payment</p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-600"></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Payment History */}
      {data.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center border border-gray-200">
          <CreditCard size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">No Payments Yet</h3>
          <p className="text-gray-600">You haven't made any payments yet. Start by making your first payment above.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Month/Year</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map(payment => (
                  <tr key={payment._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {new Date(payment.paymentDate).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {payment.paymentMonth} {payment.paymentYear}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-green-600">
                      ₹{payment.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                      {payment.paymentMethod}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      {payment.transactionId || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase shadow-sm ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Footer */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t-2 border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Total Payments: <span className="font-bold text-gray-900">{data.length}</span>
              </p>
              <p className="text-sm text-gray-600">
                Total Amount: <span className="font-bold text-green-600">
                  ₹{data.reduce((sum, p) => sum + p.amount, 0).toLocaleString('en-IN')}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantPayments;