"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FiPhone, 
  FiMail, 
  FiMessageCircle, 
  FiSend,
  FiCheckCircle,
  FiFacebook,
  FiInstagram,
  FiWhatsapp,
  FiClock,
  FiShield,
  FiHeart
} from 'react-icons/fi';

import { FaWhatsapp, FaPinterest } from 'react-icons/fa6';


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  // Colors
  const C = {
    cream: '#F6F0D7',
    sage: '#89986D',
    sageMid: '#9CAB84',
    sageLight: '#C5D89D',
    green: '#4A5A3A',
    white: '#FFFFFF',
  };

  return (
    <div className="min-h-screen bg-[#F6F0D7] py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5D89D] bg-opacity-20 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.sage }}>
              Get In Touch
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: C.green }}>
            We'd Love to <span style={{ color: C.sage }}>Hear From You</span>
          </h1>
          <p className="text-base sm:text-lg" style={{ color: C.sageMid }}>
            Have questions about our products, orders, or need styling advice? 
            We're here to help you look your best!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information - Left */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <h2 className="text-xl font-bold mb-6" style={{ color: C.green }}>
                Contact Information
              </h2>
              <p className="text-sm mb-6" style={{ color: C.sageMid }}>
                Reach out to us through any of these channels. We typically respond within 1 hour.
              </p>

              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start gap-4 p-3 rounded-xl transition-all duration-300 hover:bg-[#F6F0D7]">
                  <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: `${C.sageLight}20` }}>
                    <FiPhone size={20} style={{ color: C.sage }} />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider" style={{ color: C.sageMid }}>
                      Phone
                    </p>
                    <a href="tel:+923001234567" className="text-sm font-semibold hover:text-[#89986D] transition-colors" style={{ color: C.green }}>
                      +92 348 7089629
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-3 rounded-xl transition-all duration-300 hover:bg-[#F6F0D7]">
                  <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: `${C.sageLight}20` }}>
                    <FiMail size={20} style={{ color: C.sage }} />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider" style={{ color: C.sageMid }}>
                      Email
                    </p>
                    <a href="mailto:support@wishfaah.com" className="text-sm font-semibold hover:text-[#89986D] transition-colors" style={{ color: C.green }}>
                      wishfaah@gmail.com
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4 p-3 rounded-xl transition-all duration-300 hover:bg-[#F6F0D7]">
                  <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: `${C.sageLight}20` }}>
                    <FaWhatsapp size={20} style={{ color: '#25D366' }} />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider" style={{ color: C.sageMid }}>
                      WhatsApp
                    </p>
                    <a href="https://wa.me/923487089629" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:text-[#25D366] transition-colors" style={{ color: C.green }}>
                      Chat with us
                    </a>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start gap-4 p-3 rounded-xl transition-all duration-300 hover:bg-[#F6F0D7]">
                  <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: `${C.sageLight}20` }}>
                    <FiClock size={20} style={{ color: C.sage }} />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider" style={{ color: C.sageMid }}>
                      Response Time
                    </p>
                    <p className="text-sm font-semibold" style={{ color: C.green }}>
                      Within 1 hour
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t" style={{ borderColor: C.sageLight }}>
                <p className="text-sm font-medium mb-4" style={{ color: C.green }}>
                  Connect With Us
                </p>
                <div className="flex gap-3">
                  <a 
                    href="#"
                    className="p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    style={{ backgroundColor: `${C.sageLight}30`, color: C.sage }}
                    aria-label="Facebook"
                  >
                    <FiFacebook size={20} />
                  </a>
                  <a 
                    href="#"
                    className="p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    style={{ backgroundColor: `${C.sageLight}30`, color: C.sage }}
                    aria-label="Instagram"
                  >
                    <FiInstagram size={20} />
                  </a>
                  <a 
                    href="#"
                    className="p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    style={{ backgroundColor: `${C.sageLight}30`, color: C.sage }}
                    aria-label="Pinterest"
                  >
                    <FaPinterest size={20} />
                  </a>
                  <a 
                    href="#"
                    className="p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    style={{ backgroundColor: `${C.sageLight}30`, color: '#25D366' }}
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Right */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <h2 className="text-xl font-bold mb-2" style={{ color: C.green }}>
                Send Us a Message
              </h2>
              <p className="text-sm mb-6" style={{ color: C.sageMid }}>
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${C.sage}20` }}>
                    <FiCheckCircle size={32} style={{ color: C.sage }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: C.green }}>
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm" style={{ color: C.sageMid }}>
                    Thank you for reaching out. We'll get back to you within 1 hour.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1.5" style={{ color: C.green }}>
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200"
                        style={{ 
                          borderColor: C.sageLight,
                          backgroundColor: '#FAFAFA',
                          color: C.green
                        }}
                        onFocus={(e) => e.target.style.borderColor = C.sage}
                        onBlur={(e) => e.target.style.borderColor = C.sageLight}
                        placeholder="Hoorain Fatima"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: C.green }}>
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200"
                        style={{ 
                          borderColor: C.sageLight,
                          backgroundColor: '#FAFAFA',
                          color: C.green
                        }}
                        onFocus={(e) => e.target.style.borderColor = C.sage}
                        onBlur={(e) => e.target.style.borderColor = C.sageLight}
                        placeholder="hoorain@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1.5" style={{ color: C.green }}>
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200"
                      style={{ 
                        borderColor: C.sageLight,
                        backgroundColor: '#FAFAFA',
                        color: C.green
                      }}
                      onFocus={(e) => e.target.style.borderColor = C.sage}
                      onBlur={(e) => e.target.style.borderColor = C.sageLight}
                      placeholder="Order Inquiry, Feedback"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1.5" style={{ color: C.green }}>
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 resize-none"
                      style={{ 
                        borderColor: C.sageLight,
                        backgroundColor: '#FAFAFA',
                        color: C.green
                      }}
                      onFocus={(e) => e.target.style.borderColor = C.sage}
                      onBlur={(e) => e.target.style.borderColor = C.sageLight}
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ backgroundColor: C.sage }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FiSend size={18} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { icon: FiShield, label: 'Secure Communication' },
            { icon: FiClock, label: 'Fast Response' },
            { icon: FiHeart, label: 'Customer First' },
            { icon: FiCheckCircle, label: '100% Satisfaction' },
          ].map((item, index) => (
            <div key={index} className="text-center p-4 rounded-xl bg-white shadow-md">
              <item.icon size={24} className="mx-auto mb-2" style={{ color: C.sage }} />
              <p className="text-xs font-medium" style={{ color: C.green }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative Bottom */}
        <div className="mt-12 text-center">
          <p className="text-xs" style={{ color: C.sageMid }}>
            ✦ We're here to help you look and feel your best ✦
          </p>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" style={{ borderColor: '#C5D89D' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;