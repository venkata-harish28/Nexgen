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
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      
      // Reset form after 3 seconds
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
    
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
        <NavBar/>   
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-green-500 to-green-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-10 -left-10 w-[400px] h-[400px] bg-gradient-to-br from-blue-600 to-blue-500 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-8 animate-fade-in-down">
          <h1 className="text-3xl font-black bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent tracking-tight">
            
          </h1>
        </header>

        {/* Hero Section */}
        <section className="py-12 animate-fade-in">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
            Let's <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mb-12 leading-relaxed">
            Have questions about your next adventure? We're here to help! Reach out and let's make your hostel experience unforgettable.
          </p>
        </section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8 pb-20">
          {/* Contact Info - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Visit Us Card */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:border-orange-500 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 animate-slide-up">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-3xl mb-6">
                📍
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Visit Us</h3>
              <p className="text-gray-600 leading-relaxed">
                123 Traveler's Lane<br />
                Downtown District<br />
                City, State 12345
              </p>
            </div>

            {/* Call Us Card */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:border-orange-500 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 animate-slide-up animation-delay-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-3xl mb-6">
                📞
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Call Us</h3>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold text-gray-900">Front Desk:</span>{' '}
                <a href="tel:+1234567890" className="text-orange-500 hover:text-orange-600 transition-colors">
                  +1 (234) 567-890
                </a>
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold text-gray-900">Reservations:</span>{' '}
                <a href="tel:+1234567891" className="text-orange-500 hover:text-orange-600 transition-colors">
                  +1 (234) 567-891
                </a>
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">Available:</span> 24/7
              </p>
            </div>

            {/* Email Us Card */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:border-orange-500 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 animate-slide-up animation-delay-200">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-3xl mb-6">
                ✉️
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Email Us</h3>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold text-gray-900">General:</span>{' '}
                <a href="mailto:hello@nexgenhostels.com" className="text-orange-500 hover:text-orange-600 transition-colors">
                  hello@nexgenhostels.com
                </a>
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold text-gray-900">Bookings:</span>{' '}
                <a href="mailto:book@nexgenhostels.com" className="text-orange-500 hover:text-orange-600 transition-colors">
                  book@nexgenhostels.com
                </a>
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">Support:</span>{' '}
                <a href="mailto:support@nexgenhostels.com" className="text-orange-500 hover:text-orange-600 transition-colors">
                  support@nexgenhostels.com
                </a>
              </p>
            </div>

            {/* Social Media Section */}
            <div className="pt-8 border-t-2 border-gray-200 animate-slide-up animation-delay-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow Our Journey</h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="w-14 h-14 rounded-xl bg-gray-50 border-2 border-gray-200 flex items-center justify-center text-2xl hover:bg-orange-500 hover:border-orange-500 hover:-translate-y-1 hover:rotate-3 transition-all duration-300 hover:shadow-lg"
                  title="Instagram"
                >
                  📷
                </a>
                <a
                  href="#"
                  className="w-14 h-14 rounded-xl bg-gray-50 border-2 border-gray-200 flex items-center justify-center text-2xl hover:bg-orange-500 hover:border-orange-500 hover:-translate-y-1 hover:rotate-3 transition-all duration-300 hover:shadow-lg"
                  title="Facebook"
                >
                  👥
                </a>
                <a
                  href="#"
                  className="w-14 h-14 rounded-xl bg-gray-50 border-2 border-gray-200 flex items-center justify-center text-2xl hover:bg-orange-500 hover:border-orange-500 hover:-translate-y-1 hover:rotate-3 transition-all duration-300 hover:shadow-lg"
                  title="Twitter"
                >
                  🐦
                </a>
                <a
                  href="#"
                  className="w-14 h-14 rounded-xl bg-gray-50 border-2 border-gray-200 flex items-center justify-center text-2xl hover:bg-orange-500 hover:border-orange-500 hover:-translate-y-1 hover:rotate-3 transition-all duration-300 hover:shadow-lg"
                  title="TikTok"
                >
                  🎵
                </a>
                <a
                  href="#"
                  className="w-14 h-14 rounded-xl bg-gray-50 border-2 border-gray-200 flex items-center justify-center text-2xl hover:bg-orange-500 hover:border-orange-500 hover:-translate-y-1 hover:rotate-3 transition-all duration-300 hover:shadow-lg"
                  title="YouTube"
                >
                  📺
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Side */}
          <div className="lg:col-span-3">
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 lg:p-10 shadow-sm animate-slide-up animation-delay-400">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Email & Phone Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all duration-300"
                  >
                    <option value="">Select a topic...</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="general">General Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="group">Group Reservations</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 resize-y"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg text-white transition-all duration-300 relative overflow-hidden ${
                    submitStatus === 'success'
                      ? 'bg-gradient-to-r from-green-500 to-green-600'
                      : 'bg-gradient-to-r from-green-500 to-green-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/30'
                  } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <span className="relative z-10">
                    {isSubmitting ? 'Sending...' : submitStatus === 'success' ? '✓ Message Sent!' : 'Send Message'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
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

        .animate-float-slow {
          animation: float 20s infinite ease-in-out 14s;
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out 0.3s both;
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out both;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;