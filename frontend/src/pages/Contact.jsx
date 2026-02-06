import React, { useState } from 'react';
import NavBar from './NavBar';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setSubmitStatus('');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <NavBar />   
      
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-green-500 to-green-400 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <section className="py-8 sm:py-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6 tracking-tight leading-tight text-center lg:text-left">
            Let's <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mb-8 sm:mb-12 leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
            Have questions about your next adventure? We're here to help!
          </p>
        </section>

        {/* Main Content Grid - Responsive */}
        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 pb-12 sm:pb-20">
          {/* Contact Info - Responsive Cards */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Visit Us Card */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 hover:border-orange-500 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6">
                📍
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Visit Us</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                123 Traveler's Lane<br />
                Downtown District<br />
                City, State 12345
              </p>
            </div>

            {/* Call Us Card */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 hover:border-orange-500 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6">
                📞
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Call Us</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-2">
                <span className="font-semibold text-gray-900">Front Desk:</span>{' '}
                <a href="tel:+1234567890" className="text-orange-500 hover:text-orange-600 transition-colors break-all">
                  +1 (234) 567-890
                </a>
              </p>
              <p className="text-sm sm:text-base text-gray-600">
                <span className="font-semibold text-gray-900">Available:</span> 24/7
              </p>
            </div>

            {/* Email Us Card */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 hover:border-orange-500 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6">
                ✉️
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Email Us</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-2">
                <span className="font-semibold text-gray-900">General:</span>{' '}
                <a href="mailto:hello@nexgenhostels.com" className="text-orange-500 hover:text-orange-600 transition-colors break-all">
                  hello@nexgenhostels.com
                </a>
              </p>
            </div>

            {/* Social Media - Responsive */}
            <div className="pt-6 sm:pt-8 border-t-2 border-gray-200">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Follow Our Journey</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {['📷', '👥', '🐦', '🎵', '📺'].map((icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gray-50 border-2 border-gray-200 flex items-center justify-center text-xl sm:text-2xl hover:bg-orange-500 hover:border-orange-500 hover:-translate-y-1 hover:rotate-3 transition-all duration-300 hover:shadow-lg"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form - Responsive */}
          <div className="lg:col-span-3">
            <div className="bg-white border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-sm sm:text-base text-gray-600">We'll get back to you within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Name Row - Responsive */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all"
                    />
                  </div>
                </div>

                {/* Email & Phone - Responsive */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all"
                  >
                    <option value="">Select a topic...</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="general">General Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell us how we can help..."
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all resize-y"
                  />
                </div>

                {/* Submit Button - Responsive */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base md:text-lg text-white transition-all duration-300 ${
                    submitStatus === 'success'
                      ? 'bg-gradient-to-r from-green-500 to-green-600'
                      : 'bg-gradient-to-r from-green-500 to-green-600 hover:-translate-y-1 hover:shadow-xl'
                  } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Sending...' : submitStatus === 'success' ? '✓ Message Sent!' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -50px); }
          66% { transform: translate(-20px, 20px); }
        }

        .animate-float {
          animation: float 20s infinite ease-in-out;
        }

        .animate-float-delayed {
          animation: float 20s infinite ease-in-out 7s;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;