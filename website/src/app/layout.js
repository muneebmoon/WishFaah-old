
// src/app/layout.js
import './globals.css'; // Imports Tailwind or global CSS variables

export const metadata = {
  title: 'My Website',
  description: 'Built professionally with Next.js App Router',
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