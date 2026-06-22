import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FiShoppingBag, 
  FiTruck, 
  FiAward, 
  FiHeart,
  FiGlobe,
  FiFacebook,
  FiInstagram,
  FiChevronRight,
  FiStar,
  FiShield,
  FiRefreshCw
} from 'react-icons/fi';

import { FaWhatsapp } from 'react-icons/fa6';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F6F0D7]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#C5D89D] opacity-10"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#9CAB84] opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-4 border-[#C5D89D] opacity-5"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5D89D] bg-opacity-20 mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#89986D' }}>
                About WishFaah
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: '#4A5A3A' }}>
              Empowering Women Through
              <span className="block mt-2" style={{ color: '#89986D' }}>Fashion & Confidence</span>
            </h1>
            
            <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: '#4A5A3A' }}>
              Discover affordable luxury with WishFaah – your trusted destination for premium women's fashion in Pakistan.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: '#89986D' }}
              >
                <span>Shop Now</span>
                <FiChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#story"
                className="inline-flex items-center gap-2 px-8 py-3.5 font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ 
                  backgroundColor: '#C5D89D',
                  color: '#4A5A3A'
                }}
              >
                <span>Our Story</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-16 md:py-20 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5D89D] bg-opacity-20 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#89986D' }}>
                  Our Story
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#4A5A3A' }}>
                Bringing Fashion to Every Woman in Pakistan
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: '#4A5A3A' }}>
                <p>
                  <span className="font-bold" style={{ color: '#89986D' }}>WishFaah</span> was born with a simple yet powerful vision – to make quality women's fashion accessible and affordable for every woman in Pakistan.
                </p>
                <p>
                  Operating from the heart of Pakistan, we understand the unique style preferences of Pakistani women. Our collections blend traditional elegance with contemporary trends, ensuring you always look your best without breaking the bank.
                </p>
                <p>
                  We take pride in offering premium products at wholesale prices, making fashion democratized and available to women from all walks of life. Whether you're in Karachi, Lahore, Islamabad, or anywhere in between, WishFaah delivers style right to your doorstep.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-6">
                <div>
                  <div className="text-3xl font-bold" style={{ color: '#89986D' }}>500+</div>
                  <div className="text-sm" style={{ color: '#9CAB84' }}>Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold" style={{ color: '#89986D' }}>50+</div>
                  <div className="text-sm" style={{ color: '#9CAB84' }}>Cities Served</div>
                </div>
                <div>
                  <div className="text-3xl font-bold" style={{ color: '#89986D' }}>100%</div>
                  <div className="text-sm" style={{ color: '#9CAB84' }}>Satisfaction Rate</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F6F0D7] shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">👗</div>
                    <h3 className="text-2xl font-bold" style={{ color: '#89986D' }}>WishFaah</h3>
                    <p className="text-sm" style={{ color: '#4A5A3A' }}>Women's Fashion</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#C5D89D] rounded-full opacity-20"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#9CAB84] rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-[#F6F0D7]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5D89D] bg-opacity-20 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#89986D' }}>
                Why WishFaah
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#4A5A3A' }}>
              Why Choose <span style={{ color: '#89986D' }}>WishFaah</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FiShoppingBag,
                title: 'Premium Quality',
                description: 'Carefully curated collections with the finest materials and craftsmanship.',
                color: '#89986D'
              },
              {
                icon: FiTruck,
                title: 'Pan-Pakistan Delivery',
                description: 'Fast and reliable delivery to any location across Pakistan.',
                color: '#9CAB84'
              },
              {
                icon: FiAward,
                title: 'Wholesale Prices',
                description: 'Get premium fashion at affordable wholesale rates.',
                color: '#89986D'
              },
              {
                icon: FiHeart,
                title: 'Customer First',
                description: 'Your satisfaction is our top priority with dedicated support.',
                color: '#C5D89D'
              },
              {
                icon: FiRefreshCw,
                title: 'Easy Returns',
                description: 'Hassle-free returns and exchanges for your peace of mind.',
                color: '#9CAB84'
              },
              {
                icon: FiShield,
                title: 'Secure Shopping',
                description: 'Safe and secure payment options for worry-free shopping.',
                color: '#89986D'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group p-6 bg-white rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <feature.icon size={24} style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#4A5A3A' }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#4A5A3A' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-[#F6F0D7] transition-all duration-300 hover:shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-[#89986D] bg-opacity-20 flex items-center justify-center mb-4">
                <FiGlobe size={24} style={{ color: '#89986D' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#4A5A3A' }}>
                Our Mission
              </h3>
              <p className="leading-relaxed" style={{ color: '#4A5A3A' }}>
                To empower women across Pakistan by providing access to high-quality, affordable fashion that boosts confidence and celebrates individuality. We strive to make every woman feel beautiful, valued, and stylish.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F6F0D7] transition-all duration-300 hover:shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-[#C5D89D] bg-opacity-20 flex items-center justify-center mb-4">
                <FiStar size={24} style={{ color: '#9CAB84' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#4A5A3A' }}>
                Our Vision
              </h3>
              <p className="leading-relaxed" style={{ color: '#4A5A3A' }}>
                To become Pakistan's most trusted and beloved women's fashion destination, known for exceptional quality, affordable prices, and an unwavering commitment to customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 bg-[#F6F0D7]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#4A5A3A' }}>
              Our Core <span style={{ color: '#89986D' }}>Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: 'Quality First',
                description: 'We never compromise on the quality of our products.',
                icon: '✨'
              },
              {
                title: 'Affordability',
                description: 'Premium fashion at prices everyone can afford.',
                icon: '💰'
              },
              {
                title: 'Customer Love',
                description: 'Every customer is treated like family.',
                icon: '❤️'
              },
              {
                title: 'Innovation',
                description: 'Constantly evolving to bring you the latest trends.',
                icon: '🌟'
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-white rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#4A5A3A' }}>
                  {value.title}
                </h3>
                <p className="text-sm" style={{ color: '#4A5A3A' }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#4A5A3A' }}>
              What Our <span style={{ color: '#89986D' }}>Customers Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Ayesha Khan',
                location: 'Karachi',
                review: 'WishFaah has completely transformed my wardrobe! The quality is amazing and prices are unbeatable. Highly recommend!',
                rating: 5
              },
              {
                name: 'Fatima Ali',
                location: 'Lahore',
                review: 'I love the variety and style at WishFaah. Fast delivery and excellent customer service. My go-to store for fashion!',
                rating: 5
              },
              {
                name: 'Sana Ahmed',
                location: 'Multan',
                review: 'Finally found a brand that understands Pakistani women! Beautiful designs and affordable prices. Could not be happier.',
                rating: 5
              }
              
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-[#F6F0D7] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} size={16} className="fill-current" style={{ color: '#C5D89D' }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#4A5A3A' }}>
                  "{testimonial.review}"
                </p>
                <div>
                  <h4 className="font-bold" style={{ color: '#4A5A3A' }}>{testimonial.name}</h4>
                  <p className="text-xs" style={{ color: '#9CAB84' }}>{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect With Us */}
      <section className="py-16 md:py-20 bg-[#89986D] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white opacity-5"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-white opacity-5"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Connect With WishFaah
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white opacity-90">
            Follow us on social media for the latest collections, exclusive offers, and fashion inspiration.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#"
              className="group p-4 bg-white bg-opacity-20 rounded-full hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-xl"
              aria-label="Follow us on Facebook"
            >
              <FiFacebook size={28} className="text-black group-hover:text-[#89986D] transition-colors" />
            </a>
            <a 
              href="#"
              className="group p-4 bg-white bg-opacity-20 rounded-full hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-xl"
              aria-label="Follow us on Instagram"
            >
              <FiInstagram size={28} className="text-black group-hover:text-[#89986D] transition-colors" />
            </a>
            {/* <a 
              href="#"
              className="group p-4 bg-white bg-opacity-20 rounded-full hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-xl"
              aria-label="Follow us on Pinterest"
            >
              <FiPinterest size={28} className="text-white group-hover:text-[#89986D] transition-colors" />
            </a> */}
            <a 
              href="#"
              className="group p-4 bg-white bg-opacity-20 rounded-full hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-xl"
              aria-label="Chat with us on WhatsApp"
            >
              <FaWhatsapp size={28} className="text-black group-hover:text-[#89986D] transition-colors" />
            </a>
          </div>

          <div className="mt-8">
            <p className="text-white opacity-80 text-sm">
              📍 Serving women across Pakistan 🇵🇰
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}