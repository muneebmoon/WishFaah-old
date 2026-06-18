import "./globals.css";

export const metadata = {
  title: "WishFaah",
  description: "Your Boutique Home",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
