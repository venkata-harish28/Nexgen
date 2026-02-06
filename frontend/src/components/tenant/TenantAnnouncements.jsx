import React, { useState } from 'react';
import { Bell, Search, Calendar, ChevronDown, X, Eye, Filter } from 'lucide-react';

const TenantAnnouncements = ({ data = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('DESC');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const safeData = Array.isArray(data) ? data : [];

  const filteredData = safeData
    .filter(announcement => {
      const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = !selectedDate || 
                         new Date(announcement.createdAt).toDateString() === new Date(selectedDate).toDateString();
      return matchesSearch && matchesDate;
    })
    .sort((a, b) => {
      if (sortBy === 'DESC') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-0">
      {/* Header Section - Responsive */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bell size={20} className="sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Announcements</h3>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Stay updated with latest notifications</p>
            </div>
          </div>
          
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold"
          >
            <Filter size={16} />
            Filters
          </button>
        </div>

        {/* Filters Section - Responsive */}
        <div className={`${showFilters ? 'block' : 'hidden'} sm:block space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4`}>
          {/* Sort By */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
              >
                <option value="DESC">Newest First</option>
                <option value="ASC">Oldest First</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Search - Full width on mobile */}
          <div className="sm:col-span-2">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search size={16} className="sm:w-5 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search announcements..."
                className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Announcements - Card View for Mobile, Table for Desktop */}
      {filteredData.length === 0 ? (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-8 sm:p-16 text-center border border-gray-200">
          <Bell size={40} className="sm:w-12 sm:h-12 mx-auto mb-4 opacity-30 text-gray-400" />
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">No Announcements Found</h3>
          <p className="text-sm sm:text-base text-gray-600">
            {searchTerm || selectedDate 
              ? 'Try adjusting your search or filters' 
              : 'There are no announcements at this time'}
          </p>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-3">
            {filteredData.map(announcement => (
              <div 
                key={announcement._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                onClick={() => setSelectedAnnouncement(announcement)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-gray-900 text-sm flex-1 pr-2">
                    {announcement.title}
                  </h4>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold border flex-shrink-0 ${getPriorityColor(announcement.priority)}`}>
                    {announcement.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {announcement.content}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{formatDate(announcement.createdAt)}</span>
                  <button className="flex items-center gap-1 text-blue-600 font-semibold">
                    <Eye size={14} />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Announcement
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredData.map(announcement => (
                    <tr key={announcement._id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">
                            {formatDate(announcement.createdAt)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatTime(announcement.createdAt)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-900 mb-1">
                            {announcement.title}
                          </span>
                          <span className="text-sm text-gray-600 line-clamp-2">
                            {announcement.content}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(announcement.priority)}`}>
                          {announcement.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {announcement.location}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedAnnouncement(announcement)}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                        >
                          <Eye size={16} />
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Results Count */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredData.length}</span> announcement{filteredData.length !== 1 ? 's' : ''}
                {searchTerm && <span> matching "<span className="font-semibold">{searchTerm}</span>"</span>}
              </p>
            </div>
          </div>
        </>
      )}

      {/* Details Modal - Responsive */}
      {selectedAnnouncement && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          onClick={() => setSelectedAnnouncement(null)}
        >
          <div 
            className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex justify-between items-center rounded-t-xl sm:rounded-t-2xl z-10">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bell size={16} className="sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Announcement Details</h3>
              </div>
              <button 
                onClick={() => setSelectedAnnouncement(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex-shrink-0"
              >
                <X size={20} className="sm:w-6 sm:h-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6">
              {/* Priority Badge */}
              <div className="mb-4 sm:mb-6">
                <span className={`inline-flex px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold border ${getPriorityColor(selectedAnnouncement.priority)}`}>
                  {selectedAnnouncement.priority.toUpperCase()} PRIORITY
                </span>
              </div>

              {/* Title */}
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                {selectedAnnouncement.title}
              </h4>

              {/* Meta Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Location</p>
                  <p className="text-sm sm:text-base text-gray-900">{selectedAnnouncement.location}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Posted On</p>
                  <p className="text-sm sm:text-base text-gray-900">
                    {formatDate(selectedAnnouncement.createdAt)} at {formatTime(selectedAnnouncement.createdAt)}
                  </p>
                </div>
              </div>

              {/* Full Content */}
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-3">Message</p>
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <p className="text-sm sm:text-base text-gray-900 whitespace-pre-wrap leading-relaxed">
                    {selectedAnnouncement.content}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-4 sm:mt-6 flex justify-end">
                <button 
                  onClick={() => setSelectedAnnouncement(null)}
                  className="w-full sm:w-auto px-6 py-2.5 sm:py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm sm:text-base font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantAnnouncements;