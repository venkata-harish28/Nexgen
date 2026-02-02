import React from 'react';
import NavBar from './NavBar';

const AboutPage = () => {
  const stats = [
    { number: '50+', label: 'Locations Worldwide' },
    { number: '100k+', label: 'Happy Travelers' },
    { number: '24/7', label: 'Support Available' },
    { number: '4.8★', label: 'Average Rating' }
  ];

  const values = [
    {
      icon: '🌍',
      title: 'Global Community',
      description: 'Connect with travelers from every corner of the world. Share stories, make friends, and create memories that last a lifetime.'
    },
    {
      icon: '💚',
      title: 'Sustainable Travel',
      description: 'We\'re committed to eco-friendly practices. Solar panels, waste reduction, and local partnerships make every stay planet-positive.'
    },
    {
      icon: '✨',
      title: 'Modern Comfort',
      description: 'Experience hostel life reimagined. High-speed WiFi, premium beds, spacious lounges, and Instagram-worthy spaces.'
    },
    {
      icon: '🎯',
      title: 'Local Experiences',
      description: 'Discover authentic adventures curated by locals. From hidden gems to cultural immersions, we help you explore like a local.'
    },
    {
      icon: '🔒',
      title: 'Safe & Secure',
      description: 'Your safety is our priority. 24/7 security, secure lockers, verified guests, and trained staff ensure peace of mind.'
    },
    {
      icon: '🎉',
      title: 'Vibrant Events',
      description: 'Never a dull moment! Join daily activities, cultural nights, city tours, and social events designed for connection.'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      image: '👩‍💼',
      bio: 'Former backpacker turned hospitality innovator'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Operations',
      image: '👨‍💼',
      bio: 'Bringing 15 years of hospitality excellence'
    },
    {
      name: 'Aisha Patel',
      role: 'Community Director',
      image: '👩‍🎨',
      bio: 'Creating connections across cultures'
    },
    {
      name: 'Lucas Tanaka',
      role: 'Sustainability Lead',
      image: '👨‍🔬',
      bio: 'Making travel better for the planet'
    }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
        <NavBar/>
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-green-500 to-emerald-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-10 -left-10 w-[400px] h-[400px] bg-gradient-to-br from-teal-600 to-teal-500 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gradient-to-br from-lime-400 to-lime-300 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-8 animate-fade-in-down">
          <h1 className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent tracking-tight">
           
          </h1>
        </header>

        {/* Hero Section */}
        <section className="py-12 animate-fade-in">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
            About <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">NexGen</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mb-8 leading-relaxed">
            We're redefining what it means to be a hostel. More than just a place to sleep, NexGen is where adventures begin, friendships form, and memories are made.
          </p>
        </section>

        {/* Stats Section */}
        <section className="py-12 animate-slide-up">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-3xl p-8 text-center hover:border-green-500 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-green-500/10"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm lg:text-base font-medium text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 animate-fade-in">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl h-[400px] lg:h-[500px] flex items-center justify-center text-8xl shadow-2xl shadow-green-500/20">
                🏨
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h3 className="text-4xl font-bold text-gray-900">Our Story</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                NexGen Hostels was born from a simple idea: travel should bring people together, not just move them around. Founded in 2018 by a group of passionate travelers, we set out to create spaces that feel like home, no matter where you are in the world.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                What started as a single hostel in Barcelona has grown into a global network of 50+ locations. But we've never lost sight of what matters most—creating genuine connections, supporting local communities, and making sustainable travel accessible to everyone.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we're proud to be more than just a hostel chain. We're a movement of conscious travelers, local partners, and hospitality innovators working together to make the world a smaller, friendlier place.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="text-center mb-12 animate-fade-in">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">What We Stand For</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our values guide everything we do, from how we design our spaces to how we treat our guests and communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:border-green-500 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-green-500/10 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-3xl mb-6">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-10 text-white shadow-2xl shadow-green-500/20 animate-slide-up">
              <div className="text-5xl mb-6">🎯</div>
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg text-green-50 leading-relaxed">
                To make meaningful travel accessible to everyone by creating welcoming spaces where diverse cultures connect, sustainable practices thrive, and unforgettable experiences happen naturally.
              </p>
            </div>
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl p-10 text-white shadow-2xl shadow-teal-500/20 animate-slide-up animation-delay-100">
              <div className="text-5xl mb-6">🔮</div>
              <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg text-teal-50 leading-relaxed">
                To become the world's leading community-driven hostel network, setting new standards for sustainable hospitality while inspiring a generation of conscious travelers to explore with purpose.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 pb-20">
          <div className="text-center mb-12 animate-fade-in">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Meet the Team</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind NexGen who make the magic happen every day.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-3xl p-8 text-center hover:border-green-500 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-green-500/10 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-7xl mb-4">{member.image}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
                <p className="text-sm font-medium text-green-600 mb-3">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 pb-20">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-12 lg:p-16 text-center text-white shadow-2xl shadow-green-500/20 animate-slide-up">
            <h3 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Join the NexGen Family?</h3>
            <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
              Book your stay today and become part of a global community of adventurers, dreamers, and conscious travelers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                Book Now
              </button>
              <button className="px-8 py-4 bg-green-700 text-white rounded-xl font-bold text-lg border-2 border-white/20 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                Explore Locations
              </button>
            </div>
          </div>
        </section>
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

export default AboutPage;