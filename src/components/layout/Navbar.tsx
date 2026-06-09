"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Societies", href: "/societies" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
  { name: "Achievements", href: "/achievements" },
  { name: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isDarkHeader = pathname?.startsWith('/societies/') && pathname !== '/societies';

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 20;
      setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
        scrolled || mobileMenuOpen ? "bg-white py-3 border-b-4 border-black" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center z-50 relative transition-transform hover:scale-105"
        >
          <Image
            src="/logo.png" 
            alt="IEEE SB NSSCE Logo" 
            width={160}
            height={32}
            priority
            style={{ width: 'auto' }}
            className="h-7 md:h-8 w-auto object-contain drop-shadow-sm" 
          />
        </Link>

        {/* Desktop Nav & Join Button */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <nav className="flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-black uppercase tracking-wider transition-all z-10 hover:-translate-y-0.5",
                    !scrolled && isDarkHeader ? "text-white hover:text-white/80" : "text-black hover:text-ieee-blue"
                  )}
                >
                  <span className={cn("relative z-10 transition-colors", isActive && (scrolled || !isDarkHeader) ? "text-black" : "")}>{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className={cn(
                        "absolute inset-0 z-0 border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                        scrolled || !isDarkHeader ? "bg-[#FFD700] border-black" : "bg-white/20 border-white/50"
                      )}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          
          <Link
            href="https://www.ieee.org/membership/join/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "px-6 py-2 text-sm font-black uppercase tracking-widest border-2 transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
              !scrolled && isDarkHeader 
                ? "bg-white text-black border-transparent shadow-lg" 
                : "bg-ieee-blue text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            )}
          >
            Join IEEE
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            "md:hidden z-50 relative p-2 transition-all hover:scale-110",
            mobileMenuOpen || scrolled || !isDarkHeader ? "text-black" : "text-white"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} className="stroke-[3px]" /> : <Menu size={24} className="stroke-[3px]" />}
        </button>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-full left-0 w-full h-[calc(100vh-56px)] overflow-y-auto bg-white flex flex-col items-center justify-center gap-5 z-40 pb-8"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-xl font-black uppercase tracking-widest px-8 py-3 border-2 transition-all w-3/4 text-center",
                      isActive 
                        ? "bg-[#FFD700] border-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1" 
                        : "border-transparent text-black hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              <div className="w-3/4 h-1 bg-black/10 my-2" />
              
              <Link
                href="https://www.ieee.org/membership/join/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 text-xl font-black uppercase tracking-widest text-white bg-ieee-blue border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all w-3/4 text-center mb-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join IEEE
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
