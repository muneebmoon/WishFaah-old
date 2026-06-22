// src/app/(inner-pages)/layout.js
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function InnerPagesLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Navbar is forced to be solid cream immediately */}
      <Navbar transparent={false} />
      
      {/* 2. Padding is applied here so content clears the fixed header */}
      <main className="flex-grow pt-20 md:pt-26">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}