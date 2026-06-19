// src/app/(home)/layout.js
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomeLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Navbar is set to transparent by default */}
      <Navbar transparent={true} />
      
      {/* 2. Content starts at the very top of the monitor */}
      <main className="flex-grow pt-0">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}