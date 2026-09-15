import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARAVIND 50 — IMPACT ATLAS",
  description: "Interactive geographic data visualization application for the Aravind Eye Care System Golden Jubilee. One system. A world of impact.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#F7F8F6] text-[#18212B] overflow-hidden">
        {children}
      </body>
    </html>
  );
}
