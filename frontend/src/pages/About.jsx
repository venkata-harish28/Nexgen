import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const AboutPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('why');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavBar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-teal-500">NextGen</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your perfect home away from home. Experience comfortable living with modern amenities and a vibrant community.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('why')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'why'
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              The Why
            </button>
            <button
              onClick={() => setActiveTab('when')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'when'
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              The When
            </button>
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'plan'
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              The Plan
            </button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="mb-16">
          {/* The Why Section */}
          {activeTab === 'why' && (
            <div className="grid lg:grid-cols-2 gap-12 items-center animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  We didn't find it for us,
                </h2>
                <h3 className="text-3xl font-bold text-teal-500 mb-6">
                  so we created it for you
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  We are a team of people who grew up with limited options - traditional hostels 
                  and cramped PGs. At NextGen, we've created something different: a space designed 
                  by people who understand your needs, for people in your shoes. We're inspired by 
                  you and committed to providing a living experience that feels like home.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/build.png" 
                  alt="Modern NextGen building"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* The When Section */}
          {activeTab === 'when' && (
            <div className="grid lg:grid-cols-2 gap-12 items-center animate-fade-in">
              <div className="rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
                <img 
                  src="/build1.png" 
                  alt="NextGen facilities"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  You needed a place like home,
                </h2>
                <h3 className="text-3xl font-bold text-teal-500 mb-6">
                  so we built it for you
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Founded with a vision to revolutionize student and professional living spaces, 
                  NextGen was born from the understanding that today's generation needs more than 
                  just a room. We've combined modern amenities, community spaces, and a supportive 
                  environment to create a living experience that truly feels like home.
                </p>
              </div>
            </div>
          )}

          {/* The Plan Section */}
          {activeTab === 'plan' && (
            <div className="grid lg:grid-cols-2 gap-12 items-center animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  You moved to a new city,
                </h2>
                <h3 className="text-3xl font-bold text-teal-500 mb-6">
                  so we're here to welcome you
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Today, NextGen has grown into a trusted name in premium living spaces. 
                  From our humble beginnings to multiple properties across key locations, 
                  we've built a community that feels like family. Our mission is to ensure 
                  that wherever you are, you have a comfortable, safe, and vibrant place to call home.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/build7.png" 
                  alt="Community at NextGen"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose <span className="text-teal-500">NextGen?</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Modern Spaces</h3>
              <p className="text-gray-600">
                Fully furnished rooms with contemporary design and all essential amenities
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Vibrant Community</h3>
              <p className="text-gray-600">
                Connect with like-minded individuals and build lasting friendships
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Security</h3>
              <p className="text-gray-600">
                Round-the-clock security and CCTV surveillance for your peace of mind
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast WiFi</h3>
              <p className="text-gray-600">
                High-speed internet connectivity for work, study, and entertainment
              </p>
            </div>

            {/* Feature 5 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Terms</h3>
              <p className="text-gray-600">
                Monthly and yearly rental options to suit your needs and schedule
              </p>
            </div>

            {/* Feature 6 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Support Staff</h3>
              <p className="text-gray-600">
                Dedicated team to assist you with all your needs and concerns
              </p>
            </div>
          </div>
        </div>

        {/* Our Locations */}
        <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Our <span className="text-teal-500">Locations</span>
          </h2>
          <p className="text-gray-600 text-center mb-8 text-lg">
            Premium properties across multiple prime locations
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Gachibowli</h3>
              <p className="text-gray-600 text-sm mt-2">Tech Hub Location</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Gowlidobbi</h3>
              <p className="text-gray-600 text-sm mt-2">Peaceful Neighborhood</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Pocharam</h3>
              <p className="text-gray-600 text-sm mt-2">Upcoming Area</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Madhapur</h3>
              <p className="text-gray-600 text-sm mt-2">Central Location</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied residents who have made NextGen their home
          </p>
          <button 
            onClick={() => navigate('/pages/Booking')}
            className="px-12 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-bold text-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 shadow-lg"
          >
            Book Your Room Now
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;