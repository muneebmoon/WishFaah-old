
// src/app/layout.js
import './globals.css'; // Imports Tailwind or global CSS variables

export const metadata = {
  title: 'WishFaah',
  description: 'WishFaah is a Women\'s clothing store.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-[#FDFBF7] antialiased">
        {children}
      </body>
    </html>
  );
}