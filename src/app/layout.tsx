import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://ieeesbnssce.in"),
  title: {
    default: "IEEE SB NSSCE | Innovating Since 1987",
    template: "%s | IEEE SB NSSCE",
  },
  description: "Official Website of IEEE Student Branch NSS College of Engineering, Palakkad. Discover our events, societies, achievements, and join a community of innovators.",
  keywords: ["IEEE", "NSSCE", "IEEE SB NSSCE", "NSS College of Engineering", "Palakkad", "Engineering", "Technology", "Student Branch", "Kerala Section", "IEEE Kerala"],
  authors: [{ name: "IEEE SB NSSCE Web Team" }],
  creator: "IEEE SB NSSCE",
  publisher: "IEEE SB NSSCE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ieeesbnssce.in",
    title: "IEEE SB NSSCE | Innovating Since 1987",
    description: "Official Website of IEEE Student Branch NSS College of Engineering, Palakkad. Empowering students to innovate, collaborate, and lead.",
    siteName: "IEEE SB NSSCE",
    images: [
      {
        url: "/meta-image.jpg",
        width: 1200,
        height: 630,
        alt: "IEEE SB NSSCE Website Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IEEE SB NSSCE | Innovating Since 1987",
    description: "Official Website of IEEE Student Branch NSS College of Engineering, Palakkad.",
    images: ["/meta-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">
        <Preloader />

        <ScrollProgressRocket />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
