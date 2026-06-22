// src/app/layout.js
import './globals.css'; // Imports Tailwind or global CSS variables
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

export const metadata = {
  title: 'WishFaah',
  description: 'WishFaah is a Women\'s clothing store.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-[#FDFBF7] antialiased">
        {children}
        
        {/* Floating WhatsApp Icon */}
        <Link
          href="https://wa.me/923001234567?text=Hi%20WishFaah%2C%20I%20have%20a%20question%20about%20your%20products."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-[9999] group"
          aria-label="Chat with us on WhatsApp"
        >
          <div className="relative">
            {/* Pulsing ring animation */}
            <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></div>
            {/* Main WhatsApp button */}
            <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 hover:rotate-[-5deg]">
              <FaWhatsapp size={32} className="text-white md:text-3xl" />
            </div>
          </div>
        </Link>
      </body>
    </html>
  );
}