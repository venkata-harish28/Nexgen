import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram } from "lucide-react";
import Navbar from './NavBar';

import { Building2, Users, ShieldCheck, Bell, CreditCard, Sparkles, ArrowRight, Search, MapPin, Star, Wifi, Coffee, Utensils, Dumbbell, Book, Heart, Users2, Home as HomeIcon, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  const isDesktop = windowWidth > 1024;

  const properties = [
    {
      name: 'Single Share',
      price: '₹25,000',
      image: '/1share.png'
    },
    {
      name: 'Two Share',
      price: '₹15,000',
      image: '/2share.png'
    },
    {
      name: 'Three Share',
      price: '₹11,000',
      image: '/3share.jpeg',
    },
    {
      name: 'Four Share',
      price: '₹9,000',
      image: '/4share.png'
    },
    {
      name: 'Five Share',
      price: '₹8,000',
      image: '/5share.png'
    }
  ];

  const cardsToShow = isMobile ? 1 : isTablet ? 2 : 3;
  const maxSlide = properties.length - cardsToShow;

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <Navbar/>

      {/* Hero Section - Responsive */}
      <div style={{
        backgroundImage: 'url(/4share.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: isMobile ? '4rem 1rem' : isTablet ? '6rem 2rem' : '8rem 2rem',
        position: 'relative',
        overflow: 'hidden',
        minHeight: isMobile ? '500px' : isTablet ? '600px' : '700px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 0
        }} />

        <div className="container" style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          position: 'relative', 
          zIndex: 1,
          padding: isMobile ? '0 1rem' : '0 2rem'
        }}>
          <div style={{
            maxWidth: isMobile ? '100%' : '900px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: isMobile ? '2.5rem' : isTablet ? '3.5rem' : '5rem',
              marginBottom: '1.5rem',
              color: 'white',
              fontWeight: 800,
              letterSpacing: isMobile ? '-1px' : '-3px',
              lineHeight: 1.1,
              textShadow: '3px 3px 6px rgba(0,0,0,0.4)'
            }}>
              <span style={{ color: '#22c55e' }}>NextGen</span>
              <br />
              it's your new home
            </h1>

            <p style={{
              fontSize: isMobile ? '1.2rem' : isTablet ? '1.6rem' : '2rem',
              marginBottom: '2.5rem',
              color: 'rgba(255,255,255,0.95)',
              fontWeight: 400,
              fontStyle: 'italic',
              textShadow: '2px 2px 4px rgba(0,0,0,0.4)'
            }}>
              - more than just living...
            </p>

            <button
              onClick={() => navigate('/pages/Booking')}
              style={{
                background: '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: isMobile ? '1rem 2.5rem' : isTablet ? '1.2rem 3.5rem' : '1.5rem 4.5rem',
                fontSize: isMobile ? '1rem' : isTablet ? '1.2rem' : '1.4rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 8px 24px rgba(34, 197, 94, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#16a34a';
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(34, 197, 94, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#22c55e';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.4)';
              }}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Featured Properties - Responsive Carousel */}
      <div style={{ 
        padding: isMobile ? '3rem 1rem' : isTablet ? '4rem 1.5rem' : '5rem 2rem', 
        background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)' 
      }}>
        <div className="container" style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '4rem' }}>
            <h2 style={{
              fontSize: isMobile ? '1.8rem' : isTablet ? '2.5rem' : '3rem',
              marginBottom: '1rem',
              fontWeight: 800,
              color: '#2d3748',
              letterSpacing: '-1px',
              padding: isMobile ? '0 1rem' : '0'
            }}>
              The Rooms That We Are <span style={{ color: '#22c55e' }}>Offering</span>
            </h2>
            <p style={{
              fontSize: isMobile ? '0.95rem' : isTablet ? '1.1rem' : '1.2rem',
              color: '#6c757d',
              maxWidth: '700px',
              margin: '0 auto',
              padding: isMobile ? '0 1rem' : '0'
            }}>
              Choose from our variety of room sharing options to suit your budget and lifestyle
            </p>
          </div>

          <div style={{ 
            position: 'relative', 
            display: 'flex', 
            alignItems: 'center', 
            gap: isMobile ? '0.5rem' : isTablet ? '1rem' : '2rem'
          }}>
            {/* Left Navigation Button */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              style={{
                width: isMobile ? '40px' : '60px',
                height: isMobile ? '40px' : '60px',
                borderRadius: '50%',
                background: currentSlide === 0 ? '#e5e7eb' : 'white',
                border: `${isMobile ? '2px' : '3px'} solid ${currentSlide === 0 ? '#d1d5db' : '#22c55e'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentSlide === 0 ? 'not-allowed' : 'pointer',
                flexShrink: 0,
                transition: 'all 0.3s',
                boxShadow: currentSlide === 0 ? 'none' : '0 8px 20px rgba(34, 197, 94, 0.3)',
                color: currentSlide === 0 ? '#9ca3af' : '#22c55e',
                opacity: currentSlide === 0 ? 0.5 : 1
              }}
              onMouseOver={(e) => {
                if (currentSlide !== 0) {
                  e.currentTarget.style.background = '#22c55e';
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.color = 'white';
                }
              }}
              onMouseOut={(e) => {
                if (currentSlide !== 0) {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.color = '#22c55e';
                }
              }}
            >
              <ChevronLeft size={isMobile ? 20 : 30} strokeWidth={3} />
            </button>

            {/* Cards Display */}
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{
                display: 'flex',
                gap: isMobile ? '1rem' : isTablet ? '1.5rem' : '2rem',
                transform: `translateX(-${currentSlide * (100 / cardsToShow + (isMobile ? 1 : isTablet ? 1.5 : 2))}%)`,
                transition: 'transform 0.5s ease-in-out'
              }}>
                {properties.map((property, index) => (
                  <div
                    key={index}
                    style={{
                      minWidth: `calc(${100 / cardsToShow}% - ${isMobile ? '0.67rem' : isTablet ? '1rem' : '1.33rem'})`,
                      flexShrink: 0,
                      background: 'white',
                      borderRadius: isMobile ? '16px' : '24px',
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                      transition: 'all 0.4s ease',
                      border: '2px solid transparent'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-16px)';
                      e.currentTarget.style.boxShadow = '0 20px 50px rgba(34, 197, 94, 0.2)';
                      e.currentTarget.style.borderColor = '#22c55e';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                  >
                    <div style={{
                      height: isMobile ? '180px' : isTablet ? '220px' : '280px',
                      position: 'relative',
                      overflow: 'hidden',
                      background: '#f3f4f6'
                    }}>
                      <img
                        src={property.image}
                        alt={property.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'scale(1.08)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '60%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                        pointerEvents: 'none'
                      }} />

                      <div style={{
                        position: 'absolute',
                        top: isMobile ? '0.8rem' : '1.5rem',
                        right: isMobile ? '0.8rem' : '1.5rem',
                        background: 'rgba(34, 197, 94, 0.95)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        padding: isMobile ? '0.4rem 0.8rem' : '0.6rem 1.2rem',
                        borderRadius: '50px',
                        fontSize: isMobile ? '0.7rem' : '0.85rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                      }}>
                        Featured
                      </div>
                    </div>

                    <div style={{ padding: isMobile ? '1rem' : '1.5rem' }}>
                      <h3 style={{
                        marginBottom: '1rem',
                        fontSize: isMobile ? '1.1rem' : '1.4rem',
                        fontWeight: 700,
                        lineHeight: 1.3,
                        color: '#1f2937'
                      }}>
                        {property.name}
                      </h3>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: isMobile ? '0.5rem' : '0.8rem',
                        marginBottom: '1rem',
                        paddingBottom: '1rem',
                        borderBottom: '2px solid #f3f4f6',
                        flexWrap: 'wrap'
                      }}>
                        <div style={{
                          flex: '1 1 auto',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          color: '#6c757d',
                          fontSize: isMobile ? '0.75rem' : '0.85rem'
                        }}>
                          <Users size={isMobile ? 14 : 16} />
                          <span>{index + 1} {index === 0 ? 'Person' : 'People'}</span>
                        </div>
                        <div style={{
                          flex: '1 1 auto',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          color: '#6c757d',
                          fontSize: isMobile ? '0.75rem' : '0.85rem'
                        }}>
                          <HomeIcon size={isMobile ? 14 : 16} />
                          <span>Furnished</span>
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: isMobile ? '0.5rem' : '1rem',
                        flexWrap: isMobile ? 'wrap' : 'nowrap'
                      }}>
                        <div style={{ flex: 1, minWidth: isMobile ? '100%' : 'auto' }}>
                          <span style={{ 
                            fontSize: isMobile ? '0.7rem' : '0.75rem', 
                            color: '#6c757d', 
                            display: 'block', 
                            marginBottom: '0.2rem', 
                            fontWeight: 500 
                          }}>Starting from</span>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
                            <span style={{ 
                              fontSize: isMobile ? '1.4rem' : '1.8rem', 
                              fontWeight: 800, 
                              color: '#22c55e', 
                              lineHeight: 1 
                            }}>
                              {property.price}
                            </span>
                            <span style={{ 
                              fontSize: isMobile ? '0.75rem' : '0.85rem', 
                              color: '#6c757d', 
                              fontWeight: 500 
                            }}>/mo</span>
                          </div>
                        </div>
                        <button
                          onClick={() => navigate('/tenant-login')}
                          style={{
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50px',
                            padding: isMobile ? '0.6rem 1.2rem' : '0.7rem 1.5rem',
                            fontSize: isMobile ? '0.8rem' : '0.9rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            whiteSpace: 'nowrap',
                            width: isMobile ? '100%' : 'auto',
                            justifyContent: 'center'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.4)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(34, 197, 94, 0.3)';
                          }}
                        >
                          Book
                          <ArrowRight size={isMobile ? 14 : 16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Navigation Button */}
            <button
              onClick={nextSlide}
              disabled={currentSlide >= maxSlide}
              style={{
                width: isMobile ? '40px' : '60px',
                height: isMobile ? '40px' : '60px',
                borderRadius: '50%',
                background: currentSlide >= maxSlide ? '#e5e7eb' : 'white',
                border: `${isMobile ? '2px' : '3px'} solid ${currentSlide >= maxSlide ? '#d1d5db' : '#22c55e'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentSlide >= maxSlide ? 'not-allowed' : 'pointer',
                flexShrink: 0,
                transition: 'all 0.3s',
                boxShadow: currentSlide >= maxSlide ? 'none' : '0 8px 20px rgba(34, 197, 94, 0.3)',
                color: currentSlide >= maxSlide ? '#9ca3af' : '#22c55e',
                opacity: currentSlide >= maxSlide ? 0.5 : 1
              }}
              onMouseOver={(e) => {
                if (currentSlide < maxSlide) {
                  e.currentTarget.style.background = '#22c55e';
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.color = 'white';
                }
              }}
              onMouseOut={(e) => {
                if (currentSlide < maxSlide) {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.color = '#22c55e';
                }
              }}
            >
              <ChevronRight size={isMobile ? 20 : 30} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      {/* Four walls and a roof - Responsive */}
      <div style={{ 
        padding: isMobile ? '3rem 1rem' : isTablet ? '4rem 1.5rem' : '6rem 2rem', 
        background: 'white' 
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '3rem' }}>
            <h2 style={{
              fontSize: isMobile ? '1.6rem' : isTablet ? '2rem' : '2.5rem',
              marginBottom: '0.5rem',
              fontWeight: 800,
              color: '#2d3748',
              padding: isMobile ? '0 1rem' : '0'
            }}>
              Not just <span style={{ fontWeight: 800 }}>four walls and a roof</span>
            </h2>
            <p style={{ 
              fontSize: isMobile ? '0.9rem' : '1rem', 
              color: '#22c55e', 
              fontWeight: 500,
              padding: isMobile ? '0 1rem' : '0'
            }}>
              Come see the sweet, sweet perks of not communal living.
            </p>
          </div>

          <div style={{ marginTop: isMobile ? '2rem' : '4rem' }}>
            {/* Feature Blocks - Responsive Grid */}
            {[
              {
                images: ['/build.webp', '/floor.jpeg'],
                title: 'Start living your best life',
                titleHighlight: 'day one',
                description: "Being fresh out of college, relocating for work, and feeling like a fish out of water in your new city? Not to mention, apartments, loans, the elusive fees, where even are all...",
                reverse: false
              },
              {
                images: ['/3share.jpeg', '/4share.png'],
                title: 'Step into a room that has',
                titleHighlight: 'room for everything',
                description: "Your clothing and bag will not be fighting for space on the only hook on your possession. You'll actually sleep like a baby in our beds. And your day-to-day basics can have a home of their own. Aww.",
                reverse: true
              },
              {
                images: ['/clean.png'],
                title: 'Take your daily list of chores.',
                titleHighlight: 'And tear it up',
                description: "We'll take care of the chores that used your mama's-man type. Or if you're just the chores-man type. So you can focus on the chores that matter. Or if you do them all for you.",
                reverse: false,
                singleImage: true
              },
              {
                images: ['/game.png', '/gym.jpeg'],
                title: 'Chill in a',
                titleHighlight: 'common area',
                titleExtra: 'that\'s anything but common',
                description: "Nope, we're not try-ing to pass off a tiny patch of grass as a \"courtyard.\" And no, we won't demand that you squeeze into a common area the size of a broom closet. Just saying.",
                reverse: true,
                mintBg: true
              },
              {
                images: ['/food.png', '/food1.png'],
                title: 'Don\'t come expecting',
                titleHighlight: 'terrible food',
                description: "From a well-stocked café to healthy, yummy meals. We'll cover the full family spectrum of what you crave in terms.",
                reverse: false
              }
            ].map((block, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: isMobile ? '1.5rem' : isTablet ? '2rem' : '3rem',
                  marginBottom: isMobile ? '3rem' : '5rem',
                  alignItems: 'center',
                  background: block.mintBg ? '#e6f7f5' : 'transparent',
                  padding: block.mintBg ? (isMobile ? '2rem 1.5rem' : '3rem') : '0',
                  borderRadius: block.mintBg ? '24px' : '0',
                  flexDirection: (isMobile || (block.reverse && !isMobile)) ? 'column-reverse' : 'row'
                }}
              >
                {/* Images */}
                <div 
                  style={{ 
                    display: block.singleImage ? 'block' : 'grid',
                    gridTemplateColumns: block.singleImage ? '1fr' : (isMobile ? '1fr' : '1fr 1fr'),
                    gap: isMobile ? '0.8rem' : '1rem',
                    order: (block.reverse && !isMobile) ? 2 : 1
                  }}
                >
                  {block.images.map((img, imgIdx) => (
                    <div 
                      key={imgIdx}
                      style={{
                        height: block.singleImage ? (isMobile ? '200px' : isTablet ? '240px' : '280px') : (isMobile ? '150px' : isTablet ? '180px' : '220px'),
                        borderRadius: isMobile ? '12px' : '20px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                      }}
                    >
                      <img
                        src={img}
                        alt={`Feature ${idx}-${imgIdx}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Text */}
                <div style={{ order: (block.reverse && !isMobile) ? 1 : 2 }}>
                  <h3 style={{ 
                    fontSize: isMobile ? '1.4rem' : isTablet ? '1.7rem' : '2rem', 
                    fontWeight: 700, 
                    marginBottom: '1rem', 
                    color: '#2d3748',
                    lineHeight: 1.3
                  }}>
                    {block.title}
                    {block.titleHighlight && (
                      <>
                        <br />
                        <span style={{ color: '#22c55e' }}>{block.titleHighlight}</span>
                      </>
                    )}
                    {block.titleExtra && (
                      <>
                        <br />
                        {block.titleExtra}
                      </>
                    )}
                  </h3>
                  <p style={{ 
                    color: '#6c757d', 
                    lineHeight: 1.8,
                    fontSize: isMobile ? '0.9rem' : '1rem'
                  }}>
                    {block.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section - Responsive */}
      <div style={{ 
        padding: isMobile ? '3rem 1rem' : isTablet ? '6rem 2rem' : '10rem 4rem', 
        background: 'white', 
        overflow: 'visible' 
      }}>
        <div className="container" style={{ maxWidth: '1700px', margin: '0 auto' }}>
          {isMobile ? (
            /* Mobile: Simple Grid Layout */
            <>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{
                  fontSize: '1.8rem',
                  marginBottom: '1rem',
                  fontWeight: 800,
                  color: '#2d3748',
                  lineHeight: 1.2
                }}>
                  The features that we are offering are
                </h2>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#6c757d',
                  lineHeight: 1.6
                }}>
                  With over 16,500 hostels in 180 countries, there's always room for a new adventure!
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '1.5rem'
              }}>
                {[
                  { img: '/refridge.png', title: 'Refrigerator in each floor' },
                  { img: '/clean.png', title: 'Daily cleaning and maintenance' },
                  { img: '/play.jpg', title: 'Play Area' },
                  { img: '/gym.jpeg', title: 'Fitness Center' },
                  { img: '/generator.png', title: 'Power Backup' },
                  { img: '/food.png', title: 'Monthly 3 buffets' },
                  { img: '/wash.png', title: 'Laundry Service' },
                  { img: '/cup.png', title: 'Individual Cupboard' },
                  { img: '/fun.png', title: 'Fun Activities-Weekend-festival celebrations' }
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'white',
                      borderRadius: '16px',
                      padding: '1rem',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 12px 30px rgba(34, 197, 94, 0.2)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '140px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      marginBottom: '0.8rem',
                      background: '#f3f4f6'
                    }}>
                      <img
                        src={feature.img}
                        alt={feature.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                    <p style={{ 
                      margin: 0, 
                      fontWeight: 700, 
                      fontSize: '0.95rem', 
                      color: '#2d3748' 
                    }}>
                      {feature.title}
                    </p>
                    <p style={{ 
                      margin: '0.3rem 0 0 0', 
                      fontSize: '0.75rem', 
                      color: '#6c757d' 
                    }}>
                      Hyderabad
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Desktop/Tablet: Original Scattered Layout */
            <div style={{
              display: 'grid',
              gridTemplateColumns: isTablet ? '1fr' : '1fr 2fr',
              gap: isTablet ? '3rem' : '12rem',
              alignItems: 'center'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingRight: isTablet ? '0' : '3rem',
                textAlign: isTablet ? 'center' : 'left'
              }}>
                <h2 style={{
                  fontSize: isTablet ? '2.5rem' : '3.5rem',
                  marginBottom: '1.5rem',
                  fontWeight: 800,
                  color: '#2d3748',
                  lineHeight: 1.2
                }}>
                  The features that we are offering are
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#6c757d',
                  lineHeight: 1.8
                }}>
                  With over 16,500 hostels in 180 countries, there's always room for a new adventure!
                </p>
              </div>

              <div style={{
                position: 'relative',
                height: isTablet ? '800px' : '1000px',
                paddingLeft: isTablet ? '2rem' : '5rem',
                paddingRight: isTablet ? '2rem' : '5rem'
              }}>
                {[
                  { img: '/refridge.png', title: 'Refrigerator in each floor', top: '0%', left: '0%', rotate: '-8deg', width: '200px', height: '130px', zIndex: 5 },
                  { img: '/clean.png', title: 'Daily cleaning and maintenance', top: '5%', left: '28%', rotate: '5deg', width: '190px', height: '120px', zIndex: 6 },
                  { img: '/play.jpg', title: 'Play Area', top: '0%', right: '0%', rotate: '-6deg', width: '210px', height: '140px', zIndex: 7 },
                  { img: '/gym.jpeg', title: 'Fitness Center', top: '35%', left: '3%', rotate: '10deg', width: '195px', height: '125px', zIndex: 4 },
                  { img: '/generator.png', title: 'Power Backup', top: '40%', left: '33%', rotate: '-5deg', width: '185px', height: '120px', zIndex: 5 },
                  { img: '/food.png', title: 'Monthly 3 buffets', top: '38%', right: '2%', rotate: '7deg', width: '200px', height: '130px', zIndex: 6 },
                  { img: '/wash.png', title: 'Laundry Service', bottom: '12%', left: '8%', rotate: '-9deg', width: '190px', height: '120px', zIndex: 5 },
                  { img: '/cup.png', title: 'Individual Cupboard', bottom: '8%', left: '38%', rotate: '6deg', width: '180px', height: '115px', zIndex: 4 },
                  { img: '/fun.png', title: 'Fun Activities-Weekend-festival celebrations', bottom: '15%', right: '5%', rotate: '-8deg', width: '185px', height: '115px', zIndex: 6 }
                ].map((card, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: 'absolute',
                      ...card,
                      background: 'white',
                      borderRadius: '18px',
                      padding: '18px',
                      boxShadow: '0 12px 35px rgba(0,0,0,0.14)',
                      transform: `rotate(${card.rotate})`,
                      transition: 'all 0.3s',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'rotate(0deg) scale(1.1) translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.3)';
                      e.currentTarget.style.zIndex = '20';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = `rotate(${card.rotate})`;
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.14)';
                      e.currentTarget.style.zIndex = card.zIndex;
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: card.height,
                      borderRadius: '10px',
                      overflow: 'hidden',
                      marginBottom: '12px',
                      position: 'relative',
                      background: '#f3f4f6'
                    }}>
                      <img
                        src={card.img}
                        alt={card.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'scale(1.08)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent)',
                        pointerEvents: 'none'
                      }} />
                    </div>
                    <p style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '0.95rem', color: '#2d3748' }}>{card.title}</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#6c757d' }}>Hyderabad</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Locations Section - Responsive */}
      <div style={{ 
        padding: isMobile ? '3rem 1rem' : isTablet ? '4rem 1.5rem' : '6rem 2rem', 
        background: '#f8f9fa' 
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '1.8rem' : isTablet ? '2.2rem' : '2.5rem',
            marginBottom: '0.5rem',
            fontWeight: 800,
            color: '#2d3748',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            Get inspired!
          </h2>
          <p style={{
            fontSize: isMobile ? '0.9rem' : '1rem',
            color: '#6c757d',
            marginBottom: isMobile ? '2rem' : '4rem',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            Discover popular places for unforgettable adventures
          </p>

          {isMobile ? (
            /* Mobile: Simple Grid */
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '1.5rem'
            }}>
              {[
                { img: '/build.webp', name: 'Stayzionn Ladies Hostel, Beside Studio67 Unisex Saloon', location: '@Gowlidoddi' },
                { img: '/build.png', name: 'Nexgen Dolphin Co-living', location: '@Gowlidoddi' },
                { img: '/build1.png', name: 'NextGen Dolphin Co-living PG,Narsingi', location: '@Gowlidoddi' },
                { img: '/build2.png', name: 'Dolphin Luxury Men\'s PG', location: '@Gowlidoddi' },
                { img: '/build7.png', name: 'Stayzionn Ladies Hostel', location: '@Gowlidoddi' },
                { img: '/build4.png', name: 'Nexgen Dolphin Co-living', location: '@Gowlidoddi' },
                { img: '/build6.png', name: 'NextGen Dolphin Co-living PG', location: '@Gowlidoddi' },
                { img: '/build5.png', name: 'Dolphin Luxury Men\'s PG', location: '@Gowlidoddi' }
              ].map((loc, idx) => (
                <div
                  key={idx}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02) translateY(-4px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '200px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    position: 'relative'
                  }}>
                    <img
                      src={loc.img}
                      alt={loc.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(0,0,0,0.75)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      maxWidth: 'calc(100% - 24px)'
                    }}>
                      {loc.name}
                    </div>
                  </div>
                  <p style={{
                    margin: '8px 0 0 0',
                    fontSize: '0.8rem',
                    color: '#6c757d',
                    textAlign: 'center'
                  }}>
                    {loc.location}
                  </p>
                </div>
              ))}
            </div>
          ) : isTablet ? (
            /* Tablet: 2-column Grid */
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2rem'
            }}>
              {[
                { img: '/build.webp', name: 'Stayzionn Ladies Hostel, Beside Studio67 Unisex Saloon', location: '@Gowlidoddi' },
                { img: '/build.png', name: 'Nexgen Dolphin Co-living', location: '@Gowlidoddi' },
                { img: '/build1.png', name: 'NextGen Dolphin Co-living PG,Narsingi', location: '@Gowlidoddi' },
                { img: '/build2.png', name: 'Dolphin Luxury Men\'s PG', location: '@Gowlidoddi' },
                { img: '/build7.png', name: 'Stayzionn Ladies Hostel', location: '@Gowlidoddi' },
                { img: '/build4.png', name: 'Nexgen Dolphin Co-living', location: '@Gowlidoddi' },
                { img: '/build6.png', name: 'NextGen Dolphin Co-living PG', location: '@Gowlidoddi' },
                { img: '/build5.png', name: 'Dolphin Luxury Men\'s PG', location: '@Gowlidoddi' }
              ].map((loc, idx) => (
                <div
                  key={idx}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.03) translateY(-6px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '240px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    position: 'relative'
                  }}>
                    <img
                      src={loc.img}
                      alt={loc.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      background: 'rgba(0,0,0,0.75)',
                      color: 'white',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      maxWidth: 'calc(100% - 28px)'
                    }}>
                      {loc.name}
                    </div>
                  </div>
                  <p style={{
                    margin: '10px 0 0 0',
                    fontSize: '0.85rem',
                    color: '#6c757d',
                    textAlign: 'center'
                  }}>
                    {loc.location}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            /* Desktop: Original Scattered Layout */
            <div style={{
              position: 'relative',
              minHeight: '800px'
            }}>
              {[
                { img: '/build.webp', name: 'Stayzionn Ladies Hostel, Beside Studio67 Unisex Saloon', location: '@Gowlidoddi', top: '0', left: '0', width: '240px', height: '320px' },
                { img: '/build.png', name: 'Nexgen Dolphin Co-living', location: '@Gowlidoddi', top: '80px', left: '280px', width: '240px', height: '300px' },
                { img: '/build1.png', name: 'NextGen Dolphin Co-living PG,Narsingi', location: '@Gowlidoddi', top: '0', right: '220px', width: '240px', height: '300px' },
                { img: '/build2.png', name: 'Dolphin Luxury Men\'s PG', location: '@Gowlidoddi', top: '80px', right: '0', width: '200px', height: '280px' },
                { img: '/build7.png', name: 'Stayzionn Ladies Hostel', location: '@Gowlidoddi', top: '380px', left: '0', width: '240px', height: '300px' },
                { img: '/build4.png', name: 'Nexgen Dolphin Co-living', location: '@Gowlidoddi', top: '440px', left: '280px', width: '240px', height: '280px' },
                { img: '/build6.png', name: 'NextGen Dolphin Co-living PG', location: '@Gowlidoddi', top: '360px', right: '220px', width: '240px', height: '300px' },
                { img: '/build5.png', name: 'Dolphin Luxury Men\'s PG', location: '@Gowlidoddi', top: '420px', right: '0', width: '200px', height: '280px' }
              ].map((loc, idx) => (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    ...loc,
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: loc.height,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    position: 'relative'
                  }}>
                    <img
                      src={loc.img}
                      alt={loc.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: 'rgba(0,0,0,0.75)',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.95rem'
                    }}>
                      {loc.name}
                    </div>
                  </div>
                  <p style={{
                    margin: '12px 0 0 0',
                    fontSize: '0.85rem',
                    color: '#6c757d',
                    textAlign: 'center'
                  }}>
                    {loc.location}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact Section - Responsive */}
      <div style={{ 
        padding: isMobile ? '3rem 1rem' : isTablet ? '4rem 1.5rem' : '6rem 2rem', 
        background: '#f8fafc' 
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '1.8rem' : isTablet ? '2.3rem' : '2.8rem',
            marginBottom: '0.5rem',
            fontWeight: 800,
            textAlign: 'center',
            color: '#2d3748'
          }}>
            Get In Touch
          </h2>
          <p style={{
            textAlign: 'center',
            fontSize: isMobile ? '0.95rem' : '1.1rem',
            color: '#6c757d',
            marginBottom: isMobile ? '2.5rem' : '5rem',
            maxWidth: '700px',
            margin: `0 auto ${isMobile ? '2.5rem' : '5rem'}`,
            padding: isMobile ? '0 1rem' : '0'
          }}>
            Have questions? We're here to help! Reach out to us through any of these channels.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: isMobile ? '2rem' : '3rem',
            position: 'relative'
          }}>
            {[
              {
                icon: (
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 6 10-6" />
                  </svg>
                ),
                title: 'Email Us',
                description: 'Send us an email and we\'ll get back to you within 24 hours.',
                link: 'mailto:info@nextgenhostels.com',
                linkText: 'info@nextgenhostels.com',
                color: '#22c55e',
                bgGradient: 'linear-gradient(135deg, #22c55e15 0%, #22c55e30 100%)',
                number: '01'
              },
              {
                icon: (
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                ),
                title: 'Call Us',
                description: 'Our team is available Monday to Saturday, 9 AM - 7 PM IST.',
                link: 'tel:+919876543210',
                linkText: '+91 98765 43210',
                color: '#3b82f6',
                bgGradient: 'linear-gradient(135deg, #3b82f615 0%, #3b82f630 100%)',
                number: '02'
              },
              {
                icon: (
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                ),
                title: 'WhatsApp',
                description: 'Chat with us instantly on WhatsApp for quick responses.',
                link: 'https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20NextGen%20Hostels',
                linkText: 'Chat on WhatsApp',
                color: '#25d366',
                bgGradient: 'linear-gradient(135deg, #25d36615 0%, #25d36630 100%)',
                number: '03'
              }
            ].map((contact, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  padding: isMobile ? '2rem' : '2.5rem',
                  borderRadius: isMobile ? '16px' : '20px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s',
                  position: 'relative',
                  border: '1px solid #f1f5f9',
                  textAlign: 'center'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = `0 12px 40px ${contact.color}25`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  right: isMobile ? '20px' : '30px',
                  fontSize: isMobile ? '3rem' : '4rem',
                  fontWeight: 900,
                  color: '#f1f5f9',
                  lineHeight: 1
                }}>
                  {contact.number}
                </div>

                <div style={{
                  width: isMobile ? '60px' : '70px',
                  height: isMobile ? '60px' : '70px',
                  margin: '0 auto 1.5rem',
                  borderRadius: '16px',
                  background: contact.bgGradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: contact.color
                }}>
                  {contact.icon}
                </div>

                <h3 style={{
                  marginBottom: '1rem',
                  fontSize: isMobile ? '1.3rem' : '1.5rem',
                  fontWeight: 700,
                  color: '#2d3748'
                }}>
                  {contact.title}
                </h3>
                <p style={{
                  color: '#64748b',
                  lineHeight: 1.7,
                  margin: '0 0 1.5rem 0',
                  fontSize: isMobile ? '0.9rem' : '1rem'
                }}>
                  {contact.description}
                </p>
                <a
                  href={contact.link}
                  target={idx === 2 ? '_blank' : undefined}
                  rel={idx === 2 ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'inline-block',
                    color: contact.color,
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    wordBreak: 'break-word'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  {contact.linkText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tenant Advice Section - Responsive */}
      <div style={{ 
        padding: isMobile ? '3rem 1rem' : isTablet ? '4rem 1.5rem' : '6rem 2rem', 
        background: 'white' 
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '4rem' }}>
            <h2 style={{
              fontSize: isMobile ? '1.8rem' : isTablet ? '2.5rem' : '3rem',
              marginBottom: '1rem',
              fontWeight: 800,
              color: '#2d3748',
              letterSpacing: '-1px',
              padding: isMobile ? '0 1rem' : '0'
            }}>
              Tips for Finding Your <span style={{ color: '#22c55e' }}>Perfect PG</span>
            </h2>
            <p style={{
              fontSize: isMobile ? '0.95rem' : '1.1rem',
              color: '#6c757d',
              maxWidth: '700px',
              margin: '0 auto',
              padding: isMobile ? '0 1rem' : '0'
            }}>
              Make an informed decision with our expert advice
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: isMobile ? '1.5rem' : '2rem',
            marginBottom: isMobile ? '3rem' : '4rem'
          }}>
            {[
              {
                icon: <MapPin size={24} color="white" />,
                title: 'Location Matters',
                description: 'Choose a PG close to your workplace or college. Consider proximity to public transport, markets, and hospitals for convenience.',
                bgGradient: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                border: '#22c55e20',
                iconBg: '#22c55e'
              },
              {
                icon: <ShieldCheck size={24} color="white" />,
                title: 'Safety First',
                description: 'Verify security measures like CCTV cameras, 24/7 security guards, and safe neighborhood. Check reviews from current residents.',
                bgGradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                border: '#3b82f620',
                iconBg: '#3b82f6'
              },
              {
                icon: <CreditCard size={24} color="white" />,
                title: 'Budget Wisely',
                description: 'Compare prices and amenities. Ensure rent includes essentials like WiFi, electricity, and food. Watch out for hidden charges.',
                bgGradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                border: '#f59e0b20',
                iconBg: '#f59e0b'
              },
              {
                icon: <Utensils size={24} color="white" />,
                title: 'Check Amenities',
                description: 'Ensure essentials like clean washrooms, laundry, power backup, and quality food. Visit in person before finalizing.',
                bgGradient: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
                border: '#ec489920',
                iconBg: '#ec4899'
              },
              {
                icon: <Users2 size={24} color="white" />,
                title: 'Know the Rules',
                description: 'Understand PG policies on timings, guests, noise levels, and notice periods. Clear communication prevents future conflicts.',
                bgGradient: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
                border: '#14b8a620',
                iconBg: '#14b8a6'
              },
              {
                icon: <Book size={24} color="white" />,
                title: 'Read the Agreement',
                description: 'Carefully review the rental agreement. Understand deposit refund policies, rent increase terms, and maintenance responsibilities.',
                bgGradient: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                border: '#ef444420',
                iconBg: '#ef4444'
              }
            ].map((tip, idx) => (
              <div
                key={idx}
                style={{
                  background: tip.bgGradient,
                  padding: isMobile ? '1.5rem' : '2rem',
                  borderRadius: isMobile ? '16px' : '20px',
                  border: `2px solid ${tip.border}`,
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${tip.border}`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: isMobile ? '45px' : '50px',
                  height: isMobile ? '45px' : '50px',
                  background: tip.iconBg,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  {tip.icon}
                </div>
                <h3 style={{
                  fontSize: isMobile ? '1.1rem' : '1.3rem',
                  fontWeight: 700,
                  color: '#2d3748',
                  marginBottom: '0.75rem'
                }}>
                  {tip.title}
                </h3>
                <p style={{
                  color: '#6c757d',
                  lineHeight: 1.7,
                  fontSize: isMobile ? '0.85rem' : '0.95rem'
                }}>
                  {tip.description}
                </p>
              </div>
            ))}
          </div>

          {/* Booking CTA Box - Responsive */}
          <div style={{
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            padding: isMobile ? '2.5rem 1.5rem' : isTablet ? '3rem 2rem' : '4rem 3rem',
            borderRadius: isMobile ? '20px' : '24px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(34, 197, 94, 0.3)'
          }}>
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: isMobile ? '150px' : '200px',
              height: isMobile ? '150px' : '200px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-80px',
              left: '-80px',
              width: isMobile ? '180px' : '250px',
              height: isMobile ? '180px' : '250px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '50%'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{
                fontSize: isMobile ? '1.8rem' : isTablet ? '2.2rem' : '2.5rem',
                fontWeight: 800,
                color: 'white',
                marginBottom: '1rem',
                lineHeight: 1.2
              }}>
                Ready to Book Your Room?
              </h3>
              <p style={{
                fontSize: isMobile ? '1rem' : '1.2rem',
                color: 'rgba(255,255,255,0.95)',
                marginBottom: '2.5rem',
                maxWidth: '600px',
                margin: `0 auto ${isMobile ? '2rem' : '2.5rem'}`,
                padding: isMobile ? '0 1rem' : '0'
              }}>
                Don't wait! Our best rooms are filling up fast. Secure your spot today and start your comfortable living experience.
              </p>

              <button
                onClick={() => navigate('/pages/Booking')}
                style={{
                  background: '#eef5f1',
                  color: 'green',
                  border: 'none',
                  borderRadius: '50px',
                  padding: isMobile ? '1rem 2.5rem' : isTablet ? '1.2rem 3.5rem' : '1.5rem 4.5rem',
                  fontSize: isMobile ? '1rem' : isTablet ? '1.2rem' : '1.4rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 8px 24px rgba(34, 197, 94, 0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  width: isMobile ? '100%' : 'auto',
                  maxWidth: isMobile ? '300px' : 'none'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(34, 197, 94, 0.5)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.4)';
                }}
              >
                Book Now
              </button>

              <div style={{
                marginTop: isMobile ? '2rem' : '2.5rem',
                display: 'flex',
                justifyContent: 'center',
                gap: isMobile ? '1.5rem' : '2.5rem',
                flexWrap: 'wrap',
                paddingTop: isMobile ? '1.5rem' : '2rem',
                borderTop: '1px solid rgba(255,255,255,0.2)'
              }}>
                {[
                  { icon: <ShieldCheck size={isMobile ? 18 : 20} />, text: '100% Safe & Verified' },
                  { icon: <Heart size={isMobile ? 18 : 20} />, text: '5000+ Happy Residents' },
                  { icon: <Star size={isMobile ? 18 : 20} />, text: '4.8/5 Rating' }
                ].map((badge, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'white'
                    }}
                  >
                    {badge.icon}
                    <span style={{ 
                      fontSize: isMobile ? '0.8rem' : '0.9rem', 
                      fontWeight: 500 
                    }}>
                      {badge.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Responsive */}
      <div style={{
        background: '#1a1a1a',
        color: 'white',
        padding: isMobile ? '3rem 1.5rem 2rem' : isTablet ? '3.5rem 2rem 2rem' : '4rem 2rem 2rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: isMobile ? '2rem' : '2.5rem',
            marginBottom: isMobile ? '2rem' : '3rem',
            paddingBottom: isMobile ? '2rem' : '3rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
              <img
                src="/logo.png"
                alt="NextGen Logo"
                style={{
                  height: isMobile ? '60px' : '80px',
                  width: 'auto',
                  objectFit: 'contain',
                  marginBottom: '1rem',
                  margin: isMobile ? '0 auto 1rem' : '0 0 1rem 0'
                }}
              />
              <p style={{
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.7,
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                marginBottom: '1.5rem'
              }}>
                Premium PG accommodations in Hyderabad. Your comfort is our priority.
              </p>
            </div>

            <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
              <h3 style={{
                marginBottom: '1rem',
                fontSize: isMobile ? '0.95rem' : '1rem',
                fontWeight: 700,
                color: '#22c55e'
              }}>
                Our Locations
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {[
                  'PGs in Gachibowli',
                  'PGs in Gowlidoddi',
                  'PGs in Pocharam',
                  'PGs in Madhapur'
                ].map((location, index) => (
                  <li key={index} style={{ marginBottom: '0.6rem' }}>
                    <a
                      href="#"
                      style={{
                        color: 'rgba(255,255,255,0.6)',
                        textDecoration: 'none',
                        fontSize: isMobile ? '0.85rem' : '0.9rem',
                        transition: 'color 0.3s'
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.color = '#22c55e')}
                      onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                    >
                      {location}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
              <h3 style={{
                marginBottom: '1rem',
                fontSize: isMobile ? '0.95rem' : '1rem',
                fontWeight: 700,
                color: '#22c55e'
              }}>
                Quick Links
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {['About Us', 'Contact Us'].map((link, index) => (
                  <li key={index} style={{ marginBottom: '0.6rem' }}>
                    <a
                      href="#"
                      style={{
                        color: 'rgba(255,255,255,0.6)',
                        textDecoration: 'none',
                        fontSize: isMobile ? '0.85rem' : '0.9rem',
                        transition: 'color 0.3s'
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.color = '#22c55e')}
                      onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.5)',
            fontSize: isMobile ? '0.8rem' : '0.9rem',
            padding: isMobile ? '0 1rem' : '0'
          }}>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              © 2025 NextGen Hostels. All rights reserved. | PGs in Gachibowli, Gowlidoddi, Pocharam & Madhapur
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;