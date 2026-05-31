import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LenisWrapper from "@/components/layout/LenisWrapper";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Preloader from "@/components/layout/Preloader";
import ScrollProgressRocket from "@/components/layout/ScrollProgressRocket";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "IEEE Student Branch NSSCE",
  description: "Official Website of IEEE Student Branch NSSCE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">
        <Preloader />

        <ScrollProgressRocket />
        <LenisWrapper>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LenisWrapper>
      </body>
    </html>
  );
}

