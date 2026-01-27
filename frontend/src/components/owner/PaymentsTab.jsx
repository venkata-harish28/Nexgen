import React from 'react';
import { CreditCard } from 'lucide-react';

const PaymentsTab = ({ data }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Payment Records</h3>
      
      {data.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center">
          <CreditCard size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">No Payments</h3>
          <p className="text-gray-600">No payments have been recorded</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Tenant</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Month/Year</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map(payment => (
                  <tr key={payment._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 text-sm text-gray-900">{payment.tenantName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{payment.roomNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{payment.location}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{payment.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 capitalize">{payment.paymentMethod}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {payment.paymentMonth} {payment.paymentYear}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsTab;