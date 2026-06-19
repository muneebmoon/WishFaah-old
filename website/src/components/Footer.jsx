"use client";

import React from 'react';
import Link from 'next/link';
import { 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiSend, 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiYoutube,
  FiChevronRight 
} from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#F6F0D7] overflow-hidden">
      {/* Background Design Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Circle Background */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#C5D89D] opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#9CAB84] opacity-10"></div>
        
        {/* Decorative Dots Pattern */}
        <div className="absolute top-20 left-10">
          <div className="grid grid-cols-4 gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#89986D] opacity-20"></div>
            ))}
          </div>
        </div>
        
        {/* Decorative Lines */}
        <div className="absolute bottom-0 right-0 w-64 h-64">
          <div className="absolute bottom-0 right-0 w-48 h-48 border-8 border-[#C5D89D] opacity-20 rounded-tl-full"></div>
        </div>
        
        {/* Floating Shapes */}
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-[#9CAB84] opacity-10 rotate-45"></div>
        <div className="absolute bottom-1/4 right-1/3 w-8 h-8 bg-[#89986D] opacity-10 rounded-full"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F6F0D7] to-[#C5D89D] opacity-30"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Row 1 - 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1 - Logo & Contact */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-bold tracking-tight">
                <span style={{ color: '#89986D' }}>Wish</span>
                <span style={{ color: '#9CAB84' }}>Faah</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: '#4A5A3A' }}>
              Your one-stop destination for quality products. We bring you the best selection with exceptional service.
            </p>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-[#C5D89D] bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300">
                  <FiPhone size={16} style={{ color: '#89986D' }} />
                </div>
                <span className="text-sm hover:text-[#89986D] transition-colors duration-200" style={{ color: '#4A5A3A' }}>
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-[#C5D89D] bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300">
                  <FiMail size={16} style={{ color: '#89986D' }} />
                </div>
                <span className="text-sm hover:text-[#89986D] transition-colors duration-200" style={{ color: '#4A5A3A' }}>
                  support@wishfaah.com
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-[#C5D89D] bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300">
                  <FiMapPin size={16} style={{ color: '#89986D' }} />
                </div>
                <span className="text-sm hover:text-[#89986D] transition-colors duration-200" style={{ color: '#4A5A3A' }}>
                  123 Fashion Street, NY 10001
                </span>
              </div>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold relative inline-block" style={{ color: '#4A5A3A' }}>
              Quick Links
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#89986D] opacity-50"></span>
            </h3>
            <ul className="space-y-3">
              {['About Us', 'Shop All', 'Collections', 'Blog'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="flex items-center gap-2 text-sm hover:text-[#89986D] transition-all duration-200 group"
                    style={{ color: '#4A5A3A' }}
                  >
                    <FiChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1" style={{ color: '#89986D' }} />
                    <span className="group-hover:translate-x-2 transition-transform duration-200">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold relative inline-block" style={{ color: '#4A5A3A' }}>
              Support
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#89986D] opacity-50"></span>
            </h3>
            <ul className="space-y-3">
              {['Help Center', 'Returns Policy', 'Track Order', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="flex items-center gap-2 text-sm hover:text-[#89986D] transition-all duration-200 group"
                    style={{ color: '#4A5A3A' }}
                  >
                    <FiChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1" style={{ color: '#89986D' }} />
                    <span className="group-hover:translate-x-2 transition-transform duration-200">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletter & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold relative inline-block" style={{ color: '#4A5A3A' }}>
              Newsletter
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#89986D] opacity-50"></span>
            </h3>
            <p className="text-sm" style={{ color: '#4A5A3A' }}>
              Subscribe for exclusive offers and updates
            </p>
            
            {/* Newsletter Form */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
                style={{ 
                  borderColor: '#C5D89D',
                  backgroundColor: 'white',
                  color: '#4A5A3A'
                }}
                onFocus={(e) => e.target.style.borderColor = '#89986D'}
                onBlur={(e) => e.target.style.borderColor = '#C5D89D'}
              />
              <button 
                className="px-6 py-2.5 text-sm font-medium text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group"
                style={{ backgroundColor: '#89986D' }}
              >
                <span>Subscribe</span>
                <FiSend size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <h4 className="text-sm font-medium mb-3" style={{ color: '#4A5A3A' }}>Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { icon: FiFacebook, label: 'Facebook' },
                  { icon: FiTwitter, label: 'Twitter' },
                  { icon: FiInstagram, label: 'Instagram' },
                  { icon: FiYoutube, label: 'YouTube' }
                ].map((social, index) => (
                  <Link 
                    key={index}
                    href="#"
                    className="p-2.5 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                    style={{ backgroundColor: '#C5D89D', color: '#4A5A3A' }}
                    aria-label={social.label}
                  >
                    <social.icon size={18} className="group-hover:text-[#89986D] transition-colors duration-200" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" style={{ borderColor: '#C5D89D' }}></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 text-sm bg-[#F6F0D7]" style={{ color: '#9CAB84' }}>
              ✦
            </span>
          </div>
        </div>

        {/* Row 2 - Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-sm" style={{ color: '#4A5A3A' }}>
            © {currentYear} <span className="font-semibold" style={{ color: '#89986D' }}>WishFaah</span>. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <Link href="/privacy-policy" className="hover:text-[#89986D] transition-colors duration-200" style={{ color: '#4A5A3A' }}>
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[#89986D] transition-colors duration-200" style={{ color: '#4A5A3A' }}>
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-[#89986D] transition-colors duration-200" style={{ color: '#4A5A3A' }}>
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;