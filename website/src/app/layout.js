import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "WishFaah",
  description: "Your Boutique Home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
            <body>
        <Navbar transparent={true} />
        <main className="pt-16 md:pt-20 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
