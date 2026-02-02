import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram } from "lucide-react";
import Navbar from './NavBar';

import { Building2, Users, ShieldCheck, Bell, CreditCard, Sparkles, ArrowRight, Search, MapPin, Star, Wifi, Coffee, Utensils, Dumbbell, Book, Heart, Users2, Home as HomeIcon, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, properties.length - 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      {/* Transparent Navigation Bar with Logo */}
      
    <Navbar/>

      {/* Hero Section - Full Background Image */}
      <div style={{
        backgroundImage: 'url(/4share.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '8rem 2rem',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Dark overlay for better text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 0
        }} />

        <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            {/* Content */}
            <h1 style={{
              fontSize: '5rem',
              marginBottom: '1.5rem',
              color: 'white',
              fontWeight: 800,
              letterSpacing: '-3px',
              lineHeight: 1.1,
              textShadow: '3px 3px 6px rgba(0,0,0,0.4)'
            }}>
              <span style={{ color: '#22c55e' }}>NextGen</span>
              <br />
              it's your new home
            </h1>

            <p style={{
              fontSize: '2rem',
              marginBottom: '3.5rem',
              color: 'rgba(255,255,255,0.95)',
              fontWeight: 400,
              fontStyle: 'italic',
              textShadow: '2px 2px 4px rgba(0,0,0,0.4)'
            }}>
              - more than just living...
            </p>

            {/* Book Now Button */}
            <button
              onClick={() => navigate('/pages/Booking')}
              style={{
                background: '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: '1.5rem 4.5rem',
                fontSize: '1.4rem',
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

      {/* Featured Properties - Three Cards at a Time Carousel */}
      <div style={{ padding: '5rem 2rem', background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)' }}>
        <div className="container" style={{ maxWidth: '1600px', margin: '0 auto' }}>
          {/* Section Title */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              fontWeight: 800,
              color: '#2d3748',
              letterSpacing: '-1px'
            }}>
              The Rooms That We Are <span style={{ color: '#22c55e' }}>Offering</span>
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#6c757d',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Choose from our variety of room sharing options to suit your budget and lifestyle
            </p>
          </div>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {/* Left Navigation Button */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: currentSlide === 0 ? '#e5e7eb' : 'white',
                border: `3px solid ${currentSlide === 0 ? '#d1d5db' : '#22c55e'}`,
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
              <ChevronLeft size={30} strokeWidth={3} />
            </button>

            {/* Three Cards Display */}
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{
                display: 'flex',
                gap: '2rem',
                transform: `translateX(-${currentSlide * (100 / 3 + 2)}%)`,
                transition: 'transform 0.5s ease-in-out'
              }}>
                {properties.map((property, index) => (
                  <div
                    key={index}
                    style={{
                      minWidth: 'calc(33.333% - 1.33rem)',
                      flexShrink: 0,
                      background: 'white',
                      borderRadius: '24px',
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
                    {/* Image */}
                    <div style={{
                      height: '280px',
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
                      {/* Gradient overlay */}
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '60%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                        pointerEvents: 'none'
                      }} />

                      {/* Room type badge */}
                      <div style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        background: 'rgba(34, 197, 94, 0.95)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '50px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                      }}>
                        Featured
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '1.5rem' }}>
                      <h3 style={{
                        marginBottom: '1rem',
                        fontSize: '1.4rem',
                        fontWeight: 700,
                        lineHeight: 1.3,
                        color: '#1f2937'
                      }}>
                        {property.name}
                      </h3>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        marginBottom: '1rem',
                        paddingBottom: '1rem',
                        borderBottom: '2px solid #f3f4f6'
                      }}>
                        <div style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          color: '#6c757d',
                          fontSize: '0.85rem'
                        }}>
                          <Users size={16} />
                          <span>{index + 1} {index === 0 ? 'Person' : 'People'}</span>
                        </div>
                        <div style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          color: '#6c757d',
                          fontSize: '0.85rem'
                        }}>
                          <HomeIcon size={16} />
                          <span>Furnished</span>
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: '1rem'
                      }}>
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: '0.75rem', color: '#6c757d', display: 'block', marginBottom: '0.2rem', fontWeight: 500 }}>Starting from</span>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
                            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#22c55e', lineHeight: 1 }}>
                              {property.price}
                            </span>
                            <span style={{ fontSize: '0.85rem', color: '#6c757d', fontWeight: 500 }}>/mo</span>
                          </div>
                        </div>
                        <button
                          onClick={() => navigate('/tenant-login')}
                          style={{
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50px',
                            padding: '0.7rem 1.5rem',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            whiteSpace: 'nowrap'
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
                          <ArrowRight size={16} />
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
              disabled={currentSlide >= properties.length - 3}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: currentSlide >= properties.length - 3 ? '#e5e7eb' : 'white',
                border: `3px solid ${currentSlide >= properties.length - 3 ? '#d1d5db' : '#22c55e'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentSlide >= properties.length - 3 ? 'not-allowed' : 'pointer',
                flexShrink: 0,
                transition: 'all 0.3s',
                boxShadow: currentSlide >= properties.length - 3 ? 'none' : '0 8px 20px rgba(34, 197, 94, 0.3)',
                color: currentSlide >= properties.length - 3 ? '#9ca3af' : '#22c55e',
                opacity: currentSlide >= properties.length - 3 ? 0.5 : 1
              }}
              onMouseOver={(e) => {
                if (currentSlide < properties.length - 3) {
                  e.currentTarget.style.background = '#22c55e';
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.color = 'white';
                }
              }}
              onMouseOut={(e) => {
                if (currentSlide < properties.length - 3) {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.color = '#22c55e';
                }
              }}
            >
              <ChevronRight size={30} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      {/* Nice just four walls and a roof - REDESIGNED */}
      <div style={{ padding: '6rem 2rem', background: 'white' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '0.5rem',
              fontWeight: 800,
              color: '#2d3748'
            }}>
              Not just <span style={{ fontWeight: 800 }}>four walls and a roof</span>
            </h2>
            <p style={{ fontSize: '1rem', color: '#22c55e', fontWeight: 500 }}>
              Come see the sweet, sweet perks of not communal living.
            </p>
          </div>

          {/* Feature Blocks with Real Images */}
          <div style={{ marginTop: '4rem' }}>
            {/* First Row - Images Left, Text Right */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              marginBottom: '5rem',
              alignItems: 'center'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{
                  height: '220px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                  <img
                    src="/build.webp"
                    alt="Modern building"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div style={{
                  height: '220px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                  <img
                    src="/floor.jpeg"
                    alt="Pool area"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#2d3748' }}>
                  Start living your best life<br />
                  from <span style={{ color: '#22c55e' }}>day one</span>
                </h3>
                <p style={{ color: '#6c757d', lineHeight: 1.8 }}>
                  Being fresh out of college, relocating for work, and feeling like a fish out of water in your new city? Not to mention, apartments, loans, the elusive fees, where even are all...
                </p>
              </div>
            </div>

            {/* Second Row - Text Left, Images Right */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              marginBottom: '5rem',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#2d3748' }}>
                  Step into a room that has<br />
                  <span style={{ color: '#22c55e' }}>room for everything</span>
                </h3>
                <p style={{ color: '#6c757d', lineHeight: 1.8 }}>
                  Your clothing and bag will not be fighting for space on the only hook on your possession. You'll actually sleep like a baby in our beds. And your day-to-day basics can have a home of their own. Aww.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{
                  height: '220px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                  <img
                    src="/3share.jpeg"
                    alt="Living room"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div style={{
                  height: '220px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                  <img
                    src="/4share.png"
                    alt="Bedroom"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Third Row - Image Left, Text Right */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              marginBottom: '5rem',
              alignItems: 'center'
            }}>
              <div style={{
                height: '280px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                <img
                  src="/clean.png"
                  alt="Person relaxing"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#2d3748' }}>
                  Take your daily list of chores.<br />
                  <span style={{ color: '#22c55e' }}>And tear it up</span>
                </h3>
                <p style={{ color: '#6c757d', lineHeight: 1.8 }}>
                  We'll take care of the chores that used your mama's-man type. Or if you're just the chores-man type. So you can focus on the chores that matter. Or if you do them all for you.
                </p>
              </div>
            </div>

            {/* Fourth Row - Text Left, Images Right with mint background */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              marginBottom: '5rem',
              alignItems: 'center',
              background: '#e6f7f5',
              padding: '3rem',
              borderRadius: '24px'
            }}>
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#2d3748' }}>
                  Chill in a <span style={{ color: '#22c55e' }}>common area</span><br />
                  that's anything but common
                </h3>
                <p style={{ color: '#6c757d', lineHeight: 1.8 }}>
                  Nope, we're not try-ing to pass off a tiny patch of grass as a "courtyard." And no, we won't demand that you squeeze into a common area the size of a broom closet. Just saying.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{
                  height: '200px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                  <img
                    src="/game.png"
                    alt="Gaming area"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div style={{
                  height: '200px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                  <img
                    src="/gym.jpeg"
                    alt="Common hallway"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Fifth Row - Images Left, Text Right */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              alignItems: 'center'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{
                  height: '220px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                  <img
                    src="/food.png"
                    alt="Food 1"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div style={{
                  height: '220px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                  <img
                    src="/food1.png"
                    alt="Food 2"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#2d3748' }}>
                  Don't come expecting<br />
                  <span style={{ color: '#22c55e' }}>terrible food</span>
                </h3>
                <p style={{ color: '#6c757d', lineHeight: 1.8 }}>
                  From a well-stocked café to healthy, yummy meals. We'll cover the full family spectrum of what you crave in terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The features that we are giving - IMPROVED with better padding */}
      <div style={{ padding: '10rem 4rem', background: 'white', overflow: 'visible' }}>
        <div className="container" style={{ maxWidth: '1700px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '12rem',
            alignItems: 'center'
          }}>
            {/* Left Side - Text Content */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingRight: '3rem'
            }}>
              <h2 style={{
                fontSize: '3.5rem',
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

            {/* Right Side - Scattered Feature Cards with Images - ADJUSTED SPACING */}
            <div style={{
              position: 'relative',
              height: '1000px',
              paddingLeft: '5rem',
              paddingRight: '5rem'
            }}>
              {/* Card 1 - Top Left with Image */}
              <div style={{
                position: 'absolute',
                top: '0%',
                left: '0%',
                width: '200px',
                background: 'white',
                borderRadius: '18px',
                padding: '18px',
                boxShadow: '0 12px 35px rgba(0,0,0,0.14)',
                transform: 'rotate(-8deg)',
                transition: 'all 0.3s',
                cursor: 'pointer',
                zIndex: 5
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1.1) translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.3)';
                  e.currentTarget.style.zIndex = '20';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'rotate(-8deg)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.14)';
                  e.currentTarget.style.zIndex = '5';
                }}
              >
                <div style={{
                  width: '100%',
                  height: '130px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '12px',
                  position: 'relative',
                  background: '#f3f4f6'
                }}>
                  <img
                    src="/refridge.png"
                    alt="Refrigerator"
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
                <p style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '0.95rem', color: '#2d3748' }}>Refrigerator in each floor</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6c757d' }}>Hyderabad</p>
              </div>

              {/* Card 2 - Top Center */}
              <div style={{
                position: 'absolute',
                top: '5%',
                left: '28%',
                width: '190px',
                background: 'white',
                borderRadius: '18px',
                padding: '18px',
                boxShadow: '0 12px 35px rgba(0,0,0,0.14)',
                transform: 'rotate(5deg)',
                transition: 'all 0.3s',
                cursor: 'pointer',
                zIndex: 6
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1.1) translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.3)';
                  e.currentTarget.style.zIndex = '20';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'rotate(5deg)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.12)';
                  e.currentTarget.style.zIndex = '6';
                }}
              >
                <div style={{
                  width: '100%',
                  height: '120px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '12px',
                  position: 'relative',
                  background: '#f3f4f6'
                }}>
                  <img
                    src="/clean.png"
                    alt="Study Space"
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
                <p style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '0.95rem', color: '#2d3748' }}>Daily cleaning and maintenance</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6c757d' }}>Hyderabad</p>
              </div>

              {/* Card 3 - Top Right */}
              <div style={{
                position: 'absolute',
                top: '0%',
                right: '0%',
                width: '210px',
                background: 'white',
                borderRadius: '18px',
                padding: '18px',
                boxShadow: '0 14px 40px rgba(0,0,0,0.16)',
                transform: 'rotate(-6deg)',
                transition: 'all 0.3s',
                cursor: 'pointer',
                zIndex: 7
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1.1) translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 45px rgba(34, 197, 94, 0.3)';
                  e.currentTarget.style.zIndex = '20';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'rotate(-6deg)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.15)';
                  e.currentTarget.style.zIndex = '7';
                }}
              >
                <div style={{
                  width: '100%',
                  height: '140px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '12px',
                  position: 'relative',
                  background: '#f3f4f6'
                }}>
                  <img
                    src="/play.jpg"
                    alt="Common Kitchen"
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
                <p style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '0.95rem', color: '#2d3748' }}>Play Area</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6c757d' }}>Hyderabad</p>
              </div>

              {/* Card 4 - Middle Left */}
              <div style={{
                position: 'absolute',
                top: '35%',
                left: '3%',
                width: '195px',
                background: 'white',
                borderRadius: '18px',
                padding: '18px',
                boxShadow: '0 12px 35px rgba(0,0,0,0.14)',
                transform: 'rotate(10deg)',
                transition: 'all 0.3s',
                cursor: 'pointer',
                zIndex: 4
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1.1) translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.3)';
                  e.currentTarget.style.zIndex = '20';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'rotate(10deg)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.12)';
                  e.currentTarget.style.zIndex = '4';
                }}
              >
                <div style={{
                  width: '100%',
                  height: '125px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '12px',
                  position: 'relative',
                  background: '#f3f4f6'
                }}>
                  <img
                    src="/gym.jpeg"
                    alt="Fitness Center"
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
                <p style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '0.95rem', color: '#2d3748' }}>Fitness Center</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6c757d' }}>Hyderabad</p>
              </div>

              {/* Card 5 - Middle Center */}
              <div style={{
                position: 'absolute',
                top: '40%',
                left: '33%',
                width: '185px',
                background: 'white',
                borderRadius: '18px',
                padding: '17px',
                boxShadow: '0 12px 35px rgba(0,0,0,0.14)',
                transform: 'rotate(-5deg)',
                transition: 'all 0.3s',
                cursor: 'pointer',
                zIndex: 5
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1.1) translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.3)';
                  e.currentTarget.style.zIndex = '20';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'rotate(-5deg)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.12)';
                  e.currentTarget.style.zIndex = '5';
                }}
              >
                <div style={{
                  width: '100%',
                  height: '120px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '12px',
                  position: 'relative',
                  background: '#f3f4f6'
                }}>
                  <img
                    src="/generator.png"
                    alt="Movie Room"
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
                <p style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '0.9rem', color: '#2d3748' }}>Power Backup</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6c757d' }}>Hyderabad</p>
              </div>

              {/* Card 6 - Middle Right */}
              <div style={{
                position: 'absolute',
                top: '38%',
                right: '2%',
                width: '200px',
                background: 'white',
                borderRadius: '18px',
                padding: '18px',
                boxShadow: '0 14px 40px rgba(0,0,0,0.16)',
                transform: 'rotate(7deg)',
                transition: 'all 0.3s',
                cursor: 'pointer',
                zIndex: 6
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1.1) translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 45px rgba(34, 197, 94, 0.3)';
                  e.currentTarget.style.zIndex = '20';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'rotate(7deg)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.15)';
                  e.currentTarget.style.zIndex = '6';
                }}
              >
                <div style={{
                  width: '100%',
                  height: '130px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '12px',
                  position: 'relative',
                  background: '#f3f4f6'
                }}>
                  <img
                    src="/food.png"
                    alt="Coffee Lounge"
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
                <p style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '0.95rem', color: '#2d3748' }}>Monthly 3 buffets</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6c757d' }}>Hyderabad</p>
              </div>

              {/* Card 7 - Bottom Left */}
              <div style={{
                position: 'absolute',
                bottom: '12%',
                left: '8%',
                width: '190px',
                background: 'white',
                borderRadius: '18px',
                padding: '18px',
                boxShadow: '0 12px 35px rgba(0,0,0,0.14)',
                transform: 'rotate(-9deg)',
                transition: 'all 0.3s',
                cursor: 'pointer',
                zIndex: 5
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1.1) translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.3)';
                  e.currentTarget.style.zIndex = '20';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'rotate(-9deg)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.12)';
                  e.currentTarget.style.zIndex = '5';
                }}
              >
                <div style={{
                  width: '100%',
                  height: '120px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '12px',
                  position: 'relative',
                  background: '#f3f4f6'
                }}>
                  <img
                    src="/wash.png"
                    alt="Laundry Service"
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
                <p style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '0.95rem', color: '#2d3748' }}>Laundry Service</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6c757d' }}>Hyderabad</p>
              </div>

              {/* Card 8 - Bottom Center */}
              <div style={{
                position: 'absolute',
                bottom: '8%',
                left: '38%',
                width: '180px',
                background: 'white',
                borderRadius: '18px',
                padding: '16px',
                boxShadow: '0 12px 35px rgba(0,0,0,0.14)',
                transform: 'rotate(6deg)',
                transition: 'all 0.3s',
                cursor: 'pointer',
                zIndex: 4
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1.1) translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.3)';
                  e.currentTarget.style.zIndex = '20';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'rotate(6deg)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.12)';
                  e.currentTarget.style.zIndex = '4';
                }}
              >
                <div style={{
                  width: '100%',
                  height: '115px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '12px',
                  position: 'relative',
                  background: '#f3f4f6'
                }}>
                  <img
                    src="/cup.png"
                    alt="Game Room"
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
                <p style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '0.88rem', color: '#2d3748' }}>Individual Cupboard</p>
                <p style={{ margin: 0, fontSize: '0.72rem', color: '#6c757d' }}>Hyderabad</p>
              </div>

              {/* Card 9 - Bottom Right */}
              <div style={{
                position: 'absolute',
                bottom: '15%',
                right: '5%',
                width: '185px',
                background: 'white',
                borderRadius: '18px',
                padding: '16px',
                boxShadow: '0 12px 35px rgba(0,0,0,0.14)',
                transform: 'rotate(-8deg)',
                transition: 'all 0.3s',
                cursor: 'pointer',
                zIndex: 6
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1.1) translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.3)';
                  e.currentTarget.style.zIndex = '20';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'rotate(-8deg)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.12)';
                  e.currentTarget.style.zIndex = '6';
                }}
              >
                <div style={{
                  width: '100%',
                  height: '115px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '12px',
                  position: 'relative',
                  background: '#f3f4f6'
                }}>
                  <img
                    src="/fun.png"
                    alt="High-Speed WiFi"
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
                <p style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '0.85rem', color: '#2d3748' }}>Fun Activities-Weekend-festival celebrations</p>
                <p style={{ margin: 0, fontSize: '0.72rem', color: '#6c757d' }}>Hyderabad</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The locations that we are available at - Get Inspired Layout */}
      <div style={{ padding: '6rem 2rem', background: '#f8f9fa' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '0.5rem',
            fontWeight: 800,
            color: '#2d3748'
          }}>
            Get inspired!
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#6c757d',
            marginBottom: '4rem'
          }}>
            Discover popular places for unforgettable adventures
          </p>

          {/* Scattered Photo Grid */}
          <div style={{
            position: 'relative',
            minHeight: '800px'
          }}>
            {/* London - Top Left */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '240px',
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
                height: '320px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                position: 'relative'
              }}>
                <img
                  src="/build.webp"
                  alt="London"
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
                  Stayzionn Ladies Hostel, Beside Studio67 Unisex Saloon
                </div>
              </div>
              <p style={{
                margin: '12px 0 0 0',
                fontSize: '0.85rem',
                color: '#6c757d',
                textAlign: 'center'
              }}>
                @Gowlidoddi
              </p>
            </div>

            {/* Amsterdam - Top Center */}
            <div style={{
              position: 'absolute',
              top: '80px',
              left: '280px',
              width: '240px',
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
                height: '300px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                position: 'relative'
              }}>
                <img
                  src="/build.png"
                  alt="Amsterdam"
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
                  Nexgen Dolphin Co-living
                </div>
              </div>
              <p style={{
                margin: '12px 0 0 0',
                fontSize: '0.85rem',
                color: '#6c757d',
                textAlign: 'center'
              }}>
                @Gowlidoddi
              </p>
            </div>

            {/* Barcelona - Top Right */}
            <div style={{
              position: 'absolute',
              top: '0',
              right: '220px',
              width: '240px',
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
                height: '300px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                position: 'relative'
              }}>
                <img
                  src="/build1.png"
                  alt="Barcelona"
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
                  NextGen Dolphin Co-living PG,Narsingi
                </div>
              </div>
              <p style={{
                margin: '12px 0 0 0',
                fontSize: '0.85rem',
                color: '#6c757d',
                textAlign: 'center'
              }}>
                @Gowlidoddi
              </p>
            </div>

            {/* Paris - Top Far Right */}
            <div style={{
              position: 'absolute',
              top: '80px',
              right: '0',
              width: '200px',
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
                height: '280px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                position: 'relative'
              }}>
                <img
                  src="/build2.png"
                  alt="Paris"
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
                  Dolphin Luxury Men's PG
                </div>
              </div>
              <p style={{
                margin: '12px 0 0 0',
                fontSize: '0.85rem',
                color: '#6c757d',
                textAlign: 'center'
              }}>
                @Gowlidoddi
              </p>
            </div>
            {/* Berlin - Middle Left (now uses image from card 1) */}
            <div style={{
              position: 'absolute',
              top: '380px',
              left: '0',
              width: '240px',
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
                height: '300px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                position: 'relative'
              }}>
                <img
                  src="/build.webp"
                  alt="Berlin"
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
                  Stayzionn Ladies Hostel, Beside Studio67 Unisex Saloon
                </div>
              </div>
              <p style={{
                margin: '12px 0 0 0',
                fontSize: '0.85rem',
                color: '#6c757d',
                textAlign: 'center'
              }}>
                @Gowlidoddi
              </p>
            </div>

            {/* Rome - Middle Center (now uses image from card 2) */}
            <div style={{
              position: 'absolute',
              top: '440px',
              left: '280px',
              width: '240px',
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
                height: '280px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                position: 'relative'
              }}>
                <img
                  src="/build.png"
                  alt="Rome"
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
                  Nexgen Dolphin Co-living
                </div>
              </div>
              <p style={{
                margin: '12px 0 0 0',
                fontSize: '0.85rem',
                color: '#6c757d',
                textAlign: 'center'
              }}>
                @Gowlidoddi
              </p>
            </div>

            {/* New Zealand - Middle Right (now uses image from card 3) */}
            <div style={{
              position: 'absolute',
              top: '360px',
              right: '220px',
              width: '240px',
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
                height: '300px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                position: 'relative'
              }}>
                <img
                  src="/build1.png"
                  alt="New Zealand"
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
                  NextGen Dolphin Co-living PG,Narsingi
                </div>
              </div>
              <p style={{
                margin: '12px 0 0 0',
                fontSize: '0.85rem',
                color: '#6c757d',
                textAlign: 'center'
              }}>
                @Gowlidoddi
              </p>
            </div>

            {/* Dublin - Bottom Right (now uses image from card 4) */}
            <div style={{
              position: 'absolute',
              top: '420px',
              right: '0',
              width: '200px',
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
                height: '280px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                position: 'relative'
              }}>
                <img
                  src="/build2.png"
                  alt="Dublin"
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
                  Dolphin Luxury Men's PG
                </div>
              </div>
              <p style={{
                margin: '12px 0 0 0',
                fontSize: '0.85rem',
                color: '#6c757d',
                textAlign: 'center'
              }}>
                @Gowlidoddi
              </p>
            </div>
          </div>
        </div>
      </div>

      
      {/* Contact Section - REDESIGNED */}
      <div style={{ padding: '6rem 2rem', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.8rem',
            marginBottom: '0.5rem',
            fontWeight: 800,
            textAlign: 'center',
            color: '#2d3748'
          }}>
            Get In Touch
          </h2>
          <p style={{
            textAlign: 'center',
            fontSize: '1.1rem',
            color: '#6c757d',
            marginBottom: '5rem',
            maxWidth: '700px',
            margin: '0 auto 5rem'
          }}>
            Have questions? We're here to help! Reach out to us through any of these channels.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            position: 'relative'
          }}>
            {/* Email Card */}
            <div
              style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'all 0.3s',
                position: 'relative',
                border: '1px solid #f1f5f9',
                textAlign: 'center'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(34, 197, 94, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
              }}
            >
              {/* Step Number */}
              <div style={{
                position: 'absolute',
                top: '-15px',
                right: '30px',
                fontSize: '4rem',
                fontWeight: 900,
                color: '#f1f5f9',
                lineHeight: 1
              }}>
                01
              </div>

              {/* Icon */}
              <div style={{
                width: '70px',
                height: '70px',
                margin: '0 auto 1.5rem',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #22c55e15 0%, #22c55e30 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#22c55e'
              }}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 6 10-6" />
                </svg>
              </div>

              <h3 style={{
                marginBottom: '1rem',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#2d3748'
              }}>
                Email Us
              </h3>
              <p style={{
                color: '#64748b',
                lineHeight: 1.7,
                margin: '0 0 1.5rem 0',
                fontSize: '1rem'
              }}>
                Send us an email and we'll get back to you within 24 hours.
              </p>
              <a
                href="mailto:info@nextgenhostels.com"
                style={{
                  display: 'inline-block',
                  color: '#22c55e',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#16a34a';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#22c55e';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                info@nextgenhostels.com
              </a>
            </div>

            {/* Phone Card */}
            <div
              style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'all 0.3s',
                position: 'relative',
                border: '1px solid #f1f5f9',
                textAlign: 'center'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
              }}
            >
              {/* Step Number */}
              <div style={{
                position: 'absolute',
                top: '-15px',
                right: '30px',
                fontSize: '4rem',
                fontWeight: 900,
                color: '#f1f5f9',
                lineHeight: 1
              }}>
                02
              </div>

              {/* Icon */}
              <div style={{
                width: '70px',
                height: '70px',
                margin: '0 auto 1.5rem',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #3b82f615 0%, #3b82f630 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3b82f6'
              }}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>

              <h3 style={{
                marginBottom: '1rem',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#2d3748'
              }}>
                Call Us
              </h3>
              <p style={{
                color: '#64748b',
                lineHeight: 1.7,
                margin: '0 0 1.5rem 0',
                fontSize: '1rem'
              }}>
                Our team is available Monday to Saturday, 9 AM - 7 PM IST.
              </p>
              <a
                href="tel:+919876543210"
                style={{
                  display: 'inline-block',
                  color: '#3b82f6',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#2563eb';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#3b82f6';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                +91 98765 43210
              </a>
            </div>

            {/* WhatsApp Card */}
            <div
              style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'all 0.3s',
                position: 'relative',
                border: '1px solid #f1f5f9',
                textAlign: 'center'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(37, 211, 102, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
              }}
            >
              {/* Step Number */}
              <div style={{
                position: 'absolute',
                top: '-15px',
                right: '30px',
                fontSize: '4rem',
                fontWeight: 900,
                color: '#f1f5f9',
                lineHeight: 1
              }}>
                03
              </div>

              {/* Icon */}
              <div style={{
                width: '70px',
                height: '70px',
                margin: '0 auto 1.5rem',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #25d36615 0%, #25d36630 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#25d366'
              }}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>

              <h3 style={{
                marginBottom: '1rem',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#2d3748'
              }}>
                WhatsApp
              </h3>
              <p style={{
                color: '#64748b',
                lineHeight: 1.7,
                margin: '0 0 1.5rem 0',
                fontSize: '1rem'
              }}>
                Chat with us instantly on WhatsApp for quick responses.
              </p>
              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20NextGen%20Hostels"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  color: '#25d366',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#128c7e';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#25d366';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tenant Advice Section - Add this ABOVE the Footer */}
<div style={{ padding: '6rem 2rem', background: 'white' }}>
  <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
    {/* Section Header */}
    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
      <h2 style={{
        fontSize: '3rem',
        marginBottom: '1rem',
        fontWeight: 800,
        color: '#2d3748',
        letterSpacing: '-1px'
      }}>
        Tips for Finding Your <span style={{ color: '#22c55e' }}>Perfect PG</span>
      </h2>
      <p style={{
        fontSize: '1.1rem',
        color: '#6c757d',
        maxWidth: '700px',
        margin: '0 auto'
      }}>
        Make an informed decision with our expert advice
      </p>
    </div>

    {/* Advice Cards Grid */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem',
      marginBottom: '4rem'
    }}>
      {/* Card 1 */}
      <div style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        padding: '2rem',
        borderRadius: '20px',
        border: '2px solid #22c55e20',
        transition: 'all 0.3s'
      }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.15)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={{
          width: '50px',
          height: '50px',
          background: '#22c55e',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <MapPin size={24} color="white" />
        </div>
        <h3 style={{
          fontSize: '1.3rem',
          fontWeight: 700,
          color: '#2d3748',
          marginBottom: '0.75rem'
        }}>
          Location Matters
        </h3>
        <p style={{
          color: '#6c757d',
          lineHeight: 1.7,
          fontSize: '0.95rem'
        }}>
          Choose a PG close to your workplace or college. Consider proximity to public transport, markets, and hospitals for convenience.
        </p>
      </div>

      {/* Card 2 */}
      <div style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
        padding: '2rem',
        borderRadius: '20px',
        border: '2px solid #3b82f620',
        transition: 'all 0.3s'
      }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.15)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={{
          width: '50px',
          height: '50px',
          background: '#3b82f6',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <ShieldCheck size={24} color="white" />
        </div>
        <h3 style={{
          fontSize: '1.3rem',
          fontWeight: 700,
          color: '#2d3748',
          marginBottom: '0.75rem'
        }}>
          Safety First
        </h3>
        <p style={{
          color: '#6c757d',
          lineHeight: 1.7,
          fontSize: '0.95rem'
        }}>
          Verify security measures like CCTV cameras, 24/7 security guards, and safe neighborhood. Check reviews from current residents.
        </p>
      </div>

      {/* Card 3 */}
      <div style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        padding: '2rem',
        borderRadius: '20px',
        border: '2px solid #f59e0b20',
        transition: 'all 0.3s'
      }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(245, 158, 11, 0.15)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={{
          width: '50px',
          height: '50px',
          background: '#f59e0b',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <CreditCard size={24} color="white" />
        </div>
        <h3 style={{
          fontSize: '1.3rem',
          fontWeight: 700,
          color: '#2d3748',
          marginBottom: '0.75rem'
        }}>
          Budget Wisely
        </h3>
        <p style={{
          color: '#6c757d',
          lineHeight: 1.7,
          fontSize: '0.95rem'
        }}>
          Compare prices and amenities. Ensure rent includes essentials like WiFi, electricity, and food. Watch out for hidden charges.
        </p>
      </div>

      {/* Card 4 */}
      <div style={{
        background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
        padding: '2rem',
        borderRadius: '20px',
        border: '2px solid #ec489920',
        transition: 'all 0.3s'
      }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(236, 72, 153, 0.15)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={{
          width: '50px',
          height: '50px',
          background: '#ec4899',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <Utensils size={24} color="white" />
        </div>
        <h3 style={{
          fontSize: '1.3rem',
          fontWeight: 700,
          color: '#2d3748',
          marginBottom: '0.75rem'
        }}>
          Check Amenities
        </h3>
        <p style={{
          color: '#6c757d',
          lineHeight: 1.7,
          fontSize: '0.95rem'
        }}>
          Ensure essentials like clean washrooms, laundry, power backup, and quality food. Visit in person before finalizing.
        </p>
      </div>

      {/* Card 5 */}
      <div style={{
        background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
        padding: '2rem',
        borderRadius: '20px',
        border: '2px solid #14b8a620',
        transition: 'all 0.3s'
      }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(20, 184, 166, 0.15)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={{
          width: '50px',
          height: '50px',
          background: '#14b8a6',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <Users2 size={24} color="white" />
        </div>
        <h3 style={{
          fontSize: '1.3rem',
          fontWeight: 700,
          color: '#2d3748',
          marginBottom: '0.75rem'
        }}>
          Know the Rules
        </h3>
        <p style={{
          color: '#6c757d',
          lineHeight: 1.7,
          fontSize: '0.95rem'
        }}>
          Understand PG policies on timings, guests, noise levels, and notice periods. Clear communication prevents future conflicts.
        </p>
      </div>

      {/* Card 6 */}
      <div style={{
        background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
        padding: '2rem',
        borderRadius: '20px',
        border: '2px solid #ef444420',
        transition: 'all 0.3s'
      }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(239, 68, 68, 0.15)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={{
          width: '50px',
          height: '50px',
          background: '#ef4444',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <Book size={24} color="white" />
        </div>
        <h3 style={{
          fontSize: '1.3rem',
          fontWeight: 700,
          color: '#2d3748',
          marginBottom: '0.75rem'
        }}>
          Read the Agreement
        </h3>
        <p style={{
          color: '#6c757d',
          lineHeight: 1.7,
          fontSize: '0.95rem'
        }}>
          Carefully review the rental agreement. Understand deposit refund policies, rent increase terms, and maintenance responsibilities.
        </p>
      </div>
    </div>

    {/* Booking CTA Box */}
    <div style={{
      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      padding: '4rem 3rem',
      borderRadius: '24px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(34, 197, 94, 0.3)'
    }}>
      {/* Decorative circles */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-80px',
        left: '-80px',
        width: '250px',
        height: '250px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '50%'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: 'white',
          marginBottom: '1rem',
          lineHeight: 1.2
        }}>
          Ready to Book Your Room?
        </h3>
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.95)',
          marginBottom: '2.5rem',
          maxWidth: '600px',
          margin: '0 auto 2.5rem'
        }}>
          Don't wait! Our best rooms are filling up fast. Secure your spot today and start your comfortable living experience.
        </p>

        <div style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => navigate('/tenant/rooms')}
            style={{
              background: 'white',
              color: '#22c55e',
              padding: '1.3rem 3.5rem',
              fontSize: '1.1rem',
              fontWeight: 700,
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              transition: 'all 0.3s',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
            }}
          >
            <Sparkles size={22} />
            Book Now
            <ArrowRight size={22} />
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'white',
            fontSize: '0.95rem',
            fontWeight: 500
          }}>
            
            
          </div>
        </div>

        {/* Trust badges */}
        <div style={{
          marginTop: '2.5rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '2.5rem',
          flexWrap: 'wrap',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'white'
          }}>
            <ShieldCheck size={20} />
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>100% Safe & Verified</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'white'
          }}>
            <Heart size={20} />
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>5000+ Happy Residents</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'white'
          }}>
            <Star size={20} />
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>4.8/5 Rating</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/* About Section */}
<div id="about" style={{ padding: '6rem 2rem', background: 'white' }}>
  <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
      <h2 style={{
        fontSize: '3rem',
        marginBottom: '1rem',
        fontWeight: 800,
        color: '#2d3748',
        letterSpacing: '-1px'
      }}>
        About <span style={{ color: '#22c55e' }}>NextGen Hostels</span>
      </h2>
      <div style={{
        width: '80px',
        height: '4px',
        background: 'linear-gradient(90deg, #22c55e, #16a34a)',
        margin: '0 auto 2rem',
        borderRadius: '2px'
      }} />
    </div>

    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '4rem',
      alignItems: 'center'
    }}>
      <div>
        <h3 style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          color: '#2d3748'
        }}>
          Your Home Away From Home
        </h3>
        <p style={{
          fontSize: '1.1rem',
          lineHeight: 1.8,
          color: '#6c757d',
          marginBottom: '1.5rem'
        }}>
          NextGen Hostels is redefining co-living in Hyderabad. We believe that your accommodation should be more than just four walls and a roof – it should be a community, a comfort zone, and a launching pad for your dreams.
        </p>
        <p style={{
          fontSize: '1.1rem',
          lineHeight: 1.8,
          color: '#6c757d',
          marginBottom: '1.5rem'
        }}>
          Founded with a vision to provide premium, affordable, and safe living spaces for students and working professionals, we've created an ecosystem where you can focus on what truly matters – your growth and success.
        </p>

        <div style={{ marginTop: '2rem' }}>
          <h4 style={{
            fontSize: '1.3rem',
            fontWeight: 700,
            marginBottom: '1rem',
            color: '#2d3748'
          }}>
            Why Choose NextGen?
          </h4>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {[
              'Premium amenities at affordable prices',
              'Safe and secure environment with 24/7 security',
              'Strategic locations near IT hubs and educational institutions',
              'Community-focused living with regular events',
              'Professional housekeeping and maintenance',
              'Flexible sharing options to suit your budget'
            ].map((item, index) => (
              <li key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem',
                fontSize: '1rem',
                color: '#6c757d'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ color: 'white', fontSize: '0.75rem' }}>✓</span>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          padding: '2.5rem 2rem',
          borderRadius: '20px',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3)'
        }}>
          <div style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            marginBottom: '0.5rem'
          }}>
            500+
          </div>
          <div style={{ fontSize: '1.1rem', opacity: 0.95 }}>Happy Residents</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          padding: '2.5rem 2rem',
          borderRadius: '20px',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
        }}>
          <div style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            marginBottom: '0.5rem'
          }}>
            10+
          </div>
          <div style={{ fontSize: '1.1rem', opacity: 0.95 }}>Premium Locations</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          padding: '2.5rem 2rem',
          borderRadius: '20px',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)'
        }}>
          <div style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            marginBottom: '0.5rem'
          }}>
            4.8
          </div>
          <div style={{ fontSize: '1.1rem', opacity: 0.95 }}>Average Rating</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
          padding: '2.5rem 2rem',
          borderRadius: '20px',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(236, 72, 153, 0.3)'
        }}>
          <div style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            marginBottom: '0.5rem'
          }}>
            24/7
          </div>
          <div style={{ fontSize: '1.1rem', opacity: 0.95 }}>Support Available</div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Footer - Hyderabad Locations */}
      <div style={{
        background: '#1a1a1a',
        color: 'white',
        padding: '4rem 2rem 2rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Top Section with Location Columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            {/* Company Info */}
            <div>
              <img
                src="/logo.png"
                alt="NextGen Logo"
                style={{
                  height: '80px',          // 🔥 BIGGER LOGO
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />

              <p style={{
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.7,
                fontSize: '0.9rem',
                marginBottom: '1.5rem'
              }}>
                Premium PG accommodations in Hyderabad. Your comfort is our priority.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'all 0.3s'
                }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#22c55e';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            {/* Column 1 - PG Locations */}
            <div>
              <h3 style={{
                marginBottom: '1rem',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#22c55e'
              }}>
                Popular Locations
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {['PGs in Gachibowli', 'PGs in Hitech City', 'PGs in Madhapur', 'PGs in Kondapur', 'PGs in Kukatpally', 'PGs in Miyapur', 'PGs in Ameerpet', 'PGs in Begumpet'].map((location, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    <a href="#" style={{
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      transition: 'color 0.3s'
                    }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#22c55e'}
                      onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                    >
                      {location}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 - More Locations */}
            <div>
              <h3 style={{
                marginBottom: '1rem',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#22c55e'
              }}>
                More Locations
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {['PGs in Secunderabad', 'PGs in Banjara Hills', 'PGs in Jubilee Hills', 'PGs in Somajiguda', 'PGs in Punjagutta', 'PGs in SR Nagar', 'PGs in Nizampet', 'PGs in KPHB'].map((location, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    <a href="#" style={{
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      transition: 'color 0.3s'
                    }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#22c55e'}
                      onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                    >
                      {location}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Tech Parks & Districts */}
            <div>
              <h3 style={{
                marginBottom: '1rem',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#22c55e'
              }}>
                Tech Parks & Districts
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {['PGs in Manikonda', 'PGs in Financial District', 'PGs in Nanakramguda', 'PGs in Kokapet', 'PGs in Lingampally', 'PGs in Chandanagar', 'PGs in Hafeezpet', 'PGs in Gopanpally'].map((location, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    <a href="#" style={{
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      transition: 'color 0.3s'
                    }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#22c55e'}
                      onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                    >
                      {location}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Additional Areas */}
            <div>
              <h3 style={{
                marginBottom: '1rem',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#22c55e'
              }}>
                Additional Areas
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {['PGs in Raidurg', 'PGs in Attapur', 'PGs in Tolichowki', 'PGs in Mehdipatnam', 'PGs in Masab Tank', 'PGs in Lakdikapul', 'Flats in Hyderabad', 'Flats in Gachibowli'].map((location, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    <a href="#" style={{
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      transition: 'color 0.3s'
                    }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#22c55e'}
                      onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                    >
                      {location}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5 - Quick Links */}
            <div>
              <h3 style={{
                marginBottom: '1rem',
                fontSize: '1rem',
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
                {['Flats in Hitech City', 'Flats in Madhapur', 'Flats in Kondapur', 'Flats in Financial District', 'About Us', 'Contact Us', 'Privacy Policy', 'Terms & Conditions'].map((link, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    <a href="#" style={{
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      transition: 'color 0.3s'
                    }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#22c55e'}
                      onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Section */}
          <div style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.9rem'
          }}>
            <p style={{ margin: 0 }}>
              © 2025 NextGen Hostels. All rights reserved. | Premium PG Accommodations in Hyderabad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;