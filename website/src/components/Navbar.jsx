"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';

const Navbar = ({ transparent = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getBgClasses = () => {
    if (transparent) {
      // On the homepage: transparent initially, transitions to cream on scroll
      return scrolled 
        ? 'bg-[#F6F0D7] shadow-md' 
        : 'bg-transparent';
    }
    // Everywhere else: locked to cream background
    return 'bg-[#F6F0D7] shadow-sm';
  };

  const getTextColor = () => {
    if (transparent) {
      return scrolled ? '#4A5A3A' : '#FFFFFF';
    }
    return '#4A5A3A';
  };

  const textColor = getTextColor();

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${getBgClasses()}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-26">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="relative w-16 h-16 md:w-22 md:h-22 rounded-full border-2 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300" style={{ borderColor: '#89986D' }}>
                <Image
                  src="/images/wishfaah-logo-dark.webp"
                  alt="WishFaah Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Menu - Center */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-sm font-medium hover:text-[#89986D] transition-colors duration-200"
              style={{ color: textColor }}
            >
              Home
            </Link>
            <Link 
              href="/shop" 
              className="text-sm font-medium hover:text-[#89986D] transition-colors duration-200"
              style={{ color: textColor }}
            >
              Shop
            </Link>
            <Link 
              href="/collections" 
              className="text-sm font-medium hover:text-[#89986D] transition-colors duration-200"
              style={{ color: textColor }}
            >
              Collections
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium hover:text-[#89986D] transition-colors duration-200"
              style={{ color: textColor }}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-sm font-medium hover:text-[#89986D] transition-colors duration-200"
              style={{ color: textColor }}
            >
              Contact
            </Link>
          </div>

          {/* Right Icons - Cart & Account */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="p-2 rounded-full hover:bg-[#C5D89D] hover:bg-opacity-20 transition-colors duration-200">
              <FiSearch size={20} style={{ color: textColor }} />
            </button>

            {/* Cart Icon with Badge */}
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-[#C5D89D] hover:bg-opacity-20 transition-colors duration-200">
              <FiShoppingCart size={20} style={{ color: textColor }} />
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full" style={{ backgroundColor: '#89986D' }}>
                0
              </span>
            </Link>

            {/* Account Icon */}
            <Link href="/account" className="p-2 rounded-full hover:bg-[#C5D89D] hover:bg-opacity-20 transition-colors duration-200">
              <FiUser size={20} style={{ color: textColor }} />
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#C5D89D] hover:bg-opacity-20 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FiX size={24} style={{ color: textColor }} />
              ) : (
                <FiMenu size={24} style={{ color: textColor }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Dropdown */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-2 border-t" style={{ borderColor: '#C5D89D' }}>
            <Link 
              href="/" 
              className="block px-3 py-3 rounded-md text-base font-medium hover:bg-[#C5D89D] hover:bg-opacity-20 transition-colors duration-200"
              style={{ color: '#4A5A3A' }}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/shop" 
              className="block px-3 py-3 rounded-md text-base font-medium hover:bg-[#C5D89D] hover:bg-opacity-20 transition-colors duration-200"
              style={{ color: '#4A5A3A' }}
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link 
              href="/collections" 
              className="block px-3 py-3 rounded-md text-base font-medium hover:bg-[#C5D89D] hover:bg-opacity-20 transition-colors duration-200"
              style={{ color: '#4A5A3A' }}
              onClick={() => setIsOpen(false)}
            >
              Collections
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-3 rounded-md text-base font-medium hover:bg-[#C5D89D] hover:bg-opacity-20 transition-colors duration-200"
              style={{ color: '#4A5A3A' }}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="block px-3 py-3 rounded-md text-base font-medium hover:bg-[#C5D89D] hover:bg-opacity-20 transition-colors duration-200"
              style={{ color: '#4A5A3A' }}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;