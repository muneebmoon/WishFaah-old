"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';

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

  const getBgClasses = () => {
    if (transparent) {
      // On the homepage: transparent initially, transitions to cream + text changes on scroll
      return scrolled 
        ? 'bg-[#F6F0D7] shadow-md text-[#4A5A3A]' 
        : 'bg-transparent text-white';
    }
    // Everywhere else: locked to cream background with dark green text immediately
    return 'bg-[#F6F0D7] shadow-sm text-[#4A5A3A]';
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${getBgClasses()}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold tracking-tight" style={{ color: '#89986D' }}>
                Wish<span style={{ color: '#9CAB84' }}>Faah</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu - Center */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-sm font-medium hover:text-[#89986D] transition-colors duration-200"
              style={{ color: '#4A5A3A' }}
            >
              Home
            </Link>
            <Link 
              href="/shop" 
              className="text-sm font-medium hover:text-[#89986D] transition-colors duration-200"
              style={{ color: '#4A5A3A' }}
            >
              Shop
            </Link>
            <Link 
              href="/collections" 
              className="text-sm font-medium hover:text-[#89986D] transition-colors duration-200"
              style={{ color: '#4A5A3A' }}
            >
              Collections
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium hover:text-[#89986D] transition-colors duration-200"
              style={{ color: '#4A5A3A' }}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-sm font-medium hover:text-[#89986D] transition-colors duration-200"
              style={{ color: '#4A5A3A' }}
            >
              Contact
            </Link>
          </div>

          {/* Right Icons - Cart & Account */}
          <div className="flex items-center space-x-4">
            {/* Search Icon - optional */}
            <button className="p-2 rounded-full hover:bg-[#C5D89D] hover:bg-opacity-20 transition-colors duration-200">
              <FiSearch size={20} style={{ color: '#4A5A3A' }} />
            </button>

            {/* Cart Icon with Badge */}
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-[#C5D89D] hover:bg-opacity-20 transition-colors duration-200">
              <FiShoppingCart size={20} style={{ color: '#4A5A3A' }} />
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full" style={{ backgroundColor: '#89986D' }}>
                0
              </span>
            </Link>

            {/* Account Icon */}
            <Link href="/account" className="p-2 rounded-full hover:bg-[#C5D89D] hover:bg-opacity-20 transition-colors duration-200">
              <FiUser size={20} style={{ color: '#4A5A3A' }} />
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#C5D89D] hover:bg-opacity-20 transition-colors duration-200"
            >
              {isOpen ? (
                <FiX size={24} style={{ color: '#4A5A3A' }} />
              ) : (
                <FiMenu size={24} style={{ color: '#4A5A3A' }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Dropdown */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-3 space-y-2 border-t" style={{ borderColor: '#C5D89D' }}>
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#C5D89D] hover:bg-opacity-20 transition-colors duration-200"
              style={{ color: '#4A5A3A' }}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/shop" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#C5D89D] hover:bg-opacity-20 transition-colors duration-200"
              style={{ color: '#4A5A3A' }}
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link 
              href="/collections" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#C5D89D] hover:bg-opacity-20 transition-colors duration-200"
              style={{ color: '#4A5A3A' }}
              onClick={() => setIsOpen(false)}
            >
              Collections
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#C5D89D] hover:bg-opacity-20 transition-colors duration-200"
              style={{ color: '#4A5A3A' }}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#C5D89D] hover:bg-opacity-20 transition-colors duration-200"
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