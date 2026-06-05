"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

// Replace this URL with your deployed Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyUZY4TFKqADJWWXvSoUeAILKBmBhcM8XUlnwag3LUoLlAImr_3uNvv3UKySL5ELFcu/exec";

const SocialIcon = ({ name }: { name: string }) => {
  if (name === "linkedin") return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
  if (name === "instagram") return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
  if (name === "twitter") return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
  if (name === "github") return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
  return null;
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !GOOGLE_SCRIPT_URL) {
      if (!GOOGLE_SCRIPT_URL) alert("Google Script URL is not set up yet.");
      return;
    }

    setStatus("loading");
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("timestamp", new Date().toISOString());

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error subscribing:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-white via-sky-200 to-sky-600 pt-20 pb-10 overflow-hidden border-none -mt-[1px]">
      {/* Animated gradient background snippet */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
        <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[70%] rounded-full bg-ieee-blue/10 blur-3xl animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-accent-cyan/10 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <img
                src="/logo.png"
                alt="IEEE SB NSSCE Logo"
                className="h-10 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform"
              />
            </Link>
            <p className="text-black font-bold mb-8 max-w-sm">
              Empowering students to innovate and build the future through technology, leadership, and global networking.
            </p>
            <div className="space-y-3">
              <h4 className="font-black text-sm uppercase tracking-widest text-black bg-white inline-block px-3 py-1 rounded-md border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Stay Updated</h4>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mt-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading" || status === "success"}
                  className="flex-1 bg-white border-2 border-black rounded-xl px-4 py-3 font-bold text-black focus:outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all placeholder-slate-500 disabled:opacity-50"
                  required
                />
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="bg-black text-white border-2 border-black px-6 py-3 rounded-xl font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all min-w-[120px] flex items-center justify-center disabled:opacity-50"
                >
                  {status === "loading" ? "..." : status === "success" ? "Done!" : "Subscribe"}
                </button>
              </form>
              {status === "success" && <p className="text-xs bg-green-400 text-black font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-3 py-1 rounded-md inline-block mt-2">Thanks for subscribing!</p>}
              {status === "error" && <p className="text-xs bg-red-400 text-black font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-3 py-1 rounded-md inline-block mt-2">Something went wrong. Try again.</p>}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-black text-2xl mb-6 text-black">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/#about' },
                { name: 'Events', href: '/events' },
                { name: 'Team', href: '/team' },
                { name: 'Achievements', href: '/achievements' },
                { name: 'Gallery', href: '/gallery' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-black font-bold hover:bg-white hover:px-2 rounded-md transition-all text-sm flex items-center gap-2 group w-max">
                    <ArrowUpRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all font-black stroke-[3px]" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Societies */}
          <div>
            <h4 className="font-heading font-black text-2xl mb-6 text-black">Societies</h4>
            <ul className="space-y-4">
              {[
                { name: 'Computer Society', href: '/societies/computer-society' },
                { name: 'Power & Energy', href: '/societies/power-energy-society' },
                { name: 'Robotics & Auto', href: '/societies/robotics-automation-society' },
                { name: 'Women In Eng.', href: '/societies/women-in-engineering' },
                { name: 'ComSoc', href: '/societies/communications-society' },
                { name: 'View All', href: '/societies' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-black font-bold hover:bg-white hover:px-2 rounded-md transition-all text-sm w-max block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h4 className="font-heading font-black text-2xl mb-6 text-black">Connect</h4>
            <div className="space-y-4 mb-8">
              <p className="text-sm text-black font-bold">
                NSS College of Engineering<br />
                Akathethara, Palakkad<br />
                Kerala 678008, India
              </p>
              <a href="mailto:ieee@nssce.ac.in" className="inline-block text-sm font-black bg-white px-3 py-1 border-2 border-black rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                ieee@nssce.ac.in
              </a>
            </div>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/ieeesbnssce" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black transition-all">
                <SocialIcon name="linkedin" />
              </a>
              <a href="https://www.instagram.com/ieeesbnssce" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black transition-all">
                <SocialIcon name="instagram" />
              </a>
              <a href="https://github.com/IEEE-NSSCE" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black transition-all">
                <SocialIcon name="github" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-4 border-black flex flex-col items-center justify-center gap-2 relative z-10 text-center">
          <p className="text-sm text-black font-black">
            © {new Date().getFullYear()} IEEE Student Branch NSSCE. All rights reserved.
          </p>
          <p className="text-xs text-black font-bold">
            Developed by Web Team | Execom'26, IEEE SB NSSCE
          </p>
        </div>
      </div>
    </footer>
  );
}

