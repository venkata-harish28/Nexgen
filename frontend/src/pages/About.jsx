// About.jsx - Responsive version
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const AboutPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('why');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavBar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            About <span className="text-teal-500">NextGen</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Your perfect home away from home. Experience comfortable living with modern amenities.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 sm:mb-12 overflow-x-auto">
          <div className="inline-flex bg-white rounded-full p-1.5 sm:p-2 shadow-lg min-w-max">
            {['why', 'when', 'plan'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                The {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections - Responsive */}
        <div className="mb-12 sm:mb-16">
          {activeTab === 'why' && (
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center animate-fade-in">
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  We didn't find it for us,
                </h2>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-500 mb-4 sm:mb-6">
                  so we created it for you
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                  We are a team of people who grew up with limited options. At NextGen, we've created 
                  something different: a space designed by people who understand your needs.
                </p>
              </div>
              <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/build.png" 
                  alt="Modern NextGen building"
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-full object-cover"
                />
              </div>
            </div>
          )}

          {activeTab === 'when' && (
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center animate-fade-in">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/build1.png" 
                  alt="NextGen facilities"
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  You needed a place like home,
                </h2>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-500 mb-4 sm:mb-6">
                  so we built it for you
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                  Founded with a vision to revolutionize student and professional living spaces, 
                  NextGen was born from understanding that today's generation needs more than just a room.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'plan' && (
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center animate-fade-in">
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  You moved to a new city,
                </h2>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-500 mb-4 sm:mb-6">
                  so we're here to welcome you
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                  Today, NextGen has grown into a trusted name. From our humble beginnings to multiple 
                  properties, we've built a community that feels like family.
                </p>
              </div>
              <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/build7.png" 
                  alt="Community at NextGen"
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Features Grid - Responsive */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
            Why Choose <span className="text-teal-500">NextGen?</span>
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: '🏠', title: 'Modern Spaces', desc: 'Fully furnished rooms with contemporary design' },
              { icon: '👥', title: 'Vibrant Community', desc: 'Connect with like-minded individuals' },
              { icon: '🛡️', title: '24/7 Security', desc: 'Round-the-clock security and CCTV surveillance' },
              { icon: '⚡', title: 'Fast WiFi', desc: 'High-speed internet connectivity' },
              { icon: '⏰', title: 'Flexible Terms', desc: 'Monthly and yearly rental options' },
              { icon: '😊', title: 'Support Staff', desc: 'Dedicated team to assist you' }
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-2xl sm:text-3xl">
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Locations - Responsive Grid */}
        <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3 sm:mb-4">
            Our <span className="text-teal-500">Locations</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center mb-6 sm:mb-8">
            Premium properties across multiple prime locations
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {['Gachibowli', 'Gowlidobbi', 'Pocharam', 'Madhapur'].map((location) => (
              <div key={location} className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <span className="text-lg sm:text-xl">📍</span>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">{location}</h3>
                <p className="text-xs sm:text-sm text-gray-600">Prime Location</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA - Responsive */}
        <div className="text-center pb-8 sm:pb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join hundreds of satisfied residents who have made NextGen their home
          </p>
          <button 
            onClick={() => navigate('/pages/Booking')}
            className="px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-bold text-sm sm:text-base md:text-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 shadow-lg"
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